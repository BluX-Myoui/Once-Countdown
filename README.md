# ONCE Countdown Hub

**Comeback Countdown Hub** — proyecto propio Fase 5. Panel fan para cuentas atras del world tour **TWICE «THIS IS FOR» (2026)**, comebacks y fechas ONCE.

> Proyecto educativo no oficial. Sin afiliacion a JYP Entertainment.

## Estructura

```
comeback-countdown-hub/
├── client/     # React 19 + TypeScript + Tailwind 4 + Router
├── server/     # Express (routes → controllers → services)
├── api/        # Handler serverless Vercel
└── docs/       # Idea, agile, API, despliegue
```

## Arranque local

**Terminal 1 — API (puerto 3001)**

```bash
cd server
npm install
npm run dev
```

**Terminal 2 — Frontend (puerto 5174)**

```bash
cd client
npm install
npm run dev
```

Abre **http://localhost:5174**

## Produccion (Vercel)

1. Crea repo en GitHub e importa en Vercel.
2. Usa el `vercel.json` de la raiz (build `client/dist` + API).
3. Tras deploy, prueba `/api/v1/health` y la UI.

## Documentacion

| Archivo | Contenido |
|---------|-----------|
| `docs/idea.md` | Problema, publico, features |
| `docs/design.md` | Arquitectura |
| `docs/agile.md` | Kanban / Scrum |
| `docs/api-client.md` | Cliente tipado |
| `docs/deployment.md` | Vercel |
| `docs/project-management.md` | Trello |

## Paleta THIS IS FOR 2026

Rosa `#ff2d7a`, glow `#ff9ec8`, dorado `#f0c14a`, fondo `#0c0610`.
