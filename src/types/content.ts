/**
 * Esquema central de contenido de MedVibe.
 *
 * Todo el contenido de estudio (preguntas, flashcards, nemotecnias y tablas)
 * debe pertenecer a uno de los TOPIC_IDS definidos abajo. Este es el
 * "temario cerrado" de MedVibe, que cubre dos exámenes distintos del
 * proceso USAC/UNADE (Guatemala):
 *   - Las 5 áreas clínicas del Examen de Oposición Nacional de Primera
 *     Especialidad de Medicina (residencia, para médicos ya graduados):
 *     medicina-interna, cirugia, pediatria, gineco-obstetricia,
 *     salud-publica.
 *   - "ciencias-basicas": la prueba de conocimientos específicos de
 *     Biología y Química para el examen de ADMISIÓN a la Facultad de
 *     Ciencias Médicas (aspirantes, no médicos graduados). Es un examen
 *     distinto, con público distinto — no se mezcla con el temario clínico.
 *
 * Para agregar contenido nuevo:
 *   1. Usa un `topicId` que ya exista en TOPIC_IDS (ver src/content/topics.ts).
 *   2. Nunca inventes un topicId nuevo sin actualizar también topics.ts y
 *      justificar por qué corresponde a uno de los dos temarios oficiales.
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
  "ciencias-basicas",
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
  /**
   * Peso aproximado en el examen, según boletines públicos. Opcional: no
   * todos los exámenes de MedVibe reportan una distribución de preguntas
   * comparable (ej. "ciencias-basicas" es un examen de admisión distinto,
   * sin la misma referencia de 180 preguntas del examen de residencia). Si
   * no aplica, se omite y la UI no muestra la barra de peso.
   */
  examWeight?: {
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

/**
 * Un día del plan de estudio intensivo de 15 días para el examen de
 * admisión (ciencias-basicas). A diferencia de preguntas/flashcards/
 * nemotecnias/tablas, un día del plan es un cronograma de estudio, no una
 * afirmación factual extraída de una fuente — por eso no exige `source`.
 * Igual que el resto del contenido, viaja por el endpoint protegido
 * /api/content, para no filtrar información del temario a un visitante
 * sin sesión.
 */
export interface StudyPlanActivity {
  /** Tipo de actividad, usado para elegir el ícono y el enlace. */
  type: "quiz" | "flashcards" | "tablas" | "nemotecnias" | "repaso" | "simulacro" | "descanso";
  /** Descripción de la actividad concreta a realizar ese día. */
  description: string;
}

export interface StudyPlanDay {
  day: number;
  title: string;
  /** Bloque(s) temático(s) del día, tal como aparecen en `subtopic`. */
  subtopics: string[];
  /** Qué debe lograr el estudiante al terminar el día. */
  goals: string[];
  activities: StudyPlanActivity[];
  /** Minutos estimados de estudio activo para ese día. */
  estimatedMinutes: number;
}
