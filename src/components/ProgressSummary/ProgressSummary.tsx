"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useQuizHistory } from "@/lib/progress/useQuizHistory";
import { useLeitnerState } from "@/lib/progress/useLeitnerState";
import { ALL_FLASHCARDS } from "@/content";
import { LEITNER_BOXES } from "@/lib/leitner";
import styles from "./ProgressSummary.module.css";

export default function ProgressSummary() {
  const { user, authAvailable } = useAuth();
  const { history, hydrated } = useQuizHistory();
  const { state: leitner } = useLeitnerState();

  if (!hydrated) {
    return <div className={styles.empty}>Cargando tu progreso…</div>;
  }

  const masteredCards = Object.values(leitner).filter((e) => e.box === LEITNER_BOXES).length;

  return (
    <div>
      {authAvailable && !user && (
        <p className={styles.syncNote}>
          💾 Tu progreso se guarda solo en este navegador.{" "}
          <Link href="/registro" className={styles.syncLink}>
            Crea una cuenta
          </Link>{" "}
          para sincronizarlo entre dispositivos.
        </p>
      )}
      {user && <p className={styles.syncNote}>☁️ Progreso sincronizado en la nube con tu cuenta.</p>}

      {history.length === 0 ? (
        <p className={styles.empty}>Todavía no tienes intentos de quiz guardados. Resuelve tu primer quiz para ver tu progreso aquí.</p>
      ) : (
        <div className={styles.grid}>
          <div className={styles.stat}>
            <div className={styles.value}>{history.length}</div>
            <div className={styles.label}>Quiz completados</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.value}>
              {(() => {
                const totalAnswered = history.reduce((acc, h) => acc + h.total, 0);
                const totalCorrect = history.reduce((acc, h) => acc + h.correct, 0);
                return totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
              })()}
              %
            </div>
            <div className={styles.label}>
              Precisión global ({history.reduce((acc, h) => acc + h.correct, 0)}/
              {history.reduce((acc, h) => acc + h.total, 0)})
            </div>
          </div>
          <div className={styles.stat}>
            <div className={styles.value}>
              {masteredCards}/{ALL_FLASHCARDS.length}
            </div>
            <div className={styles.label}>Flashcards dominadas (caja 5)</div>
          </div>
        </div>
      )}
    </div>
  );
}
