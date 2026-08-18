import type { QuizQuestion } from "@/types/content";

export const pediatriaQuestions: QuizQuestion[] = [
  {
    id: "ped-001",
    topicId: "pediatria",
    subtopic: "Neonatología",
    difficulty: "basico",
    stem: "Recién nacido a 1 minuto de vida: frecuencia cardíaca 105 lpm, llanto vigoroso, algo de flexión de extremidades, hace muecas al estímulo y cuerpo rosado con extremidades cianóticas. ¿Cuál es su puntaje de APGAR?",
    options: ["6", "7", "8", "10"],
    correctIndex: 2,
    explanation:
      "FC >100 = 2, esfuerzo respiratorio bueno/llanto = 2, tono con algo de flexión = 1, irritabilidad refleja (muecas) = 1, color acrocianótico = 1. Total = 8.",
    source: { label: "American Academy of Pediatrics — Escala de APGAR" },
  },
  {
    id: "ped-002",
    topicId: "pediatria",
    subtopic: "Infecciones respiratorias",
    difficulty: "intermedio",
    stem: "Lactante de 8 meses con tos, sibilancias espiratorias, tiraje subcostal leve y saturación de 94% al aire ambiente, alimentándose adecuadamente. Según los criterios de gravedad de bronquiolitis, ¿cuál es la conducta más apropiada?",
    options: [
      "Hospitalizar de forma inmediata en UCI",
      "Manejo ambulatorio con medidas de soporte, hidratación y signos de alarma",
      "Indicar salbutamol nebulizado de forma sistemática",
      "Iniciar antibióticos de amplio espectro",
    ],
    correctIndex: 1,
    explanation:
      "La bronquiolitis leve-moderada con buena tolerancia oral y saturación >92-94% se maneja de forma ambulatoria con medidas de soporte (hidratación, lavados nasales, antipiréticos si hay fiebre) y educación sobre signos de alarma; los broncodilatadores y antibióticos no están indicados de rutina.",
    source: { label: "American Academy of Pediatrics — Clinical Practice Guideline: Bronchiolitis" },
  },
  {
    id: "ped-003",
    topicId: "pediatria",
    subtopic: "Nutrición",
    difficulty: "intermedio",
    stem: "Niño de 2 años con peso muy bajo para la talla, edema bilateral en miembros inferiores, piel con lesiones descamativas y cabello despigmentado. ¿Cuál es el diagnóstico más probable?",
    options: ["Marasmo", "Kwashiorkor", "Raquitismo", "Deficiencia de vitamina A"],
    correctIndex: 1,
    explanation:
      "El kwashiorkor se caracteriza por edema (por hipoalbuminemia), lesiones cutáneas descamativas, cambios en cabello y hepatomegalia, a diferencia del marasmo que cursa con emaciación severa sin edema.",
    source: { label: "OMS — Manejo de la desnutrición aguda severa en niños" },
  },
  {
    id: "ped-004",
    topicId: "pediatria",
    subtopic: "Enfermedad diarreica",
    difficulty: "basico",
    stem: "Niño de 3 años con diarrea acuosa, ojos hundidos, sed intensa, pliegue cutáneo que se deshace lentamente. Según AIEPI, ¿cómo se clasifica la deshidratación?",
    options: ["Sin deshidratación", "Algún grado de deshidratación", "Deshidratación grave", "Choque hipovolémico establecido"],
    correctIndex: 1,
    explanation:
      "Dos o más signos como ojos hundidos, sed intensa/bebe con avidez y pliegue cutáneo que se deshace lentamente clasifican como 'algún grado de deshidratación' según AIEPI, que requiere plan B de rehidratación oral.",
    source: { label: "OPS/OMS — AIEPI: Atención Integrada a las Enfermedades Prevalentes de la Infancia" },
  },
  {
    id: "ped-005",
    topicId: "pediatria",
    subtopic: "Inmunizaciones",
    difficulty: "basico",
    stem: "Según el esquema nacional de vacunación de Guatemala, ¿a qué edad se aplica típicamente la primera dosis de la vacuna pentavalente (DPT-HB-Hib)?",
    options: ["Al nacer", "2 meses", "6 meses", "12 meses"],
    correctIndex: 1,
    explanation:
      "El esquema nacional de Guatemala (MSPAS) inicia la serie de pentavalente a los 2 meses de edad, con dosis subsecuentes a los 4 y 6 meses.",
    source: { label: "MSPAS Guatemala — Esquema Nacional de Vacunación vigente" },
  },
  {
    id: "ped-006",
    topicId: "pediatria",
    subtopic: "Neonatología",
    difficulty: "intermedio",
    stem: "Recién nacido a término con ictericia que aparece en las primeras 24 horas de vida. ¿Cómo se interpreta este hallazgo?",
    options: [
      "Es fisiológica y no requiere estudio",
      "Es patológica y requiere evaluación urgente de bilirrubinas",
      "Solo se debe observar sin intervención hasta el alta",
      "Indica siempre incompatibilidad Rh sin necesidad de más pruebas",
    ],
    correctIndex: 1,
    explanation:
      "La ictericia neonatal que aparece en las primeras 24 horas de vida siempre se considera patológica (a diferencia de la ictericia fisiológica que aparece después del segundo día) y obliga a descartar causas como incompatibilidad de grupo/Rh, sepsis o hemólisis.",
    source: { label: "American Academy of Pediatrics — Clinical Practice Guideline: Hyperbilirubinemia in the Newborn" },
  },
  {
    id: "ped-007",
    topicId: "pediatria",
    subtopic: "Urgencias pediátricas",
    difficulty: "avanzado",
    stem: "Niño de 4 años con estridor inspiratorio, tos 'perruna', voz ronca y fiebre baja de inicio gradual. ¿Cuál es el diagnóstico más probable y su primera línea de tratamiento?",
    options: [
      "Epiglotitis; requiere intubación inmediata",
      "Laringotraqueítis (crup); dexametasona oral/IM y considerar epinefrina nebulizada si es moderado-grave",
      "Cuerpo extraño en vía aérea; maniobra de Heimlich",
      "Asma; salbutamol inhalado",
    ],
    correctIndex: 1,
    explanation:
      "El cuadro de tos perruna, estridor y disfonía de inicio gradual es característico del crup viral. El tratamiento de elección es dexametasona (oral, IM o IV) en todos los casos, agregando epinefrina nebulizada en casos moderados-graves.",
    source: { label: "American Academy of Pediatrics — Croup: Diagnosis and Management" },
  },
  {
    id: "ped-008",
    topicId: "pediatria",
    subtopic: "Crecimiento y desarrollo",
    difficulty: "basico",
    stem: "¿A qué edad aproximada se espera que un lactante logre sostener la cabeza de forma estable en decúbito prono y comience a rodar?",
    options: ["1 mes", "3-4 meses", "9 meses", "12 meses"],
    correctIndex: 1,
    explanation:
      "El control cefálico completo y el inicio de la capacidad de rodar se espera aproximadamente entre los 3 y 4 meses de edad, como hito del desarrollo motor grueso.",
    source: { label: "OMS — Indicadores de hitos del desarrollo infantil temprano" },
  },
];
