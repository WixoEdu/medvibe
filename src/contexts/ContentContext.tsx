"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/lib/supabase/client";
import type { Topic, QuizQuestion, Flashcard, Mnemonic, ReferenceTable } from "@/types/content";
// Importar el tipo (no el arreglo de datos) es seguro: TypeScript borra los
// `type`-imports al compilar, así que esto no mete las palabras del ahorcado
// en el bundle del cliente.
import type { HangmanWord } from "@/content/games/hangmanWords";

export interface ContentBundle {
  topics: Topic[];
  questions: QuizQuestion[];
  flashcards: Flashcard[];
  mnemonics: Mnemonic[];
  tables: ReferenceTable[];
  hangmanWords: HangmanWord[];
}

interface ContentContextValue {
  content: ContentBundle | null;
  loading: boolean;
  error: string | null;
}

const ContentContext = createContext<ContentContextValue>({ content: null, loading: true, error: null });

/**
 * Trae el contenido de estudio desde /api/content (protegido por sesión) y
 * lo cachea en memoria mientras dura la sesión del usuario. Nunca importa
 * `@/content` directamente — todo el contenido llega por fetch autenticado.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const { user, authAvailable } = useAuth();
  const [content, setContent] = useState<ContentBundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sin Supabase configurado no existe sistema de cuentas: /api/content sirve
  // el contenido abiertamente en ese caso (ver comentario en route.ts), así
  // que aquí también pedimos el contenido sin esperar una sesión.
  const canFetch = user || !authAvailable;

  useEffect(() => {
    if (!canFetch) {
      // Se difiere con setTimeout para no despachar setState de forma
      // síncrona dentro del cuerpo del efecto.
      const t0 = setTimeout(() => {
        setContent(null);
        setError(null);
        setLoading(false);
      }, 0);
      return () => clearTimeout(t0);
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);

      let headers: HeadersInit | undefined;
      if (user) {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (cancelled) return;
        if (!session) {
          setLoading(false);
          return;
        }
        headers = { Authorization: `Bearer ${session.access_token}` };
      }

      try {
        const res = await fetch("/api/content", { headers });
        if (cancelled) return;
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? `No se pudo cargar el contenido (${res.status}).`);
        }
        const data = (await res.json()) as ContentBundle;
        if (!cancelled) setContent(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Error desconocido al cargar el contenido.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, canFetch]);

  return <ContentContext.Provider value={{ content, loading, error }}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
