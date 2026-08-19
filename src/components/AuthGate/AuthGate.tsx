"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./AuthGate.module.css";

/** Rutas accesibles sin haber iniciado sesión. */
const PUBLIC_PATHS = ["/login", "/registro", "/recuperar-contrasena", "/actualizar-contrasena"];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/**
 * Bloquea el contenido de la app a visitantes sin sesión iniciada: mientras
 * no haya usuario autenticado, no se renderiza nada del contenido (ni el
 * quiz, ni flashcards, ni tablas/nemotecnias) y se redirige a /login.
 *
 * Si Supabase no está configurado en este despliegue (`authAvailable` es
 * false), se deja pasar en modo invitado en vez de bloquear todo el sitio
 * — así un error de configuración no deja la app completamente inutilizable.
 */
export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading, authAvailable } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const publicPath = isPublicPath(pathname);

  useEffect(() => {
    if (loading || !authAvailable || publicPath) return;
    if (!user) router.replace("/login");
  }, [user, loading, authAvailable, publicPath, router]);

  if (publicPath || !authAvailable) {
    return <>{children}</>;
  }

  if (loading || !user) {
    return <div className={styles.loading}>Cargando…</div>;
  }

  return <>{children}</>;
}
