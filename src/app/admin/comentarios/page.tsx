"use client";

import { useState } from "react";
import { useAdminOverview } from "@/lib/admin/useAdminOverview";
import { useAdminFeedback } from "@/lib/admin/useAdminFeedback";
import type { FeedbackStatus, FeedbackType } from "@/lib/feedback/useFeedback";
import styles from "../admin.module.css";

const TYPE_LABELS: Record<FeedbackType, string> = {
  comentario: "💬 Comentario general",
  reporte_error_contenido: "📚 Error de contenido",
  reporte_error_app: "🐞 Error de la app",
  sugerencia_contenido: "💡 Sugerencia de contenido",
};

const STATUS_LABELS: Record<FeedbackStatus, string> = {
  abierto: "Abierto",
  revisado: "Revisado",
  resuelto: "Resuelto",
};

const STATUS_CLASS: Record<FeedbackStatus, string> = {
  abierto: styles.statusAbierto,
  revisado: styles.statusRevisado,
  resuelto: styles.statusResuelto,
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("es-GT", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function AdminComentariosPage() {
  const { items, hydrated, error, updateStatus } = useAdminFeedback();
  const { users } = useAdminOverview();
  const [statusFilter, setStatusFilter] = useState<FeedbackStatus | "todos">("abierto");

  const emailByUser = new Map(users.map((u) => [u.id, u.full_name || u.email]));

  const filtered = items.filter((f) => statusFilter === "todos" || f.status === statusFilter);

  return (
    <div>
      <h1 className={styles.title}>Comentarios y reportes</h1>
      <p className={styles.subtitle}>Lo que los usuarios reportan sobre la app y el contenido.</p>

      {error && <p className={styles.emptyNote}>⚠️ {error}</p>}

      <div className={styles.filterRow}>
        {(["abierto", "revisado", "resuelto", "todos"] as const).map((s) => (
          <button
            key={s}
            type="button"
            className={`${styles.filterButton} ${statusFilter === s ? styles.filterButtonActive : ""}`}
            onClick={() => setStatusFilter(s)}
          >
            {s === "todos" ? "Todos" : STATUS_LABELS[s]}
            {s !== "todos" && ` (${items.filter((f) => f.status === s).length})`}
          </button>
        ))}
      </div>

      {!hydrated ? (
        <p className={styles.emptyNote}>Cargando…</p>
      ) : filtered.length === 0 ? (
        <p className={styles.emptyNote}>No hay comentarios/reportes en este filtro.</p>
      ) : (
        <div className={styles.feedbackList}>
          {filtered.map((f) => (
            <div key={f.id} className={styles.feedbackCard}>
              <div className={styles.feedbackHead}>
                <span className={styles.typeBadge}>{TYPE_LABELS[f.type]}</span>
                <span className={`${styles.statusBadge} ${STATUS_CLASS[f.status]}`}>{STATUS_LABELS[f.status]}</span>
                <span className={styles.feedbackMeta}>
                  {emailByUser.get(f.user_id) ?? f.user_id} · {formatDateTime(f.created_at)}
                </span>
              </div>
              {f.reference && (
                <p className={styles.feedbackMeta}>
                  <strong>Referencia:</strong> {f.reference}
                </p>
              )}
              <p className={styles.feedbackMessage}>{f.message}</p>
              <div className={styles.feedbackActions}>
                {(["abierto", "revisado", "resuelto"] as const)
                  .filter((s) => s !== f.status)
                  .map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={styles.filterButton}
                      onClick={() => updateStatus(f.id, s)}
                    >
                      Marcar {STATUS_LABELS[s].toLowerCase()}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
