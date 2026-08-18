import type { Topic } from "@/types/content";
import styles from "./TopicBadge.module.css";

export default function TopicBadge({ topic }: { topic: Topic }) {
  return (
    <span
      className={styles.badge}
      style={{ background: `${topic.color}1a`, color: topic.color }}
    >
      <span aria-hidden="true">{topic.icon}</span>
      {topic.shortName}
    </span>
  );
}
