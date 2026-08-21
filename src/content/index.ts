import { TOPIC_IDS } from "@/types/content";
import type { Flashcard, Mnemonic, QuizQuestion, ReferenceTable } from "@/types/content";

import { medicinaInternaQuestions } from "./questions/medicina-interna";
import { cirugiaQuestions } from "./questions/cirugia";
import { pediatriaQuestions } from "./questions/pediatria";
import { ginecoObstetriciaQuestions } from "./questions/gineco-obstetricia";
import { saludPublicaQuestions } from "./questions/salud-publica";
import { cienciasBasicasQuestions } from "./questions/ciencias-basicas";

import { medicinaInternaFlashcards } from "./flashcards/medicina-interna";
import { cirugiaFlashcards } from "./flashcards/cirugia";
import { pediatriaFlashcards } from "./flashcards/pediatria";
import { ginecoObstetriciaFlashcards } from "./flashcards/gineco-obstetricia";
import { saludPublicaFlashcards } from "./flashcards/salud-publica";
import { cienciasBasicasFlashcards } from "./flashcards/ciencias-basicas";

import { medicinaInternaMnemonics } from "./mnemonics/medicina-interna";
import { cirugiaMnemonics } from "./mnemonics/cirugia";
import { pediatriaMnemonics } from "./mnemonics/pediatria";
import { ginecoObstetriciaMnemonics } from "./mnemonics/gineco-obstetricia";
import { saludPublicaMnemonics } from "./mnemonics/salud-publica";
import { cienciasBasicasMnemonics } from "./mnemonics/ciencias-basicas";

import { medicinaInternaTables } from "./tables/medicina-interna";
import { cirugiaTables } from "./tables/cirugia";
import { pediatriaTables } from "./tables/pediatria";
import { ginecoObstetriciaTables } from "./tables/gineco-obstetricia";
import { saludPublicaTables } from "./tables/salud-publica";
import { cienciasBasicasTables } from "./tables/ciencias-basicas";

export { TOPICS, getTopic } from "./topics";

/**
 * Punto único de agregación de todo el contenido de estudio.
 *
 * Si agregas un nuevo archivo de contenido, impórtalo y añádelo aquí.
 * `npm run validate-content` valida que todo elemento pertenezca a un
 * topicId reconocido y tenga los campos obligatorios (incluida `source`).
 */
export const ALL_QUESTIONS: QuizQuestion[] = [
  ...medicinaInternaQuestions,
  ...cirugiaQuestions,
  ...pediatriaQuestions,
  ...ginecoObstetriciaQuestions,
  ...saludPublicaQuestions,
  ...cienciasBasicasQuestions,
];

export const ALL_FLASHCARDS: Flashcard[] = [
  ...medicinaInternaFlashcards,
  ...cirugiaFlashcards,
  ...pediatriaFlashcards,
  ...ginecoObstetriciaFlashcards,
  ...saludPublicaFlashcards,
  ...cienciasBasicasFlashcards,
];

export const ALL_MNEMONICS: Mnemonic[] = [
  ...medicinaInternaMnemonics,
  ...cirugiaMnemonics,
  ...pediatriaMnemonics,
  ...ginecoObstetriciaMnemonics,
  ...saludPublicaMnemonics,
  ...cienciasBasicasMnemonics,
];

export const ALL_TABLES: ReferenceTable[] = [
  ...medicinaInternaTables,
  ...cirugiaTables,
  ...pediatriaTables,
  ...ginecoObstetriciaTables,
  ...saludPublicaTables,
  ...cienciasBasicasTables,
];

export function questionsByTopic(topicId: string) {
  return ALL_QUESTIONS.filter((q) => q.topicId === topicId);
}

export function flashcardsByTopic(topicId: string) {
  return ALL_FLASHCARDS.filter((f) => f.topicId === topicId);
}

export function mnemonicsByTopic(topicId: string) {
  return ALL_MNEMONICS.filter((m) => m.topicId === topicId);
}

export function tablesByTopic(topicId: string) {
  return ALL_TABLES.filter((t) => t.topicId === topicId);
}

const VALID_TOPIC_IDS = new Set<string>(TOPIC_IDS);

export function isValidTopicId(topicId: string): boolean {
  return VALID_TOPIC_IDS.has(topicId);
}
