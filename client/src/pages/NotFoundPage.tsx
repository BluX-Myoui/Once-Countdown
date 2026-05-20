import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="glass-for glass-hero panel-pad-fluid panel-radius-lg animate-in min-h-[min(280px,40vh)] content-center text-center">
      <p className="font-display err-404 text-[clamp(3.5rem,12vw,6rem)] font-extrabold leading-none text-gradient-hero">
        404
      </p>
      <p className="mt-5 text-[0.98rem] text-white/70 sm:text-base">Esta ruta no existe en el hub.</p>
      <Link to="/" className="btn-primary btn-nav-fluid mt-8 inline-block rounded-full font-bold text-white">
        Volver al countdown
      </Link>
    </div>
  );
}
