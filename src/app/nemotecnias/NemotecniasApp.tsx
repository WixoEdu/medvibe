"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ALL_MNEMONICS, TOPICS, getTopic } from "@/content";
import type { TopicId } from "@/types/content";
import MnemonicCard from "@/components/MnemonicCard/MnemonicCard";
import styles from "./nemotecnias.module.css";

export default function NemotecniasApp() {
  const searchParams = useSearchParams();
  const presetTopic = searchParams.get("tema") as TopicId | null;
  const [filter, setFilter] = useState<TopicId | "todos">(
    presetTopic && getTopic(presetTopic) ? presetTopic : "todos"
  );

  const items = useMemo(
    () => (filter === "todos" ? ALL_MNEMONICS : ALL_MNEMONICS.filter((m) => m.topicId === filter)),
    [filter]
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
          Todos ({ALL_MNEMONICS.length})
        </button>
        {TOPICS.map((t) => (
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
          <MnemonicCard key={m.id} mnemonic={m} />
        ))}
      </div>
    </div>
  );
}
