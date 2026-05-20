import type { FanEvent } from '../types/event';
import { getCountdown } from '../utils/countdown';
import { TYPE_LABELS, TYPE_STYLES } from '../utils/labels';

interface EventCardProps {
  event: FanEvent;
  onDelete: (id: string) => void;
  onFeature: (id: string) => void;
}

export function EventCard({ event, onDelete, onFeature }: EventCardProps) {
  const cd = getCountdown(event.startsAt);
  const date = new Date(event.startsAt).toLocaleString('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <article className="glass-for flex flex-col gap-3 rounded-2xl p-5 transition hover:border-[var(--color-for-pink)]/60">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${TYPE_STYLES[event.type]}`}>
          {TYPE_LABELS[event.type]}
        </span>
        {event.featured && (
          <span className="text-xs font-bold uppercase text-[var(--color-for-gold)]">Destacado</span>
        )}
      </div>
      <h3 className="font-display text-lg font-bold text-white">{event.title}</h3>
      <p className="text-sm text-white/55">{date}</p>
      {(event.city || event.country) && (
        <p className="text-sm text-[var(--color-for-glow)]">
          {[event.city, event.country].filter(Boolean).join(', ')}
        </p>
      )}
      <p className="text-sm font-semibold text-white/80">
        {cd.isPast ? 'Finalizado' : `Faltan ${cd.days}d ${cd.hours}h`}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {!event.featured && (
          <button
            type="button"
            onClick={() => onFeature(event.id)}
            className="rounded-lg bg-[var(--color-for-pink)]/25 px-3 py-1.5 text-xs font-semibold text-[var(--color-for-glow)]"
          >
            Destacar
          </button>
        )}
        <button
          type="button"
          onClick={() => onDelete(event.id)}
          className="rounded-lg border border-red-400/40 px-3 py-1.5 text-xs font-semibold text-red-300"
        >
          Borrar
        </button>
      </div>
    </article>
  );
}
