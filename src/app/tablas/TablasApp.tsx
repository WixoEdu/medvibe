"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ALL_TABLES, TOPICS, getTopic } from "@/content";
import type { TopicId } from "@/types/content";
import TableCard from "@/components/TableCard/TableCard";
import styles from "./tablas.module.css";

export default function TablasApp() {
  const searchParams = useSearchParams();
  const presetTopic = searchParams.get("tema") as TopicId | null;
  const [filter, setFilter] = useState<TopicId | "todos">(
    presetTopic && getTopic(presetTopic) ? presetTopic : "todos"
  );

  const items = useMemo(
    () => (filter === "todos" ? ALL_TABLES : ALL_TABLES.filter((t) => t.topicId === filter)),
    [filter]
  );

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>Tablas de valores importantes</h1>
        <p className={styles.subtitle}>
          Escalas, clasificaciones y valores normales que más se preguntan en el examen, listos para
          consulta rápida antes de tu práctica.
        </p>
      </header>

      <div className={styles.pillRow}>
        <button
          type="button"
          className={`${styles.pillButton} ${filter === "todos" ? styles.pillButtonActive : ""}`}
          onClick={() => setFilter("todos")}
        >
          Todos ({ALL_TABLES.length})
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

      <div className={styles.list}>
        {items.map((tbl) => (
          <TableCard key={tbl.id} table={tbl} />
        ))}
      </div>
    </div>
  );
}
