"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { translateAuthError } from "@/lib/supabase/errors";
import styles from "../auth.module.css";

export default function RegistroPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/login` : undefined,
      },
    });
    setLoading(false);

    if (error) {
      setError(translateAuthError(error.message));
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <>
        <header className={styles.header}>
          <span className={styles.icon} aria-hidden="true">
            📬
          </span>
          <h1 className={styles.title}>Revisa tu correo</h1>
        </header>
        <p className={styles.successBox}>
          Te enviamos un enlace de confirmación a <strong>{email}</strong>. Ábrelo para activar tu cuenta y
          luego inicia sesión.
        </p>
        <div className={styles.footerLinks}>
          <Link href="/login" className={styles.link}>
            Ir a iniciar sesión
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <span className={styles.icon} aria-hidden="true">
          📝
        </span>
        <h1 className={styles.title}>Crea tu cuenta</h1>
        <p className={styles.subtitle}>
          Guarda tu progreso de quiz, flashcards y juegos, sincronizado en cualquier dispositivo.
        </p>
      </header>

      {!isSupabaseConfigured && (
        <p className={styles.warnBox}>
          ⚠️ Esta instancia de MedVibe todavía no tiene Supabase configurado, así que el registro no
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
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="confirmPassword">
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p className={styles.errorBox}>{error}</p>}

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "Creando cuenta…" : "Crear cuenta"}
        </button>
      </form>

      <div className={styles.footerLinks}>
        <span>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className={styles.link}>
            Inicia sesión
          </Link>
        </span>
      </div>
    </>
  );
}
