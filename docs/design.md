# Arquitectura

## Capas servidor

```
routes/event.routes.js
    → controllers/event.controller.js
        → services/event.service.js (memoria + seed)
```

## Frontend

- **EventContext** — estado global, filtros, CRUD
- **eventApi** (`client/src/api/client.ts`) — capa de red tipada
- **Pages** — Home (countdown), Events (CRUD), About, 404

## Flujo de datos

```
React UI → eventApi (fetch) → /api/v1/events → Express → event.service
```

## Persistencia

Memoria en el servidor (aceptable para practica). Reinicio en cold start de Vercel.
