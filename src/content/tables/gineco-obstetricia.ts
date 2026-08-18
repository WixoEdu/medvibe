import type { ReferenceTable } from "@/types/content";

export const ginecoObstetriciaTables: ReferenceTable[] = [
  {
    id: "tb-go-001",
    topicId: "gineco-obstetricia",
    subtopic: "Complicaciones del embarazo",
    title: "Clasificación de trastornos hipertensivos del embarazo",
    columns: ["Tipo", "Características principales"],
    rows: [
      ["Hipertensión gestacional", "PA ≥140/90 después de 20 semanas, sin proteinuria"],
      ["Preeclampsia", "Hipertensión + proteinuria significativa (o disfunción de órgano) después de 20 semanas"],
      ["Preeclampsia con criterios de severidad", "PA ≥160/110 y/o síntomas de severidad (cefalea, epigastralgia, alteración visual, plaquetas <100,000)"],
      ["Eclampsia", "Preeclampsia + convulsiones tónico-clónicas no atribuibles a otra causa"],
      ["Síndrome HELLP", "Hemólisis, enzimas hepáticas elevadas, plaquetopenia (Low Platelets)"],
    ],
    source: { label: "ACOG Practice Bulletin — Gestational Hypertension and Preeclampsia" },
  },
  {
    id: "tb-go-002",
    topicId: "gineco-obstetricia",
    subtopic: "Atención del parto",
    title: "Fases del trabajo de parto",
    columns: ["Fase", "Dilatación cervical", "Duración esperada (nulípara)"],
    rows: [
      ["Fase latente", "0–5 cm", "Variable, hasta 20 horas"],
      ["Fase activa", "6–10 cm", "Progreso mínimo esperado ~1 cm/hora"],
      ["Segundo período (expulsivo)", "10 cm (completa) hasta nacimiento", "Hasta 3 horas (con analgesia epidural puede prolongarse)"],
      ["Tercer período (alumbramiento)", "Nacimiento hasta expulsión de placenta", "Hasta 30 minutos"],
    ],
    source: { label: "ACOG/SMFM — Safe Prevention of the Primary Cesarean Delivery" },
  },
];
