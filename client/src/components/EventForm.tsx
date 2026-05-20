import { useState, type FormEvent } from 'react';
import type { EventType } from '../types/event';
import { DateTimeField } from './DateTimeField';

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

type FormTab = 'evento' | 'lugar' | 'notas';

const TABS: { id: FormTab; label: string }[] = [
  { id: 'evento', label: 'Evento' },
  { id: 'lugar', label: 'Lugar y fecha' },
  { id: 'notas', label: 'Notas' }
];

export function EventForm({ onSubmit }: EventFormProps) {
  const [tab, setTab] = useState<FormTab>('evento');
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
    setError(null);

    if (!title.trim() || title.trim().length < 3) {
      setError('Completa el titulo (pestaña Evento).');
      setTab('evento');
      return;
    }
    if (!startsAt) {
      setError('Indica fecha y hora (pestaña Lugar y fecha).');
      setTab('lugar');
      return;
    }

    setBusy(true);
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
      setTab('evento');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-for form-panel animate-in-delay-3 flex max-h-[min(78vh,720px)] min-w-0 flex-col rounded-[var(--radius-md)]"
    >
      <div className="form-panel__head panel-pad-fluid border-b border-white/10 pb-4">
        <h3 className="font-display text-section-fluid font-bold text-gradient-glow">Nuevo evento</h3>
        <nav className="form-tabs mt-3 flex gap-1" aria-label="Pasos del formulario">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`form-tab btn-nav-fluid flex-1 rounded-full text-center text-[0.75rem] font-semibold sm:text-[0.8rem] ${
                tab === t.id ? 'form-tab--active' : 'text-white/60'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="form-panel__body panel-pad-fluid min-h-0 flex-1 overflow-y-auto">
        {error && <p className="mb-3 text-sm text-red-300">{error}</p>}

        {tab === 'evento' && (
          <div className="space-y-3 animate-in">
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
        )}

        {tab === 'lugar' && (
          <div className="space-y-3 animate-in">
            <label className="block text-[0.92rem] sm:text-sm">
              <span className="text-white/60">Fecha y hora</span>
              <DateTimeField required value={startsAt} onChange={setStartsAt} />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-[0.92rem] sm:text-sm">
                <span className="text-white/60">Ciudad</span>
                <input value={city} onChange={(e) => setCity(e.target.value)} className={fieldClass} />
              </label>
              <label className="block text-[0.92rem] sm:text-sm">
                <span className="text-white/60">Pais</span>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={fieldClass}
                  placeholder="Ej. Espana"
                />
              </label>
            </div>
          </div>
        )}

        {tab === 'notas' && (
          <div className="animate-in">
            <label className="block text-[0.92rem] sm:text-sm">
              <span className="text-white/60">Notas</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className={fieldClass}
                placeholder="Opcional: horarios, venue, links..."
              />
            </label>
          </div>
        )}
      </div>

      <div className="form-panel__foot panel-pad-fluid flex flex-wrap gap-2 border-t border-white/10 pt-4">
        {tab !== 'evento' && (
          <button
            type="button"
            className="btn-ghost btn-nav-fluid rounded-full font-semibold text-[var(--color-for-glow)]"
            onClick={() => setTab(tab === 'notas' ? 'lugar' : 'evento')}
          >
            Atras
          </button>
        )}
        {tab !== 'notas' ? (
          <button
            type="button"
            className="btn-accent btn-nav-fluid ml-auto rounded-full font-semibold text-white"
            onClick={() => setTab(tab === 'evento' ? 'lugar' : 'notas')}
          >
            Siguiente
          </button>
        ) : (
          <button
            type="submit"
            disabled={busy}
            className="btn-primary btn-nav-fluid ml-auto rounded-full font-bold text-white disabled:opacity-50"
          >
            {busy ? 'Guardando...' : 'Añadir evento'}
          </button>
        )}
      </div>
    </form>
  );
}
