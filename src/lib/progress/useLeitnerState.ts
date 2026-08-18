"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase/client";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { LEITNER_BOXES, reviewCard, type LeitnerState } from "@/lib/leitner";

interface FlashcardProgressRow {
  card_id: string;
  box: number;
  last_reviewed: string | null;
  times_reviewed: number;
}

function rowsToState(rows: FlashcardProgressRow[]): LeitnerState {
  const state: LeitnerState = {};
  for (const row of rows) {
    state[row.card_id] = {
      box: row.box,
      lastReviewed: row.last_reviewed ? new Date(row.last_reviewed).getTime() : 0,
      timesReviewed: row.times_reviewed,
    };
  }
  return state;
}

/**
 * Estado del sistema Leitner de flashcards. Con sesión iniciada, vive en
 * Supabase (tabla `flashcard_progress`); como invitado, en localStorage.
 */
export function useLeitnerState() {
  const { user } = useAuth();
  const [local, setLocal, localHydrated] = useLocalStorage<LeitnerState>(STORAGE_KEYS.flashcardLeitner, {});
  const [remote, setRemote] = useState<LeitnerState | null>(null);

  useEffect(() => {
    if (!user) {
      // Se difiere con setTimeout para no despachar setState de forma
      // síncrona dentro del cuerpo del efecto.
      const t0 = setTimeout(() => setRemote(null), 0);
      return () => clearTimeout(t0);
    }
    let cancelled = false;
    supabase
      .from("flashcard_progress")
      .select("card_id, box, last_reviewed, times_reviewed")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("[MedVibe] No se pudo cargar el progreso de flashcards:", error.message);
          setRemote({});
          return;
        }
        setRemote(rowsToState((data ?? []) as FlashcardProgressRow[]));
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const review = useCallback(
    async (cardId: string, knewIt: boolean) => {
      if (user) {
        setRemote((prev) => {
          const base = prev ?? {};
          const current = base[cardId] ?? { box: 1, lastReviewed: 0, timesReviewed: 0 };
          const nextBox = knewIt ? Math.min(LEITNER_BOXES, current.box + 1) : 1;
          const updated = { box: nextBox, lastReviewed: Date.now(), timesReviewed: current.timesReviewed + 1 };

          supabase
            .from("flashcard_progress")
            .upsert(
              {
                user_id: user.id,
                card_id: cardId,
                box: updated.box,
                last_reviewed: new Date(updated.lastReviewed).toISOString(),
                times_reviewed: updated.timesReviewed,
              },
              { onConflict: "user_id,card_id" }
            )
            .then(({ error }) => {
              if (error) console.error("[MedVibe] No se pudo guardar el repaso de la tarjeta:", error.message);
            });

          return { ...base, [cardId]: updated };
        });
      } else {
        setLocal((prev) => reviewCard(prev, cardId, knewIt));
      }
    },
    [user, setLocal]
  );

  const state = user ? remote ?? {} : local;
  const hydrated = user ? remote !== null : localHydrated;

  return { state, review, hydrated };
}
