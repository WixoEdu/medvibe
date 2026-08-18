import type { Flashcard } from "@/types/content";

export const saludPublicaFlashcards: Flashcard[] = [
  {
    id: "fc-sp-001",
    topicId: "salud-publica",
    subtopic: "Epidemiología",
    front: "¿Cuándo se usa razón de momios (OR) en lugar de riesgo relativo (RR)?",
    back: "En estudios de casos y controles, donde no se puede calcular incidencia directamente. El OR aproxima al RR cuando la enfermedad estudiada es poco frecuente ('supuesto de enfermedad rara').",
    source: { label: "Gordis — Epidemiology, 6.ª ed." },
  },
  {
    id: "fc-sp-002",
    topicId: "salud-publica",
    subtopic: "Bioestadística",
    front: "¿Qué significa 'SnNout' y 'SpPin'?",
    back: "SnNout: prueba con alta Sensibilidad, si el resultado es Negativo, descarta (rule out) la enfermedad. SpPin: prueba con alta Especificidad, si el resultado es Positivo, confirma (rule in) la enfermedad.",
    source: { label: "Gordis — Epidemiology, 6.ª ed." },
  },
  {
    id: "fc-sp-003",
    topicId: "salud-publica",
    subtopic: "Niveles de atención",
    front: "¿Cuáles son los 3 niveles clásicos de prevención en salud pública?",
    back: "Primaria: evita la aparición de enfermedad (vacunas, promoción). Secundaria: detección temprana (tamizajes). Terciaria: limita el daño/discapacidad de enfermedad ya establecida (rehabilitación).",
    source: { label: "OPS/OMS — Niveles de prevención" },
  },
  {
    id: "fc-sp-004",
    topicId: "salud-publica",
    subtopic: "Sistema de salud de Guatemala",
    front: "¿Cuáles son los principales prestadores del sistema de salud guatemalteco?",
    back: "MSPAS (rector, cobertura pública general), IGSS (seguridad social para trabajadores afiliados), y sector privado (con y sin fines de lucro, incluyendo ONG).",
    source: { label: "MSPAS Guatemala — Marco institucional del sector salud" },
  },
];
