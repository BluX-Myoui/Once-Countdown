import { Link, NavLink, Outlet } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-pill btn-nav-fluid rounded-full font-semibold ${
    isActive ? 'nav-pill--active text-white' : 'text-[var(--color-for-cream)]/80'
  }`;

export function Layout() {
  return (
    <div className="min-h-screen">
      <div className="ambient-stage" aria-hidden>
        <div className="ambient-orb ambient-orb--pink" />
        <div className="ambient-orb ambient-orb--magenta" />
        <div className="ambient-orb ambient-orb--gold" />
      </div>
      <div className="ambient-mesh" aria-hidden />
      <div className="ambient-grain" aria-hidden />

      <header className="site-header sticky top-0 z-50 relative">
        <div className="shell-x shell-y-header flex min-w-0 flex-wrap items-center justify-between gap-fluid">
          <Link to="/" className="brand-link font-display text-brand-fluid font-extrabold tracking-tight">
            <span className="text-gradient-glow">ONCE</span>{' '}
            <span className="text-white">Countdown</span>
          </Link>
          <p className="tagline-pulse hidden text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--color-for-gold)] sm:block sm:text-xs">
            THIS IS FOR · World Tour 2026
          </p>
          <nav className="flex min-w-0 flex-wrap gap-fluid">
            <NavLink to="/" end className={linkClass}>
              Inicio
            </NavLink>
            <NavLink to="/eventos" className={linkClass}>
              Eventos
            </NavLink>
            <NavLink to="/acerca" className={linkClass}>
              Acerca
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="shell-x shell-y-main min-w-0">
        <div className="animate-in">
          <Outlet />
        </div>
      </main>

      <footer className="shell-x py-[clamp(2rem,4vw,3.5rem)] text-center text-[0.7rem] text-white/40 sm:text-xs">
        Proyecto fan no oficial · TWICE «THIS IS FOR» 2026
      </footer>
    </div>
  );
}
