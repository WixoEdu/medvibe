import type { Mnemonic } from "@/types/content";

export const saludPublicaMnemonics: Mnemonic[] = [
  {
    id: "nm-sp-001",
    topicId: "salud-publica",
    subtopic: "Epidemiología",
    title: "Pasos de investigación de un brote epidémico",
    keyword: "10 pasos CDC (resumido)",
    breakdown: [
      { letter: "1", meaning: "Confirmar el diagnóstico y la existencia del brote" },
      { letter: "2", meaning: "Definir e identificar los casos" },
      { letter: "3", meaning: "Describir por tiempo, lugar y persona" },
      { letter: "4", meaning: "Generar y evaluar hipótesis (estudio analítico)" },
      { letter: "5", meaning: "Implementar medidas de control y comunicar resultados" },
    ],
    usage: "Secuencia lógica para abordar la investigación de un brote en preguntas de caso de salud pública.",
    source: { label: "CDC — Steps of an Outbreak Investigation" },
  },
  {
    id: "nm-sp-002",
    topicId: "salud-publica",
    subtopic: "Bioestadística",
    title: "Interpretación rápida de pruebas diagnósticas",
    keyword: "SnNout / SpPin",
    breakdown: [
      { letter: "SnNout", meaning: "Sensibilidad alta + resultado Negativo → descarta la enfermedad" },
      { letter: "SpPin", meaning: "Especificidad alta + resultado Positivo → confirma la enfermedad" },
    ],
    usage: "Regla mnemotécnica clásica para decidir qué tipo de prueba (sensible o específica) usar según el objetivo clínico: tamizaje vs. confirmación.",
    source: { label: "Gordis — Epidemiology, 6.ª ed." },
  },
];
