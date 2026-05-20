# ONCE Countdown Hub

**Comeback Countdown Hub** — proyecto propio **Fase 5**. Panel fan para cuentas atrás del world tour **TWICE «THIS IS FOR» (2026)**, comebacks, MVs y fechas ONCE.

| | |
|---|---|
| **Autor / fan** | **Blux Myoui** *(nombre de fan; no oficial)* |
| **Curso** | Fase 5 — proyecto educativo propio |
| **Stack** | React 19 · TypeScript · Tailwind CSS 4 · Express · Vercel |

> Proyecto fan **no oficial**. Sin afiliación a JYP Entertainment ni a TWICE. Nombres y estética usados con fines académicos. Sin logos ni assets con copyright de JYP.

---

## Características

- Cuenta atrás en vivo al **evento destacado** (seed THIS IS FOR 2026 por defecto)
- **CRUD** de eventos vía API REST (`world_tour`, `comeback`, `mv_release`, `fanmeet`, `other`)
- Filtros por tipo en la página Eventos
- Marcar evento **destacado** para la home
- UI 2026: glassmorphism, orbes animados, gradientes y microinteracciones
- Cliente API tipado y despliegue listo para **Vercel**

---

## Estructura del repositorio

```
comeback-countdown-hub/
├── client/          # Frontend React 19 + Vite (puerto 5174 en dev)
│   └── src/
│       ├── api/         # Cliente fetch tipado
│       ├── components/  # Layout, CountdownHero, EventCard, EventForm
│       ├── context/     # EventContext (estado global)
│       ├── hooks/       # useCountdown
│       └── pages/       # Home, Eventos, Acerca, 404
├── server/          # API Express (puerto 3001 en dev)
│   └── src/
│       ├── routes/      # event.routes.js
│       ├── controllers/
│       └── services/    # Memoria + seed THIS IS FOR
├── api/             # Handler serverless Vercel → Express
├── docs/            # Idea, diseño, agile, API, despliegue
├── vercel.json      # Build + rewrites + functions
└── .vscode/         # PATH Node para terminales en Cursor/VS Code
```

---

## Requisitos

- **Node.js** ≥ 18 (recomendado LTS 20+)
- **npm** 9+

---

## Arranque local

Necesitas **dos terminales** (API + frontend).

### Terminal 1 — API (puerto **3001**)

```bash
cd server
npm install
npm run dev
```

Debe mostrar: `ONCE Countdown Hub API → http://localhost:3001`

### Terminal 2 — Frontend (puerto **5174**)

```bash
cd client
npm install
npm run dev
```

Abre en el navegador: **http://localhost:5174**

> El proxy de Vite redirige `/api` → `http://localhost:3001`. No uses solo el puerto 3001 en desarrollo si quieres hot reload del cliente.

### Scripts desde la raíz (opcional)

```bash
npm run dev:server   # API
npm run dev:client   # Frontend
npm run build        # Build producción del client → client/dist
```

### Si `npm` no se reconoce (Windows)

```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
```

O cierra y abre de nuevo la terminal / Cursor (ver `.vscode/settings.json`).

---

## Rutas de la aplicación

| Ruta | Página |
|------|--------|
| `/` | Inicio — countdown al evento destacado + estadísticas |
| `/eventos` | Calendario ONCE — listado, filtros, formulario CRUD |
| `/acerca` | Acerca del proyecto (Fase 5, stack, paleta) |

---

## API REST (`/api/v1`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/v1/health` | Estado del servicio |
| `GET` | `/api/v1/events` | Listar (query: `type`, `tourName`, `upcoming`) |
| `GET` | `/api/v1/events/featured` | Evento destacado |
| `GET` | `/api/v1/events/meta` | Metadatos (tipos, tours) |
| `GET` | `/api/v1/events/:id` | Un evento |
| `POST` | `/api/v1/events` | Crear |
| `PATCH` | `/api/v1/events/:id` | Actualizar |
| `DELETE` | `/api/v1/events/:id` | Eliminar |

Detalle del cliente tipado: [`docs/api-client.md`](docs/api-client.md).

---

## Paleta THIS IS FOR 2026

| Token | Hex | Uso |
|-------|-----|-----|
| Pink | `#ff2d7a` | Primario, CTAs, acentos |
| Hot | `#ff5cab` | Gradientes |
| Magenta | `#b8145c` | Fondos, orbes |
| Glow | `#ff9ec8` | Texto destacado |
| Gold | `#f0c14a` | Tour, chips |
| Dark | `#0c0610` | Fondo base |
| Panel | `#1a0f1f` | Glass panels |
| Cream | `#fff0f6` | Texto principal |

Fuentes: **Syne** (display), **Outfit** (UI).

---

## Producción (Vercel)

1. Importa este repositorio en [Vercel](https://vercel.com).
2. Usa el `vercel.json` de la raíz (build `client/dist` + función `api/index.js`).
3. Tras el deploy, comprueba:
   - `/` — UI
   - `/api/v1/health` — `{ "status": "ok" }`
   - `/eventos` — CRUD

Guía completa: [`docs/deployment.md`](docs/deployment.md).

**Nota:** Los datos viven en memoria en el servidor; un cold start en Vercel puede reiniciar el seed.

---

## Documentación del proyecto (Fase 5)

| Archivo | Contenido |
|---------|-----------|
| [`docs/idea.md`](docs/idea.md) | Problema, público, funcionalidades |
| [`docs/design.md`](docs/design.md) | Arquitectura y flujo de datos |
| [`docs/agile.md`](docs/agile.md) | Kanban / Scrum |
| [`docs/project-management.md`](docs/project-management.md) | Tablero Trello |
| [`docs/api-client.md`](docs/api-client.md) | Cliente API tipado |
| [`docs/deployment.md`](docs/deployment.md) | Despliegue Vercel |
| [`docs/retrospective.md`](docs/retrospective.md) | Retrospectiva |

---

## Créditos y disclaimer

- **Creado por:** Blux Myoui (nombre de fan; no vinculado a JYP ni a los artistas).
- **Inspiración:** TWICE — World Tour «THIS IS FOR» (2026).
- **Licencia:** Proyecto académico / educativo; no redistribuir assets oficiales de terceros.

---

## Autor

**Blux Myoui** — Fase 5 · ONCE Countdown Hub · 2026
