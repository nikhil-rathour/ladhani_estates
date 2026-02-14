# Deploy Django Backend on Vercel

## 1. Create the Vercel project

1. Import the repository into Vercel.
2. In project settings, set **Root Directory** to `backend`.
3. Keep framework as **Other**.

## 2. Add environment variables in Vercel

Required:

- `DEBUG=False`
- `SECRET_KEY=<strong-random-secret>`
- `DATABASE_URL=<postgres-connection-url>`
- `ALLOWED_HOSTS=.vercel.app,<your-custom-domain>`
- `CORS_ALLOWED_ORIGINS=https://<your-frontend-domain>`
- `CSRF_TRUSTED_ORIGINS=https://<your-frontend-domain>`

Firebase:

- `FIREBASE_TYPE`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY_ID`
- `FIREBASE_PRIVATE_KEY` (keep `\n` in the value)
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_CLIENT_ID`
- `FIREBASE_AUTH_URI`
- `FIREBASE_TOKEN_URI`
- `FIREBASE_AUTH_PROVIDER_CERT_URL`
- `FIREBASE_CLIENT_CERT_URL`

Cloudinary:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Optional:

- `PAGE_SIZE=10`
- `DB_CONN_MAX_AGE=60`
- `SECURE_SSL_REDIRECT=True`

## 3. Deploy

1. Trigger deployment from Vercel dashboard or push to your connected branch.
2. After deploy, verify:
   - `GET https://<your-backend-domain>/api/`
   - `GET https://<your-backend-domain>/api/properties/`

## 4. Run migrations

Run migrations against the production database before using write endpoints:

```powershell
cd backend
python manage.py migrate
```

## 5. Point frontend to backend

Set frontend API base URL to your Vercel backend domain.
