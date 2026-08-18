import type { Mnemonic } from "@/types/content";

export const ginecoObstetriciaMnemonics: Mnemonic[] = [
  {
    id: "nm-go-001",
    topicId: "gineco-obstetricia",
    subtopic: "Hemorragia obstétrica",
    title: "Causas de hemorragia posparto",
    keyword: "Las 4 T",
    breakdown: [
      { letter: "T", meaning: "Tono (atonía uterina — la causa más frecuente)" },
      { letter: "T", meaning: "Trauma (laceraciones de canal de parto, ruptura uterina)" },
      { letter: "T", meaning: "Tejido (restos placentarios retenidos)" },
      { letter: "T", meaning: "Trombina (coagulopatías)" },
    ],
    usage: "Estructura el diagnóstico diferencial sistemático ante una hemorragia posparto, en orden de frecuencia decreciente.",
    source: { label: "FIGO/OMS — Manejo de la hemorragia posparto" },
  },
  {
    id: "nm-go-002",
    topicId: "gineco-obstetricia",
    subtopic: "Complicaciones del embarazo",
    title: "Síntomas de severidad en preeclampsia",
    keyword: "CHEET",
    breakdown: [
      { letter: "C", meaning: "Cefalea persistente" },
      { letter: "H", meaning: "Hipertensión severa (≥160/110)" },
      { letter: "E", meaning: "Epigastralgia / dolor en hipocondrio derecho" },
      { letter: "E", meaning: "Escotomas / alteraciones visuales" },
      { letter: "T", meaning: "Trombocitopenia <100,000 y elevación de transaminasas" },
    ],
    usage: "Ayuda a identificar rápidamente los síntomas y signos que definen preeclampsia con criterios de severidad y ameritan sulfato de magnesio.",
    source: { label: "ACOG Practice Bulletin — Gestational Hypertension and Preeclampsia" },
  },
];
