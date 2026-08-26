"use client";

import { useState } from "react";
import { useFeedback, type FeedbackType, type FeedbackStatus } from "@/lib/feedback/useFeedback";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./comentarios.module.css";

const TYPE_OPTIONS: { value: FeedbackType; label: string }[] = [
  { value: "comentario", label: "💬 Comentario general (cómo me fue, qué aprendí)" },
  { value: "reporte_error_contenido", label: "📚 Reportar un error en el contenido" },
  { value: "reporte_error_app", label: "🐞 Reportar un error/bug de la app" },
  { value: "sugerencia_contenido", label: "💡 Sugerir contenido o un tema que falta" },
];

const STATUS_LABELS: Record<FeedbackStatus, string> = {
  abierto: "Recibido",
  revisado: "En revisión",
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

export default function ComentariosApp() {
  const { authAvailable, user } = useAuth();
  const { items, hydrated, submitting, error, submit } = useFeedback();

  const [type, setType] = useState<FeedbackType>("comentario");
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);
    if (!message.trim()) return;
    const res = await submit({ type, reference, message });
    if (res.ok) {
      setMessage("");
      setReference("");
      setSuccess(true);
    }
  }

  return (
    <div>
      <section className={styles.hero}>
        <h1 className={styles.title}>💬 Comentarios y reportes</h1>
        <p className={styles.subtitle}>
          Cuéntanos cómo te fue estudiando con MedVibe, reporta un error de contenido o de la app, o sugiere
          un tema que sientas que falta. Lo revisamos directamente para mejorar la app.
        </p>
        <p className={styles.privacyNote}>
          🔒 Tu comentario queda asociado a tu cuenta (para poder darte seguimiento), pero solo tú y el
          equipo de MedVibe pueden verlo — nunca se muestra a otros usuarios.
        </p>
      </section>

      {!authAvailable || !user ? (
        <p className={styles.emptyNote}>Inicia sesión para enviar un comentario o reporte.</p>
      ) : (
        <>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="type">
                Tipo
              </label>
              <select id="type" className={styles.select} value={type} onChange={(e) => setType(e.target.value as FeedbackType)}>
                {TYPE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="reference">
                ¿A qué tema, pregunta o pantalla se refiere? (opcional)
              </label>
              <input
                id="reference"
                type="text"
                className={styles.input}
                placeholder="Ej. Quiz de Cirugía, pregunta sobre apendicitis"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">
                Mensaje
              </label>
              <textarea
                id="message"
                required
                className={styles.textarea}
                placeholder="Escribe aquí con el mayor detalle posible…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {error && <p className={styles.errorBox}>{error}</p>}
            {success && <p className={styles.successBox}>¡Gracias! Recibimos tu mensaje.</p>}

            <button type="submit" className={styles.submitButton} disabled={submitting || !message.trim()}>
              {submitting ? "Enviando…" : "Enviar"}
            </button>
          </form>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Mis reportes anteriores</h2>
            {!hydrated ? (
              <p className={styles.emptyNote}>Cargando…</p>
            ) : items.length === 0 ? (
              <p className={styles.emptyNote}>Todavía no has enviado ningún comentario o reporte.</p>
            ) : (
              <div className={styles.reportList}>
                {items.map((f) => (
                  <div key={f.id} className={styles.reportCard}>
                    <div className={styles.reportHead}>
                      <span className={styles.typeBadge}>{TYPE_OPTIONS.find((o) => o.value === f.type)?.label ?? f.type}</span>
                      <span className={`${styles.statusBadge} ${STATUS_CLASS[f.status]}`}>{STATUS_LABELS[f.status]}</span>
                      <span className={styles.reportMeta}>{formatDateTime(f.created_at)}</span>
                    </div>
                    {f.reference && <p className={styles.reportMeta}>{f.reference}</p>}
                    <p className={styles.reportMessage}>{f.message}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
