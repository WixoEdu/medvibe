"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { translateAuthError } from "@/lib/supabase/errors";
import styles from "../auth.module.css";

export default function RecuperarContrasenaPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: typeof window !== "undefined" ? `${window.location.origin}/actualizar-contrasena` : undefined,
    });
    setLoading(false);

    if (error) {
      setError(translateAuthError(error.message));
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <>
        <header className={styles.header}>
          <span className={styles.icon} aria-hidden="true">
            📬
          </span>
          <h1 className={styles.title}>Revisa tu correo</h1>
        </header>
        <p className={styles.successBox}>
          Si existe una cuenta con el correo <strong>{email}</strong>, te enviamos un enlace para
          restablecer tu contraseña. Puede tardar unos minutos en llegar.
        </p>
        <div className={styles.footerLinks}>
          <Link href="/login" className={styles.link}>
            Volver a iniciar sesión
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <span className={styles.icon} aria-hidden="true">
          🔑
        </span>
        <h1 className={styles.title}>Recuperar contraseña</h1>
        <p className={styles.subtitle}>Te enviaremos un enlace a tu correo para crear una nueva contraseña.</p>
      </header>

      {!isSupabaseConfigured && (
        <p className={styles.warnBox}>
          ⚠️ Esta instancia de MedVibe todavía no tiene Supabase configurado, así que este formulario no
          funcionará hasta que se agreguen las variables de entorno (ver SUPABASE_SETUP.md).
        </p>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <p className={styles.errorBox}>{error}</p>}

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "Enviando…" : "Enviar enlace"}
        </button>
      </form>

      <div className={styles.footerLinks}>
        <Link href="/login" className={styles.link}>
          Volver a iniciar sesión
        </Link>
      </div>
    </>
  );
}
