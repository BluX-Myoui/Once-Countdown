import { Link, NavLink, Outlet } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-[var(--color-for-pink)] text-white shadow-lg shadow-[var(--color-for-pink)]/30'
      : 'text-[var(--color-for-cream)]/80 hover:bg-white/10'
  }`;

export function Layout() {
  return (
    <div className="min-h-screen">
      <div className="ambient-mesh" aria-hidden />
      <header className="sticky top-0 z-50 border-b border-[var(--color-for-pink)]/20 bg-[var(--color-for-dark)]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="font-display text-xl font-extrabold tracking-tight">
            <span className="text-[var(--color-for-glow)]">ONCE</span>{' '}
            <span className="text-white">Countdown Hub</span>
          </Link>
          <p className="hidden text-xs uppercase tracking-[0.2em] text-[var(--color-for-gold)] sm:block">
            THIS IS FOR · World Tour 2026
          </p>
          <nav className="flex flex-wrap gap-2">
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
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-6xl px-4 py-10 text-center text-xs text-white/40">
        Proyecto fan no oficial · Fase 5 · TWICE «THIS IS FOR» 2026
      </footer>
    </div>
  );
}
