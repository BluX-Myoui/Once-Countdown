# Despliegue Vercel

## Configuracion

El `vercel.json` de la raiz:

- **Build:** `npm run build --prefix client`
- **Output:** `client/dist`
- **API:** `api/index.js` → Express

## Pasos

1. Repositorio: [BluX-Myoui/Once-Countdown](https://github.com/BluX-Myoui/Once-Countdown) (autor: Blux Myoui).
2. Importa en Vercel (preset Other).
3. Deploy automatico en cada push a `main`.

## Verificacion

- `/` — countdown THIS IS FOR
- `/api/v1/health` — `{ "status": "ok" }`
- `/eventos` — CRUD

## URL produccion

Anota aqui tras el primer deploy:

- **App:** `https://________________.vercel.app`
- **Health:** `https://________________.vercel.app/api/v1/health`
