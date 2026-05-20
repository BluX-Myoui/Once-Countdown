import { Link } from 'react-router-dom';
import { CountdownHero } from '../components/CountdownHero';
import { useEvents } from '../context/EventContext';

export function HomePage() {
  const { featured, loading, error, events } = useEvents();
  const tourDates = events.filter((e) => e.tourName === 'THIS IS FOR').length;

  if (loading) {
    return <p className="text-center text-white/60">Cargando countdown...</p>;
  }

  if (error) {
    return (
      <div className="glass-for rounded-2xl p-6 text-center text-red-300">
        <p>{error}</p>
        <p className="mt-2 text-sm text-white/50">¿API en marcha? cd server && npm run dev</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center sm:text-left">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--color-for-gold)]">
          TWICE · 2026
        </p>
        <h2 className="font-display mt-2 text-3xl font-extrabold text-white sm:text-5xl">
          THIS IS FOR
          <span className="block text-[var(--color-for-glow)]">World Tour Hub</span>
        </h2>
        <p className="mt-3 max-w-2xl text-white/65">
          Cuenta atras al proximo evento, fechas del tour y comebacks en un solo panel para ONCE.
        </p>
      </div>

      {featured ? (
        <CountdownHero event={featured} />
      ) : (
        <p className="glass-for rounded-2xl p-6 text-center text-white/60">
          No hay evento destacado. Añade uno en Eventos.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-for rounded-2xl p-5 text-center">
          <p className="text-3xl font-extrabold text-[var(--color-for-glow)]">{events.length}</p>
          <p className="text-sm text-white/50">Eventos totales</p>
        </div>
        <div className="glass-for rounded-2xl p-5 text-center">
          <p className="text-3xl font-extrabold text-[var(--color-for-gold)]">{tourDates}</p>
          <p className="text-sm text-white/50">Fechas THIS IS FOR</p>
        </div>
        <div className="glass-for rounded-2xl p-5 text-center">
          <Link
            to="/eventos"
            className="inline-block rounded-full bg-[var(--color-for-pink)] px-5 py-2 text-sm font-bold text-white"
          >
            Gestionar eventos
          </Link>
        </div>
      </div>
    </div>
  );
}
