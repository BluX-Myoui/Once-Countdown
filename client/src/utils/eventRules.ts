import type { FanEvent } from '../types/event';

/** Seed / World Tour THIS IS FOR 2026: no se pueden borrar. */
export function isProtectedFromDelete(event: FanEvent): boolean {
  if (!event.official || event.type !== 'world_tour') return false;
  return new Date(event.startsAt).getFullYear() >= 2026;
}
