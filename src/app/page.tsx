import Link from "next/link";
import { TOPICS } from "@/content";
import ProgressSummary from "@/components/ProgressSummary/ProgressSummary";
import styles from "./page.module.css";

const FEATURES = [
  {
    icon: "📝",
    title: "Quiz estilo caso clínico",
    desc: "Preguntas de opción múltiple con retroalimentación inmediata y la fuente de cada respuesta.",
    href: "/quiz",
  },
  {
    icon: "🃏",
    title: "Flashcards con repetición espaciada",
    desc: "Sistema de cajas Leitner: repasa más lo que menos dominas.",
    href: "/flashcards",
  },
  {
    icon: "🎮",
    title: "Juegos de estudio",
    desc: "Memoria, Contrarreloj y Ahorcado médico para repasar sin aburrirte.",
    href: "/juegos",
  },
  {
    icon: "🧠",
    title: "Nemotecnias clave",
    desc: "Las reglas mnemotécnicas más usadas, organizadas por tema.",
    href: "/nemotecnias",
  },
  {
    icon: "📊",
    title: "Tablas de valores importantes",
    desc: "Valores normales, escalas y clasificaciones que más se preguntan.",
    href: "/tablas",
  },
];

export default function Home() {
  return (
    <div>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>🇬🇹 Examen de Oposición Nacional de Primera Especialidad de Medicina</span>
        <h1 className={styles.title}>Prepárate para tu residencia médica en Guatemala</h1>
        <p className={styles.subtitle}>
          MedVibe organiza tu estudio por las áreas troncales del examen: Medicina Interna, Cirugía,
          Pediatría, Ginecología-Obstetricia y Salud Pública. Practica con quiz, flashcards, juegos y
          nemotecnias — cada dato incluye de dónde se obtuvo.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/quiz" className={styles.ctaPrimary}>
            🚀 Empezar un quiz
          </Link>
          <Link href="/flashcards" className={styles.ctaSecondary}>
            🃏 Repasar flashcards
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Tu progreso</h2>
        </div>
        <ProgressSummary />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Áreas del examen</h2>
          <span className={styles.sectionHint}>Distribución referencial sobre 180 preguntas</span>
        </div>
        <div className={styles.topicGrid}>
          {TOPICS.map((topic) => {
            const pct = Math.round((topic.examWeight.questions / topic.examWeight.totalQuestions) * 100);
            return (
              <Link key={topic.id} href={`/temas/${topic.id}`} className={styles.topicCard}>
                <div className={styles.topicCardHead}>
                  <span className={styles.topicIcon} aria-hidden="true">
                    {topic.icon}
                  </span>
                  <span className={styles.topicName}>{topic.name}</span>
                </div>
                <p className={styles.topicDesc}>{topic.description}</p>
                <div className={styles.weightBarTrack}>
                  <div
                    className={styles.weightBarFill}
                    style={{ width: `${pct}%`, background: topic.color }}
                  />
                </div>
                <p className={styles.weightLabel}>
                  ~{topic.examWeight.questions} de {topic.examWeight.totalQuestions} preguntas ({pct}%)
                </p>
              </Link>
            );
          })}
        </div>
        <p className={styles.blueprintNote}>
          La distribución es una referencia orientativa basada en la estructura típica de exámenes
          nacionales de residencia con áreas equivalentes. Confírmala siempre contra la guía oficial del
          año en curso publicada por la Facultad de Ciencias Médicas – USAC.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Cómo estudiar con MedVibe</h2>
        </div>
        <div className={styles.featureGrid}>
          {FEATURES.map((f) => (
            <Link key={f.href} href={f.href} className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden="true">
                {f.icon}
              </span>
              <span className={styles.featureTitle}>{f.title}</span>
              <span className={styles.featureDesc}>{f.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
