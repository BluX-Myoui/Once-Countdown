# Cliente API tipado

Archivo: `client/src/api/client.ts`

## Endpoints

| Metodo | Ruta | Uso |
|--------|------|-----|
| GET | `/api/v1/events` | Listar (query: `type`, `tourName`, `upcoming`) |
| GET | `/api/v1/events/featured` | Evento destacado (home) |
| GET | `/api/v1/events/meta` | Tipos y tours |
| POST | `/api/v1/events` | Crear |
| PATCH | `/api/v1/events/:id` | Actualizar |
| DELETE | `/api/v1/events/:id` | Borrar |

## Tipos

`client/src/types/event.ts` — `FanEvent`, `EventType`, `CountdownParts`.

## Desarrollo

Vite proxy `/api` → `http://localhost:3001`.

## Produccion

Rutas relativas `/api/v1/events` en el mismo dominio Vercel.
