import { useEffect, useId, useRef, useState } from 'react';

export interface OnceSelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface OnceSelectProps<T extends string> {
  label: string;
  value: T;
  options: OnceSelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

const VISIBLE_ROWS = 4;
const ROW_HEIGHT_REM = 2.65;

export function OnceSelect<T extends string>({
  label,
  value,
  options,
  onChange,
  className = ''
}: OnceSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`once-select ${open ? 'once-select--open' : ''} ${className}`}>
      <span className="text-white/60">{label}</span>
      <button
        type="button"
        className="once-select__trigger mt-1.5 w-full"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{selected?.label ?? 'Elegir...'}</span>
        <span className={`once-select__chevron ${open ? 'once-select__chevron--up' : ''}`} aria-hidden>
          ▾
        </span>
      </button>
      <ul
        id={listId}
        role="listbox"
        className="once-select__list"
        style={{ maxHeight: `calc(${VISIBLE_ROWS} * ${ROW_HEIGHT_REM}rem)` }}
        aria-hidden={!open}
      >
        {options.map((opt) => (
          <li key={opt.value} role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={opt.value === value}
              className={`once-select__option ${opt.value === value ? 'once-select__option--active' : ''}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
