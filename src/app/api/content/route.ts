import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { TOPICS, ALL_QUESTIONS, ALL_FLASHCARDS, ALL_MNEMONICS, ALL_TABLES } from "@/content";
import { HANGMAN_WORDS } from "@/content/games/hangmanWords";

/**
 * Único punto de entrada por el que el contenido de estudio (preguntas,
 * flashcards, nemotecnias, tablas, palabras de ahorcado) sale del servidor.
 *
 * A propósito, `@/content` NUNCA se importa desde un componente "use client"
 * — solo desde aquí. Así el contenido real nunca viaja al navegador de un
 * visitante sin sesión: no está en el HTML, no está en el bundle de
 * JavaScript, no existe ahí hasta que este endpoint lo entrega.
 *
 * Requiere un token de sesión de Supabase válido en el header
 * `Authorization: Bearer <access_token>`. Se verifica contra el servidor de
 * Supabase (no basta con que el token "se vea" como un JWT) antes de
 * devolver cualquier dato.
 *
 * Excepción: si este despliegue no tiene Supabase configurado en absoluto
 * (sin variables de entorno), no existe ningún sistema de cuentas — en ese
 * caso se sirve el contenido sin exigir token, igual que el resto de la app
 * cae a "modo invitado" cuando Supabase no está configurado, en vez de
 * dejar la app rota o completamente bloqueada.
 */
export const dynamic = "force-dynamic";

function getBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer (.+)$/i);
  return match ? match[1] : null;
}

export async function GET(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const authConfigured = Boolean(supabaseUrl && supabaseAnonKey);

  if (authConfigured) {
    const token = getBearerToken(request);
    if (!token) {
      return NextResponse.json({ error: "No autenticado." }, { status: 401 });
    }

    const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return NextResponse.json({ error: "Sesión inválida o expirada." }, { status: 401 });
    }
  }

  return NextResponse.json(
    {
      topics: TOPICS,
      questions: ALL_QUESTIONS,
      flashcards: ALL_FLASHCARDS,
      mnemonics: ALL_MNEMONICS,
      tables: ALL_TABLES,
      hangmanWords: HANGMAN_WORDS,
    },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
