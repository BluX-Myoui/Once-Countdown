import { EventCard } from '../components/EventCard';
import { EventForm } from '../components/EventForm';
import { useEvents } from '../context/EventContext';
import type { EventType } from '../types/event';
import { TYPE_LABELS } from '../utils/labels';

const FILTERS: { id: EventType | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'world_tour', label: 'World Tour' },
  { id: 'comeback', label: 'Comeback' },
  { id: 'mv_release', label: 'MV' },
  { id: 'fanmeet', label: 'Fanmeet' }
];

export function EventsPage() {
  const {
    events,
    loading,
    error,
    filterType,
    setFilterType,
    createEvent,
    removeEvent,
    setFeatured
  } = useEvents();

  return (
    <div className="space-y-fluid min-w-0">
      <header className="animate-in">
        <h2 className="font-display text-page-fluid font-extrabold text-gradient-glow">Calendario ONCE</h2>
        <p className="mt-3 text-[0.94rem] text-white/60 sm:text-base">Tour, comebacks y fechas personales.</p>
      </header>

      <div className="animate-in-delay-1 flex flex-wrap gap-fluid">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilterType(f.id)}
            className={`nav-pill btn-nav-fluid rounded-full font-semibold ${
              filterType === f.id
                ? 'filter-pill--active text-white'
                : 'bg-white/10 text-white/70'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid min-w-0 gap-fluid-lg lg:grid-cols-[minmax(0,1fr)_clamp(300px,33vw,400px)]">
        <section className="min-w-0">
          {loading && (
            <div className="glass-for panel-pad-fluid skeleton-shimmer min-h-[120px] rounded-[var(--radius-md)]" />
          )}
          {error && <p className="text-red-300">{error}</p>}
          {!loading && !error && events.length === 0 && (
            <p className="glass-for panel-pad-fluid min-h-[180px] content-center rounded-[var(--radius-md)] text-center text-[0.98rem] text-white/50">
              Sin eventos para {filterType === 'all' ? 'ningun filtro' : TYPE_LABELS[filterType]}.
            </p>
          )}
          <div className="grid gap-fluid-lg sm:grid-cols-2">
            {events.map((ev, i) => (
              <EventCard
                key={ev.id}
                event={ev}
                style={{ animationDelay: `${0.05 + i * 0.06}s` }}
                onDelete={(id) => void removeEvent(id)}
                onFeature={(id) => void setFeatured(id)}
              />
            ))}
          </div>
        </section>
        <EventForm
          onSubmit={(data) =>
            createEvent({
              ...data,
              era: data.tourName || '2026',
              venue: '',
              endsAt: null,
              featured: false,
              official: false
            })
          }
        />
      </div>
    </div>
  );
}
