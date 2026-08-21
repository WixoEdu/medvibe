"use client";

import Link from "next/link";
import ContentGate from "@/components/ui/ContentGate";
import type { ContentBundle } from "@/contexts/ContentContext";
import type { StudyPlanActivity } from "@/types/content";
import { useLocalStorage } from "@/lib/useLocalStorage";
import styles from "./plan.module.css";

const ACTIVITY_ICON: Record<StudyPlanActivity["type"], string> = {
  quiz: "📝",
  flashcards: "🃏",
  tablas: "📊",
  nemotecnias: "🧠",
  repaso: "🔁",
  simulacro: "🎯",
  descanso: "😌",
};

export default function PlanApp() {
  return <ContentGate>{(content) => <PlanInner content={content} />}</ContentGate>;
}

function PlanInner({ content }: { content: ContentBundle }) {
  const [completedDays, setCompletedDays, hydrated] = useLocalStorage<number[]>("medvibe-plan15-completados", []);
  const plan = content.studyPlan;
  const completedSet = new Set(completedDays);
  const totalMinutes = plan.reduce((acc, d) => acc + d.estimatedMinutes, 0);

  function toggleDay(day: number) {
    setCompletedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort((a, b) => a - b)));
  }

  return (
    <div>
      <section className={styles.hero}>
        <Link href="/" className={styles.backLink}>
          ← Inicio
        </Link>
        <span className={styles.eyebrow}>🗓️ Para el examen de admisión USAC/UNADE</span>
        <h1 className={styles.title}>Plan de estudio de 15 días</h1>
        <p className={styles.subtitle}>
          Un cronograma día a día de Biología y Química, pensado para un aspirante que solo tiene dos
          semanas antes del examen. Cubre los 12 bloques temáticos de la guía oficial, con dos simulacros
          integrados y un día de repaso final ligero antes del examen.
        </p>
        <div className={styles.actionsRow}>
          <Link href="/temas/ciencias-basicas" className={`${styles.actionButton} ${styles.actionButtonPrimary}`}>
            🧬 Ver el área completa
          </Link>
          <Link href="/quiz?tema=ciencias-basicas" className={styles.actionButton}>
            📝 Practicar quiz
          </Link>
          <Link href="/flashcards?tema=ciencias-basicas" className={styles.actionButton}>
            🃏 Flashcards
          </Link>
        </div>
        {hydrated && (
          <div className={styles.progressBlock}>
            <div className={styles.progressBarTrack}>
              <div className={styles.progressBarFill} style={{ width: `${Math.round((completedDays.length / plan.length) * 100)}%` }} />
            </div>
            <p className={styles.progressLabel}>
              {completedDays.length} de {plan.length} días completados · ~{Math.round(totalMinutes / 60)} horas de estudio activo en total
            </p>
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.dayList}>
          {plan.map((d) => {
            const done = completedSet.has(d.day);
            return (
              <div key={d.day} className={`${styles.dayCard} ${done ? styles.dayCardDone : ""}`}>
                <div className={styles.dayHead}>
                  <span className={styles.dayNumber}>Día {d.day}</span>
                  <h2 className={styles.dayTitle}>{d.title}</h2>
                  <span className={styles.dayMinutes}>⏱️ ~{d.estimatedMinutes} min</span>
                  <label className={styles.doneToggle}>
                    <input type="checkbox" checked={done} onChange={() => toggleDay(d.day)} />
                    {done ? "Completado" : "Marcar como hecho"}
                  </label>
                </div>

                <div className={styles.subtopicRow}>
                  {d.subtopics.map((s) => (
                    <span key={s} className={styles.subtopicTag}>
                      {s}
                    </span>
                  ))}
                </div>

                <div className={styles.dayBody}>
                  <div>
                    <h3 className={styles.blockLabel}>🎯 Meta del día</h3>
                    <ul className={styles.goalsList}>
                      {d.goals.map((g, i) => (
                        <li key={i}>{g}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className={styles.blockLabel}>✅ Actividades</h3>
                    <ul className={styles.activitiesList}>
                      {d.activities.map((a, i) => (
                        <li key={i}>
                          <span aria-hidden="true">{ACTIVITY_ICON[a.type]}</span> {a.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
