import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOPICS, getTopic, mnemonicsByTopic, tablesByTopic, questionsByTopic, flashcardsByTopic } from "@/content";
import MnemonicCard from "@/components/MnemonicCard/MnemonicCard";
import TableCard from "@/components/TableCard/TableCard";
import styles from "./tema.module.css";

export function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  return { title: topic ? `${topic.name} | MedVibe` : "Tema | MedVibe" };
}

export default async function TemaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const mnemonics = mnemonicsByTopic(topic.id);
  const tables = tablesByTopic(topic.id);
  const questionCount = questionsByTopic(topic.id).length;
  const flashcardCount = flashcardsByTopic(topic.id).length;
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
              <MnemonicCard key={m.id} mnemonic={m} />
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
              <TableCard key={t.id} table={t} />
            ))}
          </div>
        ) : (
          <p className={styles.emptyNote}>Aún no hay tablas para esta área.</p>
        )}
      </section>
    </div>
  );
}
