/**
 * Esquema central de contenido de MedVibe.
 *
 * Todo el contenido de estudio (preguntas, flashcards, nemotecnias y tablas)
 * debe pertenecer a uno de los TOPIC_IDS definidos abajo. Este es el
 * "temario cerrado" que representa las áreas del Examen de Oposición
 * Nacional de Primera Especialidad de Medicina (Guatemala, USAC/UNADE).
 *
 * Para agregar contenido nuevo:
 *   1. Usa un `topicId` que ya exista en TOPIC_IDS (ver src/content/topics.ts).
 *   2. Nunca inventes un topicId nuevo sin actualizar también topics.ts y
 *      justificar por qué corresponde al temario oficial.
 *   3. Todo ítem debe incluir `source` (de dónde se obtuvo la información).
 *
 * `npm run validate-content` verifica automáticamente estas reglas.
 */

export const TOPIC_IDS = [
  "medicina-interna",
  "cirugia",
  "pediatria",
  "gineco-obstetricia",
  "salud-publica",
] as const;

export type TopicId = (typeof TOPIC_IDS)[number];

export interface Topic {
  id: TopicId;
  name: string;
  shortName: string;
  description: string;
  /** Color de acento para la UI (variable CSS). */
  color: string;
  /** Icono (emoji) para vistas compactas. */
  icon: string;
  /** Peso aproximado en el examen ENAM, según boletines públicos. */
  examWeight: {
    questions: number;
    totalQuestions: number;
    source: string;
  };
}

export interface Source {
  /** Nombre corto de la referencia, ej. "Harrison, 21.ª ed." */
  label: string;
  /** URL opcional si la fuente es consultable en línea. */
  url?: string;
}

export type Difficulty = "basico" | "intermedio" | "avanzado";

export interface QuizQuestion {
  id: string;
  topicId: TopicId;
  /** Subtema para filtrar/organizar dentro del área, ej. "Cardiología". */
  subtopic: string;
  difficulty: Difficulty;
  /** Enunciado, puede ser un caso clínico breve (estilo ENAM). */
  stem: string;
  options: [string, string, string, string];
  /** Índice (0-3) de la opción correcta. */
  correctIndex: 0 | 1 | 2 | 3;
  /** Explicación mostrada tras responder. */
  explanation: string;
  source: Source;
}

export interface Flashcard {
  id: string;
  topicId: TopicId;
  subtopic: string;
  front: string;
  back: string;
  source: Source;
}

export interface Mnemonic {
  id: string;
  topicId: TopicId;
  subtopic: string;
  title: string;
  /** La(s) letra(s)/palabra clave de la nemotecnia. */
  keyword: string;
  /** Qué representa cada letra o parte, en orden. */
  breakdown: { letter: string; meaning: string }[];
  /** Para qué sirve / cuándo se usa. */
  usage: string;
  source: Source;
}

export interface ReferenceTable {
  id: string;
  topicId: TopicId;
  subtopic: string;
  title: string;
  description?: string;
  columns: string[];
  rows: string[][];
  source: Source;
}
