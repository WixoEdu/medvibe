import type { QuizQuestion } from "@/types/content";

export const cirugiaQuestions: QuizQuestion[] = [
  {
    id: "cx-001",
    topicId: "cirugia",
    subtopic: "Abdomen agudo",
    difficulty: "basico",
    stem: "Paciente de 22 años con dolor que migró de epigastrio a fosa ilíaca derecha, fiebre baja, náuseas y signo de McBurney positivo. ¿Cuál es el diagnóstico más probable?",
    options: ["Colecistitis aguda", "Apendicitis aguda", "Diverticulitis", "Pancreatitis aguda"],
    correctIndex: 1,
    explanation:
      "La migración clásica del dolor periumbilical hacia la fosa ilíaca derecha con dolor a la palpación en el punto de McBurney es el cuadro típico de apendicitis aguda.",
    source: { label: "Schwartz's Principles of Surgery, 11.ª ed. — Apendicitis aguda" },
  },
  {
    id: "cx-002",
    topicId: "cirugia",
    subtopic: "Vía biliar",
    difficulty: "intermedio",
    stem: "Mujer de 45 años con dolor en hipocondrio derecho, fiebre, ictericia y Murphy positivo. Se sospecha colangitis aguda. ¿Cuál es la tríada clásica que sustenta este diagnóstico?",
    options: [
      "Tríada de Charcot: dolor en hipocondrio derecho, fiebre e ictericia",
      "Tríada de Virchow: éstasis, hipercoagulabilidad y daño endotelial",
      "Tríada de Beck: hipotensión, ingurgitación yugular y ruidos cardíacos velados",
      "Tríada de Cushing: hipertensión, bradicardia e irregularidad respiratoria",
    ],
    correctIndex: 0,
    explanation:
      "La tríada de Charcot (dolor en hipocondrio derecho, fiebre e ictericia) es característica de colangitis aguda; si se agregan hipotensión y confusión se denomina péntada de Reynolds, indicando colangitis supurativa grave.",
    source: { label: "Sabiston Textbook of Surgery, 21.ª ed. — Vía biliar" },
  },
  {
    id: "cx-003",
    topicId: "cirugia",
    subtopic: "Trauma",
    difficulty: "intermedio",
    stem: "En la evaluación inicial de un paciente politraumatizado según ATLS, ¿cuál es el orden correcto del abordaje primario?",
    options: [
      "Exposición, circulación, vía aérea, respiración, déficit neurológico",
      "Vía aérea con control cervical, respiración/ventilación, circulación con control de hemorragia, déficit neurológico, exposición",
      "Circulación, vía aérea, exposición, respiración, déficit neurológico",
      "Déficit neurológico, vía aérea, circulación, respiración, exposición",
    ],
    correctIndex: 1,
    explanation:
      "El ABCDE del ATLS establece: A (vía Aérea con control de columna cervical), B (Buena respiración/ventilación), C (Circulación con control de hemorragia), D (Déficit neurológico), E (Exposición y control ambiental).",
    source: { label: "American College of Surgeons — ATLS Student Course Manual, 10.ª ed." },
  },
  {
    id: "cx-004",
    topicId: "cirugia",
    subtopic: "Preoperatorio",
    difficulty: "basico",
    stem: "¿Qué clasificación se utiliza universalmente para estimar el riesgo anestésico-quirúrgico según el estado físico del paciente?",
    options: ["Escala de Glasgow", "Clasificación ASA", "Escala de Alvarado", "Clasificación de Child-Pugh"],
    correctIndex: 1,
    explanation:
      "La clasificación ASA (American Society of Anesthesiologists), de I a VI, estratifica el estado físico preoperatorio del paciente y se correlaciona con el riesgo perioperatorio.",
    source: { label: "American Society of Anesthesiologists — ASA Physical Status Classification System" },
  },
  {
    id: "cx-005",
    topicId: "cirugia",
    subtopic: "Abdomen agudo",
    difficulty: "avanzado",
    stem: "Paciente con pancreatitis aguda. ¿Cuáles de los siguientes son criterios que se usan en escalas pronósticas tempranas (ej. Ranson o BISAP) para predecir gravedad?",
    options: [
      "Edad, leucocitosis, glucemia, LDH y AST al ingreso (Ranson inicial)",
      "Únicamente el nivel de amilasa sérica",
      "Solo la presencia de dolor abdominal",
      "Únicamente la bilirrubina total",
    ],
    correctIndex: 0,
    explanation:
      "Los criterios de Ranson al ingreso incluyen edad >55 años, leucocitos >16,000, glucosa >200 mg/dL, LDH >350 UI/L y AST >250 UI/L, entre otros; la amilasa/lipasa confirma el diagnóstico pero no forma parte de las escalas pronósticas de gravedad.",
    source: { label: "American College of Gastroenterology — Guideline: Management of Acute Pancreatitis, 2013 (vigente)" },
  },
  {
    id: "cx-006",
    topicId: "cirugia",
    subtopic: "Heridas",
    difficulty: "basico",
    stem: "Herida quirúrgica limpia, cerrada por primera intención, sin signos de infección. ¿Cómo se clasifica esta herida según el sistema de clasificación de heridas quirúrgicas del CDC?",
    options: ["Clase I: Limpia", "Clase II: Limpia-contaminada", "Clase III: Contaminada", "Clase IV: Sucia-infectada"],
    correctIndex: 0,
    explanation:
      "Las heridas Clase I (limpias) son aquellas no infectadas, sin inflamación, sin penetración a tractos respiratorio, digestivo, genital o urinario no infectado, cerradas por primera intención.",
    source: { label: "CDC — Guideline for Prevention of Surgical Site Infection" },
  },
  {
    id: "cx-007",
    topicId: "cirugia",
    subtopic: "Abdomen agudo",
    difficulty: "intermedio",
    stem: "Paciente con distensión abdominal, ausencia de canalización de gases y heces por 3 días, vómitos y radiografía con niveles hidroaéreos. ¿Cuál es el diagnóstico más probable?",
    options: ["Íleo biliar", "Obstrucción intestinal mecánica", "Gastroenteritis aguda", "Colitis ulcerativa"],
    correctIndex: 1,
    explanation:
      "La tríada de distensión, ausencia de canalización de gases/heces y niveles hidroaéreos en la radiografía es característica de obstrucción intestinal mecánica; el íleo biliar es una causa específica pero menos frecuente que debe sospecharse con aerobilia.",
    source: { label: "Sabiston Textbook of Surgery, 21.ª ed. — Obstrucción intestinal" },
  },
  {
    id: "cx-008",
    topicId: "cirugia",
    subtopic: "Trauma",
    difficulty: "intermedio",
    stem: "Paciente con trauma torácico, hipotensión, ingurgitación yugular y ruidos cardíacos velados (tríada de Beck). ¿Cuál es el diagnóstico más probable?",
    options: ["Neumotórax simple", "Taponamiento cardíaco", "Hemotórax masivo", "Contusión pulmonar"],
    correctIndex: 1,
    explanation:
      "La tríada de Beck (hipotensión, ingurgitación yugular y ruidos cardíacos apagados) sugiere taponamiento cardíaco, una emergencia que requiere pericardiocentesis o toracotomía inmediata.",
    source: { label: "American College of Surgeons — ATLS Student Course Manual, 10.ª ed." },
  },
];
