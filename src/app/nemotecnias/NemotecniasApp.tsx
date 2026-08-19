"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { TopicId } from "@/types/content";
import MnemonicCard from "@/components/MnemonicCard/MnemonicCard";
import ContentGate from "@/components/ui/ContentGate";
import type { ContentBundle } from "@/contexts/ContentContext";
import styles from "./nemotecnias.module.css";

export default function NemotecniasApp() {
  return <ContentGate>{(content) => <NemotecniasInner content={content} />}</ContentGate>;
}

function NemotecniasInner({ content }: { content: ContentBundle }) {
  const searchParams = useSearchParams();
  const presetTopic = searchParams.get("tema") as TopicId | null;
  const getTopic = (id: string) => content.topics.find((t) => t.id === id);
  const [filter, setFilter] = useState<TopicId | "todos">(
    presetTopic && getTopic(presetTopic) ? presetTopic : "todos"
  );

  const items = useMemo(
    () => (filter === "todos" ? content.mnemonics : content.mnemonics.filter((m) => m.topicId === filter)),
    [content.mnemonics, filter]
  );

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>Nemotecnias clave</h1>
        <p className={styles.subtitle}>
          Reglas mnemotécnicas para recordar listas y criterios que suelen aparecer en el examen. Cada una
          incluye la fuente de referencia.
        </p>
      </header>

      <div className={styles.pillRow}>
        <button
          type="button"
          className={`${styles.pillButton} ${filter === "todos" ? styles.pillButtonActive : ""}`}
          onClick={() => setFilter("todos")}
        >
          Todos ({content.mnemonics.length})
        </button>
        {content.topics.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`${styles.pillButton} ${filter === t.id ? styles.pillButtonActive : ""}`}
            onClick={() => setFilter(t.id)}
          >
            {t.icon} {t.shortName}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {items.map((m) => (
          <MnemonicCard key={m.id} mnemonic={m} topic={getTopic(m.topicId)} />
        ))}
      </div>
    </div>
  );
}
