import type { Source, TopicId } from "@/types/content";

export interface HangmanWord {
  id: string;
  topicId: TopicId;
  word: string;
  hint: string;
  source: Source;
}

/** Palabras en mayúsculas y sin tildes para simplificar la mecánica de adivinar letra por letra. */
export const HANGMAN_WORDS: HangmanWord[] = [
  {
    id: "hw-001",
    topicId: "cirugia",
    word: "APENDICITIS",
    hint: "Inflamación del apéndice cecal; causa más común de abdomen agudo quirúrgico en jóvenes.",
    source: { label: "Schwartz's Principles of Surgery, 11.ª ed." },
  },
  {
    id: "hw-002",
    topicId: "cirugia",
    word: "COLECISTITIS",
    hint: "Inflamación de la vesícula biliar, frecuentemente asociada a litiasis.",
    source: { label: "Sabiston Textbook of Surgery, 21.ª ed." },
  },
  {
    id: "hw-003",
    topicId: "medicina-interna",
    word: "TAQUICARDIA",
    hint: "Frecuencia cardíaca mayor a 100 latidos por minuto.",
    source: { label: "Harrison's Principles of Internal Medicine, 21.ª ed." },
  },
  {
    id: "hw-004",
    topicId: "medicina-interna",
    word: "HIPOTIROIDISMO",
    hint: "Producción insuficiente de hormonas tiroideas; TSH elevada, T4 baja en su forma primaria.",
    source: { label: "American Thyroid Association" },
  },
  {
    id: "hw-005",
    topicId: "pediatria",
    word: "KWASHIORKOR",
    hint: "Tipo de desnutrición infantil con edema y déficit proteico predominante.",
    source: { label: "OMS — Manejo de la desnutrición aguda severa" },
  },
  {
    id: "hw-006",
    topicId: "pediatria",
    word: "BRONQUIOLITIS",
    hint: "Infección viral de vías respiratorias bajas, frecuente en lactantes menores de 2 años.",
    source: { label: "American Academy of Pediatrics" },
  },
  {
    id: "hw-007",
    topicId: "gineco-obstetricia",
    word: "PREECLAMPSIA",
    hint: "Trastorno hipertensivo del embarazo con proteinuria o disfunción de órgano después de las 20 semanas.",
    source: { label: "ACOG Practice Bulletin" },
  },
  {
    id: "hw-008",
    topicId: "gineco-obstetricia",
    word: "OXITOCINA",
    hint: "Uterotónico de primera línea para el manejo de la atonía uterina.",
    source: { label: "FIGO/OMS — Manejo de la hemorragia posparto" },
  },
  {
    id: "hw-009",
    topicId: "salud-publica",
    word: "EPIDEMIOLOGIA",
    hint: "Disciplina que estudia la distribución y determinantes de enfermedades en poblaciones.",
    source: { label: "Gordis — Epidemiology, 6.ª ed." },
  },
  {
    id: "hw-010",
    topicId: "salud-publica",
    word: "BIOESTADISTICA",
    hint: "Rama de la estadística aplicada a datos biológicos y de salud.",
    source: { label: "Gordis — Epidemiology, 6.ª ed." },
  },
  {
    id: "hw-011",
    topicId: "medicina-interna",
    word: "SEPSIS",
    hint: "Disfunción orgánica potencialmente mortal causada por una respuesta desregulada del huésped a la infección.",
    source: { label: "Surviving Sepsis Campaign, 2021" },
  },
  {
    id: "hw-012",
    topicId: "cirugia",
    word: "PERITONITIS",
    hint: "Inflamación del peritoneo, frecuentemente por perforación de víscera hueca.",
    source: { label: "Schwartz's Principles of Surgery, 11.ª ed." },
  },
  {
    id: "hw-013",
    topicId: "pediatria",
    word: "ICTERICIA",
    hint: "Coloración amarillenta de piel y mucosas por hiperbilirrubinemia; patológica si aparece en las primeras 24h de vida.",
    source: { label: "AAP — Clinical Practice Guideline: Hyperbilirubinemia in the Newborn" },
  },
  {
    id: "hw-014",
    topicId: "gineco-obstetricia",
    word: "ECLAMPSIA",
    hint: "Preeclampsia complicada con convulsiones tónico-clónicas.",
    source: { label: "ACOG Practice Bulletin" },
  },
  {
    id: "hw-015",
    topicId: "salud-publica",
    word: "AUTONOMIA",
    hint: "Principio bioético que respalda el derecho del paciente competente a decidir sobre su tratamiento.",
    source: { label: "Beauchamp & Childress — Principles of Biomedical Ethics" },
  },
];
