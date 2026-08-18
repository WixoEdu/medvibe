"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ALL_FLASHCARDS, TOPICS } from "@/content";
import type { TopicId } from "@/types/content";
import { sample, shuffle } from "@/lib/shuffle";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { STORAGE_KEYS, EMPTY_GAME_SCORES, type GameScores } from "@/lib/storageKeys";
import styles from "./memoria.module.css";

const PAIR_COUNT = 6;

interface Tile {
  key: string;
  pairId: string;
  text: string;
  kind: "front" | "back";
}

type Stage = "config" | "playing" | "done";

export default function MemoriaGame() {
  const [stage, setStage] = useState<Stage>("config");
  const [topic, setTopic] = useState<TopicId | "todos">("todos");
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [flippedKeys, setFlippedKeys] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [busy, setBusy] = useState(false);
  const [scores, setScores] = useLocalStorage<GameScores>(STORAGE_KEYS.gameScores, EMPTY_GAME_SCORES);

  const pool = useMemo(
    () => (topic === "todos" ? ALL_FLASHCARDS : ALL_FLASHCARDS.filter((f) => f.topicId === topic)),
    [topic]
  );

  function startGame() {
    const pairs = sample(pool, Math.min(PAIR_COUNT, pool.length));
    const newTiles: Tile[] = shuffle(
      pairs.flatMap((card) => [
        { key: `${card.id}-front`, pairId: card.id, text: card.front, kind: "front" as const },
        { key: `${card.id}-back`, pairId: card.id, text: card.back, kind: "back" as const },
      ])
    );
    setTiles(newTiles);
    setFlippedKeys([]);
    setMatchedPairIds([]);
    setMoves(0);
    setStage("playing");
  }

  function flipTile(tile: Tile) {
    if (busy || flippedKeys.includes(tile.key) || matchedPairIds.includes(tile.pairId)) return;

    const nextFlipped = [...flippedKeys, tile.key];
    setFlippedKeys(nextFlipped);

    if (nextFlipped.length === 2) {
      setBusy(true);
      setMoves((m) => m + 1);
      const [firstKey, secondKey] = nextFlipped;
      const first = tiles.find((t) => t.key === firstKey)!;
      const second = tiles.find((t) => t.key === secondKey)!;

      if (first.pairId === second.pairId) {
        const nextMatched = [...matchedPairIds, first.pairId];
        setTimeout(() => {
          setMatchedPairIds(nextMatched);
          setFlippedKeys([]);
          setBusy(false);
          if (nextMatched.length === tiles.length / 2) {
            const best = scores.memoria[0];
            if (best === undefined || moves + 1 < best) {
              setScores((prev) => ({
                ...prev,
                memoria: [moves + 1, ...prev.memoria].sort((a, b) => a - b).slice(0, 5),
              }));
            }
            setStage("done");
          }
        }, 500);
      } else {
        setTimeout(() => {
          setFlippedKeys([]);
          setBusy(false);
        }, 900);
      }
    }
  }

  const bestScore = scores.memoria[0];

  if (stage === "config") {
    return (
      <div>
        <header className={styles.pageHeader}>
          <Link href="/juegos" style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
            ← Volver a juegos
          </Link>
          <h1 className={styles.title}>🧩 Memoria</h1>
          <p className={styles.subtitle}>
            Encuentra las {PAIR_COUNT} parejas de concepto-definición con el menor número de movimientos
            posible.
          </p>
        </header>
        <div className={styles.controlsRow}>
          <div className={styles.pillRow}>
            <button
              type="button"
              className={`${styles.pillButton} ${topic === "todos" ? styles.pillButtonActive : ""}`}
              onClick={() => setTopic("todos")}
            >
              Todos los temas
            </button>
            {TOPICS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`${styles.pillButton} ${topic === t.id ? styles.pillButtonActive : ""}`}
                onClick={() => setTopic(t.id)}
              >
                {t.icon} {t.shortName}
              </button>
            ))}
          </div>
        </div>
        {bestScore !== undefined && (
          <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginBottom: "1rem" }}>
            🏆 Tu mejor puntaje: {bestScore} movimientos
          </p>
        )}
        <button type="button" className={styles.startButton} onClick={startGame}>
          Jugar →
        </button>
      </div>
    );
  }

  if (stage === "playing") {
    return (
      <div>
        <div className={styles.controlsRow}>
          <div className={styles.statsRow}>
            <span>Movimientos: {moves}</span>
            <span>
              Parejas: {matchedPairIds.length}/{tiles.length / 2}
            </span>
          </div>
        </div>
        <div className={styles.board}>
          {tiles.map((tile) => {
            const isFlipped = flippedKeys.includes(tile.key) || matchedPairIds.includes(tile.pairId);
            const isMatched = matchedPairIds.includes(tile.pairId);
            return (
              <div key={tile.key} className={styles.tileScene}>
                <div
                  className={`${styles.tile} ${isFlipped ? styles.tileFlipped : ""} ${
                    isMatched ? styles.tileMatched : ""
                  }`}
                  onClick={() => flipTile(tile)}
                >
                  <div className={`${styles.tileFace} ${styles.tileFaceDown}`}>❓</div>
                  <div className={`${styles.tileFace} ${styles.tileFaceUp}`}>{tile.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.summaryCard}>
      <div className={styles.summaryValue}>{moves}</div>
      <p className={styles.summaryLabel}>movimientos para completar el tablero</p>
      {bestScore !== undefined && (
        <p className={styles.summaryLabel}>🏆 Mejor puntaje guardado: {bestScore}</p>
      )}
      <button type="button" className={styles.startButton} style={{ marginTop: "1.2rem" }} onClick={() => setStage("config")}>
        🔁 Jugar otra vez
      </button>
    </div>
  );
}
