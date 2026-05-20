import type { FanEvent } from '../types/event';
import { TYPE_LABELS } from './labels';

export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim();
}

const ALIASES: Record<string, string[]> = {
  espana: ['espana', 'spain', 'barcelona', 'madrid'],
  portugal: ['portugal', 'lisboa', 'lisbon'],
  francia: ['francia', 'france', 'paris'],
  italia: ['italia', 'italy', 'turin', 'torino'],
  alemania: ['alemania', 'germany', 'berlin', 'cologne', 'colonia'],
  japon: ['japon', 'japan', 'tokyo', 'osaka', 'nagoya', 'fukuoka'],
  corea: ['corea', 'korea', 'incheon', 'seoul', 'seul'],
  usa: ['usa', 'eeuu', 'estados unidos', 'inglewood', 'los angeles', 'chicago', 'austin']
};

export function scoreEvent(event: FanEvent, rawQuery: string): number {
  const q = normalizeSearchText(rawQuery);
  if (!q) return 0;

  const haystack = [
    event.title,
    event.city,
    event.country,
    event.venue,
    event.notes,
    event.tourName,
    event.era,
    TYPE_LABELS[event.type]
  ]
    .filter(Boolean)
    .map((s) => normalizeSearchText(String(s)));

  let score = 0;

  for (const field of haystack) {
    if (field === q) score += 120;
    else if (field.startsWith(q)) score += 70;
    else if (field.includes(q)) score += 40;
    else if (q.length >= 3 && field.split(/\s+/).some((w) => w.startsWith(q))) score += 25;
  }

  for (const [, words] of Object.entries(ALIASES)) {
    if (words.some((w) => q.includes(w) || w.includes(q))) {
      if (haystack.some((h) => words.some((w) => h.includes(w)))) {
        score += 55;
      }
    }
  }

  return score;
}

/** Reordena: coincidencias arriba; el resto sigue visible en orden original. */
export function sortEventsBySearch(events: FanEvent[], query: string): FanEvent[] {
  const q = query.trim();
  if (!q) return events;

  return [...events]
    .map((event, index) => ({ event, index, score: scoreEvent(event, q) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.index - b.index;
    })
    .map(({ event }) => event);
}

export function countSearchMatches(events: FanEvent[], query: string): number {
  const q = query.trim();
  if (!q) return 0;
  return events.filter((e) => scoreEvent(e, q) > 0).length;
}
