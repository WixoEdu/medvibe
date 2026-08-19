"use client";

import type { ReactNode } from "react";
import { useContent } from "@/contexts/ContentContext";
import type { ContentBundle } from "@/contexts/ContentContext";
import styles from "./ContentGate.module.css";

/**
 * Muestra `children(content)` una vez que el contenido llegó de /api/content;
 * mientras tanto muestra un estado de carga o de error. Úsalo en cada página
 * que necesite el banco de preguntas/flashcards/nemotecnias/tablas en vez de
 * importar `@/content` directamente.
 */
export default function ContentGate({ children }: { children: (content: ContentBundle) => ReactNode }) {
  const { content, loading, error } = useContent();

  if (loading) {
    return (
      <div className={styles.state}>
        <p className={styles.loading}>Cargando contenido…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.state}>
        <p className={styles.error}>⚠️ {error}</p>
      </div>
    );
  }

  if (!content) return null;

  return <>{children(content)}</>;
}
