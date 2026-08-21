import type { Mnemonic } from "@/types/content";

const BIO_SOURCES = {
  solomon: { label: "Solomon, Berg, Martin — Biología, 9.ª ed. (Cengage Learning, 2013)" },
  curtis: { label: "Curtis, Barnes, Schnek, Massarini — Biología, 7.ª ed. (Panamericana, 2008)" },
};

const CHEM_SOURCES = {
  chang: { label: "Chang, Goldsby — Química, 12.ª ed. (McGraw-Hill, 2016)" },
};

export const cienciasBasicasMnemonics: Mnemonic[] = [
  {
    id: "nm-cb-001",
    topicId: "ciencias-basicas",
    subtopic: "Niveles de organización",
    title: "Niveles de organización ecológica",
    keyword: "PCEB",
    breakdown: [
      { letter: "P", meaning: "Población — individuos de la misma especie en la misma área, capaces de reproducirse entre sí" },
      { letter: "C", meaning: "Comunidad — todas las poblaciones de distintas especies que interactúan en un área" },
      { letter: "E", meaning: "Ecosistema — la comunidad más los factores abióticos (agua, suelo, clima) con los que interactúa" },
      { letter: "B", meaning: "Biosfera — la suma de todos los ecosistemas del planeta" },
    ],
    usage: "Ayuda a ordenar y diferenciar los 4 niveles de organización 'ecológicos', los más altos de la jerarquía biológica, que suelen confundirse entre sí.",
    source: BIO_SOURCES.solomon,
  },
  {
    id: "nm-cb-002",
    topicId: "ciencias-basicas",
    subtopic: "Célula",
    title: "Mecanismos de transporte a través de la membrana",
    keyword: "DDOTE",
    breakdown: [
      { letter: "D", meaning: "Difusión simple — molécula pequeña a favor del gradiente, sin proteína ni ATP" },
      { letter: "D", meaning: "Difusión facilitada — a favor del gradiente, requiere proteína de canal/transportadora, sin ATP" },
      { letter: "O", meaning: "Ósmosis — agua a favor de su gradiente, a través de membrana semipermeable" },
      { letter: "T", meaning: "Transporte activo — en contra del gradiente, requiere ATP y proteína transportadora" },
      { letter: "E", meaning: "Endocitosis/Exocitosis — transporte de partículas grandes mediante vesículas" },
    ],
    usage: "Organiza los 5 mecanismos de transporte de membrana según si requieren proteínas, gasto de ATP, y a favor o en contra del gradiente de concentración.",
    source: BIO_SOURCES.curtis,
  },
  {
    id: "nm-cb-003",
    topicId: "ciencias-basicas",
    subtopic: "Metabolismo celular",
    title: "Orden y ubicación de la respiración celular aeróbica",
    keyword: "GKC",
    breakdown: [
      { letter: "G", meaning: "Glucólisis — en el citosol; produce 2 ATP netos y piruvato" },
      { letter: "K", meaning: "Krebs (ciclo del ácido cítrico) — en la matriz mitocondrial; libera CO2 y genera NADH/FADH2" },
      { letter: "C", meaning: "Cadena de transporte de electrones — en la membrana mitocondrial interna; genera la mayor parte del ATP" },
    ],
    usage: "Recuerda el orden secuencial y la ubicación celular de las tres etapas principales de la respiración celular aeróbica.",
    source: BIO_SOURCES.curtis,
  },
  {
    id: "nm-cb-004",
    topicId: "ciencias-basicas",
    subtopic: "División celular",
    title: "Fases del ciclo celular eucarionte",
    keyword: "GSGM",
    breakdown: [
      { letter: "G1", meaning: "Crecimiento celular y síntesis de proteínas/organelos" },
      { letter: "S", meaning: "Síntesis — replicación del ADN" },
      { letter: "G2", meaning: "Crecimiento y preparación final para la división" },
      { letter: "M", meaning: "Mitosis (división nuclear) y citocinesis (división del citoplasma)" },
    ],
    usage: "Recuerda el orden de las 4 fases del ciclo celular eucarionte y qué ocurre en cada una, clave para identificar en qué fase se replica el ADN.",
    source: BIO_SOURCES.solomon,
  },
  {
    id: "nm-cb-005",
    topicId: "ciencias-basicas",
    subtopic: "Genética mendeliana",
    title: "Las dos leyes de Mendel",
    keyword: "SI",
    breakdown: [
      { letter: "S", meaning: "Segregación (1.ª ley) — los 2 alelos de un gen se separan en la formación de gametos" },
      { letter: "I", meaning: "(Distribución) Independiente (2.ª ley) — genes en cromosomas distintos se heredan de forma independiente" },
    ],
    usage: "Diferencia rápidamente cuál ley de Mendel aplica en un problema de genética: si involucra un solo gen (Segregación) o varios genes en cromosomas distintos (Independiente).",
    source: BIO_SOURCES.solomon,
  },
  {
    id: "nm-cb-006",
    topicId: "ciencias-basicas",
    subtopic: "ADN",
    title: "Complementariedad de bases nitrogenadas del ADN",
    keyword: "A-T, G-C",
    breakdown: [
      { letter: "A-T", meaning: "Adenina se aparea con Timina, mediante 2 puentes de hidrógeno" },
      { letter: "G-C", meaning: "Guanina se aparea con Citosina, mediante 3 puentes de hidrógeno" },
    ],
    usage: "Regla básica para predecir la secuencia de la cadena complementaria de ADN a partir de una cadena molde conocida.",
    source: BIO_SOURCES.solomon,
  },
  {
    id: "nm-cb-007",
    topicId: "ciencias-basicas",
    subtopic: "Estructura atómica",
    title: "Partículas subatómicas: carga y ubicación",
    keyword: "PEN",
    breakdown: [
      { letter: "P", meaning: "Protón — carga positiva, en el núcleo" },
      { letter: "E", meaning: "Electrón — carga negativa, en la nube electrónica (fuera del núcleo)" },
      { letter: "N", meaning: "Neutrón — sin carga, en el núcleo" },
    ],
    usage: "Recordatorio rápido de la carga y ubicación de las tres partículas subatómicas fundamentales, base para entender número atómico, isótopos e iones.",
    source: CHEM_SOURCES.chang,
  },
  {
    id: "nm-cb-008",
    topicId: "ciencias-basicas",
    subtopic: "Reacciones químicas",
    title: "Los 4 tipos principales de reacciones químicas",
    keyword: "SDDD",
    breakdown: [
      { letter: "S", meaning: "Síntesis (combinación) — A + B → AB" },
      { letter: "D", meaning: "Descomposición — AB → A + B" },
      { letter: "D", meaning: "Desplazamiento simple — A + BC → AC + B" },
      { letter: "D", meaning: "Doble desplazamiento (metátesis) — AB + CD → AD + CB" },
    ],
    usage: "Ayuda a clasificar rápidamente el tipo de reacción química al identificar el patrón de reactivos y productos en una ecuación.",
    source: CHEM_SOURCES.chang,
  },
];
