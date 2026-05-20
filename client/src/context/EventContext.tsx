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
  error: string | null;
  filterType: EventType | 'all';
  setFilterType: (t: EventType | 'all') => void;
  refresh: () => Promise<void>;
  createEvent: (data: Partial<FanEvent>) => Promise<void>;
  updateEvent: (id: string, data: Partial<FanEvent>) => Promise<void>;
  removeEvent: (id: string) => Promise<void>;
  setFeatured: (id: string) => Promise<void>;
}

const EventContext = createContext<EventContextValue | null>(null);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<FanEvent[]>([]);
  const [featured, setFeaturedState] = useState<FanEvent | null>(null);
  const [meta, setMeta] = useState<EventMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<EventType | 'all'>('all');

  const refresh = useCallback(async () => {
    setLoading(true);
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
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const createEvent = useCallback(async (data: Partial<FanEvent>) => {
    await eventApi.create(data);
    await refresh();
  }, [refresh]);

  const updateEvent = useCallback(async (id: string, data: Partial<FanEvent>) => {
    await eventApi.patch(id, data);
    await refresh();
  }, [refresh]);

  const removeEvent = useCallback(async (id: string) => {
    await eventApi.remove(id);
    await refresh();
  }, [refresh]);

  const setFeatured = useCallback(async (id: string) => {
    await eventApi.patch(id, { featured: true });
    await refresh();
  }, [refresh]);

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
