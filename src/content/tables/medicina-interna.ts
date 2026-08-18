import type { ReferenceTable } from "@/types/content";

export const medicinaInternaTables: ReferenceTable[] = [
  {
    id: "tb-mi-001",
    topicId: "medicina-interna",
    subtopic: "Nefrología",
    title: "Estadios de enfermedad renal crónica (KDIGO)",
    description: "Clasificación por tasa de filtración glomerular (TFG) estimada.",
    columns: ["Estadio", "TFG (mL/min/1.73m²)", "Descripción"],
    rows: [
      ["G1", "≥90", "Normal o alta (con daño renal)"],
      ["G2", "60–89", "Ligeramente disminuida"],
      ["G3a", "45–59", "Ligera a moderadamente disminuida"],
      ["G3b", "30–44", "Moderada a severamente disminuida"],
      ["G4", "15–29", "Severamente disminuida"],
      ["G5", "<15", "Falla renal (requiere terapia de reemplazo renal)"],
    ],
    source: { label: "KDIGO Clinical Practice Guideline for CKD Evaluation and Management, 2024" },
  },
  {
    id: "tb-mi-002",
    topicId: "medicina-interna",
    subtopic: "Signos vitales",
    title: "Valores normales de signos vitales en el adulto",
    columns: ["Parámetro", "Valor normal"],
    rows: [
      ["Frecuencia cardíaca", "60–100 lpm"],
      ["Frecuencia respiratoria", "12–20 rpm"],
      ["Presión arterial", "<120/80 mmHg (óptima)"],
      ["Temperatura corporal", "36.5–37.5 °C"],
      ["Saturación de oxígeno (SpO2)", "≥95%"],
    ],
    source: { label: "Harrison's Principles of Internal Medicine, 21.ª ed." },
  },
  {
    id: "tb-mi-003",
    topicId: "medicina-interna",
    subtopic: "Metabolismo",
    title: "Clasificación de la glucemia (ADA)",
    columns: ["Categoría", "Glucemia en ayunas", "HbA1c"],
    rows: [
      ["Normal", "<100 mg/dL", "<5.7%"],
      ["Prediabetes", "100–125 mg/dL", "5.7–6.4%"],
      ["Diabetes mellitus", "≥126 mg/dL", "≥6.5%"],
    ],
    source: { label: "American Diabetes Association — Standards of Care in Diabetes 2024" },
  },
];
