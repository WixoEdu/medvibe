import type { ReferenceTable } from "@/types/content";

export const saludPublicaTables: ReferenceTable[] = [
  {
    id: "tb-sp-001",
    topicId: "salud-publica",
    subtopic: "Bioestadística",
    title: "Tabla 2x2 y medidas de validez diagnóstica",
    description: "Fórmulas base para calcular sensibilidad, especificidad y valores predictivos.",
    columns: ["Medida", "Fórmula", "Interpretación"],
    rows: [
      ["Sensibilidad", "VP / (VP + FN)", "Capacidad de detectar enfermos (positivos verdaderos entre todos los enfermos)"],
      ["Especificidad", "VN / (VN + FP)", "Capacidad de detectar sanos (negativos verdaderos entre todos los sanos)"],
      ["VPP", "VP / (VP + FP)", "Probabilidad de enfermedad si la prueba es positiva"],
      ["VPN", "VN / (VN + FN)", "Probabilidad de no enfermedad si la prueba es negativa"],
    ],
    source: { label: "Gordis — Epidemiology, 6.ª ed." },
  },
  {
    id: "tb-sp-002",
    topicId: "salud-publica",
    subtopic: "Epidemiología",
    title: "Medidas de asociación según diseño de estudio",
    columns: ["Diseño de estudio", "Medida de asociación apropiada"],
    rows: [
      ["Cohorte", "Riesgo relativo (RR)"],
      ["Casos y controles", "Razón de momios (odds ratio, OR)"],
      ["Transversal", "Razón de prevalencia"],
      ["Ensayo clínico aleatorizado", "Riesgo relativo, reducción absoluta/relativa del riesgo, NNT"],
    ],
    source: { label: "Gordis — Epidemiology, 6.ª ed." },
  },
];
