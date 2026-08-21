import type { StudyPlanDay } from "@/types/content";

/**
 * Plan de estudio intensivo de 15 días para el examen de admisión (subárea
 * de Biología y subárea de Química) a la Facultad de Ciencias Médicas —
 * USAC/UNADE. Cubre los 12 bloques temáticos de la guía oficial (7 de
 * Biología, 5 de Química), con días de repaso y dos simulacros integrados,
 * pensado para un aspirante que solo cuenta con dos semanas antes del
 * examen.
 */
export const STUDY_PLAN: StudyPlanDay[] = [
  {
    day: 1,
    title: "Diagnóstico inicial + Niveles de organización de la vida",
    subtopics: ["Niveles de organización"],
    goals: [
      "Ubicar tu punto de partida real: cuántas preguntas aciertas hoy sin haber estudiado nada",
      "Dominar el orden de los 12 niveles de organización biológica, de átomo a biosfera",
      "Distinguir con seguridad población, comunidad, ecosistema y biosfera",
    ],
    activities: [
      { type: "quiz", description: "Quiz diagnóstico de 15 preguntas de Ciencias Básicas, sin filtrar por subtema, para medir tu nivel real de partida." },
      { type: "flashcards", description: "Repasa las flashcards de 'Niveles de organización' hasta responderlas todas de corrido sin error." },
      { type: "nemotecnias", description: "Aprende la nemotecnia PCEB (Población, Comunidad, Ecosistema, Biosfera)." },
      { type: "tablas", description: "Memoriza la tabla de los 12 niveles de organización de la vida." },
    ],
    estimatedMinutes: 100,
  },
  {
    day: 2,
    title: "Biomoléculas: agua, carbohidratos, lípidos, proteínas y ácidos nucleicos",
    subtopics: ["Biomoléculas"],
    goals: [
      "Explicar por qué el carbono es la base de la química orgánica",
      "Explicar las propiedades del agua relevantes para la vida (calor específico, puentes de hidrógeno)",
      "Reconocer el monómero y la función principal de cada una de las 4 biomoléculas orgánicas",
    ],
    activities: [
      { type: "quiz", description: "Quiz de Ciencias Básicas enfocado en el bloque de Biomoléculas (repite hasta acertar ≥80%)." },
      { type: "flashcards", description: "Flashcards de 'Biomoléculas': carbono, agua, carbohidratos, lípidos, proteínas, ácidos nucleicos." },
      { type: "tablas", description: "Memoriza la tabla comparativa de las 4 biomoléculas orgánicas (monómero + función)." },
    ],
    estimatedMinutes: 90,
  },
  {
    day: 3,
    title: "La célula I: teoría celular, procariotas/eucariotas y organelos",
    subtopics: ["Célula"],
    goals: [
      "Enunciar los 3 postulados de la teoría celular",
      "Diferenciar con precisión célula procariota de eucariota",
      "Asociar cada organelo (núcleo, mitocondria, RE liso/rugoso, Golgi, citoesqueleto) con su función",
    ],
    activities: [
      { type: "flashcards", description: "Flashcards de 'Célula': teoría celular, procariota vs. eucariota, organelos." },
      { type: "tablas", description: "Estudia las tablas de organelos celulares y de célula procariota vs. eucariota." },
      { type: "quiz", description: "Quiz de Ciencias Básicas, revisando con calma cada explicación de las preguntas sobre organelos." },
    ],
    estimatedMinutes: 100,
  },
  {
    day: 4,
    title: "La célula II: membrana y transporte + repaso de los días 1-3",
    subtopics: ["Célula", "Niveles de organización", "Biomoléculas"],
    goals: [
      "Diferenciar difusión simple, difusión facilitada, ósmosis, transporte activo, endocitosis y exocitosis",
      "Explicar el modelo de mosaico fluido de la membrana plasmática",
      "Repasar sin dudas los 3 bloques temáticos ya vistos",
    ],
    activities: [
      { type: "nemotecnias", description: "Aprende la nemotecnia DDOTE para los 5 mecanismos de transporte de membrana." },
      { type: "flashcards", description: "Repasa TODAS las flashcards acumuladas de los días 1-3 (niveles de organización, biomoléculas, célula)." },
      { type: "repaso", description: "Anota en un cuaderno las 5 preguntas que más se te dificultaron esta semana y por qué fallaste." },
      { type: "quiz", description: "Segunda vuelta del quiz de Ciencias Básicas: intenta superar tu puntaje del día 1." },
    ],
    estimatedMinutes: 110,
  },
  {
    day: 5,
    title: "Energía y metabolismo celular",
    subtopics: ["Metabolismo celular"],
    goals: [
      "Enunciar la 1.ª y 2.ª ley de la termodinámica en términos biológicos",
      "Explicar por qué el ATP es la 'moneda energética' celular y cómo actúan las enzimas",
      "Ubicar glucólisis, ciclo de Krebs y cadena de transporte de electrones en su compartimento celular correcto",
    ],
    activities: [
      { type: "nemotecnias", description: "Aprende la nemotecnia GKC: Glucólisis (citosol) → Krebs (matriz mitocondrial) → Cadena de transporte de electrones (membrana interna)." },
      { type: "flashcards", description: "Flashcards de 'Metabolismo celular': termodinámica, ATP, enzimas, anabolismo/catabolismo, respiración aeróbica/anaeróbica." },
      { type: "tablas", description: "Memoriza la tabla de las 3 etapas de la respiración celular aeróbica." },
      { type: "quiz", description: "Quiz de Ciencias Básicas enfocado en Metabolismo celular." },
    ],
    estimatedMinutes: 100,
  },
  {
    day: 6,
    title: "División celular: ciclo celular, mitosis y meiosis",
    subtopics: ["División celular"],
    goals: [
      "Ordenar las fases del ciclo celular (G1, S, G2, M) y saber en cuál se replica el ADN",
      "Diferenciar con seguridad mitosis de meiosis (número de divisiones, células resultantes, dotación cromosómica)",
      "Explicar qué es el entrecruzamiento y cuándo ocurre",
    ],
    activities: [
      { type: "nemotecnias", description: "Aprende la nemotecnia GSGM para las fases del ciclo celular." },
      { type: "tablas", description: "Estudia la tabla comparativa de mitosis vs. meiosis hasta poder recitarla de memoria." },
      { type: "flashcards", description: "Flashcards de 'División celular'." },
      { type: "quiz", description: "Quiz de Ciencias Básicas enfocado en División celular." },
    ],
    estimatedMinutes: 100,
  },
  {
    day: 7,
    title: "Herencia y genética mendeliana",
    subtopics: ["Genética mendeliana"],
    goals: [
      "Enunciar la ley de la segregación y la ley de la distribución independiente",
      "Diferenciar genotipo de fenotipo, y homocigoto de heterocigoto",
      "Explicar qué son los cromosomas homólogos y los autosomas",
    ],
    activities: [
      { type: "nemotecnias", description: "Aprende la nemotecnia SI (Segregación / Independiente) para las 2 leyes de Mendel." },
      { type: "flashcards", description: "Flashcards de 'Genética mendeliana'." },
      { type: "quiz", description: "Quiz de Ciencias Básicas enfocado en Genética mendeliana." },
    ],
    estimatedMinutes: 90,
  },
  {
    day: 8,
    title: "ADN + Simulacro general de Biología",
    subtopics: ["ADN"],
    goals: [
      "Describir los 3 componentes de un nucleótido y la regla de complementariedad de bases",
      "Explicar por qué la replicación del ADN es semiconservativa",
      "Aprobar un simulacro que mezcle los 7 bloques de Biología con al menos 80% de aciertos",
    ],
    activities: [
      { type: "nemotecnias", description: "Aprende la nemotecnia A-T / G-C para la complementariedad de bases del ADN." },
      { type: "flashcards", description: "Flashcards de 'ADN'." },
      { type: "simulacro", description: "Simulacro: quiz largo de Ciencias Básicas, respondiendo solo preguntas de Biología (los 7 bloques). Meta: ≥80% de aciertos." },
      { type: "repaso", description: "Revisa cada pregunta fallada del simulacro y vuelve a su flashcard/tabla correspondiente antes de dormir." },
    ],
    estimatedMinutes: 120,
  },
  {
    day: 9,
    title: "Química: estructura atómica",
    subtopics: ["Estructura atómica"],
    goals: [
      "Nombrar las 3 partículas subatómicas, su carga y su ubicación",
      "Explicar qué es el número atómico y qué son los isótopos",
      "Determinar si un átomo es neutro comparando protones y electrones",
    ],
    activities: [
      { type: "nemotecnias", description: "Aprende la nemotecnia PEN (Protón, Electrón, Neutrón) con su carga y ubicación." },
      { type: "tablas", description: "Memoriza la tabla de partículas subatómicas (carga, ubicación, masa relativa)." },
      { type: "flashcards", description: "Flashcards de 'Estructura atómica'." },
      { type: "quiz", description: "Quiz de Ciencias Básicas enfocado en Estructura atómica." },
    ],
    estimatedMinutes: 90,
  },
  {
    day: 10,
    title: "Química: tabla periódica, mol y configuración electrónica",
    subtopics: ["Tabla periódica"],
    goals: [
      "Explicar cómo varían electronegatividad, radio atómico, energía de ionización y carácter metálico en la tabla periódica",
      "Calcular conversiones básicas entre moles, átomos/moléculas y gramos usando el número de Avogadro",
      "Reconocer metales, no metales, metaloides, elementos representativos, de transición y diatómicos",
    ],
    activities: [
      { type: "tablas", description: "Memoriza la tabla de tendencias periódicas y la tabla de conversiones estequiométricas comunes." },
      { type: "flashcards", description: "Flashcards de 'Tabla periódica': electronegatividad, número de Avogadro, electrones de valencia." },
      { type: "quiz", description: "Quiz de Ciencias Básicas enfocado en Tabla periódica — este es el bloque más denso, tómate tu tiempo." },
      { type: "repaso", description: "Practica a mano al menos 5 conversiones mol↔gramo↔átomos con distintos elementos." },
    ],
    estimatedMinutes: 130,
  },
  {
    day: 11,
    title: "Química: nomenclatura de compuestos inorgánicos",
    subtopics: ["Nomenclatura química"],
    goals: [
      "Nombrar el mismo compuesto en los 3 sistemas: clásico, Stock y estequiométrico",
      "Reconocer cuándo un compuesto es un óxido y cómo se forma",
    ],
    activities: [
      { type: "tablas", description: "Estudia la tabla de los 3 sistemas de nomenclatura con el ejemplo Fe₂O₃ hasta poder reproducirla sin verla." },
      { type: "flashcards", description: "Flashcards de 'Nomenclatura química'." },
      { type: "quiz", description: "Quiz de Ciencias Básicas enfocado en Nomenclatura química." },
      { type: "repaso", description: "Practica nombrando 5 compuestos inventados (o de tu libro de química) en los 3 sistemas." },
    ],
    estimatedMinutes: 90,
  },
  {
    day: 12,
    title: "Química: enlaces químicos",
    subtopics: ["Enlaces químicos"],
    goals: [
      "Diferenciar enlace iónico, covalente polar, covalente apolar y metálico",
      "Explicar qué representan las estructuras de Lewis",
    ],
    activities: [
      { type: "tablas", description: "Memoriza la tabla de tipos de enlaces químicos con sus ejemplos." },
      { type: "flashcards", description: "Flashcards de 'Enlaces químicos'." },
      { type: "quiz", description: "Quiz de Ciencias Básicas enfocado en Enlaces químicos." },
    ],
    estimatedMinutes: 90,
  },
  {
    day: 13,
    title: "Reacción y ecuación química + Simulacro general de Química",
    subtopics: ["Reacciones químicas"],
    goals: [
      "Reconocer los 4 tipos de reacción (síntesis, descomposición, desplazamiento simple, doble desplazamiento)",
      "Explicar qué significa balancear una ecuación y por qué es obligatorio",
      "Aprobar un simulacro que mezcle los 5 bloques de Química con al menos 80% de aciertos",
    ],
    activities: [
      { type: "nemotecnias", description: "Aprende la nemotecnia SDDD para los 4 tipos de reacción química." },
      { type: "flashcards", description: "Flashcards de 'Reacciones químicas'." },
      { type: "simulacro", description: "Simulacro: quiz largo de Ciencias Básicas, respondiendo solo preguntas de Química (los 5 bloques). Meta: ≥80% de aciertos." },
      { type: "repaso", description: "Revisa cada pregunta fallada del simulacro y vuelve a su flashcard/tabla correspondiente." },
    ],
    estimatedMinutes: 120,
  },
  {
    day: 14,
    title: "Simulacro general mixto (Biología + Química)",
    subtopics: ["Niveles de organización", "Biomoléculas", "Célula", "Metabolismo celular", "División celular", "Genética mendeliana", "ADN", "Estructura atómica", "Tabla periódica", "Nomenclatura química", "Enlaces químicos", "Reacciones químicas"],
    goals: [
      "Rendir un simulacro completo, mezclando los 12 bloques temáticos, en condiciones similares al examen real (sin pausas, cronometrado)",
      "Identificar tus 2 o 3 bloques más débiles para reforzarlos en las últimas horas",
    ],
    activities: [
      { type: "simulacro", description: "Simulacro completo: responde el mayor número de preguntas de Ciencias Básicas posible, cronometrado, sin consultar las flashcards." },
      { type: "repaso", description: "Haz una lista de los bloques temáticos donde tuviste más errores y repásalos con flashcards y tablas esta misma tarde." },
      { type: "nemotecnias", description: "Repasa todas las nemotecnias de Ciencias Básicas de corrido, una vez." },
    ],
    estimatedMinutes: 140,
  },
  {
    day: 15,
    title: "Repaso final ligero y descanso activo — día antes del examen",
    subtopics: ["Niveles de organización", "Biomoléculas", "Célula", "Metabolismo celular", "División celular", "Genética mendeliana", "ADN", "Estructura atómica", "Tabla periódica", "Nomenclatura química", "Enlaces químicos", "Reacciones químicas"],
    goals: [
      "Repasar de forma ligera, sin cansarte ni estudiar temas nuevos",
      "Llegar al examen con confianza, buen descanso y materiales listos",
    ],
    activities: [
      { type: "nemotecnias", description: "Repaso relámpago de todas las nemotecnias (15-20 minutos, sin profundizar)." },
      { type: "flashcards", description: "Repasa solo las flashcards que marcaste como difíciles durante los 14 días anteriores." },
      { type: "descanso", description: "Detén el estudio activo a media tarde. Prepara tu documentación y materiales para el examen, y duerme al menos 7-8 horas." },
    ],
    estimatedMinutes: 60,
  },
];
