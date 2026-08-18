"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { translateAuthError } from "@/lib/supabase/errors";
import styles from "../auth.module.css";

type LinkStatus = "checking" | "valid" | "invalid";

export default function ActualizarContrasenaPage() {
  const router = useRouter();
  const [status, setStatus] = useState<LinkStatus>(isSupabaseConfigured ? "checking" : "invalid");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    // El enlace de recuperación establece una sesión temporal al cargar la
    // página (Supabase procesa el fragmento #access_token de la URL). Ese
    // momento dispara el evento PASSWORD_RECOVERY; también revisamos si ya
    // existe una sesión activa por si el evento se disparó antes de montar.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setStatus("valid");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setStatus((prev) => (prev === "checking" && session ? "valid" : prev));
    });

    const timeout = setTimeout(() => {
      setStatus((prev) => (prev === "checking" ? "invalid" : prev));
    }, 4000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

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
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(translateAuthError(error.message));
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/"), 1500);
  }

  if (done) {
    return (
      <>
        <header className={styles.header}>
          <span className={styles.icon} aria-hidden="true">
            ✅
          </span>
          <h1 className={styles.title}>Contraseña actualizada</h1>
        </header>
        <p className={styles.successBox}>Tu contraseña se actualizó correctamente. Te llevamos a MedVibe…</p>
      </>
    );
  }

  if (status === "checking") {
    return (
      <>
        <header className={styles.header}>
          <span className={styles.icon} aria-hidden="true">
            🔑
          </span>
          <h1 className={styles.title}>Verificando enlace…</h1>
        </header>
      </>
    );
  }

  if (status === "invalid") {
    return (
      <>
        <header className={styles.header}>
          <span className={styles.icon} aria-hidden="true">
            ⚠️
          </span>
          <h1 className={styles.title}>Enlace inválido o expirado</h1>
        </header>
        <p className={styles.errorBox}>
          Este enlace de recuperación ya no es válido. Solicita uno nuevo desde la página de recuperación de
          contraseña.
        </p>
        <div className={styles.footerLinks}>
          <Link href="/recuperar-contrasena" className={styles.link}>
            Solicitar nuevo enlace
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
        <h1 className={styles.title}>Crea una nueva contraseña</h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Nueva contraseña
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
            Confirmar nueva contraseña
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
          {loading ? "Guardando…" : "Guardar nueva contraseña"}
        </button>
      </form>
    </>
  );
}
