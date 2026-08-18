import type { Flashcard } from "@/types/content";

export const ginecoObstetriciaFlashcards: Flashcard[] = [
  {
    id: "fc-go-001",
    topicId: "gineco-obstetricia",
    subtopic: "Complicaciones del embarazo",
    front: "¿Cómo se define preeclampsia con criterios de severidad?",
    back: "PA sistólica ≥160 o diastólica ≥110 mmHg, o proteinuria significativa más síntomas de severidad: cefalea, alteraciones visuales, dolor epigástrico/hipocondrio derecho, trombocitopenia <100,000, elevación de transaminasas, edema pulmonar o creatinina elevada.",
    source: { label: "ACOG Practice Bulletin — Gestational Hypertension and Preeclampsia" },
  },
  {
    id: "fc-go-002",
    topicId: "gineco-obstetricia",
    subtopic: "Hemorragia obstétrica",
    front: "¿Cuál es la causa más frecuente de hemorragia posparto y su manejo de primera línea?",
    back: "Atonía uterina (~70% de casos). Manejo: masaje uterino bimanual + uterotónicos (oxitocina de primera línea, luego ergometrina/misoprostol), y manejo quirúrgico si no responde.",
    source: { label: "FIGO/OMS — Manejo de la hemorragia posparto" },
  },
  {
    id: "fc-go-003",
    topicId: "gineco-obstetricia",
    subtopic: "Patología ginecológica",
    front: "¿Cuáles son los criterios de Amsel para vaginosis bacteriana?",
    back: "Se requieren 3 de 4: flujo blanco-grisáceo homogéneo, pH vaginal >4.5, prueba de aminas (KOH) positiva, presencia de 'clue cells' al microscopio.",
    source: { label: "CDC — STI Treatment Guidelines" },
  },
  {
    id: "fc-go-004",
    topicId: "gineco-obstetricia",
    subtopic: "Control prenatal",
    front: "¿Cuántos contactos prenatales mínimos recomienda la OMS?",
    back: "Al menos 8 contactos durante el embarazo (modelo OMS 2016), sustituyendo el modelo previo de 4 visitas, para reducir la mortalidad perinatal.",
    source: { label: "OMS — Recomendaciones sobre atención prenatal" },
  },
  {
    id: "fc-go-005",
    topicId: "gineco-obstetricia",
    subtopic: "Atención del parto",
    front: "¿Cuándo se define 'detención de la fase activa' del trabajo de parto?",
    back: "Ausencia de progreso de la dilatación cervical por ≥4 horas con dinámica uterina adecuada, o ≥6 horas con actividad uterina inadecuada, en fase activa (≥6 cm de dilatación).",
    source: { label: "ACOG/SMFM — Safe Prevention of the Primary Cesarean Delivery" },
  },
];
