import type { FanEvent } from '../types/event';

/** Proximo en celebrarse primero; pasados al final (mas recientes primero entre pasados). */
export function sortByNextCelebration(events: FanEvent[]): FanEvent[] {
  const now = Date.now();
  return [...events].sort((a, b) => {
    const aT = new Date(a.startsAt).getTime();
    const bT = new Date(b.startsAt).getTime();
    const aPast = aT < now;
    const bPast = bT < now;
    if (aPast !== bPast) return aPast ? 1 : -1;
    if (!aPast) return aT - bT;
    return bT - aT;
  });
}
