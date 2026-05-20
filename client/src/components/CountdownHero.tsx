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
    <div className="glass-for glow-ring countdown-unit-fluid countdown-unit-glow flex flex-col items-center rounded-[var(--radius-md)] transition-transform duration-300">
      <span key={value} className="font-display countdown-digit-fluid countdown-tick font-extrabold text-gradient-hero">
        {value}
      </span>
      <span className="mt-1.5 text-[0.66rem] uppercase tracking-widest text-[var(--color-for-glow)] sm:text-[0.7rem]">
        {label}
      </span>
    </div>
  );
}

export function CountdownHero({ event, onSetFeatured }: CountdownHeroProps) {
  const cd = useCountdown(event.startsAt);

  const location = [event.venue, event.city, event.country].filter(Boolean).join(' · ');

  return (
    <section className="glass-for glass-hero glow-ring panel-pad-fluid panel-radius-lg animate-in-delay-2 overflow-hidden">
      <div className="relative z-[1] mb-5 flex flex-wrap items-center gap-fluid">
        <span className="chip-gold badge-chip rounded-full border border-[var(--color-for-gold)]/50 bg-[var(--color-for-gold)]/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-for-gold)]">
          {event.tourName || 'Featured'}
        </span>
        <span className="chip-pink badge-chip rounded-full border border-[var(--color-for-pink)]/40 bg-[var(--color-for-pink)]/15 px-3.5 py-1.5 text-xs font-semibold text-[var(--color-for-glow)]">
          {TYPE_LABELS[event.type]}
        </span>
        {event.official && (
          <span className="text-xs text-white/50">Oficial (seed)</span>
        )}
      </div>

      <h1 className="relative z-[1] font-display text-hero-fluid font-extrabold text-white">
        {event.title}
      </h1>
      {event.era && (
        <p className="relative z-[1] mt-2.5 text-[0.92rem] text-[var(--color-for-glow)] sm:text-sm">Era · {event.era}</p>
      )}
      {location && (
        <p className="relative z-[1] mt-1.5 text-[0.92rem] text-white/60 sm:text-sm">{location}</p>
      )}

      {cd && !cd.isPast ? (
        <div className="relative z-[1] mt-10 flex flex-wrap justify-center gap-fluid-lg">
          <Unit value={String(cd.days)} label="Dias" />
          <Unit value={pad2(cd.hours)} label="Horas" />
          <Unit value={pad2(cd.minutes)} label="Min" />
          <Unit value={pad2(cd.seconds)} label="Seg" />
        </div>
      ) : (
        <p className="relative z-[1] mt-10 text-center text-[1.02rem] font-semibold text-gradient-gold sm:text-lg">
          ¡El evento ya paso! Elige otro en Eventos.
        </p>
      )}

      {event.notes && (
        <p className="relative z-[1] mt-7 rounded-[var(--radius-sm)] border border-white/10 bg-black/25 p-[clamp(1rem,1.5vw,1.25rem)] text-[0.92rem] text-white/70 backdrop-blur-sm sm:text-sm">
          {event.notes}
        </p>
      )}

      {onSetFeatured && !event.featured && (
        <button
          type="button"
          onClick={onSetFeatured}
          className="btn-ghost btn-nav-fluid relative z-[1] mt-7 rounded-full font-semibold text-[var(--color-for-glow)]"
        >
          Mostrar en inicio
        </button>
      )}
    </section>
  );
}
