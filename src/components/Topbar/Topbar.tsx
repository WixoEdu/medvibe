"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./Topbar.module.css";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className={styles.header}>
      <button type="button" className={styles.menuButton} onClick={onMenuClick} aria-label="Abrir menú">
        <span aria-hidden="true">☰</span>
      </button>
      <Link href="/" className={styles.brandMobile}>
        <span className={styles.brandMark} aria-hidden="true">
          ⚕️
        </span>
        MedVibe
      </Link>
      <div className={styles.spacer} />
      <div className={styles.authSection}>
        {!loading &&
          (user ? (
            <>
              <span className={styles.userChip} title={user.email}>
                <span className={styles.userAvatar} aria-hidden="true">
                  👤
                </span>
                <span className={styles.userEmailText}>{user.email}</span>
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
    </header>
  );
}
