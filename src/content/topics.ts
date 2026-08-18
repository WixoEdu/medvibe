import type { Topic } from "@/types/content";

/**
 * Las 5 áreas troncales del Examen de Oposición Nacional de Primera
 * Especialidad de Medicina en Guatemala (proceso USAC / UNADE para optar
 * a residencias médicas). La distribución de preguntas (`examWeight`) es
 * una referencia aproximada basada en convocatorias públicas recientes de
 * exámenes nacionales de residencia con estructura equivalente (áreas
 * clínico-médicas, clínico-quirúrgicas y transversales); confírmala
 * siempre contra la guía oficial del año en curso publicada por la
 * Facultad de Ciencias Médicas - USAC antes de tu examen real.
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
];

export function getTopic(id: string): Topic | undefined {
  return TOPICS.find((t) => t.id === id);
}
