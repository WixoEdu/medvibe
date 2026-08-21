"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase/client";
import type { FeedbackRow, FeedbackStatus } from "@/lib/feedback/useFeedback";

const SELECT_COLUMNS = "id, user_id, type, reference, message, status, created_at";

/** Todos los comentarios/reportes de todos los usuarios — solo admins (RLS). */
export function useAdminFeedback() {
  const { user, isAdmin } = useAuth();
  const [items, setItems] = useState<FeedbackRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    supabase
      .from("feedback")
      .select(SELECT_COLUMNS)
      .order("created_at", { ascending: false })
      .limit(500)
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          return;
        }
        setItems(data as FeedbackRow[]);
      });
  }, []);

  useEffect(() => {
    if (!user || !isAdmin) {
      const t0 = setTimeout(() => setItems(null), 0);
      return () => clearTimeout(t0);
    }
    reload();
  }, [user, isAdmin, reload]);

  const updateStatus = useCallback(
    async (id: string, status: FeedbackStatus) => {
      const { error } = await supabase.from("feedback").update({ status }).eq("id", id);
      if (error) {
        setError(error.message);
        return;
      }
      setItems((prev) => (prev ? prev.map((f) => (f.id === id ? { ...f, status } : f)) : prev));
    },
    []
  );

  return { items: items ?? [], hydrated: items !== null, error, updateStatus };
}
