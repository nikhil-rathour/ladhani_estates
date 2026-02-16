# Ladhani Estates Frontend

React + Vite frontend configured for Vercel deployment.

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment variables

Set these in Vercel Project Settings > Environment Variables:

- `VITE_API_BASE_URL`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

Recommended `VITE_API_BASE_URL` values:

- `/api` when API is served behind the same domain.
- `https://your-backend-domain.com/api` when API is deployed separately.

## Vercel settings

- Framework preset: `Vite`
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`

`vercel.json` is included to:

- Rewrite SPA routes to `index.html` for `react-router` deep links.
- Add immutable caching headers for built assets.

## Build check

```bash
npm run build
```
