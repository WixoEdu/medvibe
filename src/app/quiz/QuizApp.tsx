"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ALL_QUESTIONS, TOPICS, getTopic } from "@/content";
import type { QuizQuestion, TopicId } from "@/types/content";
import { shuffle } from "@/lib/shuffle";
import { useQuizHistory } from "@/lib/progress/useQuizHistory";
import SourceTag from "@/components/ui/SourceTag";
import TopicBadge from "@/components/ui/TopicBadge";
import styles from "./quiz.module.css";

const OPTION_LETTERS = ["A", "B", "C", "D"];
const COUNT_OPTIONS = [10, 20, 30];
const SECONDS_PER_QUESTION_EXAM = 72; // ritmo aproximado ENAM (~1.2 min/pregunta)

type Mode = "practica" | "examen";
type Stage = "config" | "session" | "results";

interface Answer {
  question: QuizQuestion;
  selectedIndex: number | null;
}

export default function QuizApp() {
  const searchParams = useSearchParams();
  const presetTopic = searchParams.get("tema") as TopicId | null;

  const [stage, setStage] = useState<Stage>("config");
  const [selectedTopics, setSelectedTopics] = useState<TopicId[]>(
    presetTopic && getTopic(presetTopic) ? [presetTopic] : TOPICS.map((t) => t.id)
  );
  const [count, setCount] = useState(10);
  const [mode, setMode] = useState<Mode>("practica");

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const { addAttempt } = useQuizHistory();

  const pool = useMemo(
    () => ALL_QUESTIONS.filter((q) => selectedTopics.includes(q.topicId)),
    [selectedTopics]
  );

  function toggleTopic(id: TopicId) {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function startQuiz() {
    const picked = shuffle(pool).slice(0, Math.min(count, pool.length));
    setQuestions(picked);
    setAnswers([]);
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setSecondsLeft(picked.length * SECONDS_PER_QUESTION_EXAM);
    setStage("session");
  }

  const currentQuestion = questions[index];

  function finishQuiz(finalAnswers: Answer[]) {
    const correct = finalAnswers.filter(
      (a) => a.selectedIndex !== null && a.selectedIndex === a.question.correctIndex
    ).length;
    addAttempt({
      topicId: selectedTopics.length === 1 ? selectedTopics[0] : "mixto",
      total: finalAnswers.length,
      correct,
      mode,
    });
    setAnswers(finalAnswers);
    setStage("results");
  }

  useEffect(() => {
    if (stage !== "session" || mode !== "examen") return;
    if (secondsLeft <= 0) {
      // Se difiere con setTimeout para no despachar setState de forma
      // síncrona dentro del cuerpo del efecto.
      const t0 = setTimeout(() => finishQuiz(answers), 0);
      return () => clearTimeout(t0);
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, mode, secondsLeft]);

  function selectOption(i: number) {
    if (revealed) return;
    setSelected(i);
    if (mode === "practica") {
      setRevealed(true);
    }
  }

  function goNext() {
    const finalAnswers = [...answers, { question: currentQuestion, selectedIndex: selected }];
    setAnswers(finalAnswers);
    setSelected(null);
    setRevealed(false);
    if (index + 1 >= questions.length) {
      finishQuiz(finalAnswers);
    } else {
      setIndex(index + 1);
    }
  }

  function restart() {
    setStage("config");
  }

  if (stage === "config") {
    return (
      <div>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>Quiz estilo caso clínico</h1>
          <p className={styles.subtitle}>
            Preguntas de opción múltiple con retroalimentación y fuente citada, al estilo de reactivos del
            Examen de Oposición Nacional. Elige tus temas, cantidad y modo de práctica.
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
            {selectedTopics.length === 0 && (
              <span className={styles.warnText}>Selecciona al menos un área.</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <span className={styles.fieldLabel}>Cantidad de preguntas</span>
            <div className={styles.pillRow}>
              {COUNT_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`${styles.pillButton} ${count === c ? styles.pillButtonActive : ""}`}
                  onClick={() => setCount(c)}
                >
                  {c}
                </button>
              ))}
              <button
                type="button"
                className={`${styles.pillButton} ${count >= pool.length ? styles.pillButtonActive : ""}`}
                onClick={() => setCount(pool.length)}
              >
                Todas ({pool.length})
              </button>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <span className={styles.fieldLabel}>Modo</span>
            <div className={styles.pillRow}>
              <button
                type="button"
                className={`${styles.pillButton} ${mode === "practica" ? styles.pillButtonActive : ""}`}
                onClick={() => setMode("practica")}
              >
                📖 Práctica (feedback inmediato)
              </button>
              <button
                type="button"
                className={`${styles.pillButton} ${mode === "examen" ? styles.pillButtonActive : ""}`}
                onClick={() => setMode("examen")}
              >
                ⏱️ Examen (contrarreloj, feedback al final)
              </button>
            </div>
          </div>

          <button
            type="button"
            className={styles.startButton}
            disabled={selectedTopics.length === 0 || pool.length === 0}
            onClick={startQuiz}
          >
            Comenzar quiz →
          </button>
        </div>
      </div>
    );
  }

  if (stage === "session" && currentQuestion) {
    const topic = getTopic(currentQuestion.topicId);
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return (
      <div>
        <div className={styles.sessionTopBar}>
          <span className={styles.progressText}>
            Pregunta {index + 1} de {questions.length}
          </span>
          {mode === "examen" && (
            <span className={`${styles.timer} ${secondsLeft < 60 ? styles.timerLow : ""}`}>
              ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          )}
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${(index / questions.length) * 100}%` }}
          />
        </div>

        <div className={styles.questionCard}>
          <div className={styles.questionMeta}>
            {topic && <TopicBadge topic={topic} />}
            <span className={styles.subtopicTag}>{currentQuestion.subtopic}</span>
          </div>
          <p className={styles.stem}>{currentQuestion.stem}</p>
          <div className={styles.options}>
            {currentQuestion.options.map((opt, i) => {
              let optionClass = styles.option;
              if (revealed) {
                if (i === currentQuestion.correctIndex) optionClass += ` ${styles.optionCorrect}`;
                else if (i === selected) optionClass += ` ${styles.optionIncorrect}`;
              } else if (i === selected) {
                optionClass += ` ${styles.optionSelected}`;
              }
              return (
                <button
                  key={i}
                  type="button"
                  className={optionClass}
                  onClick={() => selectOption(i)}
                  disabled={mode === "practica" && revealed}
                >
                  <span className={styles.optionLetter}>{OPTION_LETTERS[i]}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {revealed && (
            <div className={styles.feedback}>
              <p
                className={`${styles.feedbackHeading} ${
                  selected === currentQuestion.correctIndex ? styles.correctHeading : styles.incorrectHeading
                }`}
              >
                {selected === currentQuestion.correctIndex ? "✅ ¡Correcto!" : "❌ Incorrecto"}
              </p>
              <p style={{ marginBottom: "0.6rem" }}>{currentQuestion.explanation}</p>
              <SourceTag source={currentQuestion.source} />
            </div>
          )}

          <div className={styles.actionsRow}>
            {mode === "practica" ? (
              <button type="button" className={styles.nextButton} onClick={goNext} disabled={!revealed}>
                {index + 1 >= questions.length ? "Ver resultados" : "Siguiente →"}
              </button>
            ) : (
              <button type="button" className={styles.nextButton} onClick={goNext} disabled={selected === null}>
                {index + 1 >= questions.length ? "Terminar examen" : "Siguiente →"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Resultados
  const correctCount = answers.filter(
    (a) => a.selectedIndex !== null && a.selectedIndex === a.question.correctIndex
  ).length;
  const pct = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;

  return (
    <div>
      <div className={styles.resultsCard}>
        <div className={styles.scoreValue}>{pct}%</div>
        <p className={styles.scoreLabel}>
          {correctCount} de {answers.length} respuestas correctas
        </p>
        <div className={styles.resultsActions}>
          <button type="button" className={styles.nextButton} onClick={restart}>
            🔁 Nuevo quiz
          </button>
        </div>

        <div className={styles.reviewList}>
          {answers.map((a, i) => {
            const ok = a.selectedIndex === a.question.correctIndex;
            return (
              <div key={a.question.id} className={styles.reviewItem}>
                <div className={`${styles.reviewItemHead} ${ok ? styles.reviewOk : styles.reviewBad}`}>
                  {ok ? "✅" : "❌"} Pregunta {i + 1}
                </div>
                <p className={styles.reviewStem}>{a.question.stem}</p>
                <p className={styles.reviewAnswer}>
                  <strong>Tu respuesta: </strong>
                  {a.selectedIndex !== null ? a.question.options[a.selectedIndex] : "Sin responder"}
                </p>
                {!ok && (
                  <p className={styles.reviewAnswer}>
                    <strong>Respuesta correcta: </strong>
                    {a.question.options[a.question.correctIndex]}
                  </p>
                )}
                <p className={styles.reviewAnswer}>{a.question.explanation}</p>
                <SourceTag source={a.question.source} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
