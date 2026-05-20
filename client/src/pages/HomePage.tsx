import { Link } from 'react-router-dom';
import { CountdownHero } from '../components/CountdownHero';
import { useEvents } from '../context/EventContext';

export function HomePage() {
  const { featured, loading, error, events } = useEvents();
  const tourDates = events.filter((e) => e.tourName === 'THIS IS FOR').length;

  if (loading) {
    return (
      <div className="glass-for panel-pad-fluid flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-[var(--radius-md)]">
        <div className="h-2 w-48 overflow-hidden rounded-full skeleton-shimmer" />
        <p className="loading-pulse text-center text-white/60">Cargando countdown...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-for panel-pad-fluid animate-in rounded-[var(--radius-md)] text-center text-red-300">
        <p>{error}</p>
        <p className="mt-2 text-sm text-white/50">¿API en marcha? cd server && npm run dev</p>
      </div>
    );
  }

  return (
    <div className="space-y-fluid min-w-0">
      <div className="animate-in text-center sm:text-left">
        <p className="text-[0.84rem] font-bold uppercase tracking-[0.25em] text-[var(--color-for-gold)] sm:text-sm">
          TWICE · 2026
        </p>
        <h2 className="font-display text-page-fluid mt-3 font-extrabold">
          <span className="text-gradient-hero">THIS IS FOR</span>
          <span className="mt-1 block text-gradient-glow">World Tour · 2026</span>
        </h2>
        <p className="mt-4 max-w-2xl text-[0.94rem] leading-relaxed text-white/65 sm:text-base">
          Cuenta atras al proximo evento, fechas del tour y comebacks en un solo panel para ONCE.
        </p>
      </div>

      {featured ? (
        <CountdownHero event={featured} />
      ) : (
        <p className="glass-for panel-pad-fluid animate-in-delay-2 rounded-[var(--radius-md)] text-center text-white/60">
          No hay evento destacado. Añade uno en Eventos.
        </p>
      )}

      <div className="grid gap-fluid-lg sm:grid-cols-3">
        <div className="glass-for stat-glow stat-min-fluid animate-in-delay-2 flex flex-col items-center justify-center rounded-[var(--radius-md)] p-[clamp(1rem,1.8vw,1.35rem)] text-center transition-transform duration-300">
          <p className="text-[clamp(1.75rem,4vw,2.25rem)] font-extrabold text-gradient-glow">{events.length}</p>
          <p className="mt-1 text-[0.84rem] text-white/50 sm:text-sm">Eventos totales</p>
        </div>
        <div className="glass-for stat-glow stat-min-fluid animate-in-delay-2 flex flex-col items-center justify-center rounded-[var(--radius-md)] p-[clamp(1rem,1.8vw,1.35rem)] text-center transition-transform duration-300">
          <p className="text-[clamp(1.75rem,4vw,2.25rem)] font-extrabold text-gradient-gold">{tourDates}</p>
          <p className="mt-1 text-[0.84rem] text-white/50 sm:text-sm">Fechas THIS IS FOR</p>
        </div>
        <div className="glass-for stat-glow stat-min-fluid animate-in-delay-3 flex flex-col items-center justify-center rounded-[var(--radius-md)] p-[clamp(1rem,1.8vw,1.35rem)] text-center transition-transform duration-300">
          <Link to="/eventos" className="btn-primary btn-nav-fluid inline-block rounded-full font-bold text-white">
            Gestionar eventos
          </Link>
        </div>
      </div>
    </div>
  );
}
