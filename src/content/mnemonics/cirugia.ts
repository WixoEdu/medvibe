import type { Mnemonic } from "@/types/content";

export const cirugiaMnemonics: Mnemonic[] = [
  {
    id: "nm-cx-001",
    topicId: "cirugia",
    subtopic: "Vía biliar",
    title: "Factores de riesgo de litiasis biliar",
    keyword: "Las 4 F (en inglés)",
    breakdown: [
      { letter: "F", meaning: "Female (sexo femenino)" },
      { letter: "F", meaning: "Forty (alrededor de los 40 años)" },
      { letter: "F", meaning: "Fertile / múltiple pariFy (multiparidad)" },
      { letter: "F", meaning: "Fat (obesidad)" },
    ],
    usage: "Perfil clásico de riesgo para colelitiasis, útil para reconocer al paciente típico en un caso clínico.",
    source: { label: "Sabiston Textbook of Surgery, 21.ª ed." },
  },
  {
    id: "nm-cx-002",
    topicId: "cirugia",
    subtopic: "Preoperatorio",
    title: "Evaluación preoperatoria básica",
    keyword: "AMPLIA",
    breakdown: [
      { letter: "A", meaning: "Alergias" },
      { letter: "M", meaning: "Medicamentos actuales" },
      { letter: "P", meaning: "Patologías previas (antecedentes)" },
      { letter: "L", meaning: "Libaciones/última ingesta (ayuno)" },
      { letter: "I", meaning: "Incidentes/eventos relacionados al problema actual" },
      { letter: "A", meaning: "Ambiente (contexto del evento, ej. trauma)" },
    ],
    usage: "Historia clínica dirigida rápida (equivalente a 'AMPLE' en inglés), usada en la evaluación preoperatoria y de trauma.",
    source: { label: "ATLS Student Course Manual, 10.ª ed." },
  },
  {
    id: "nm-cx-003",
    topicId: "cirugia",
    subtopic: "Abdomen agudo",
    title: "Causas de abdomen agudo quirúrgico por cuadrante",
    keyword: "FID: Ap-Ov-Hern",
    breakdown: [
      { letter: "Ap", meaning: "Apendicitis aguda (fosa ilíaca derecha)" },
      { letter: "Ov", meaning: "Patología ovárica (quiste roto, torsión) en mujeres" },
      { letter: "Hern", meaning: "Hernia inguinal complicada" },
    ],
    usage: "Ayuda a generar diagnóstico diferencial estructurado de dolor en fosa ilíaca derecha, el cuadrante más preguntado en abdomen agudo.",
    source: { label: "Schwartz's Principles of Surgery, 11.ª ed." },
  },
];
