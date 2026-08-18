import type { ReferenceTable } from "@/types/content";

export const pediatriaTables: ReferenceTable[] = [
  {
    id: "tb-ped-001",
    topicId: "pediatria",
    subtopic: "Neonatología",
    title: "Escala de APGAR",
    columns: ["Signo", "0 puntos", "1 punto", "2 puntos"],
    rows: [
      ["Apariencia (color)", "Cianosis/palidez global", "Cuerpo rosado, extremidades cianóticas", "Completamente rosado"],
      ["Pulso", "Ausente", "<100 lpm", ">100 lpm"],
      ["Gesto (irritabilidad)", "Sin respuesta", "Muecas", "Llanto/tos vigorosa"],
      ["Actividad (tono)", "Flácido", "Alguna flexión", "Movimiento activo"],
      ["Respiración", "Ausente", "Irregular/débil", "Llanto fuerte"],
    ],
    source: { label: "American Academy of Pediatrics — Escala de APGAR" },
  },
  {
    id: "tb-ped-002",
    topicId: "pediatria",
    subtopic: "Signos vitales",
    title: "Frecuencia cardíaca y respiratoria normal por edad",
    columns: ["Edad", "FC (lpm)", "FR (rpm)"],
    rows: [
      ["Recién nacido", "100–160", "30–60"],
      ["Lactante (1–12 meses)", "100–150", "25–40"],
      ["1–3 años", "90–140", "20–30"],
      ["3–6 años", "80–120", "18–25"],
      ["6–12 años", "70–110", "16–22"],
      [">12 años", "60–100", "12–20"],
    ],
    source: { label: "American Academy of Pediatrics — Pediatric Advanced Life Support (PALS) reference ranges" },
  },
  {
    id: "tb-ped-003",
    topicId: "pediatria",
    subtopic: "Inmunizaciones",
    title: "Esquema Nacional de Vacunación de Guatemala (resumen primeros 12 meses)",
    columns: ["Edad", "Vacunas"],
    rows: [
      ["Al nacer", "BCG, Hepatitis B (primera dosis)"],
      ["2 meses", "Pentavalente (1.ª), Polio (1.ª), Rotavirus (1.ª), Neumococo (1.ª)"],
      ["4 meses", "Pentavalente (2.ª), Polio (2.ª), Rotavirus (2.ª), Neumococo (2.ª)"],
      ["6 meses", "Pentavalente (3.ª), Polio (3.ª)"],
      ["12 meses", "SPR (Sarampión, Paperas, Rubéola), Neumococo (refuerzo)"],
    ],
    source: { label: "MSPAS Guatemala — Esquema Nacional de Vacunación vigente (verificar actualizaciones anuales)" },
  },
];
