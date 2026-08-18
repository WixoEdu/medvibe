import type { Flashcard } from "@/types/content";

export const pediatriaFlashcards: Flashcard[] = [
  {
    id: "fc-ped-001",
    topicId: "pediatria",
    subtopic: "Neonatología",
    front: "¿Qué 5 parámetros mide el APGAR?",
    back: "Apariencia (color), Pulso (FC), Gesto/irritabilidad refleja, Actividad (tono muscular), Respiración. Se evalúa al minuto 1 y 5 de vida, con puntaje de 0-2 por parámetro (máx. 10).",
    source: { label: "American Academy of Pediatrics" },
  },
  {
    id: "fc-ped-002",
    topicId: "pediatria",
    subtopic: "Nutrición",
    front: "¿Cómo se diferencia el Kwashiorkor del Marasmo?",
    back: "Kwashiorkor: edema (por hipoalbuminemia), lesiones cutáneas, cambios de cabello — desnutrición proteica predominante. Marasmo: emaciación severa sin edema — déficit calórico-proteico global.",
    source: { label: "OMS — Manejo de la desnutrición aguda severa" },
  },
  {
    id: "fc-ped-003",
    topicId: "pediatria",
    subtopic: "Enfermedad diarreica",
    front: "Según AIEPI, ¿qué signos clasifican 'algún grado de deshidratación'?",
    back: "Dos o más de: inquietud/irritabilidad, ojos hundidos, bebe con avidez/sediento, pliegue cutáneo que se deshace lentamente. Requiere Plan B (rehidratación oral supervisada).",
    source: { label: "OPS/OMS — AIEPI" },
  },
  {
    id: "fc-ped-004",
    topicId: "pediatria",
    subtopic: "Neonatología",
    front: "¿Por qué la ictericia neonatal en las primeras 24h siempre es patológica?",
    back: "La ictericia fisiológica aparece después del 2.º día de vida por inmadurez hepática normal. Si aparece <24h, sugiere hemólisis (incompatibilidad Rh/ABO), sepsis u otra causa patológica que requiere estudio urgente.",
    source: { label: "AAP — Clinical Practice Guideline: Hyperbilirubinemia in the Newborn" },
  },
  {
    id: "fc-ped-005",
    topicId: "pediatria",
    subtopic: "Urgencias pediátricas",
    front: "¿Cómo se diferencia clínicamente el crup de la epiglotitis?",
    back: "Crup: inicio gradual, tos perruna, estridor, disfonía, fiebre baja — tratar con dexametasona ± epinefrina nebulizada. Epiglotitis: inicio abrupto, fiebre alta, sialorrea, posición en trípode, sin tos perruna — emergencia de vía aérea.",
    source: { label: "AAP — Croup: Diagnosis and Management" },
  },
  {
    id: "fc-ped-006",
    topicId: "pediatria",
    subtopic: "Inmunizaciones",
    front: "¿Qué protege la vacuna pentavalente y cuándo se administra en Guatemala?",
    back: "Protege contra difteria, tos ferina, tétanos, hepatitis B y Haemophilus influenzae tipo b. Se aplica a los 2, 4 y 6 meses de edad según el esquema nacional del MSPAS.",
    source: { label: "MSPAS Guatemala — Esquema Nacional de Vacunación" },
  },
];
