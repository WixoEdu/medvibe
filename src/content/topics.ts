import type { Topic } from "@/types/content";

/**
 * Las 5 áreas troncales del Examen de Oposición Nacional de Primera
 * Especialidad de Medicina en Guatemala (proceso USAC / UNADE para optar
 * a residencias médicas), más "ciencias-basicas" para el examen de
 * ADMISIÓN a la Facultad de Ciencias Médicas (aspirantes, examen distinto
 * al de residencia). La distribución de preguntas (`examWeight`) es una
 * referencia aproximada basada en convocatorias públicas recientes de
 * exámenes con estructura equivalente; confírmala siempre contra la guía
 * oficial del año en curso publicada por la Facultad de Ciencias Médicas -
 * USAC/UNADE antes de tu examen real.
 */
export const TOPICS: Topic[] = [
  {
    id: "medicina-interna",
    name: "Medicina Interna",
    shortName: "Med. Interna",
    description:
      "Patología del adulto: cardiología, neumología, gastroenterología, nefrología, endocrinología, infectología, reumatología, hematología y urgencias médicas.",
    color: "#2563eb",
    icon: "🫀",
    examWeight: {
      questions: 40,
      totalQuestions: 180,
      source: "Distribución referencial de exámenes nacionales de residencia con estructura equivalente (área clínico-médica).",
    },
  },
  {
    id: "cirugia",
    name: "Cirugía General",
    shortName: "Cirugía",
    description:
      "Abdomen agudo, trauma, patología biliar y digestiva, preoperatorio/posoperatorio, heridas y manejo del paciente quirúrgico.",
    color: "#dc2626",
    icon: "🔪",
    examWeight: {
      questions: 30,
      totalQuestions: 180,
      source: "Distribución referencial de exámenes nacionales de residencia con estructura equivalente (área clínico-quirúrgica).",
    },
  },
  {
    id: "pediatria",
    name: "Pediatría",
    shortName: "Pediatría",
    description:
      "Crecimiento y desarrollo, neonatología, infecciones respiratorias y diarreicas, vacunación, desnutrición y urgencias pediátricas.",
    color: "#059669",
    icon: "🧒",
    examWeight: {
      questions: 34,
      totalQuestions: 180,
      source: "Distribución referencial de exámenes nacionales de residencia con estructura equivalente (área clínico-médica).",
    },
  },
  {
    id: "gineco-obstetricia",
    name: "Ginecología y Obstetricia",
    shortName: "Gineco-Obs",
    description:
      "Control prenatal, complicaciones del embarazo, atención del parto, patología ginecológica y planificación familiar.",
    color: "#c026d3",
    icon: "🤰",
    examWeight: {
      questions: 30,
      totalQuestions: 180,
      source: "Distribución referencial de exámenes nacionales de residencia con estructura equivalente (área clínico-quirúrgica).",
    },
  },
  {
    id: "salud-publica",
    name: "Salud Pública y Medicina Preventiva",
    shortName: "Salud Pública",
    description:
      "Epidemiología, bioestadística, sistema de salud de Guatemala, ética médica e investigación aplicada a la clínica.",
    color: "#d97706",
    icon: "🌎",
    examWeight: {
      questions: 30,
      totalQuestions: 180,
      source: "Distribución referencial de exámenes nacionales de residencia con estructura equivalente (áreas transversales).",
    },
  },
  {
    id: "ciencias-basicas",
    name: "Ciencias Básicas (Examen de Admisión)",
    shortName: "Cs. Básicas",
    description:
      "Biología celular, genética y química general — la prueba de conocimientos específicos de Biología y Química del examen de ADMISIÓN a la Facultad de Ciencias Médicas (USAC/UNADE). No es el examen de residencia: es para aspirantes que todavía no han iniciado la carrera.",
    color: "#0891b2",
    icon: "🧬",
    // Sin examWeight: la guía oficial de este examen de admisión lista 12
    // bloques temáticos (7 de Biología, 5 de Química) pero no publica una
    // distribución de preguntas comparable a los "180 preguntas" de
    // referencia del examen de residencia, así que no correspondería
    // mostrar aquí una barra de peso con esa misma escala.
  },
];

export function getTopic(id: string): Topic | undefined {
  return TOPICS.find((t) => t.id === id);
}
