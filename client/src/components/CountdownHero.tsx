import type { FanEvent } from '../types/event';
import { useCountdown } from '../hooks/useCountdown';
import { pad2 } from '../utils/countdown';
import { TYPE_LABELS } from '../utils/labels';

interface CountdownHeroProps {
  event: FanEvent;
  onSetFeatured?: () => void;
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-for glow-ring flex min-w-[4.5rem] flex-col items-center rounded-2xl px-3 py-4 sm:min-w-[5.5rem]">
      <span className="font-display text-3xl font-extrabold text-white sm:text-4xl">{value}</span>
      <span className="mt-1 text-[0.65rem] uppercase tracking-widest text-[var(--color-for-glow)]">
        {label}
      </span>
    </div>
  );
}

export function CountdownHero({ event, onSetFeatured }: CountdownHeroProps) {
  const cd = useCountdown(event.startsAt);

  const location = [event.venue, event.city, event.country].filter(Boolean).join(' · ');

  return (
    <section className="glass-for glow-ring overflow-hidden rounded-3xl p-6 sm:p-10">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[var(--color-for-gold)]/50 bg-[var(--color-for-gold)]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-for-gold)]">
          {event.tourName || 'Featured'}
        </span>
        <span className="rounded-full border border-[var(--color-for-pink)]/40 bg-[var(--color-for-pink)]/15 px-3 py-1 text-xs font-semibold text-[var(--color-for-glow)]">
          {TYPE_LABELS[event.type]}
        </span>
        {event.official && (
          <span className="text-xs text-white/50">Oficial (seed)</span>
        )}
      </div>

      <h1 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl">
        {event.title}
      </h1>
      {event.era && (
        <p className="mt-2 text-sm text-[var(--color-for-glow)]">Era · {event.era}</p>
      )}
      {location && <p className="mt-1 text-sm text-white/60">{location}</p>}

      {cd && !cd.isPast ? (
        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
          <Unit value={String(cd.days)} label="Dias" />
          <Unit value={pad2(cd.hours)} label="Horas" />
          <Unit value={pad2(cd.minutes)} label="Min" />
          <Unit value={pad2(cd.seconds)} label="Seg" />
        </div>
      ) : (
        <p className="mt-8 text-center text-lg font-semibold text-[var(--color-for-gold)]">
          ¡El evento ya paso! Elige otro en Eventos.
        </p>
      )}

      {event.notes && (
        <p className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
          {event.notes}
        </p>
      )}

      {onSetFeatured && !event.featured && (
        <button
          type="button"
          onClick={onSetFeatured}
          className="mt-6 rounded-full border border-[var(--color-for-pink)]/50 px-4 py-2 text-sm font-semibold text-[var(--color-for-glow)] hover:bg-[var(--color-for-pink)]/20"
        >
          Mostrar en inicio
        </button>
      )}
    </section>
  );
}
