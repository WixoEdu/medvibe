"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "/", label: "Inicio", icon: "🏠" },
  { href: "/quiz", label: "Quiz", icon: "📝" },
  { href: "/flashcards", label: "Flashcards", icon: "🃏" },
  { href: "/juegos", label: "Juegos", icon: "🎮" },
  { href: "/nemotecnias", label: "Nemotecnias", icon: "🧠" },
  { href: "/tablas", label: "Tablas", icon: "📊" },
  { href: "/plan-15-dias", label: "Plan 15 días", icon: "🗓️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

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
        <div className={styles.authSection}>
          {!loading &&
            (user ? (
              <>
                <span className={styles.userEmail} title={user.email}>
                  👤 {user.email}
                </span>
                <button type="button" className={styles.signOutButton} onClick={handleSignOut}>
                  Salir
                </button>
              </>
            ) : (
              <Link href="/login" className={styles.loginButton}>
                Iniciar sesión
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
}
