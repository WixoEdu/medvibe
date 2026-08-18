"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase/client";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { STORAGE_KEYS, type QuizAttempt } from "@/lib/storageKeys";

interface QuizAttemptRow {
  id: string;
  topic_id: string;
  total: number;
  correct: number;
  mode: "practica" | "examen";
  created_at: string;
}

function rowToAttempt(row: QuizAttemptRow): QuizAttempt {
  return {
    id: row.id,
    date: new Date(row.created_at).getTime(),
    topicId: row.topic_id,
    total: row.total,
    correct: row.correct,
    mode: row.mode,
  };
}

/**
 * Historial de intentos de quiz. Con sesión iniciada, vive en Supabase
 * (tabla `quiz_attempts`, protegida por RLS); como invitado, sigue viviendo
 * en localStorage igual que antes.
 */
export function useQuizHistory() {
  const { user } = useAuth();
  const [local, setLocal, localHydrated] = useLocalStorage<QuizAttempt[]>(STORAGE_KEYS.quizHistory, []);
  const [remote, setRemote] = useState<QuizAttempt[] | null>(null);

  useEffect(() => {
    if (!user) {
      // Se difiere con setTimeout para no despachar setState de forma
      // síncrona dentro del cuerpo del efecto.
      const t0 = setTimeout(() => setRemote(null), 0);
      return () => clearTimeout(t0);
    }
    let cancelled = false;
    supabase
      .from("quiz_attempts")
      .select("id, topic_id, total, correct, mode, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("[MedVibe] No se pudo cargar el historial de quiz:", error.message);
          setRemote([]);
          return;
        }
        setRemote((data ?? []).map(rowToAttempt));
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const addAttempt = useCallback(
    async (attempt: Omit<QuizAttempt, "id" | "date">) => {
      if (user) {
        const { data, error } = await supabase
          .from("quiz_attempts")
          .insert({
            user_id: user.id,
            topic_id: attempt.topicId,
            total: attempt.total,
            correct: attempt.correct,
            mode: attempt.mode,
          })
          .select("id, topic_id, total, correct, mode, created_at")
          .single();
        if (error) {
          console.error("[MedVibe] No se pudo guardar el intento de quiz:", error.message);
          return;
        }
        setRemote((prev) => [rowToAttempt(data as QuizAttemptRow), ...(prev ?? [])].slice(0, 100));
      } else {
        const fullAttempt: QuizAttempt = { ...attempt, id: `${Date.now()}`, date: Date.now() };
        setLocal((prev) => [fullAttempt, ...prev].slice(0, 100));
      }
    },
    [user, setLocal]
  );

  const history = user ? remote ?? [] : local;
  const hydrated = user ? remote !== null : localHydrated;

  return { history, addAttempt, hydrated };
}
