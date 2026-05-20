import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="glass-for rounded-3xl p-12 text-center">
      <p className="font-display text-6xl font-extrabold text-[var(--color-for-pink)]">404</p>
      <p className="mt-4 text-white/70">Esta ruta no existe en el hub.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-[var(--color-for-pink)] px-6 py-3 font-bold text-white"
      >
        Volver al countdown
      </Link>
    </div>
  );
}
