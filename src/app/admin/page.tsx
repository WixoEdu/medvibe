"use client";

import { useAdminOverview } from "@/lib/admin/useAdminOverview";
import { useAdminFeedback } from "@/lib/admin/useAdminFeedback";
import ContentGate from "@/components/ui/ContentGate";
import type { ContentBundle } from "@/contexts/ContentContext";
import styles from "./admin.module.css";

const DAY_MS = 24 * 60 * 60 * 1000;

export default function AdminDashboardPage() {
  return <ContentGate>{(content) => <DashboardInner content={content} />}</ContentGate>;
}

function DashboardInner({ content }: { content: ContentBundle }) {
  const { users, topicStats, hydrated, error, fetchedAt } = useAdminOverview();
  const { items: feedback, hydrated: feedbackHydrated } = useAdminFeedback();

  if (!hydrated || !feedbackHydrated || fetchedAt === null) {
    return <p className={styles.emptyNote}>Cargando estadísticas…</p>;
  }

  const now = fetchedAt;
  const activeLast7 = users.filter((u) => u.last_login_at && now - new Date(u.last_login_at).getTime() <= 7 * DAY_MS).length;
  const activeLast30 = users.filter((u) => u.last_login_at && now - new Date(u.last_login_at).getTime() <= 30 * DAY_MS).length;
  const totalAttempts = users.reduce((acc, u) => acc + u.quiz_attempts_count, 0);
  const totalCorrect = users.reduce((acc, u) => acc + u.quiz_correct_total, 0);
  const totalQuestions = users.reduce((acc, u) => acc + u.quiz_questions_total, 0);
  const avgAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const openFeedback = feedback.filter((f) => f.status === "abierto").length;

  const topicRows = [...topicStats]
    .sort((a, b) => b.attempts_count - a.attempts_count)
    .map((t) => {
      const topic = content.topics.find((tp) => tp.id === t.topic_id);
      const pct = t.questions_total > 0 ? Math.round((t.correct_total / t.questions_total) * 100) : 0;
      return { ...t, name: topic?.name ?? t.topic_id, pct };
    });

  return (
    <div>
      <h1 className={styles.title}>Panel de administrador</h1>
      <p className={styles.subtitle}>Vista general de usuarios, progreso y comentarios de MedVibe.</p>

      {error && <p className={styles.emptyNote}>⚠️ {error}</p>}

      <div className={styles.statGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{users.length}</div>
          <div className={styles.statLabel}>Usuarios registrados</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{activeLast7}</div>
          <div className={styles.statLabel}>Activos últimos 7 días</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{activeLast30}</div>
          <div className={styles.statLabel}>Activos últimos 30 días</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{totalAttempts}</div>
          <div className={styles.statLabel}>Intentos de quiz totales</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{avgAccuracy}%</div>
          <div className={styles.statLabel}>Precisión promedio global</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{openFeedback}</div>
          <div className={styles.statLabel}>Comentarios/reportes abiertos</div>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Temas más practicados</h2>
        {topicRows.length === 0 ? (
          <p className={styles.emptyNote}>Todavía no hay intentos de quiz registrados.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Tema</th>
                  <th>Intentos</th>
                  <th>Preguntas respondidas</th>
                  <th>Precisión</th>
                </tr>
              </thead>
              <tbody>
                {topicRows.map((t) => (
                  <tr key={t.topic_id}>
                    <td>{t.name}</td>
                    <td>{t.attempts_count}</td>
                    <td>{t.questions_total}</td>
                    <td>{t.pct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
