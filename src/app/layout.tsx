import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import AppShell from "@/components/AppShell/AppShell";
import { AuthProvider } from "@/contexts/AuthContext";
import { ContentProvider } from "@/contexts/ContentContext";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedVibe — Estudia para tu oposición de residencia médica",
  description:
    "App de estudio para el Examen de Oposición Nacional de Primera Especialidad de Medicina en Guatemala: quiz, flashcards, juegos, nemotecnias y tablas de valores con fuentes citadas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body>
        <AuthProvider>
          <ContentProvider>
            <AppShell>{children}</AppShell>
          </ContentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
