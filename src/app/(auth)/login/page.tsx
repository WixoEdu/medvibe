"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { translateAuthError } from "@/lib/supabase/errors";
import styles from "../auth.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(translateAuthError(error.message));
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <header className={styles.header}>
        <span className={styles.icon} aria-hidden="true">
          🔐
        </span>
        <h1 className={styles.title}>Inicia sesión</h1>
        <p className={styles.subtitle}>Accede para llevar tu progreso de estudio sincronizado en la nube.</p>
      </header>

      {!isSupabaseConfigured && (
        <p className={styles.warnBox}>
          ⚠️ Esta instancia de MedVibe todavía no tiene Supabase configurado, así que el inicio de sesión no
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
            autoComplete="current-password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className={styles.errorBox}>{error}</p>}

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "Ingresando…" : "Iniciar sesión"}
        </button>
      </form>

      <div className={styles.footerLinks}>
        <Link href="/recuperar-contrasena" className={styles.link}>
          ¿Olvidaste tu contraseña?
        </Link>
        <span>
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className={styles.link}>
            Regístrate
          </Link>
        </span>
      </div>
    </>
  );
}
