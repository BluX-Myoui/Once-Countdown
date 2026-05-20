import type { EventType } from '../types/event';

export const TYPE_LABELS: Record<EventType, string> = {
  world_tour: 'World Tour',
  comeback: 'Comeback',
  mv_release: 'MV',
  fanmeet: 'Fanmeet',
  other: 'Otro'
};

export const TYPE_STYLES: Record<EventType, string> = {
  world_tour: 'bg-[var(--color-for-pink)]/25 text-[var(--color-for-glow)] border-[var(--color-for-pink)]/50',
  comeback: 'bg-[var(--color-for-gold)]/20 text-[var(--color-for-gold)] border-[var(--color-for-gold)]/40',
  mv_release: 'bg-violet-500/20 text-violet-200 border-violet-400/40',
  fanmeet: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
  other: 'bg-white/10 text-white/70 border-white/20'
};
