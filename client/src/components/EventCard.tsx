import type { CSSProperties } from 'react';
import type { FanEvent } from '../types/event';
import { getCountdown } from '../utils/countdown';
import { HighlightText } from '../utils/highlight';
import { scoreEvent } from '../utils/searchEvents';
import { isProtectedFromDelete } from '../utils/eventRules';
import { TYPE_LABELS } from '../utils/labels';

interface EventCardProps {
  event: FanEvent;
  onDelete: (id: string) => void;
  onFeature: (id: string) => void;
  featuringId?: string | null;
  searchQuery?: string;
  style?: CSSProperties;
}

export function EventCard({
  event,
  onDelete,
  onFeature,
  featuringId = null,
  searchQuery = '',
  style
}: EventCardProps) {
  const cd = getCountdown(event.startsAt);
  const date = new Date(event.startsAt).toLocaleString('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  const location = [event.city, event.country].filter(Boolean).join(', ');
  const isTopMatch = searchQuery.trim().length > 0 && scoreEvent(event, searchQuery) > 0;
  const isFeaturing = featuringId === event.id;
  const protectedEvent = isProtectedFromDelete(event);

  return (
    <article
      style={style}
      className={`glass-for card-min-fluid event-card flex min-w-0 flex-col gap-fluid rounded-[var(--radius-md)] p-[clamp(1rem,1.8vw,1.35rem)] ${
        isTopMatch ? 'card-search-hit' : ''
      } ${event.featured ? 'event-card--featured' : ''}`}
    >
      <div className="flex min-w-0 flex-wrap items-start justify-between gap-fluid">
        <span className={`badge-chip badge-type badge-type--${event.type}`}>
          {TYPE_LABELS[event.type]}
        </span>
        {event.featured && (
          <span className="text-xs font-bold uppercase tracking-wider text-gradient-gold">Destacado</span>
        )}
        {isTopMatch && !event.featured && (
          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--color-for-gold)]">
            Coincide
          </span>
        )}
      </div>
      <h3 className="font-display text-[1.02rem] font-bold leading-snug text-white sm:text-lg">
        <HighlightText text={event.title} query={searchQuery} />
      </h3>
      <p className="text-[0.92rem] text-white/55 sm:text-sm">{date}</p>
      {location && (
        <p className="text-[0.92rem] text-[var(--color-for-glow)] sm:text-sm">
          <HighlightText text={location} query={searchQuery} />
        </p>
      )}
      <p className="text-[0.92rem] font-semibold text-white/80 sm:text-sm">
        {cd.isPast ? (
          <span className="text-white/50">Finalizado</span>
        ) : (
          <span className="text-gradient-glow">Faltan {cd.days}d {cd.hours}h</span>
        )}
      </p>
      <div className="mt-auto flex flex-wrap gap-fluid pt-3">
        {!event.featured && (
          <button
            type="button"
            disabled={isFeaturing}
            onClick={() => onFeature(event.id)}
            className={`btn-accent rounded-[var(--radius-sm)] px-3.5 py-2 text-xs font-semibold text-[var(--color-for-glow)] ${
              isFeaturing ? 'opacity-70' : ''
            }`}
          >
            {isFeaturing ? 'Destacando...' : 'Destacar'}
          </button>
        )}
        {!protectedEvent ? (
          <button
            type="button"
            onClick={() => onDelete(event.id)}
            className="btn-danger rounded-[var(--radius-sm)] border border-red-400/40 px-3.5 py-2 text-xs font-semibold text-red-300"
          >
            Borrar
          </button>
        ) : (
          <span className="px-2 py-2 text-[0.68rem] text-white/35" title="Evento oficial WT 2026">
            Oficial
          </span>
        )}
      </div>
    </article>
  );
}
