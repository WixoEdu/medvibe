"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./Sidebar.module.css";

const LINKS = [
  { href: "/", label: "Inicio", icon: "🏠" },
  { href: "/quiz", label: "Quiz", icon: "📝" },
  { href: "/flashcards", label: "Flashcards", icon: "🃏" },
  { href: "/juegos", label: "Juegos", icon: "🎮" },
  { href: "/nemotecnias", label: "Nemotecnias", icon: "🧠" },
  { href: "/tablas", label: "Tablas", icon: "📊" },
  { href: "/plan-15-dias", label: "Plan 15 días", icon: "🗓️" },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();

  const links = user
    ? [
        ...LINKS,
        { href: "/comentarios", label: "Comentarios", icon: "💬" },
        ...(isAdmin ? [{ href: "/admin", label: "Admin", icon: "🛠️" }] : []),
      ]
    : LINKS;

  return (
    <>
      {open && <div className={styles.scrim} onClick={onClose} aria-hidden="true" />}
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
        <Link href="/" className={styles.brand} onClick={onClose}>
          <span className={styles.brandMark} aria-hidden="true">
            ⚕️
          </span>
          <span className={styles.brandText}>
            MedVibe
            <span className={styles.brandSub}>Oposición Guatemala</span>
          </span>
        </Link>
        <nav className={styles.nav} aria-label="Navegación principal">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.link} ${active ? styles.linkActive : ""}`}
                onClick={onClose}
              >
                <span className={styles.linkIcon} aria-hidden="true">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
