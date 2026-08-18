import type { Source } from "@/types/content";
import styles from "./SourceTag.module.css";

export default function SourceTag({ source }: { source: Source }) {
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
