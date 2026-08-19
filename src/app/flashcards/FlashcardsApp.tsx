"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ALL_FLASHCARDS, TOPICS, getTopic } from "@/content";
import type { Flashcard, TopicId } from "@/types/content";
import { useLeitnerState } from "@/lib/progress/useLeitnerState";
import { boxSummary, getEntry, LEITNER_BOXES, sortByPriority } from "@/lib/leitner";
import SourceTag from "@/components/ui/SourceTag";
import styles from "./flashcards.module.css";

type Stage = "config" | "session" | "summary";

export default function FlashcardsApp() {
  const searchParams = useSearchParams();
  const presetTopic = searchParams.get("tema") as TopicId | null;

  const [stage, setStage] = useState<Stage>("config");
  const [selectedTopics, setSelectedTopics] = useState<TopicId[]>(
    presetTopic && getTopic(presetTopic) ? [presetTopic] : TOPICS.map((t) => t.id)
  );
  const { state: leitner, review } = useLeitnerState();

  const [deck, setDeck] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionKnew, setSessionKnew] = useState(0);

  const pool = useMemo(
    () => ALL_FLASHCARDS.filter((f) => selectedTopics.includes(f.topicId)),
    [selectedTopics]
  );

  function toggleTopic(id: TopicId) {
    setSelectedTopics((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  }

  function startSession() {
    setDeck(sortByPriority(pool, leitner));
    setIndex(0);
    setFlipped(false);
    setSessionKnew(0);
    setStage("session");
  }

  const current = deck[index];

  function answer(knewIt: boolean) {
    review(current.id, knewIt);
    if (knewIt) setSessionKnew((s) => s + 1);
    if (index + 1 >= deck.length) {
      setStage("summary");
    } else {
      setIndex(index + 1);
      setFlipped(false);
    }
  }

  if (stage === "config") {
    const distribution = boxSummary(pool.map((c) => c.id), leitner);
    return (
      <div>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>Flashcards con repetición espaciada</h1>
          <p className={styles.subtitle}>
            Sistema de cajas Leitner: si te sabes la tarjeta sube de caja (se repasa menos seguido), si no
            la sabes vuelve a la caja 1. Prioriza siempre lo que menos dominas.
          </p>
        </header>

        <div className={styles.configCard}>
          <div className={styles.fieldGroup}>
            <span className={styles.fieldLabel}>Áreas a incluir</span>
            <div className={styles.topicOptions}>
              {TOPICS.map((topic) => {
                const active = selectedTopics.includes(topic.id);
                return (
                  <label
                    key={topic.id}
                    className={`${styles.topicOption} ${active ? styles.topicOptionActive : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleTopic(topic.id)}
                      style={{ accentColor: topic.color }}
                    />
                    {topic.icon} {topic.shortName}
                  </label>
                );
              })}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <span className={styles.fieldLabel}>
              Tu dominio actual ({pool.length} tarjetas seleccionadas)
            </span>
            <div className={styles.boxSummary}>
              {distribution.map((count, i) => (
                <div key={i} className={styles.boxBarWrap}>
                  <div
                    className={styles.boxBar}
                    style={{ height: `${pool.length ? (count / pool.length) * 100 : 0}%` }}
                    title={`Caja ${i + 1}: ${count} tarjetas`}
                  />
                  <span className={styles.boxBarLabel}>C{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={styles.startButton}
            disabled={pool.length === 0}
            onClick={startSession}
          >
            Repasar {pool.length} tarjetas →
          </button>
        </div>
      </div>
    );
  }

  if (stage === "session" && current) {
    const topic = getTopic(current.topicId);
    const box = getEntry(leitner, current.id).box;
    return (
      <div>
        <div className={styles.sessionTopBar}>
          <span className={styles.progressText}>
            Tarjeta {index + 1} de {deck.length}
          </span>
          <span className={styles.boxTag}>Caja {box}/{LEITNER_BOXES}</span>
        </div>

        <div className={styles.cardScene}>
          <div
            className={`${styles.card} ${flipped ? styles.cardFlipped : ""}`}
            onClick={() => setFlipped((f) => !f)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f);
            }}
          >
            <div className={styles.cardFace}>
              <span className={styles.cardEyebrow}>{topic?.name} · {current.subtopic}</span>
              <p className={styles.cardContent}>{current.front}</p>
              <span className={styles.cardHint}>👆 Toca la tarjeta para ver la respuesta</span>
            </div>
            <div className={`${styles.cardFace} ${styles.cardFaceBack}`}>
              <span className={styles.cardEyebrow}>Respuesta</span>
              <p className={styles.cardContent}>{current.back}</p>
              <SourceTag source={current.source} />
            </div>
          </div>
        </div>

        {flipped ? (
          <div className={styles.answerRow}>
            <button type="button" className={styles.dontKnowButton} onClick={() => answer(false)}>
              😕 No lo sabía
            </button>
            <button type="button" className={styles.knowButton} onClick={() => answer(true)}>
              ✅ Lo sabía
            </button>
          </div>
        ) : (
          <p className={styles.flipHint}>Voltea la tarjeta antes de calificarte.</p>
        )}
      </div>
    );
  }

  return (
    <div className={styles.summaryCard}>
      <div className={styles.summaryValue}>
        {sessionKnew}/{deck.length}
      </div>
      <p className={styles.summaryLabel}>tarjetas que ya dominabas en esta sesión</p>
      <div className={styles.resultsActions}>
        <button type="button" className={styles.startButton} onClick={() => setStage("config")}>
          🔁 Repasar otra vez
        </button>
      </div>
    </div>
  );
}
