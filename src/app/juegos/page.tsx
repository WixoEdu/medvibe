import Link from "next/link";
import type { Metadata } from "next";
import styles from "./juegos.module.css";

export const metadata: Metadata = {
  title: "Juegos de estudio | MedVibe",
};

const GAMES = [
  {
    href: "/juegos/memoria",
    icon: "🧩",
    name: "Memoria",
    desc: "Encuentra las parejas de concepto-definición. Entrena tu memoria mientras repasas definiciones clave.",
  },
  {
    href: "/juegos/contrarreloj",
    icon: "⏱️",
    name: "Contrarreloj",
    desc: "Responde el mayor número de preguntas antes de que se acabe el tiempo o tus vidas. Ideal para repaso rápido.",
  },
  {
    href: "/juegos/ahorcado",
    icon: "🔤",
    name: "Ahorcado médico",
    desc: "Adivina el término médico letra por letra a partir de una pista clínica.",
  },
];

export default function JuegosPage() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>Juegos de estudio</h1>
        <p className={styles.subtitle}>
          Repasa sin aburrirte. Estos juegos usan el mismo banco de contenido que el quiz y las flashcards,
          así que cada partida refuerza lo que necesitas para tu examen.
        </p>
      </header>

      <div className={styles.grid}>
        {GAMES.map((g) => (
          <Link key={g.href} href={g.href} className={styles.card}>
            <span className={styles.icon} aria-hidden="true">
              {g.icon}
            </span>
            <span className={styles.name}>{g.name}</span>
            <span className={styles.desc}>{g.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
