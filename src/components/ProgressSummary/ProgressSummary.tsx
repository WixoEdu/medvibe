"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";
import { STORAGE_KEYS, type QuizAttempt } from "@/lib/storageKeys";
import type { LeitnerState } from "@/lib/leitner";
import { ALL_FLASHCARDS } from "@/content";
import { LEITNER_BOXES } from "@/lib/leitner";
import styles from "./ProgressSummary.module.css";

export default function ProgressSummary() {
  const [history, , hydrated] = useLocalStorage<QuizAttempt[]>(STORAGE_KEYS.quizHistory, []);
  const [leitner] = useLocalStorage<LeitnerState>(STORAGE_KEYS.flashcardLeitner, {});

  if (!hydrated) {
    return <div className={styles.empty}>Cargando tu progreso…</div>;
  }

  if (history.length === 0) {
    return (
      <p className={styles.empty}>
        Todavía no tienes intentos de quiz guardados. Resuelve tu primer quiz para ver tu progreso aquí (se
        guarda solo en este navegador).
      </p>
    );
  }

  const totalAnswered = history.reduce((acc, h) => acc + h.total, 0);
  const totalCorrect = history.reduce((acc, h) => acc + h.correct, 0);
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const masteredCards = Object.values(leitner).filter((e) => e.box === LEITNER_BOXES).length;

  return (
    <div className={styles.grid}>
      <div className={styles.stat}>
        <div className={styles.value}>{history.length}</div>
        <div className={styles.label}>Quiz completados</div>
      </div>
      <div className={styles.stat}>
        <div className={styles.value}>{accuracy}%</div>
        <div className={styles.label}>Precisión global ({totalCorrect}/{totalAnswered})</div>
      </div>
      <div className={styles.stat}>
        <div className={styles.value}>
          {masteredCards}/{ALL_FLASHCARDS.length}
        </div>
        <div className={styles.label}>Flashcards dominadas (caja 5)</div>
      </div>
    </div>
  );
}
