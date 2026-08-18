import type { QuizQuestion } from "@/types/content";

export const saludPublicaQuestions: QuizQuestion[] = [
  {
    id: "sp-001",
    topicId: "salud-publica",
    subtopic: "Epidemiología",
    difficulty: "intermedio",
    stem: "Un estudio compara la exposición a un factor de riesgo entre casos y controles de una enfermedad rara. ¿Qué medida de asociación es la más apropiada de calcular en este diseño?",
    options: ["Riesgo relativo", "Razón de momios (odds ratio)", "Incidencia acumulada", "Tasa de mortalidad"],
    correctIndex: 1,
    explanation:
      "En estudios de casos y controles no se puede calcular incidencia directamente, por lo que la medida de asociación apropiada es la razón de momios (odds ratio), que aproxima al riesgo relativo cuando la enfermedad es rara.",
    source: { label: "Gordis — Epidemiology, 6.ª ed." },
  },
  {
    id: "sp-002",
    topicId: "salud-publica",
    subtopic: "Sistema de salud de Guatemala",
    difficulty: "basico",
    stem: "¿Cuál es el ente rector del sistema de salud pública en Guatemala?",
    options: [
      "Instituto Guatemalteco de Seguridad Social (IGSS)",
      "Ministerio de Salud Pública y Asistencia Social (MSPAS)",
      "Colegio de Médicos y Cirujanos de Guatemala",
      "Organización Panamericana de la Salud (OPS)",
    ],
    correctIndex: 1,
    explanation:
      "El MSPAS es la entidad rectora del sector salud en Guatemala, responsable de las políticas de salud pública a nivel nacional; el IGSS es el ente de seguridad social para trabajadores afiliados.",
    source: { label: "Ministerio de Salud Pública y Asistencia Social de Guatemala — Marco institucional" },
  },
  {
    id: "sp-003",
    topicId: "salud-publica",
    subtopic: "Bioestadística",
    difficulty: "intermedio",
    stem: "Una prueba diagnóstica tiene alta sensibilidad pero baja especificidad. ¿Para qué es más útil clínicamente este tipo de prueba?",
    options: [
      "Confirmar la enfermedad en pacientes con resultado positivo",
      "Descartar la enfermedad cuando el resultado es negativo (tamizaje)",
      "Determinar el pronóstico de la enfermedad",
      "Reemplazar completamente a las pruebas confirmatorias",
    ],
    correctIndex: 1,
    explanation:
      "Una prueba muy sensible tiene pocos falsos negativos, por lo que un resultado negativo prácticamente descarta la enfermedad (regla mnemotécnica SnNout), siendo ideal para tamizaje poblacional.",
    source: { label: "Gordis — Epidemiology, 6.ª ed. — Validez de pruebas diagnósticas" },
  },
  {
    id: "sp-004",
    topicId: "salud-publica",
    subtopic: "Ética médica",
    difficulty: "basico",
    stem: "Un paciente competente rechaza una transfusión sanguínea después de recibir información completa sobre riesgos y beneficios. ¿Qué principio bioético prevalece en esta decisión?",
    options: ["Beneficencia", "No maleficencia", "Autonomía", "Justicia"],
    correctIndex: 2,
    explanation:
      "El principio de autonomía respalda el derecho del paciente competente e informado a aceptar o rechazar un tratamiento, incluso si el equipo médico considera que no es la mejor opción clínica.",
    source: { label: "Beauchamp & Childress — Principles of Biomedical Ethics" },
  },
  {
    id: "sp-005",
    topicId: "salud-publica",
    subtopic: "Epidemiología",
    difficulty: "intermedio",
    stem: "Durante un brote de enfermedad transmitida por alimentos en una comunidad, ¿cuál es el primer paso en la investigación epidemiológica de campo?",
    options: [
      "Implementar cuarentena general inmediata",
      "Confirmar la existencia del brote y verificar el diagnóstico",
      "Publicar los resultados en medios de comunicación",
      "Calcular directamente la razón de momios sin más pasos previos",
    ],
    correctIndex: 1,
    explanation:
      "Los pasos clásicos de investigación de un brote inician con confirmar el diagnóstico y la existencia real del brote, antes de definir caso, contar casos, caracterizar por tiempo-lugar-persona y generar hipótesis.",
    source: { label: "CDC — Steps of an Outbreak Investigation" },
  },
  {
    id: "sp-006",
    topicId: "salud-publica",
    subtopic: "Niveles de atención",
    difficulty: "basico",
    stem: "Una campaña de vacunación infantil dirigida a prevenir la aparición de enfermedades en niños sanos corresponde a:",
    options: ["Prevención primaria", "Prevención secundaria", "Prevención terciaria", "Prevención cuaternaria"],
    correctIndex: 0,
    explanation:
      "La prevención primaria busca evitar la aparición de la enfermedad antes de que ocurra (vacunación, promoción de estilos de vida saludables); la secundaria detecta enfermedad temprana (tamizajes) y la terciaria limita el daño/discapacidad ya establecida.",
    source: { label: "OPS/OMS — Niveles de prevención en salud pública" },
  },
];
