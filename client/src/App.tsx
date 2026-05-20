import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { EventProvider } from './context/EventContext';
import { AboutPage } from './pages/AboutPage';
import { EventsPage } from './pages/EventsPage';
import { HomePage } from './pages/HomePage';

const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

export default function App() {
  return (
    <BrowserRouter>
      <EventProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="eventos" element={<EventsPage />} />
            <Route path="acerca" element={<AboutPage />} />
            <Route
              path="*"
              element={
                <Suspense
                  fallback={
                    <div className="glass-for panel-pad-fluid flex min-h-[160px] items-center justify-center rounded-[var(--radius-md)]">
                      <p className="loading-pulse text-white/50">Cargando...</p>
                    </div>
                  }
                >
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Route>
          <Route path="home" element={<Navigate to="/" replace />} />
        </Routes>
      </EventProvider>
    </BrowserRouter>
  );
}
