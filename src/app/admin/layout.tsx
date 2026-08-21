import type { Metadata } from "next";
import Link from "next/link";
import AdminGate from "@/components/AdminGate/AdminGate";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: "Administración | MedVibe",
};

const ADMIN_LINKS = [
  { href: "/admin", label: "Resumen", icon: "📊" },
  { href: "/admin/usuarios", label: "Usuarios", icon: "👥" },
  { href: "/admin/comentarios", label: "Comentarios y reportes", icon: "💬" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGate>
      <div>
        <nav className={styles.subnav} aria-label="Navegación de administración">
          {ADMIN_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={styles.subnavLink}>
              <span aria-hidden="true">{l.icon}</span> {l.label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </AdminGate>
  );
}
