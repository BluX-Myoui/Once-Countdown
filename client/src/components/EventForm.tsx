import { useState, type FormEvent } from 'react';
import type { EventType } from '../types/event';

interface EventFormProps {
  onSubmit: (data: {
    title: string;
    type: EventType;
    startsAt: string;
    city: string;
    country: string;
    tourName: string;
    notes: string;
  }) => Promise<void>;
}

export function EventForm({ onSubmit }: EventFormProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<EventType>('world_tour');
  const [startsAt, setStartsAt] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [tourName, setTourName] = useState('THIS IS FOR');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await onSubmit({
        title,
        type,
        startsAt: new Date(startsAt).toISOString(),
        city,
        country,
        tourName,
        notes
      });
      setTitle('');
      setStartsAt('');
      setCity('');
      setCountry('');
      setNotes('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-for space-y-4 rounded-2xl p-5">
      <h3 className="font-display text-lg font-bold text-white">Nuevo evento ONCE</h3>
      {error && <p className="text-sm text-red-300">{error}</p>}
      <label className="block text-sm">
        <span className="text-white/60">Titulo</span>
        <input
          required
          minLength={3}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-white"
          placeholder="Ej. THIS IS FOR — Madrid"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-white/60">Tipo</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as EventType)}
            className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-white"
          >
            <option value="world_tour">World Tour</option>
            <option value="comeback">Comeback</option>
            <option value="mv_release">MV</option>
            <option value="fanmeet">Fanmeet</option>
            <option value="other">Otro</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-white/60">Tour</span>
          <input
            value={tourName}
            onChange={(e) => setTourName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-white"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-white/60">Fecha y hora</span>
        <input
          required
          type="datetime-local"
          value={startsAt}
          onChange={(e) => setStartsAt(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-white"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-white/60">Ciudad</span>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-white"
          />
        </label>
        <label className="block text-sm">
          <span className="text-white/60">Pais</span>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-white"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-white/60">Notas</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-white"
        />
      </label>
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-full bg-[var(--color-for-pink)] py-3 font-bold text-white shadow-lg shadow-[var(--color-for-pink)]/40 disabled:opacity-50"
      >
        {busy ? 'Guardando...' : 'Añadir evento'}
      </button>
    </form>
  );
}
