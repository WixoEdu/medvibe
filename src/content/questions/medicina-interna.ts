import type { QuizQuestion } from "@/types/content";

export const medicinaInternaQuestions: QuizQuestion[] = [
  {
    id: "mi-001",
    topicId: "medicina-interna",
    subtopic: "Cardiología",
    difficulty: "intermedio",
    stem: "Hombre de 58 años llega a emergencias con dolor torácico opresivo de 40 minutos, diaforesis y náuseas. El ECG muestra elevación del ST de 3 mm en DII, DIII y aVF. ¿Cuál es la conducta inmediata más apropiada?",
    options: [
      "Iniciar aspirina, doble antiagregación y trasladar para angioplastia primaria (o fibrinólisis si no hay PCI disponible en <120 min)",
      "Solicitar troponina seriada cada 6 horas antes de decidir tratamiento",
      "Iniciar betabloqueador intravenoso en bolo y dar de alta si el dolor cede",
      "Realizar prueba de esfuerzo para confirmar isquemia antes de tratar",
    ],
    correctIndex: 0,
    explanation:
      "Un IAMCEST inferior (elevación de ST en DII, DIII, aVF) es una emergencia tiempo-dependiente: requiere reperfusión inmediata (ICP primaria idealmente <120 min desde el primer contacto médico, o fibrinólisis si no es posible) junto con doble antiagregación plaquetaria y anticoagulación. No se espera la troponina para decidir reperfusión.",
    source: { label: "Harrison's Principles of Internal Medicine, 21.ª ed. — Capítulo de Síndrome Coronario Agudo" },
  },
  {
    id: "mi-002",
    topicId: "medicina-interna",
    subtopic: "Neumología",
    difficulty: "intermedio",
    stem: "Paciente de 70 años con neumonía adquirida en la comunidad. Se encuentra confuso, FR 32/min, PA 88/58 mmHg y BUN elevado. Según CURB-65, ¿cuál es la conducta más adecuada?",
    options: [
      "Manejo ambulatorio con amoxicilina oral",
      "Hospitalización, con consideración de manejo en UCI por alto riesgo (CURB-65 alto)",
      "Alta con control ambulatorio en 48 horas",
      "Observación en urgencias por 6 horas y alta si mejora el dolor pleurítico",
    ],
    correctIndex: 1,
    explanation:
      "Con confusión, FR ≥30, presión sistólica <90 y BUN elevado, el paciente acumula ≥3 puntos en CURB-65, lo que indica alto riesgo de mortalidad y necesidad de hospitalización, valorando ingreso a UCI.",
    source: { label: "BTS/ATS Guidelines — Escala CURB-65 para neumonía adquirida en la comunidad" },
  },
  {
    id: "mi-003",
    topicId: "medicina-interna",
    subtopic: "Endocrinología",
    difficulty: "basico",
    stem: "¿Cuál de los siguientes valores confirma el diagnóstico de diabetes mellitus tipo 2 en un paciente asintomático?",
    options: [
      "Glucemia en ayunas de 110 mg/dL en una sola determinación",
      "Glucemia en ayunas ≥126 mg/dL confirmada en dos ocasiones",
      "Glucemia posprandial de 130 mg/dL",
      "HbA1c de 5.8%",
    ],
    correctIndex: 1,
    explanation:
      "El diagnóstico de diabetes en un paciente asintomático requiere confirmar con una segunda prueba: glucemia en ayunas ≥126 mg/dL, glucemia a las 2h en PTOG ≥200 mg/dL, HbA1c ≥6.5%, o glucemia al azar ≥200 mg/dL con síntomas clásicos.",
    source: { label: "American Diabetes Association — Standards of Care in Diabetes 2024" },
  },
  {
    id: "mi-004",
    topicId: "medicina-interna",
    subtopic: "Nefrología",
    difficulty: "intermedio",
    stem: "Paciente con TFG estimada de 38 mL/min/1.73m² sostenida por más de 3 meses, sin albuminuria significativa. ¿En qué estadio de enfermedad renal crónica (KDIGO) se clasifica?",
    options: ["G2", "G3a", "G3b", "G4"],
    correctIndex: 2,
    explanation:
      "KDIGO clasifica la TFG en: G1 ≥90, G2 60-89, G3a 45-59, G3b 30-44, G4 15-29, G5 <15 mL/min/1.73m². Una TFG de 38 corresponde a G3b.",
    source: { label: "KDIGO Clinical Practice Guideline for CKD Evaluation and Management, 2024" },
  },
  {
    id: "mi-005",
    topicId: "medicina-interna",
    subtopic: "Infectología",
    difficulty: "intermedio",
    stem: "Paciente con foco infeccioso claro que presenta alteración del estado mental, frecuencia respiratoria de 24/min y presión arterial sistólica de 95 mmHg. ¿Qué puntaje qSOFA tiene y qué implica?",
    options: [
      "qSOFA 1, bajo riesgo",
      "qSOFA 2, riesgo aumentado de mala evolución por sepsis",
      "qSOFA 3, requiere solo observación ambulatoria",
      "El qSOFA no aplica hasta tener lactato sérico",
    ],
    correctIndex: 1,
    explanation:
      "qSOFA asigna 1 punto por: alteración del estado mental (Glasgow <15), FR ≥22/min y PAS ≤100 mmHg. Con alteración mental y taquipnea el paciente suma 2 puntos, lo que identifica riesgo aumentado de mortalidad hospitalaria por sepsis y obliga a buscar disfunción orgánica (SOFA completo, lactato).",
    source: { label: "Surviving Sepsis Campaign — International Guidelines 2021" },
  },
  {
    id: "mi-006",
    topicId: "medicina-interna",
    subtopic: "Hematología",
    difficulty: "basico",
    stem: "Mujer de 34 años con fatiga, palidez, VCM bajo, ferritina baja y aumento de la capacidad de fijación de hierro (TIBC). ¿Cuál es el diagnóstico más probable?",
    options: [
      "Anemia de enfermedad crónica",
      "Anemia ferropénica",
      "Anemia megaloblástica por déficit de B12",
      "Talasemia menor",
    ],
    correctIndex: 1,
    explanation:
      "Anemia microcítica con ferritina baja y TIBC/transferrina elevada es característica de anemia ferropénica (en enfermedad crónica la ferritina suele estar normal o alta y la TIBC baja).",
    source: { label: "Harrison's Principles of Internal Medicine, 21.ª ed. — Anemias microcíticas" },
  },
  {
    id: "mi-007",
    topicId: "medicina-interna",
    subtopic: "Cardiología",
    difficulty: "intermedio",
    stem: "Paciente con disnea de esfuerzo, ortopnea, edema de miembros inferiores y NT-proBNP muy elevado. ¿Qué clase funcional NYHA corresponde a un paciente con disnea ante actividad física ordinaria (caminar en llano) pero sin síntomas en reposo?",
    options: ["NYHA I", "NYHA II", "NYHA III", "NYHA IV"],
    correctIndex: 1,
    explanation:
      "NYHA I: sin limitación. NYHA II: limitación leve, síntomas con actividad ordinaria. NYHA III: limitación marcada, síntomas con actividad menor a la ordinaria. NYHA IV: síntomas en reposo.",
    source: { label: "New York Heart Association — Clasificación funcional de insuficiencia cardíaca" },
  },
  {
    id: "mi-008",
    topicId: "medicina-interna",
    subtopic: "Endocrinología",
    difficulty: "basico",
    stem: "Mujer de 45 años con fatiga, intolerancia al frío, piel seca y estreñimiento. TSH 12 mUI/L (elevada) y T4 libre baja. ¿Cuál es el diagnóstico?",
    options: [
      "Hipertiroidismo primario",
      "Hipotiroidismo primario",
      "Hipotiroidismo central (hipofisario)",
      "Síndrome del eutiroideo enfermo",
    ],
    correctIndex: 1,
    explanation:
      "TSH elevada con T4 libre baja confirma hipotiroidismo primario (falla tiroidea); en el hipotiroidismo central la TSH típicamente está baja o inapropiadamente normal.",
    source: { label: "American Thyroid Association — Guidelines for Hypothyroidism" },
  },
  {
    id: "mi-009",
    topicId: "medicina-interna",
    subtopic: "Gastroenterología",
    difficulty: "avanzado",
    stem: "Paciente cirrótico con hematemesis masiva. Además de la reanimación con líquidos y hemoderivados, ¿cuál es el manejo farmacológico inicial más apropiado mientras se organiza la endoscopía?",
    options: [
      "Omeprazol intravenoso únicamente",
      "Octreótide (o terlipresina) intravenoso más antibiótico profiláctico",
      "Propranolol intravenoso en bolo",
      "Ácido tranexámico intravenoso como única medida",
    ],
    correctIndex: 1,
    explanation:
      "En sangrado variceal se recomienda iniciar un vasoconstrictor esplácnico (octreótide o terlipresina) y profilaxis antibiótica (ej. ceftriaxona) desde el ingreso, además de la endoscopía terapéutica temprana (idealmente <12h).",
    source: { label: "AASLD Practice Guidance — Portal Hypertensive Bleeding in Cirrhosis, 2023" },
  },
  {
    id: "mi-010",
    topicId: "medicina-interna",
    subtopic: "Reumatología",
    difficulty: "intermedio",
    stem: "Mujer de 28 años con artralgias simétricas de manos, eritema malar que respeta surcos nasogenianos, fotosensibilidad y ANA positivo a título alto. ¿Cuál es el diagnóstico más probable?",
    options: [
      "Artritis reumatoide",
      "Lupus eritematoso sistémico",
      "Dermatomiositis",
      "Fibromialgia",
    ],
    correctIndex: 1,
    explanation:
      "El eritema malar que respeta pliegues nasolabiales, fotosensibilidad, artralgias y ANA positivo son criterios clásicos sugestivos de lupus eritematoso sistémico.",
    source: { label: "EULAR/ACR Classification Criteria for Systemic Lupus Erythematosus, 2019" },
  },
];
