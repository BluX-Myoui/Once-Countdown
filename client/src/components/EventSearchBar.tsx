interface EventSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  matchCount: number;
  total: number;
}

export function EventSearchBar({ value, onChange, matchCount, total }: EventSearchBarProps) {
  const active = value.trim().length > 0;

  return (
    <div className="search-box glass-for rounded-[var(--radius-md)] p-3 sm:p-4">
      <label className="mb-2 block text-[0.7rem] font-bold uppercase tracking-wider text-[var(--color-for-gold)]">
        Buscar destino
      </label>
      <div className="search-input-wrap">
        <span className="search-icon" aria-hidden>
          ⌕
        </span>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ej. Espana, Berlin, comeback..."
          className="input-for search-input"
          aria-label="Buscar eventos"
        />
        <button
          type="button"
          className={`btn-clear-search ${active ? 'visible' : ''}`}
          onClick={() => onChange('')}
          aria-label="Limpiar busqueda"
        >
          ×
        </button>
      </div>
      <p className="mt-2 text-[0.78rem] text-white/45">
        {active ? (
          <>
            <span className="text-[var(--color-for-glow)]">{matchCount}</span> con mas coincidencia arriba ·{' '}
            {total} visibles (no se ocultan)
          </>
        ) : (
          <>Escribe para subir coincidencias al inicio; al borrar, vuelve el orden por fecha.</>
        )}
      </p>
    </div>
  );
}
