export function AboutPage() {
  return (
    <article className="glass-for panel-pad-fluid panel-radius-lg animate-in max-w-3xl space-y-[clamp(1.25rem,2vw,1.75rem)]">
      <h2 className="font-display text-page-fluid font-extrabold text-gradient-hero">Acerca del proyecto</h2>
      <p className="text-[0.94rem] leading-relaxed text-white/75 sm:text-base">
        <strong className="text-gradient-glow">ONCE Countdown Hub</strong> es el proyecto de{' '}
        <strong className="text-gradient-gold">Blux Myoui</strong> (nombre de fan, no oficial) para la
        Fase 5: un panel para no perder fechas del world tour{' '}
        <strong className="text-[var(--color-for-gold)]">«THIS IS FOR»</strong> (2026), comebacks y MVs.
        Proyecto educativo sin afiliación a JYP Entertainment.
      </p>
      <section className="animate-in-delay-1">
        <h3 className="font-display text-section-fluid font-bold text-gradient-gold">Stack</h3>
        <ul className="mt-3 list-inside list-disc space-y-1 text-[0.94rem] text-white/65 sm:text-base">
          <li>React 19 + TypeScript + Tailwind CSS 4 + React Router</li>
          <li>Node.js + Express (routes / controllers / services)</li>
          <li>API REST tipada y despliegue en Vercel</li>
        </ul>
      </section>
      <section className="animate-in-delay-2">
        <h3 className="font-display text-section-fluid font-bold text-gradient-gold">Paleta THIS IS FOR</h3>
        <p className="text-[0.94rem] text-white/65 sm:text-base">
          Rosa magenta, glow coral y acento dorado inspirados en la estetica del tour 2026 — sin assets
          oficiales de JYP.
        </p>
        <div className="mt-5 flex flex-wrap gap-fluid-lg">
          {[
            ['#ff2d7a', 'Pink'],
            ['#ff9ec8', 'Glow'],
            ['#f0c14a', 'Gold'],
            ['#0c0610', 'Dark']
          ].map(([hex, name]) => (
            <div key={hex} className="flex items-center gap-fluid">
              <span
                className="swatch h-11 w-11 rounded-full border border-white/25 sm:h-12 sm:w-12"
                style={{ background: hex, boxShadow: `0 0 24px ${hex}55` }}
              />
              <span className="text-xs text-white/50">{name}</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
