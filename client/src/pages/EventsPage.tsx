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
    <div className="space-y-8">
      <header>
        <h2 className="font-display text-3xl font-extrabold text-white">Calendario ONCE</h2>
        <p className="mt-2 text-white/60">Tour, comebacks y fechas personales.</p>
      </header>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilterType(f.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              filterType === f.id
                ? 'bg-[var(--color-for-pink)] text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/15'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <section>
          {loading && <p className="text-white/50">Cargando...</p>}
          {error && <p className="text-red-300">{error}</p>}
          {!loading && !error && events.length === 0 && (
            <p className="glass-for rounded-2xl p-8 text-center text-white/50">
              Sin eventos para {filterType === 'all' ? 'ningun filtro' : TYPE_LABELS[filterType]}.
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {events.map((ev) => (
              <EventCard
                key={ev.id}
                event={ev}
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
