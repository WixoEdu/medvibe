/** Claves centralizadas de localStorage usadas en toda la app. */
export const STORAGE_KEYS = {
  quizHistory: "medvibe:quiz-history",
  flashcardLeitner: "medvibe:leitner:flashcards",
  gameScores: "medvibe:game-scores",
} as const;

export interface QuizAttempt {
  id: string;
  date: number;
  topicId: string;
  total: number;
  correct: number;
  mode: "practica" | "examen";
}

export interface GameScores {
  memoria: number[];
  contrarreloj: number[];
  ahorcado: number[];
}

export const EMPTY_GAME_SCORES: GameScores = {
  memoria: [],
  contrarreloj: [],
  ahorcado: [],
};
