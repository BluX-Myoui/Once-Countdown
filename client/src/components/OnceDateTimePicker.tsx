import { useEffect, useId, useMemo, useRef, useState } from 'react';

interface OnceDateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  label?: string;
}

const WEEK = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function toLocalInputValue(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function parseValue(value: string): Date {
  if (!value) return new Date();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function startWeekday(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export function OnceDateTimePicker({
  value,
  onChange,
  required,
  label = 'Fecha y hora'
}: OnceDateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = useMemo(() => parseValue(value), [value]);
  const [viewYear, setViewYear] = useState(selected.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected.getMonth());

  useEffect(() => {
    if (open) {
      setViewYear(selected.getFullYear());
      setViewMonth(selected.getMonth());
    }
  }, [open, selected]);

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

  const cells = useMemo(() => {
    const total = daysInMonth(viewYear, viewMonth);
    const offset = startWeekday(viewYear, viewMonth);
    const items: { day: number | null }[] = [];
    for (let i = 0; i < offset; i++) items.push({ day: null });
    for (let d = 1; d <= total; d++) items.push({ day: d });
    return items;
  }, [viewYear, viewMonth]);

  const displayLabel = value
    ? selected.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })
    : 'Elegir fecha y hora';

  function pickDay(day: number) {
    const next = new Date(selected);
    next.setFullYear(viewYear, viewMonth, day);
    onChange(toLocalInputValue(next));
  }

  function pickTime(h: number, m: number) {
    const next = new Date(selected);
    next.setHours(h, m, 0, 0);
    onChange(toLocalInputValue(next));
  }

  function shiftMonth(delta: number) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  }

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  return (
    <div
      ref={rootRef}
      className={`once-datetime ${open ? 'once-datetime--open' : ''}`}
    >
      <span className="text-white/60">{label}</span>
      <input type="hidden" value={value} required={required} />
      <button
        type="button"
        className="once-datetime__trigger mt-1.5 w-full"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{displayLabel}</span>
        <span className={`once-select__chevron ${open ? 'once-select__chevron--up' : ''}`} aria-hidden>
          ▾
        </span>
      </button>

      <div id={listId} className="once-datetime__panel" role="dialog" aria-hidden={!open}>
        <div className="once-datetime__cal">
          <div className="once-datetime__cal-head">
            <button type="button" className="once-datetime__nav" onClick={() => shiftMonth(-1)} aria-label="Mes anterior">
              ‹
            </button>
            <span className="once-datetime__month-label">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button type="button" className="once-datetime__nav" onClick={() => shiftMonth(1)} aria-label="Mes siguiente">
              ›
            </button>
          </div>
          <div className="once-datetime__weekdays">
            {WEEK.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="once-datetime__grid">
            {cells.map((cell, i) =>
              cell.day === null ? (
                <span key={`e-${i}`} className="once-datetime__day once-datetime__day--empty" />
              ) : (
                <button
                  key={`d-${cell.day}`}
                  type="button"
                  className={`once-datetime__day ${
                    selected.getDate() === cell.day &&
                    selected.getMonth() === viewMonth &&
                    selected.getFullYear() === viewYear
                      ? 'once-datetime__day--active'
                      : ''
                  }`}
                  onClick={() => pickDay(cell.day!)}
                >
                  {cell.day}
                </button>
              )
            )}
          </div>
          <div className="once-datetime__quick">
            <button
              type="button"
              className="once-datetime__quick-btn"
              onClick={() => {
                onChange(toLocalInputValue(new Date()));
                setOpen(false);
              }}
            >
              Hoy
            </button>
            <button
              type="button"
              className="once-datetime__quick-btn"
              onClick={() => {
                onChange('');
                setOpen(false);
              }}
            >
              Borrar
            </button>
          </div>
        </div>

        <div className="once-datetime__time">
          <span className="once-datetime__time-title">Hora</span>
          <div className="once-datetime__time-cols">
            <ul className="once-datetime__time-list" style={{ maxHeight: 'calc(4 * 2.65rem)' }}>
              {hours.map((h) => (
                <li key={h}>
                  <button
                    type="button"
                    className={`once-select__option ${
                      selected.getHours() === h ? 'once-select__option--active' : ''
                    }`}
                    onClick={() => pickTime(h, selected.getMinutes())}
                  >
                    {pad(h)}
                  </button>
                </li>
              ))}
            </ul>
            <ul className="once-datetime__time-list" style={{ maxHeight: 'calc(4 * 2.65rem)' }}>
              {minutes.map((m) => (
                <li key={m}>
                  <button
                    type="button"
                    className={`once-select__option ${
                      selected.getMinutes() === m ? 'once-select__option--active' : ''
                    }`}
                    onClick={() => pickTime(selected.getHours(), m)}
                  >
                    {pad(m)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
