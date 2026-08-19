import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import AuthGate from "@/components/AuthGate/AuthGate";
import { AuthProvider } from "@/contexts/AuthContext";
import { ContentProvider } from "@/contexts/ContentContext";
import "./globals.css";
import styles from "./layout.module.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedVibe — Estudia para tu oposición de residencia médica",
  description:
    "App de estudio para el Examen de Oposición Nacional de Primera Especialidad de Medicina en Guatemala: quiz, flashcards, juegos, nemotecnias y tablas de valores con fuentes citadas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <AuthProvider>
          <ContentProvider>
            <Navbar />
            <main className={styles.main}>
              <AuthGate>{children}</AuthGate>
            </main>
            <footer className={styles.footer}>
              <p>
                MedVibe · Material de apoyo para el Examen de Oposición Nacional de Primera Especialidad de
                Medicina (Guatemala). No sustituye las guías oficiales de la Facultad de Ciencias Médicas –
                USAC ni la bibliografía de tu programa de estudio.
              </p>
            </footer>
          </ContentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
