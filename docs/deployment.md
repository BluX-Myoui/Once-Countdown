# Despliegue Vercel

## URL de produccion (compartir en Git / entregas)

- **App:** https://once-countdown.vercel.app
- **Health API:** https://once-countdown.vercel.app/api/v1/health

Usa solo el dominio `once-countdown.vercel.app`. Los enlaces largos con `git-main` o hash del deploy son internos de Vercel.

## Configuracion

El `vercel.json` de la raiz:

- **Build:** `npm run build --prefix client`
- **Output:** `client/dist`
- **API:** `api/index.js` → Express

## Pasos

1. Repositorio: [BluX-Myoui/Once-Countdown](https://github.com/BluX-Myoui/Once-Countdown).
2. Importa en Vercel (preset Other).
3. Deploy automatico en cada push a `main`.

## Verificacion

- https://once-countdown.vercel.app/ — countdown THIS IS FOR
- https://once-countdown.vercel.app/api/v1/health — `{ "status": "ok" }`
- https://once-countdown.vercel.app/eventos — CRUD y buscador
