"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./AdminGate.module.css";

/**
 * Bloquea /admin/* a cualquiera que no sea administrador. Esto es solo la
 * capa de UX (redirige y evita el parpadeo del contenido): la protección
 * real vive en las políticas RLS de Supabase — un usuario normal que
 * intente consultar directamente las tablas o vistas de administrador
 * simplemente no recibe filas, sin importar lo que haga en el navegador.
 */
export default function AdminGate({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, authAvailable, isAdmin } = useAuth();
  const router = useRouter();

  // Mientras el perfil no ha terminado de cargar, no sabemos aún si es
  // admin o no — se espera antes de decidir redirigir.
  const resolving = loading || (authAvailable && user && !profile);

  useEffect(() => {
    if (resolving) return;
    if (!authAvailable || !user || !isAdmin) router.replace("/");
  }, [resolving, authAvailable, user, isAdmin, router]);

  if (!authAvailable || resolving) {
    return <div className={styles.loading}>Cargando…</div>;
  }

  if (!user || !isAdmin) {
    return <div className={styles.loading}>Acceso restringido. Redirigiendo…</div>;
  }

  return <>{children}</>;
}
