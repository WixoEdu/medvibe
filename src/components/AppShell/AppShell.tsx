"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Topbar from "@/components/Topbar/Topbar";
import AuthGate from "@/components/AuthGate/AuthGate";
import styles from "./AppShell.module.css";

/**
 * Estructura general de la app: menú lateral fijo a la izquierda (colapsa a
 * un cajón deslizante en móvil) + barra superior con la información del
 * usuario a la derecha, tal como en la referencia de diseño.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className={styles.content}>
        <Topbar onMenuClick={() => setMenuOpen((open) => !open)} />
        <main className={styles.main}>
          <AuthGate>{children}</AuthGate>
        </main>
        <footer className={styles.footer}>
          <p>
            MedVibe · Material de apoyo para el Examen de Oposición Nacional de Primera Especialidad de Medicina
            (Guatemala). No sustituye las guías oficiales de la Facultad de Ciencias Médicas – USAC ni la
            bibliografía de tu programa de estudio.
          </p>
        </footer>
      </div>
    </div>
  );
}
