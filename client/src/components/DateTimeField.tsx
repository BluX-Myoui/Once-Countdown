interface DateTimeFieldProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function DateTimeField({ value, onChange, required }: DateTimeFieldProps) {
  return (
    <div className="datetime-field">
      <div className="datetime-field__glow" aria-hidden />
      <input
        required={required}
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-for datetime-input"
      />
      <span className="datetime-field__hint">Calendario del sistema · tema ONCE</span>
    </div>
  );
}
