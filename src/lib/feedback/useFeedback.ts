"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase/client";

export type FeedbackType = "comentario" | "reporte_error_contenido" | "reporte_error_app" | "sugerencia_contenido";
export type FeedbackStatus = "abierto" | "revisado" | "resuelto";

export interface FeedbackRow {
  id: string;
  user_id: string;
  type: FeedbackType;
  reference: string | null;
  message: string;
  status: FeedbackStatus;
  created_at: string;
}

const SELECT_COLUMNS = "id, user_id, type, reference, message, status, created_at";

/**
 * Feedback del usuario autenticado: enviar comentarios/reportes y ver el
 * estado de los que ya envió. Con RLS, cada usuario solo ve sus propias
 * filas (los administradores ven todas, ver useAdminFeedback).
 */
export function useFeedback() {
  const { user } = useAuth();
  const [items, setItems] = useState<FeedbackRow[] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    if (!user) return;
    supabase
      .from("feedback")
      .select(SELECT_COLUMNS)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          return;
        }
        setItems(data as FeedbackRow[]);
      });
  }, [user]);

  useEffect(() => {
    if (!user) {
      const t0 = setTimeout(() => setItems(null), 0);
      return () => clearTimeout(t0);
    }
    reload();
  }, [user, reload]);

  const submit = useCallback(
    async (input: { type: FeedbackType; reference: string; message: string }) => {
      if (!user) return { ok: false as const, error: "Debes iniciar sesión." };
      setSubmitting(true);
      setError(null);
      const { error } = await supabase.from("feedback").insert({
        user_id: user.id,
        type: input.type,
        reference: input.reference.trim() || null,
        message: input.message.trim(),
      });
      setSubmitting(false);
      if (error) {
        setError(error.message);
        return { ok: false as const, error: error.message };
      }
      reload();
      return { ok: true as const };
    },
    [user, reload]
  );

  return { items: items ?? [], hydrated: items !== null, submitting, error, submit };
}
