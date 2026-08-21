"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase/client";

export interface AdminUserRow {
  id: string;
  email: string;
  full_name: string | null;
  role: "user" | "admin";
  signed_up_at: string;
  login_count: number;
  last_login_at: string | null;
  quiz_attempts_count: number;
  quiz_correct_total: number;
  quiz_questions_total: number;
  flashcards_mastered: number;
  flashcards_reviewed: number;
}

export interface AdminTopicStat {
  topic_id: string;
  attempts_count: number;
  correct_total: number;
  questions_total: number;
}

/**
 * Datos del panel de administrador. Todo llega vía las vistas
 * `admin_user_overview` / `admin_topic_stats` (ver supabase/schema-admin.sql),
 * consultadas con la sesión del propio administrador — la seguridad la
 * garantiza RLS en la base de datos, no este hook.
 */
export function useAdminOverview() {
  const { user, isAdmin } = useAuth();
  const [users, setUsers] = useState<AdminUserRow[] | null>(null);
  const [topicStats, setTopicStats] = useState<AdminTopicStat[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Se captura al momento de la consulta (fuera del render) para poder
  // calcular "activo en los últimos N días" sin llamar Date.now() durante
  // el render, que React considera una operación impura.
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);

  useEffect(() => {
    if (!user || !isAdmin) {
      const t0 = setTimeout(() => {
        setUsers(null);
        setTopicStats(null);
        setFetchedAt(null);
      }, 0);
      return () => clearTimeout(t0);
    }

    let cancelled = false;

    (async () => {
      const [usersRes, topicsRes] = await Promise.all([
        supabase.from("admin_user_overview").select("*").order("signed_up_at", { ascending: false }).limit(1000),
        supabase.from("admin_topic_stats").select("*"),
      ]);
      if (cancelled) return;

      if (usersRes.error) {
        setError(usersRes.error.message);
        setUsers([]);
      } else {
        setUsers(usersRes.data as AdminUserRow[]);
      }

      if (topicsRes.error) {
        setError((prev) => prev ?? topicsRes.error.message);
        setTopicStats([]);
      } else {
        setTopicStats(topicsRes.data as AdminTopicStat[]);
      }

      setFetchedAt(Date.now());
    })();

    return () => {
      cancelled = true;
    };
  }, [user, isAdmin]);

  const hydrated = users !== null && topicStats !== null;

  return { users: users ?? [], topicStats: topicStats ?? [], hydrated, error, fetchedAt };
}
