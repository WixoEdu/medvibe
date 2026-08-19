"use client";

import Link from "next/link";
import MnemonicCard from "@/components/MnemonicCard/MnemonicCard";
import TableCard from "@/components/TableCard/TableCard";
import ContentGate from "@/components/ui/ContentGate";
import type { ContentBundle } from "@/contexts/ContentContext";
import styles from "./tema.module.css";

export default function TemaApp({ slug }: { slug: string }) {
  return <ContentGate>{(content) => <TemaInner slug={slug} content={content} />}</ContentGate>;
}

function TemaInner({ slug, content }: { slug: string; content: ContentBundle }) {
  const topic = content.topics.find((t) => t.id === slug);

  if (!topic) {
    return (
      <div className={styles.hero}>
        <Link href="/" className={styles.backLink}>
          ← Todas las áreas
        </Link>
        <p className={styles.emptyNote}>No encontramos esta área del examen.</p>
      </div>
    );
  }

  const mnemonics = content.mnemonics.filter((m) => m.topicId === topic.id);
  const tables = content.tables.filter((t) => t.topicId === topic.id);
  const questionCount = content.questions.filter((q) => q.topicId === topic.id).length;
  const flashcardCount = content.flashcards.filter((f) => f.topicId === topic.id).length;
  const pct = Math.round((topic.examWeight.questions / topic.examWeight.totalQuestions) * 100);

  return (
    <div>
      <section className={styles.hero}>
        <Link href="/" className={styles.backLink}>
          ← Todas las áreas
        </Link>
        <div className={styles.heroHead}>
          <span className={styles.icon} aria-hidden="true">
            {topic.icon}
          </span>
          <h1 className={styles.title}>{topic.name}</h1>
        </div>
        <p className={styles.description}>{topic.description}</p>
        <div>
          <div className={styles.weightBarTrack}>
            <div className={styles.weightBarFill} style={{ width: `${pct}%`, background: topic.color }} />
          </div>
          <p className={styles.weightLabel}>
            ~{topic.examWeight.questions} de {topic.examWeight.totalQuestions} preguntas del examen ({pct}%)
          </p>
        </div>
        <div className={styles.actionsRow}>
          <Link href={`/quiz?tema=${topic.id}`} className={`${styles.actionButton} ${styles.actionButtonPrimary}`}>
            📝 Practicar quiz ({questionCount})
          </Link>
          <Link href={`/flashcards?tema=${topic.id}`} className={styles.actionButton}>
            🃏 Flashcards ({flashcardCount})
          </Link>
          <Link href={`/nemotecnias?tema=${topic.id}`} className={styles.actionButton}>
            🧠 Nemotecnias
          </Link>
          <Link href={`/tablas?tema=${topic.id}`} className={styles.actionButton}>
            📊 Tablas
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>🧠 Nemotecnias de {topic.shortName}</h2>
        </div>
        {mnemonics.length > 0 ? (
          <div className={styles.grid}>
            {mnemonics.map((m) => (
              <MnemonicCard key={m.id} mnemonic={m} topic={topic} />
            ))}
          </div>
        ) : (
          <p className={styles.emptyNote}>Aún no hay nemotecnias para esta área.</p>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>📊 Tablas de {topic.shortName}</h2>
        </div>
        {tables.length > 0 ? (
          <div className={styles.grid}>
            {tables.map((t) => (
              <TableCard key={t.id} table={t} topic={topic} />
            ))}
          </div>
        ) : (
          <p className={styles.emptyNote}>Aún no hay tablas para esta área.</p>
        )}
      </section>
    </div>
  );
}
