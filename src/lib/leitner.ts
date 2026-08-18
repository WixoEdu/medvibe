/**
 * Sistema de repetición espaciada tipo Leitner, simplificado para estudio
 * de examen (prioriza por caja en vez de fechas exactas, útil también
 * para repaso intensivo cerca del examen).
 *
 * Cajas 1 a 5: caja 1 = recién falladas / nunca vistas, caja 5 = dominadas.
 */

export const LEITNER_BOXES = 5;

export interface LeitnerEntry {
  box: number;
  lastReviewed: number;
  timesReviewed: number;
}

export type LeitnerState = Record<string, LeitnerEntry>;

export function getEntry(state: LeitnerState, cardId: string): LeitnerEntry {
  return state[cardId] ?? { box: 1, lastReviewed: 0, timesReviewed: 0 };
}

export function reviewCard(state: LeitnerState, cardId: string, knewIt: boolean): LeitnerState {
  const current = getEntry(state, cardId);
  const nextBox = knewIt ? Math.min(LEITNER_BOXES, current.box + 1) : 1;
  return {
    ...state,
    [cardId]: {
      box: nextBox,
      lastReviewed: Date.now(),
      timesReviewed: current.timesReviewed + 1,
    },
  };
}

/**
 * Ordena las tarjetas priorizando las cajas más bajas (menos dominadas),
 * de modo que un repaso corto se enfoque en lo que más falta reforzar.
 */
export function sortByPriority<T extends { id: string }>(cards: T[], state: LeitnerState): T[] {
  return [...cards].sort((a, b) => {
    const boxA = getEntry(state, a.id).box;
    const boxB = getEntry(state, b.id).box;
    if (boxA !== boxB) return boxA - boxB;
    return getEntry(state, a.id).lastReviewed - getEntry(state, b.id).lastReviewed;
  });
}

export function boxSummary(cardIds: string[], state: LeitnerState) {
  const counts = Array.from({ length: LEITNER_BOXES }, () => 0);
  for (const id of cardIds) {
    const box = getEntry(state, id).box;
    counts[box - 1] += 1;
  }
  return counts;
}
