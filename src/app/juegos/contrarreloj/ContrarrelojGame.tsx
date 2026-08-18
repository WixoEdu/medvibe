"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ALL_QUESTIONS } from "@/content";
import type { QuizQuestion } from "@/types/content";
import { shuffle } from "@/lib/shuffle";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { STORAGE_KEYS, EMPTY_GAME_SCORES, type GameScores } from "@/lib/storageKeys";
import styles from "./contrarreloj.module.css";

const STARTING_LIVES = 3;
const SECONDS_PER_QUESTION = 15;

type Stage = "config" | "playing" | "done";

export default function ContrarrelojGame() {
  const [stage, setStage] = useState<Stage>("config");
  const [queue, setQueue] = useState<QuizQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [lives, setLives] = useState(STARTING_LIVES);
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_QUESTION);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [scores, setScores] = useLocalStorage<GameScores>(STORAGE_KEYS.gameScores, EMPTY_GAME_SCORES);

  const current = queue[qIndex];
  const bestScore = useMemo(() => Math.max(0, ...scores.contrarreloj), [scores.contrarreloj]);

  function startGame() {
    setQueue(shuffle(ALL_QUESTIONS));
    setQIndex(0);
    setLives(STARTING_LIVES);
    setScore(0);
    setSecondsLeft(SECONDS_PER_QUESTION);
    setSelected(null);
    setLocked(false);
    setStage("playing");
  }

  function nextQuestion() {
    let nextIndex = qIndex + 1;
    let nextQueue = queue;
    if (nextIndex >= queue.length) {
      nextQueue = shuffle(ALL_QUESTIONS);
      nextIndex = 0;
      setQueue(nextQueue);
    }
    setQIndex(nextIndex);
    setSecondsLeft(SECONDS_PER_QUESTION);
    setSelected(null);
    setLocked(false);
  }

  function endGame(finalScore: number) {
    if (finalScore > bestScore) {
      setScores((prev) => ({ ...prev, contrarreloj: [finalScore, ...prev.contrarreloj].slice(0, 5) }));
    }
    setStage("done");
  }

  function handleTimeout() {
    setLocked(true);
    const remainingLives = lives - 1;
    setLives(remainingLives);
    setTimeout(() => {
      if (remainingLives <= 0) {
        endGame(score);
      } else {
        nextQuestion();
      }
    }, 900);
  }

  useEffect(() => {
    if (stage !== "playing" || locked) return;
    if (secondsLeft <= 0) {
      // Se difiere con setTimeout para no despachar setState de forma
      // síncrona dentro del cuerpo del efecto.
      const t0 = setTimeout(handleTimeout, 0);
      return () => clearTimeout(t0);
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, secondsLeft, locked]);

  function selectAnswer(i: number) {
    if (locked) return;
    setSelected(i);
    setLocked(true);
    const correct = i === current.correctIndex;
    const nextScore = correct ? score + 1 : score;
    if (correct) setScore(nextScore);
    const remainingLives = correct ? lives : lives - 1;
    if (!correct) setLives(remainingLives);
    setTimeout(() => {
      if (remainingLives <= 0) {
        endGame(nextScore);
      } else {
        nextQuestion();
      }
    }, 900);
  }

  if (stage === "config") {
    return (
      <div>
        <header className={styles.pageHeader}>
          <Link href="/juegos" style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
            ← Volver a juegos
          </Link>
          <h1 className={styles.title}>⏱️ Contrarreloj</h1>
          <p className={styles.subtitle}>
            Tienes {SECONDS_PER_QUESTION} segundos por pregunta y {STARTING_LIVES} vidas. Responde tantas
            preguntas como puedas de todas las áreas del examen antes de perderlas todas.
          </p>
        </header>
        {bestScore > 0 && (
          <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
            🏆 Tu mejor puntaje: {bestScore} respuestas correctas
          </p>
        )}
        <button type="button" className={styles.startButton} onClick={startGame}>
          Jugar →
        </button>
      </div>
    );
  }

  if (stage === "playing" && current) {
    const pct = (secondsLeft / SECONDS_PER_QUESTION) * 100;
    return (
      <div>
        <div className={styles.hud}>
          <div className={styles.hudGroup}>
            <span className={styles.livesRow}>{"❤️".repeat(lives)}{"🖤".repeat(STARTING_LIVES - lives)}</span>
          </div>
          <span className={styles.scoreTag}>Puntaje: {score}</span>
        </div>
        <div className={styles.timerBarTrack}>
          <div
            className={`${styles.timerBarFill} ${pct < 30 ? styles.timerBarFillLow : ""}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className={styles.questionCard}>
          <p className={styles.stem}>{current.stem}</p>
          <div className={styles.options}>
            {current.options.map((opt, i) => {
              let cls = styles.option;
              if (locked) {
                if (i === current.correctIndex) cls += ` ${styles.optionCorrect}`;
                else if (i === selected) cls += ` ${styles.optionIncorrect}`;
              }
              return (
                <button key={i} type="button" className={cls} onClick={() => selectAnswer(i)} disabled={locked}>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.summaryCard}>
      <div className={styles.summaryValue}>{score}</div>
      <p className={styles.summaryLabel}>respuestas correctas antes de quedarte sin vidas</p>
      {bestScore > 0 && <p className={styles.summaryLabel}>🏆 Mejor puntaje guardado: {bestScore}</p>}
      <button type="button" className={styles.startButton} onClick={startGame}>
        🔁 Jugar otra vez
      </button>
    </div>
  );
}
