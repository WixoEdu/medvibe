"use client";

import { useState } from "react";
import { useAdminOverview } from "@/lib/admin/useAdminOverview";
import styles from "../admin.module.css";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-GT", { year: "numeric", month: "short", day: "numeric" });
}

export default function AdminUsuariosPage() {
  const { users, hydrated, error } = useAdminOverview();
  const [query, setQuery] = useState("");

  const filtered = users.filter((u) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return u.email.toLowerCase().includes(q) || (u.full_name ?? "").toLowerCase().includes(q);
  });

  return (
    <div>
      <h1 className={styles.title}>Usuarios</h1>
      <p className={styles.subtitle}>
        {hydrated ? `${users.length} usuario(s) registrado(s) en total.` : "Cargando…"}
      </p>

      {error && <p className={styles.emptyNote}>⚠️ {error}</p>}

      <input
        type="search"
        placeholder="Buscar por nombre o correo…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          maxWidth: 360,
          marginBottom: "1rem",
          padding: "0.55rem 0.8rem",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          fontSize: "0.85rem",
        }}
      />

      {!hydrated ? (
        <p className={styles.emptyNote}>Cargando usuarios…</p>
      ) : filtered.length === 0 ? (
        <p className={styles.emptyNote}>No se encontraron usuarios con ese criterio.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Registrado</th>
                <th>Últ. conexión</th>
                <th>N.º conexiones</th>
                <th>Quiz (aciertos/total)</th>
                <th>Precisión</th>
                <th>Flashcards dominadas</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => {
                const pct = u.quiz_questions_total > 0 ? Math.round((u.quiz_correct_total / u.quiz_questions_total) * 100) : null;
                return (
                  <tr key={u.id}>
                    <td>{u.full_name || "—"}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`${styles.badge} ${u.role === "admin" ? styles.badgeAdmin : styles.badgeUser}`}>
                        {u.role === "admin" ? "Admin" : "Usuario"}
                      </span>
                    </td>
                    <td>{formatDate(u.signed_up_at)}</td>
                    <td>{formatDate(u.last_login_at)}</td>
                    <td>{u.login_count}</td>
                    <td>
                      {u.quiz_correct_total}/{u.quiz_questions_total} ({u.quiz_attempts_count} intentos)
                    </td>
                    <td>{pct !== null ? `${pct}%` : "—"}</td>
                    <td>
                      {u.flashcards_mastered}/{u.flashcards_reviewed}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
