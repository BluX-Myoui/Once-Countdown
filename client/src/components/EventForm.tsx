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

const fieldClass =
  'input-for input-touch mt-1.5 w-full rounded-[var(--radius-sm)] border border-white/15 bg-black/35 text-white';

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
    <form
      onSubmit={handleSubmit}
      className="glass-for panel-pad-fluid animate-in-delay-3 space-y-[clamp(1rem,1.5vw,1.25rem)] rounded-[var(--radius-md)]"
    >
      <h3 className="font-display text-section-fluid font-bold text-gradient-glow">Nuevo evento ONCE</h3>
      {error && <p className="text-sm text-red-300">{error}</p>}
      <label className="block text-[0.92rem] sm:text-sm">
        <span className="text-white/60">Titulo</span>
        <input
          required
          minLength={3}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={fieldClass}
          placeholder="Ej. THIS IS FOR — Madrid"
        />
      </label>
      <div className="grid gap-fluid-lg sm:grid-cols-2">
        <label className="block text-[0.92rem] sm:text-sm">
          <span className="text-white/60">Tipo</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as EventType)}
            className={fieldClass}
          >
            <option value="world_tour">World Tour</option>
            <option value="comeback">Comeback</option>
            <option value="mv_release">MV</option>
            <option value="fanmeet">Fanmeet</option>
            <option value="other">Otro</option>
          </select>
        </label>
        <label className="block text-[0.92rem] sm:text-sm">
          <span className="text-white/60">Tour</span>
          <input value={tourName} onChange={(e) => setTourName(e.target.value)} className={fieldClass} />
        </label>
      </div>
      <label className="block text-[0.92rem] sm:text-sm">
        <span className="text-white/60">Fecha y hora</span>
        <input
          required
          type="datetime-local"
          value={startsAt}
          onChange={(e) => setStartsAt(e.target.value)}
          className={fieldClass}
        />
      </label>
      <div className="grid gap-fluid-lg sm:grid-cols-2">
        <label className="block text-[0.92rem] sm:text-sm">
          <span className="text-white/60">Ciudad</span>
          <input value={city} onChange={(e) => setCity(e.target.value)} className={fieldClass} />
        </label>
        <label className="block text-[0.92rem] sm:text-sm">
          <span className="text-white/60">Pais</span>
          <input value={country} onChange={(e) => setCountry(e.target.value)} className={fieldClass} />
        </label>
      </div>
      <label className="block text-[0.92rem] sm:text-sm">
        <span className="text-white/60">Notas</span>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={fieldClass} />
      </label>
      <button
        type="submit"
        disabled={busy}
        className="btn-primary input-touch w-full rounded-full font-bold text-white disabled:opacity-50"
      >
        {busy ? 'Guardando...' : 'Añadir evento'}
      </button>
    </form>
  );
}
