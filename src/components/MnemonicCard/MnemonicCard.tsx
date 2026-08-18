import type { Mnemonic } from "@/types/content";
import { getTopic } from "@/content";
import TopicBadge from "@/components/ui/TopicBadge";
import SourceTag from "@/components/ui/SourceTag";
import styles from "./MnemonicCard.module.css";

export default function MnemonicCard({ mnemonic }: { mnemonic: Mnemonic }) {
  const topic = getTopic(mnemonic.topicId);
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        {topic && <TopicBadge topic={topic} />}
        <span className={styles.subtopic}>{mnemonic.subtopic}</span>
      </div>
      <span className={styles.cardTitle}>{mnemonic.title}</span>
      <span className={styles.keyword}>{mnemonic.keyword}</span>
      <div className={styles.breakdownList}>
        {mnemonic.breakdown.map((b, i) => (
          <div key={i} className={styles.breakdownRow}>
            <span className={styles.breakdownLetter}>{b.letter}</span>
            <span>{b.meaning}</span>
          </div>
        ))}
      </div>
      <p className={styles.usage}>{mnemonic.usage}</p>
      <SourceTag source={mnemonic.source} />
    </div>
  );
}
