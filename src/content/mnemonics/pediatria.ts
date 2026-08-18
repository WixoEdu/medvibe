import type { Mnemonic } from "@/types/content";

export const pediatriaMnemonics: Mnemonic[] = [
  {
    id: "nm-ped-001",
    topicId: "pediatria",
    subtopic: "Neonatología",
    title: "Componentes del puntaje de APGAR",
    keyword: "APGAR",
    breakdown: [
      { letter: "A", meaning: "Apariencia (color de piel)" },
      { letter: "P", meaning: "Pulso (frecuencia cardíaca)" },
      { letter: "G", meaning: "Gesto / irritabilidad refleja" },
      { letter: "A", meaning: "Actividad (tono muscular)" },
      { letter: "R", meaning: "Respiración (esfuerzo respiratorio)" },
    ],
    usage: "Evaluación estandarizada del recién nacido al minuto 1 y 5 de vida; también funciona como acrónimo del apellido del Dr. Virginia Apgar, su creadora.",
    source: { label: "American Academy of Pediatrics" },
  },
  {
    id: "nm-ped-002",
    topicId: "pediatria",
    subtopic: "Urgencias pediátricas",
    title: "Signos de peligro en general (AIEPI)",
    keyword: "No puede B-C-V",
    breakdown: [
      { letter: "B", meaning: "no puede Beber ni tomar el pecho" },
      { letter: "C", meaning: "Convulsiones" },
      { letter: "V", meaning: "Vomita todo lo que ingiere" },
      { letter: "+", meaning: "Letárgico o inconsciente" },
    ],
    usage: "Signos de peligro en general de AIEPI que obligan a clasificar como enfermedad grave y referir de urgencia, sin importar el motivo de consulta inicial.",
    source: { label: "OPS/OMS — AIEPI: Atención Integrada a las Enfermedades Prevalentes de la Infancia" },
  },
  {
    id: "nm-ped-003",
    topicId: "pediatria",
    subtopic: "Nutrición",
    title: "Signos de desnutrición aguda severa",
    keyword: "PEED",
    breakdown: [
      { letter: "P", meaning: "Peso muy bajo para la talla (< -3 DE)" },
      { letter: "E", meaning: "Edema bilateral de miembros (Kwashiorkor)" },
      { letter: "E", meaning: "Emaciación visible severa" },
      { letter: "D", meaning: "Disminución del perímetro braquial (<11.5 cm en 6-59 meses)" },
    ],
    usage: "Criterios clave para identificar desnutrición aguda severa que requiere manejo hospitalario o en programa terapéutico.",
    source: { label: "OMS — Manejo de la desnutrición aguda severa en niños" },
  },
];
