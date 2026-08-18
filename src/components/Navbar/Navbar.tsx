"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "/", label: "Inicio", icon: "🏠" },
  { href: "/quiz", label: "Quiz", icon: "📝" },
  { href: "/flashcards", label: "Flashcards", icon: "🃏" },
  { href: "/juegos", label: "Juegos", icon: "🎮" },
  { href: "/nemotecnias", label: "Nemotecnias", icon: "🧠" },
  { href: "/tablas", label: "Tablas", icon: "📊" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark}>⚕️</span>
          MedVibe
          <span className={styles.brandSub}>Oposición Guatemala</span>
        </Link>
        <nav className={styles.nav} aria-label="Navegación principal">
          {LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.link} ${active ? styles.linkActive : ""}`}
              >
                <span aria-hidden="true">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
