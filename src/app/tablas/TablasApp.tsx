"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { TopicId } from "@/types/content";
import TableCard from "@/components/TableCard/TableCard";
import ContentGate from "@/components/ui/ContentGate";
import type { ContentBundle } from "@/contexts/ContentContext";
import styles from "./tablas.module.css";

export default function TablasApp() {
  return <ContentGate>{(content) => <TablasInner content={content} />}</ContentGate>;
}

function TablasInner({ content }: { content: ContentBundle }) {
  const searchParams = useSearchParams();
  const presetTopic = searchParams.get("tema") as TopicId | null;
  const getTopic = (id: string) => content.topics.find((t) => t.id === id);
  const [filter, setFilter] = useState<TopicId | "todos">(
    presetTopic && getTopic(presetTopic) ? presetTopic : "todos"
  );

  const items = useMemo(
    () => (filter === "todos" ? content.tables : content.tables.filter((t) => t.topicId === filter)),
    [content.tables, filter]
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
          Todos ({content.tables.length})
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

      <div className={styles.list}>
        {items.map((tbl) => (
          <TableCard key={tbl.id} table={tbl} topic={getTopic(tbl.topicId)} />
        ))}
      </div>
    </div>
  );
}
