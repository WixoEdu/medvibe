import type { QuizQuestion } from "@/types/content";

export const ginecoObstetriciaQuestions: QuizQuestion[] = [
  {
    id: "go-001",
    topicId: "gineco-obstetricia",
    subtopic: "Complicaciones del embarazo",
    difficulty: "intermedio",
    stem: "Embarazada de 32 semanas con presión arterial 160/110 mmHg, proteinuria significativa y cefalea intensa. ¿Cuál es el diagnóstico más probable y el fármaco de elección para prevenir convulsiones?",
    options: [
      "Hipertensión gestacional; labetalol oral",
      "Preeclampsia con criterios de severidad; sulfato de magnesio",
      "Eclampsia establecida; difenilhidantoína",
      "Síndrome HELLP; solo transfusión plaquetaria",
    ],
    correctIndex: 1,
    explanation:
      "PA ≥160/110 con proteinuria y cefalea (síntoma de severidad) define preeclampsia con criterios de severidad. El sulfato de magnesio es el fármaco de elección para prevenir/tratar convulsiones eclámpticas.",
    source: { label: "ACOG Practice Bulletin — Gestational Hypertension and Preeclampsia" },
  },
  {
    id: "go-002",
    topicId: "gineco-obstetricia",
    subtopic: "Control prenatal",
    difficulty: "basico",
    stem: "Según los lineamientos de control prenatal, ¿cuántas consultas mínimas se recomiendan durante un embarazo de bajo riesgo?",
    options: ["Al menos 2", "Al menos 4", "Al menos 8", "No es necesario un mínimo definido"],
    correctIndex: 2,
    explanation:
      "La OMS recomienda un modelo de al menos 8 contactos prenatales para reducir la mortalidad perinatal y mejorar la experiencia de atención, actualizando el modelo previo de 4 visitas.",
    source: { label: "OMS — Recomendaciones sobre atención prenatal para una experiencia positiva del embarazo" },
  },
  {
    id: "go-003",
    topicId: "gineco-obstetricia",
    subtopic: "Hemorragia obstétrica",
    difficulty: "avanzado",
    stem: "Paciente puérpera inmediata con sangrado vaginal abundante y útero blando, no contraído, a la palpación. ¿Cuál es la causa más frecuente de hemorragia posparto y el primer paso de manejo?",
    options: [
      "Atonía uterina; masaje uterino bimanual y uterotónicos (oxitocina de primera línea)",
      "Retención de restos placentarios; histerectomía inmediata",
      "Laceración cervical; solo observación",
      "Coagulopatía; transfusión sin evaluar el útero",
    ],
    correctIndex: 0,
    explanation:
      "La atonía uterina es la causa más común de hemorragia posparto (~70%). El manejo inicial incluye masaje uterino bimanual y uterotónicos, siendo la oxitocina de primera línea, seguida de ergometrina o misoprostol y medidas quirúrgicas si no responde.",
    source: { label: "FIGO/OMS — Guías para el manejo de la hemorragia posparto" },
  },
  {
    id: "go-004",
    topicId: "gineco-obstetricia",
    subtopic: "Patología ginecológica",
    difficulty: "intermedio",
    stem: "Mujer de 29 años con flujo vaginal blanco-grisáceo, olor a pescado, pH vaginal >4.5 y presencia de 'clue cells' en el examen microscópico. ¿Cuál es el diagnóstico más probable?",
    options: ["Candidiasis vulvovaginal", "Vaginosis bacteriana", "Tricomoniasis", "Cervicitis gonocócica"],
    correctIndex: 1,
    explanation:
      "Los criterios de Amsel (flujo blanco-grisáceo homogéneo, olor a aminas/pescado, pH >4.5 y clue cells) son diagnósticos de vaginosis bacteriana, causada típicamente por Gardnerella vaginalis.",
    source: { label: "CDC — Sexually Transmitted Infections Treatment Guidelines" },
  },
  {
    id: "go-005",
    topicId: "gineco-obstetricia",
    subtopic: "Complicaciones del embarazo",
    difficulty: "intermedio",
    stem: "Embarazada de 8 semanas con sangrado vaginal leve, cérvix cerrado en el examen y embrión con actividad cardíaca presente en el ultrasonido. ¿Cuál es el diagnóstico más probable?",
    options: ["Aborto inevitable", "Amenaza de aborto", "Aborto incompleto", "Embarazo ectópico"],
    correctIndex: 1,
    explanation:
      "El sangrado con cérvix cerrado y viabilidad embrionaria confirmada corresponde a una amenaza de aborto, que en muchos casos evoluciona favorablemente con reposo relativo y seguimiento.",
    source: { label: "ACOG Practice Bulletin — Early Pregnancy Loss" },
  },
  {
    id: "go-006",
    topicId: "gineco-obstetricia",
    subtopic: "Planificación familiar",
    difficulty: "basico",
    stem: "¿Cuál de los siguientes métodos anticonceptivos tiene la mayor eficacia (menor tasa de falla) con uso típico?",
    options: [
      "Preservativo masculino",
      "Píldora anticonceptiva combinada",
      "Dispositivo intrauterino (DIU) o implante subdérmico",
      "Método del ritmo/calendario",
    ],
    correctIndex: 2,
    explanation:
      "Los anticonceptivos reversibles de acción prolongada (DIU e implante subdérmico) tienen tasas de falla con uso típico menores al 1%, muy superiores en eficacia a los métodos de barrera o de conocimiento de la fertilidad.",
    source: { label: "CDC — U.S. Medical Eligibility Criteria for Contraceptive Use" },
  },
  {
    id: "go-007",
    topicId: "gineco-obstetricia",
    subtopic: "Atención del parto",
    difficulty: "intermedio",
    stem: "Durante el trabajo de parto, la dilatación cervical se detiene en 6 cm por más de 4 horas con dinámica uterina adecuada. ¿Cómo se denomina esta alteración?",
    options: ["Fase latente prolongada", "Detención de la fase activa (distocia)", "Parto precipitado", "Período expulsivo prolongado"],
    correctIndex: 1,
    explanation:
      "Con contracciones adecuadas y sin progreso de dilatación por ≥4 horas (o ≥6 horas con actividad inadecuada) en fase activa, se define detención de la fase activa del trabajo de parto.",
    source: { label: "ACOG/SMFM — Safe Prevention of the Primary Cesarean Delivery" },
  },
];
