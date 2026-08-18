import type { ReferenceTable } from "@/types/content";

export const cirugiaTables: ReferenceTable[] = [
  {
    id: "tb-cx-001",
    topicId: "cirugia",
    subtopic: "Preoperatorio",
    title: "Clasificación ASA del estado físico",
    columns: ["Clase", "Descripción"],
    rows: [
      ["ASA I", "Paciente sano"],
      ["ASA II", "Enfermedad sistémica leve, sin limitación funcional"],
      ["ASA III", "Enfermedad sistémica grave, con limitación funcional"],
      ["ASA IV", "Enfermedad sistémica grave que es amenaza constante para la vida"],
      ["ASA V", "Moribundo, no se espera que sobreviva sin la cirugía"],
      ["ASA VI", "Paciente con muerte cerebral, donante de órganos"],
    ],
    source: { label: "American Society of Anesthesiologists — ASA Physical Status Classification System" },
  },
  {
    id: "tb-cx-002",
    topicId: "cirugia",
    subtopic: "Heridas",
    title: "Clasificación de heridas quirúrgicas (CDC)",
    columns: ["Clase", "Descripción", "Riesgo de infección aproximado"],
    rows: [
      ["I – Limpia", "No infectada, sin inflamación, cierre por primera intención", "1–5%"],
      ["II – Limpia-contaminada", "Apertura controlada de tracto GI/respiratorio/genitourinario", "5–10%"],
      ["III – Contaminada", "Ruptura de técnica estéril, derrame de contenido GI", "10–20%"],
      ["IV – Sucia-infectada", "Infección clínica preexistente, tejido desvitalizado", ">20%"],
    ],
    source: { label: "CDC — Guideline for Prevention of Surgical Site Infection" },
  },
  {
    id: "tb-cx-003",
    topicId: "cirugia",
    subtopic: "Trauma",
    title: "Clasificación de shock hemorrágico (ATLS)",
    columns: ["Clase", "Pérdida de sangre", "Frecuencia cardíaca", "Presión arterial"],
    rows: [
      ["I", "<15% (<750 mL)", "<100 lpm", "Normal"],
      ["II", "15–30% (750–1500 mL)", ">100 lpm", "Normal (disminuye presión de pulso)"],
      ["III", "30–40% (1500–2000 mL)", ">120 lpm", "Disminuida"],
      ["IV", ">40% (>2000 mL)", ">140 lpm", "Marcadamente disminuida"],
    ],
    source: { label: "American College of Surgeons — ATLS Student Course Manual, 10.ª ed." },
  },
];
