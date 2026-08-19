"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase/client";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { STORAGE_KEYS, EMPTY_GAME_SCORES, type GameScores } from "@/lib/storageKeys";

type GameKey = keyof GameScores;

interface GameScoreRow {
  game: GameKey;
  score: number;
}

/**
 * Puntajes de los juegos. Con sesión iniciada, viven en Supabase (tabla
 * `game_scores`); como invitado, en localStorage. `addScore` guarda un
 * puntaje nuevo; cada juego decide cómo interpretar "mejor puntaje" (menor
 * o mayor) a partir de la lista completa que devuelve este hook.
 */
export function useGameScores() {
  const { user } = useAuth();
  const [local, setLocal] = useLocalStorage<GameScores>(STORAGE_KEYS.gameScores, EMPTY_GAME_SCORES);
  const [remote, setRemote] = useState<GameScores | null>(null);

  useEffect(() => {
    if (!user) {
      // Se difiere con setTimeout para no despachar setState de forma
      // síncrona dentro del cuerpo del efecto.
      const t0 = setTimeout(() => setRemote(null), 0);
      return () => clearTimeout(t0);
    }
    let cancelled = false;
    supabase
      .from("game_scores")
      .select("game, score")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("[MedVibe] No se pudo cargar los puntajes de juegos:", error.message);
          setRemote({ ...EMPTY_GAME_SCORES });
          return;
        }
        const grouped: GameScores = { memoria: [], contrarreloj: [], ahorcado: [] };
        for (const row of (data ?? []) as GameScoreRow[]) {
          grouped[row.game]?.push(row.score);
        }
        setRemote(grouped);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const addScore = useCallback(
    async (game: GameKey, score: number) => {
      if (user) {
        setRemote((prev) => {
          const base = prev ?? { ...EMPTY_GAME_SCORES };
          return { ...base, [game]: [score, ...base[game]] };
        });
        const { error } = await supabase.from("game_scores").insert({ user_id: user.id, game, score });
        if (error) console.error("[MedVibe] No se pudo guardar el puntaje:", error.message);
      } else {
        setLocal((prev) => ({ ...prev, [game]: [score, ...prev[game]] }));
      }
    },
    [user, setLocal]
  );

  const scores = user ? remote ?? EMPTY_GAME_SCORES : local;

  return { scores, addScore };
}
