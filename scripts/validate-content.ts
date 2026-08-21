/**
 * Valida la integridad del contenido de estudio antes de compilar/desplegar.
 *
 * Reglas:
 *  1. Todo `topicId` usado en cualquier ítem debe existir en TOPIC_IDS
 *     (el temario cerrado del examen, ver src/types/content.ts).
 *  2. Todo ítem debe traer una fuente (`source.label`) no vacía.
 *  3. Los IDs de cada colección deben ser únicos.
 *  4. Las preguntas de quiz deben tener exactamente 4 opciones y un
 *     `correctIndex` válido (0-3).
 *
 * Uso: npm run validate-content
 */
import { TOPIC_IDS } from "../src/types/content";
import { ALL_QUESTIONS, ALL_FLASHCARDS, ALL_MNEMONICS, ALL_TABLES } from "../src/content";
import { HANGMAN_WORDS } from "../src/content/games/hangmanWords";
import { STUDY_PLAN } from "../src/content/studyPlan";

const VALID_TOPICS = new Set<string>(TOPIC_IDS);
const errors: string[] = [];

function checkTopic(topicId: string, context: string) {
  if (!VALID_TOPICS.has(topicId)) {
    errors.push(
      `${context}: topicId "${topicId}" no está en el temario oficial (${[...VALID_TOPICS].join(", ")}).`
    );
  }
}

function checkSource(source: { label?: string } | undefined, context: string) {
  if (!source || !source.label || source.label.trim().length === 0) {
    errors.push(`${context}: falta el campo "source.label" (¿de dónde se obtuvo este contenido?).`);
  }
}

function checkUniqueIds(items: { id: string }[], collectionName: string) {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) {
      errors.push(`${collectionName}: id duplicado "${item.id}".`);
    }
    seen.add(item.id);
  }
}

// --- Preguntas de quiz ---
checkUniqueIds(ALL_QUESTIONS, "ALL_QUESTIONS");
for (const q of ALL_QUESTIONS) {
  checkTopic(q.topicId, `Pregunta ${q.id}`);
  checkSource(q.source, `Pregunta ${q.id}`);
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    errors.push(`Pregunta ${q.id}: debe tener exactamente 4 opciones.`);
  }
  if (q.correctIndex < 0 || q.correctIndex > 3) {
    errors.push(`Pregunta ${q.id}: correctIndex fuera de rango (0-3).`);
  }
  if (!q.stem || q.stem.trim().length === 0) {
    errors.push(`Pregunta ${q.id}: falta el enunciado (stem).`);
  }
  if (!q.explanation || q.explanation.trim().length === 0) {
    errors.push(`Pregunta ${q.id}: falta la explicación.`);
  }
}

// --- Flashcards ---
checkUniqueIds(ALL_FLASHCARDS, "ALL_FLASHCARDS");
for (const f of ALL_FLASHCARDS) {
  checkTopic(f.topicId, `Flashcard ${f.id}`);
  checkSource(f.source, `Flashcard ${f.id}`);
  if (!f.front || !f.back) {
    errors.push(`Flashcard ${f.id}: falta "front" o "back".`);
  }
}

// --- Nemotecnias ---
checkUniqueIds(ALL_MNEMONICS, "ALL_MNEMONICS");
for (const m of ALL_MNEMONICS) {
  checkTopic(m.topicId, `Nemotecnia ${m.id}`);
  checkSource(m.source, `Nemotecnia ${m.id}`);
  if (!m.breakdown || m.breakdown.length === 0) {
    errors.push(`Nemotecnia ${m.id}: falta el desglose (breakdown).`);
  }
}

// --- Tablas ---
checkUniqueIds(ALL_TABLES, "ALL_TABLES");
for (const t of ALL_TABLES) {
  checkTopic(t.topicId, `Tabla ${t.id}`);
  checkSource(t.source, `Tabla ${t.id}`);
  const colCount = t.columns.length;
  t.rows.forEach((row, i) => {
    if (row.length !== colCount) {
      errors.push(`Tabla ${t.id}: la fila ${i} tiene ${row.length} celdas, pero hay ${colCount} columnas.`);
    }
  });
}

// --- Ahorcado ---
checkUniqueIds(HANGMAN_WORDS, "HANGMAN_WORDS");
for (const w of HANGMAN_WORDS) {
  checkTopic(w.topicId, `Palabra de ahorcado ${w.id}`);
  checkSource(w.source, `Palabra de ahorcado ${w.id}`);
  if (!/^[A-ZÁÉÍÓÚÑ]+$/.test(w.word)) {
    errors.push(`Palabra de ahorcado ${w.id}: "${w.word}" debe estar en mayúsculas sin espacios/números.`);
  }
}

// --- Plan de estudio de 15 días ---
{
  const seenDays = new Set<number>();
  for (const d of STUDY_PLAN) {
    if (seenDays.has(d.day)) errors.push(`STUDY_PLAN: día duplicado "${d.day}".`);
    seenDays.add(d.day);
    if (!d.title || d.title.trim().length === 0) errors.push(`STUDY_PLAN día ${d.day}: falta el título.`);
    if (!d.goals || d.goals.length === 0) errors.push(`STUDY_PLAN día ${d.day}: falta al menos una meta.`);
    if (!d.activities || d.activities.length === 0) errors.push(`STUDY_PLAN día ${d.day}: falta al menos una actividad.`);
    if (!d.subtopics || d.subtopics.length === 0) errors.push(`STUDY_PLAN día ${d.day}: falta al menos un subtema.`);
    if (!d.estimatedMinutes || d.estimatedMinutes <= 0) errors.push(`STUDY_PLAN día ${d.day}: estimatedMinutes debe ser mayor que 0.`);
  }
  const expectedDays = Array.from({ length: STUDY_PLAN.length }, (_, i) => i + 1);
  const missingDays = expectedDays.filter((n) => !seenDays.has(n));
  if (missingDays.length > 0) {
    errors.push(`STUDY_PLAN: faltan los días ${missingDays.join(", ")} (debe ser una secuencia 1..N sin huecos).`);
  }
}

const totals = {
  preguntas: ALL_QUESTIONS.length,
  flashcards: ALL_FLASHCARDS.length,
  nemotecnias: ALL_MNEMONICS.length,
  tablas: ALL_TABLES.length,
  ahorcado: HANGMAN_WORDS.length,
  "días del plan": STUDY_PLAN.length,
};

if (errors.length > 0) {
  console.error(`\n❌ Validación de contenido falló con ${errors.length} error(es):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error("");
  process.exit(1);
} else {
  console.log("✅ Contenido válido:");
  console.table(totals);
}
