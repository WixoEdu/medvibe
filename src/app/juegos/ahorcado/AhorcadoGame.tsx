"use client";

import { useState } from "react";
import Link from "next/link";
import type { HangmanWord } from "@/content/games/hangmanWords";
import SourceTag from "@/components/ui/SourceTag";
import ContentGate from "@/components/ui/ContentGate";
import type { ContentBundle } from "@/contexts/ContentContext";
import styles from "./ahorcado.module.css";

const MAX_WRONG = 6;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type Stage = "config" | "playing" | "won" | "lost";

function pickWord(words: HangmanWord[], excludeId?: string): HangmanWord {
  const options = excludeId ? words.filter((w) => w.id !== excludeId) : words;
  return options[Math.floor(Math.random() * options.length)];
}

export default function AhorcadoGame() {
  return <ContentGate>{(content) => <AhorcadoInner content={content} />}</ContentGate>;
}

function AhorcadoInner({ content }: { content: ContentBundle }) {
  const [stage, setStage] = useState<Stage>("config");
  const [current, setCurrent] = useState<HangmanWord | null>(null);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrongCount, setWrongCount] = useState(0);

  function startGame() {
    const word = pickWord(content.hangmanWords, current?.id);
    setCurrent(word);
    setGuessed(new Set());
    setWrongCount(0);
    setStage("playing");
  }

  function guessLetter(letter: string) {
    if (!current || guessed.has(letter)) return;
    const nextGuessed = new Set(guessed).add(letter);
    setGuessed(nextGuessed);

    if (!current.word.includes(letter)) {
      const nextWrong = wrongCount + 1;
      setWrongCount(nextWrong);
      if (nextWrong >= MAX_WRONG) {
        setStage("lost");
      }
      return;
    }

    const solved = current.word.split("").every((ch) => nextGuessed.has(ch));
    if (solved) setStage("won");
  }

  const livesLeft = MAX_WRONG - wrongCount;

  if (stage === "config") {
    return (
      <div>
        <header className={styles.pageHeader}>
          <Link href="/juegos" style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
            ← Volver a juegos
          </Link>
          <h1 className={styles.title}>🔤 Ahorcado médico</h1>
          <p className={styles.subtitle}>
            Adivina el término médico a partir de una pista clínica. Tienes {MAX_WRONG} intentos fallidos
            antes de perder.
          </p>
        </header>
        <button type="button" className={styles.startButton} onClick={startGame}>
          Jugar →
        </button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div>
      <header className={styles.pageHeader}>
        <Link href="/juegos" style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
          ← Volver a juegos
        </Link>
        <h1 className={styles.title}>🔤 Ahorcado médico</h1>
      </header>

      <div className={styles.gameCard}>
        <div className={styles.hud}>
          <span>{"❤️".repeat(Math.max(livesLeft, 0))}{"🖤".repeat(MAX_WRONG - Math.max(livesLeft, 0))}</span>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-text-muted)" }}>
            Intentos fallidos: {wrongCount}/{MAX_WRONG}
          </span>
        </div>

        <p className={styles.hint}>💡 {current.hint}</p>

        <div className={styles.wordRow}>
          {current.word.split("").map((ch, i) => (
            <div key={i} className={styles.letterBox}>
              {guessed.has(ch) || stage === "lost" ? ch : ""}
            </div>
          ))}
        </div>

        {stage === "playing" && (
          <div className={styles.keyboard}>
            {ALPHABET.map((letter) => {
              const used = guessed.has(letter);
              const isCorrect = used && current.word.includes(letter);
              const isWrong = used && !current.word.includes(letter);
              let cls = styles.key;
              if (isCorrect) cls += ` ${styles.keyCorrect}`;
              if (isWrong) cls += ` ${styles.keyIncorrect}`;
              return (
                <button
                  key={letter}
                  type="button"
                  className={cls}
                  disabled={used}
                  onClick={() => guessLetter(letter)}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        )}

        {stage === "won" && (
          <div className={`${styles.resultBanner} ${styles.resultWin}`}>
            🎉 ¡Correcto! La palabra era {current.word}.
          </div>
        )}
        {stage === "lost" && (
          <div className={`${styles.resultBanner} ${styles.resultLose}`}>
            😔 Se acabaron los intentos. La palabra era {current.word}.
          </div>
        )}

        {(stage === "won" || stage === "lost") && (
          <>
            <div style={{ marginTop: "1rem" }}>
              <SourceTag source={current.source} />
            </div>
            <button type="button" className={styles.startButton} onClick={startGame}>
              🔁 Jugar otra vez
            </button>
          </>
        )}
      </div>
    </div>
  );
}
