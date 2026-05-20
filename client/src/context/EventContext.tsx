import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';
import { eventApi } from '../api/client';
import type { EventMeta, EventType, FanEvent } from '../types/event';

interface EventContextValue {
  events: FanEvent[];
  featured: FanEvent | null;
  meta: EventMeta | null;
  loading: boolean;
  syncing: boolean;
  error: string | null;
  filterType: EventType | 'all';
  setFilterType: (t: EventType | 'all') => void;
  refresh: (opts?: { silent?: boolean }) => Promise<void>;
  createEvent: (data: Partial<FanEvent>) => Promise<void>;
  updateEvent: (id: string, data: Partial<FanEvent>) => Promise<void>;
  removeEvent: (id: string) => Promise<void>;
  setFeatured: (id: string) => Promise<void>;
}

const EventContext = createContext<EventContextValue | null>(null);

function applyFeatured(events: FanEvent[], featuredId: string): FanEvent[] {
  return events.map((e) => ({ ...e, featured: e.id === featuredId }));
}

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<FanEvent[]>([]);
  const [featured, setFeaturedState] = useState<FanEvent | null>(null);
  const [meta, setMeta] = useState<EventMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<EventType | 'all'>('all');

  const refresh = useCallback(async (opts?: { silent?: boolean }) => {
    const silent = opts?.silent ?? false;
    if (!silent) setLoading(true);
    else setSyncing(true);
    setError(null);
    try {
      const [list, feat, metaData] = await Promise.all([
        eventApi.getAll(),
        eventApi.getFeatured().catch(() => null),
        eventApi.getMeta()
      ]);
      setEvents(list);
      setFeaturedState(feat);
      setMeta(metaData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de red');
    } finally {
      if (!silent) setLoading(false);
      else setSyncing(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const createEvent = useCallback(
    async (data: Partial<FanEvent>) => {
      await eventApi.create(data);
      await refresh({ silent: true });
    },
    [refresh]
  );

  const updateEvent = useCallback(
    async (id: string, data: Partial<FanEvent>) => {
      await eventApi.patch(id, data);
      await refresh({ silent: true });
    },
    [refresh]
  );

  const removeEvent = useCallback(
    async (id: string) => {
      const snapshot = events;
      const snapshotFeatured = featured;
      setEvents((prev) => prev.filter((e) => e.id !== id));
      if (featured?.id === id) setFeaturedState(null);
      setError(null);
      try {
        await eventApi.remove(id);
        const [list, feat] = await Promise.all([
          eventApi.getAll(),
          eventApi.getFeatured().catch(() => null)
        ]);
        setEvents(list);
        setFeaturedState(feat);
      } catch (err) {
        setEvents(snapshot);
        setFeaturedState(snapshotFeatured);
        setError(err instanceof Error ? err.message : 'No se pudo borrar');
      }
    },
    [events, featured]
  );

  const setFeatured = useCallback(
    async (id: string) => {
      const target = events.find((e) => e.id === id);
      if (!target) return;

      const snapshot = events;
      const snapshotFeatured = featured;

      setEvents(applyFeatured(events, id));
      setFeaturedState({ ...target, featured: true });
      setError(null);

      try {
        await eventApi.patch(id, { featured: true });
        const [list, feat] = await Promise.all([
          eventApi.getAll(),
          eventApi.getFeatured().catch(() => ({ ...target, featured: true }))
        ]);
        setEvents(list);
        setFeaturedState(feat);
      } catch (err) {
        setEvents(snapshot);
        setFeaturedState(snapshotFeatured);
        setError(err instanceof Error ? err.message : 'No se pudo destacar');
      }
    },
    [events, featured]
  );

  const filtered = useMemo(() => {
    if (filterType === 'all') return events;
    return events.filter((e) => e.type === filterType);
  }, [events, filterType]);

  const value = useMemo(
    () => ({
      events: filtered,
      featured,
      meta,
      loading,
      syncing,
      error,
      filterType,
      setFilterType,
      refresh,
      createEvent,
      updateEvent,
      removeEvent,
      setFeatured
    }),
    [
      filtered,
      featured,
      meta,
      loading,
      syncing,
      error,
      filterType,
      refresh,
      createEvent,
      updateEvent,
      removeEvent,
      setFeatured
    ]
  );

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}

export function useEvents() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error('useEvents debe usarse dentro de EventProvider');
  return ctx;
}
