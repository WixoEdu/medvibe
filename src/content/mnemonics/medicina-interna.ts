import type { Mnemonic } from "@/types/content";

export const medicinaInternaMnemonics: Mnemonic[] = [
  {
    id: "nm-mi-001",
    topicId: "medicina-interna",
    subtopic: "Cardiología",
    title: "Factores de riesgo cardiovascular modificables",
    keyword: "SODA HELP",
    breakdown: [
      { letter: "S", meaning: "Smoking (tabaquismo)" },
      { letter: "O", meaning: "Obesidad" },
      { letter: "D", meaning: "Diabetes" },
      { letter: "A", meaning: "Alcohol / sedentarismo (Actividad física baja)" },
      { letter: "H", meaning: "Hipertensión" },
      { letter: "E", meaning: "Elevación de lípidos (dislipidemia)" },
      { letter: "L", meaning: "(estrés) psicosociaL" },
      { letter: "P", meaning: "Poca ingesta de frutas/verduras (dieta)" },
    ],
    usage:
      "Ayuda a repasar rápidamente los factores de riesgo cardiovascular modificables al evaluar prevención primaria en consulta o en preguntas de caso clínico.",
    source: { label: "Adaptado de factores de riesgo INTERHEART Study, Lancet 2004" },
  },
  {
    id: "nm-mi-002",
    topicId: "medicina-interna",
    subtopic: "Neurología",
    title: "Signos de alarma ('banderas rojas') de cefalea secundaria",
    keyword: "SNOOP4",
    breakdown: [
      { letter: "S", meaning: "Systemic symptoms (fiebre, pérdida de peso), Secondary risk factors (VIH, cáncer)" },
      { letter: "N", meaning: "Neurologic signs/symptoms (focalización, alteración de consciencia)" },
      { letter: "O", meaning: "Onset súbito (cefalea en trueno)" },
      { letter: "O", meaning: "Older age (inicio después de los 50 años)" },
      { letter: "P4", meaning: "Pattern change, Positional, Papiledema, Precipitada por Valsalva/tos/ejercicio" },
    ],
    usage:
      "Se usa para decidir cuándo una cefalea requiere neuroimagen urgente y estudio adicional en lugar de manejo como cefalea primaria (migraña/tensional).",
    source: { label: "American Headache Society — SNNOOP10 red flags for headache" },
  },
  {
    id: "nm-mi-003",
    topicId: "medicina-interna",
    subtopic: "Endocrinología",
    title: "Síntomas cardinales de diabetes descompensada",
    keyword: "Las 3 P",
    breakdown: [
      { letter: "P", meaning: "Poliuria" },
      { letter: "P", meaning: "Polidipsia" },
      { letter: "P", meaning: "Polifagia (con pérdida de peso paradójica)" },
    ],
    usage: "Tríada clásica de presentación de diabetes mellitus no controlada, útil para sospecha diagnóstica inicial.",
    source: { label: "ADA — Standards of Care in Diabetes 2024" },
  },
  {
    id: "nm-mi-004",
    topicId: "medicina-interna",
    subtopic: "Nefrología",
    title: "Indicaciones de diálisis urgente",
    keyword: "AEIOU",
    breakdown: [
      { letter: "A", meaning: "Acidosis metabólica refractaria" },
      { letter: "E", meaning: "Electrolitos (hiperkalemia refractaria)" },
      { letter: "I", meaning: "Intoxicaciones (dializables)" },
      { letter: "O", meaning: "Overload / sObrecarga de volumen refractaria" },
      { letter: "U", meaning: "Uremia sintomática (encefalopatía, pericarditis urémica)" },
    ],
    usage: "Recordatorio clásico para identificar indicaciones de terapia de reemplazo renal urgente en falla renal aguda o crónica.",
    source: { label: "KDIGO Clinical Practice Guideline for Acute Kidney Injury" },
  },
];
