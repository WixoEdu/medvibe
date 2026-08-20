import type { Source } from "@/types/content";
import styles from "./SourceTag.module.css";

// Algunas fuentes internas (p. ej. los resúmenes CPOEM usados para redactar
// parte del contenido) se guardan en los datos por trazabilidad, pero no se
// muestran al usuario. Se ocultan aquí, en el único lugar por el que pasa
// cualquier fuente antes de llegar a la UI.
function isHiddenSource(label: string): boolean {
  return /CPOEM/i.test(label);
}

export default function SourceTag({ source }: { source: Source }) {
  if (isHiddenSource(source.label)) return null;

  return (
    <p className={styles.tag}>
      <span className={styles.icon} aria-hidden="true">
        📚
      </span>
      <span>
        <span className={styles.label}>Fuente: </span>
        {source.url ? (
          <a className={styles.link} href={source.url} target="_blank" rel="noopener noreferrer">
            {source.label}
          </a>
        ) : (
          source.label
        )}
      </span>
    </p>
  );
}
