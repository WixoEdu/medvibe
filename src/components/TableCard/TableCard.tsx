import type { ReferenceTable, Topic } from "@/types/content";
import TopicBadge from "@/components/ui/TopicBadge";
import SourceTag from "@/components/ui/SourceTag";
import styles from "./TableCard.module.css";

export default function TableCard({ table, topic }: { table: ReferenceTable; topic?: Topic }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        {topic && <TopicBadge topic={topic} />}
        <span className={styles.subtopic}>{table.subtopic}</span>
      </div>
      <div className={styles.cardTitle}>{table.title}</div>
      {table.description && <p className={styles.description}>{table.description}</p>}
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {table.columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SourceTag source={table.source} />
    </div>
  );
}
