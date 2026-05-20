import type { CountdownParts } from '../types/event';

export function getCountdown(targetIso: string, now = Date.now()): CountdownParts {
  const target = new Date(targetIso).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, totalMs: diff };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false, totalMs: diff };
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}
