import { useMemo, useState } from 'react';
import { EventCard } from '../components/EventCard';
import { EventForm } from '../components/EventForm';
import { EventSearchBar } from '../components/EventSearchBar';
import { useEvents } from '../context/EventContext';
import type { EventType } from '../types/event';
import { countSearchMatches, sortEventsBySearch } from '../utils/searchEvents';
import { TYPE_LABELS } from '../utils/labels';

const FILTERS: { id: EventType | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'world_tour', label: 'World Tour' },
  { id: 'comeback', label: 'Comeback' },
  { id: 'mv_release', label: 'MV' },
  { id: 'fanmeet', label: 'Fanmeet' }
];

type PagePanel = 'lista' | 'nuevo';

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

  const [search, setSearch] = useState('');
  const [panel, setPanel] = useState<PagePanel>('lista');

  const sortedEvents = useMemo(() => sortEventsBySearch(events, search), [events, search]);
  const matchCount = useMemo(() => countSearchMatches(events, search), [events, search]);

  return (
    <div className="space-y-fluid min-w-0">
      <header className="animate-in">
        <h2 className="font-display text-page-fluid font-extrabold text-gradient-glow">Calendario ONCE</h2>
        <p className="mt-3 text-[0.94rem] text-white/60 sm:text-base">
          Tour, comebacks y fechas personales. Busca sin perder el listado completo.
        </p>
      </header>

      <nav
        className="animate-in-delay-1 flex gap-1 lg:hidden"
        aria-label="Vista movil eventos"
      >
        <button
          type="button"
          onClick={() => setPanel('lista')}
          className={`form-tab btn-nav-fluid flex-1 rounded-full font-semibold ${
            panel === 'lista' ? 'form-tab--active' : 'text-white/60'
          }`}
        >
          Lista ({events.length})
        </button>
        <button
          type="button"
          onClick={() => setPanel('nuevo')}
          className={`form-tab btn-nav-fluid flex-1 rounded-full font-semibold ${
            panel === 'nuevo' ? 'form-tab--active' : 'text-white/60'
          }`}
        >
          Nuevo evento
        </button>
      </nav>

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

      <div className={`events-layout ${panel === 'nuevo' ? 'events-layout--form' : ''}`}>
        <section
          className={`events-list-column min-w-0 space-y-fluid ${panel === 'nuevo' ? 'hidden lg:block' : ''}`}
        >
          <EventSearchBar
            value={search}
            onChange={setSearch}
            matchCount={matchCount}
            total={sortedEvents.length}
          />

          {loading && (
            <div className="glass-for panel-pad-fluid skeleton-shimmer min-h-[120px] rounded-[var(--radius-md)]" />
          )}
          {error && <p className="text-red-300">{error}</p>}
          {!loading && !error && sortedEvents.length === 0 && (
            <p className="glass-for panel-pad-fluid min-h-[180px] content-center rounded-[var(--radius-md)] text-center text-[0.98rem] text-white/50">
              Sin eventos para {filterType === 'all' ? 'ningun filtro' : TYPE_LABELS[filterType]}.
            </p>
          )}

          <div className="events-list-shell glass-for rounded-[var(--radius-md)] p-3 sm:p-4">
            <div className="grid max-h-[min(68vh,640px)] gap-fluid-lg overflow-y-auto pr-1 sm:grid-cols-2">
              {sortedEvents.map((ev, i) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  searchQuery={search}
                  style={{ animationDelay: `${0.03 + i * 0.04}s` }}
                  onDelete={(id) => void removeEvent(id)}
                  onFeature={(id) => void setFeatured(id)}
                />
              ))}
            </div>
          </div>
        </section>

        <aside className={`events-form-column min-w-0 ${panel === 'lista' ? 'hidden lg:block' : ''}`}>
          <EventForm
            onSubmit={async (data) => {
              await createEvent({
                ...data,
                era: data.tourName || '2026',
                venue: '',
                endsAt: null,
                featured: false,
                official: false
              });
              setPanel('lista');
            }}
          />
        </aside>
      </div>
    </div>
  );
}
