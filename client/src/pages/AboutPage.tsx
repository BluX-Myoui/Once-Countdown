export function AboutPage() {
  return (
    <article className="glass-for max-w-3xl space-y-6 rounded-3xl p-8">
      <h2 className="font-display text-3xl font-extrabold text-white">Acerca del proyecto</h2>
      <p className="text-white/75 leading-relaxed">
        <strong className="text-[var(--color-for-glow)]">ONCE Countdown Hub</strong> es mi idea de
        Fase 5: un panel fan para no perder fechas del world tour{' '}
        <strong>«THIS IS FOR»</strong> (2026), comebacks y MVs. Proyecto educativo no oficial.
      </p>
      <section>
        <h3 className="font-display text-lg font-bold text-[var(--color-for-gold)]">Stack</h3>
        <ul className="mt-2 list-inside list-disc text-white/65">
          <li>React 19 + TypeScript + Tailwind CSS 4 + React Router</li>
          <li>Node.js + Express (routes / controllers / services)</li>
          <li>API REST tipada y despliegue en Vercel</li>
        </ul>
      </section>
      <section>
        <h3 className="font-display text-lg font-bold text-[var(--color-for-gold)]">Paleta THIS IS FOR</h3>
        <p className="text-white/65">
          Rosa magenta, glow coral y acento dorado inspirados en la estetica del tour 2026 — sin assets
          oficiales de JYP.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            ['#ff2d7a', 'Pink'],
            ['#ff9ec8', 'Glow'],
            ['#f0c14a', 'Gold'],
            ['#0c0610', 'Dark']
          ].map(([hex, name]) => (
            <div key={hex} className="flex items-center gap-2">
              <span
                className="h-10 w-10 rounded-full border border-white/20"
                style={{ background: hex }}
              />
              <span className="text-xs text-white/50">{name}</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
