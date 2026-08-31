# Anthrovia CMS

CMS self-hosted (**Payload 3 + Postgres**) para editar la web Anthrovia: páginas, capacitaciones, media, leads y agenda.

- Corre solo en el **VPS** (Docker, puerto **`60518`**).
- La SPA queda en **Vercel** y consume esta API (`VITE_CMS_URL`).
- **No hace falta** subir el monorepo completo al servidor: solo esta carpeta `cms/`.

## Imágenes

Por defecto la web usa las fotos de `/ethos/...` en Vercel. Si en el CMS subís/reemplazás una media y la vinculás, esa URL del VPS pisa el default. Si el campo queda vacío, se conserva la imagen local: **siempre hay imagen**.

## Empaquetar solo el CMS (desde tu PC)

Desde la raíz del repo anthrovia:

**Windows (PowerShell):**

```powershell
.\cms\scripts\package-for-server.ps1
# genera anthrovia-cms.tar.gz en la raíz
```

**Linux / macOS / Git Bash:**

```bash
bash cms/scripts/package-for-server.sh
```

Subir:

```bash
scp anthrovia-cms.tar.gz user@IP_PUBLICA:~/
```

## Deploy en el VPS

```bash
tar -xzf anthrovia-cms.tar.gz
cd cms
cp .env.example .env
```

Editá `.env` (mínimo):

```
PAYLOAD_SECRET=un-secreto-largo-aleatorio
PAYLOAD_PUBLIC_SERVER_URL=http://IP_PUBLICA:60518
NEXT_PUBLIC_SERVER_URL=http://IP_PUBLICA:60518
CORS_ORIGINS=https://tu-dominio.vercel.app,https://anthroviahr.com
```

Arranque **producción** (Postgres **no** expuesto al host; solo `60518`):

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Al primer arranque Payload crea las tablas y el usuario admin (si no hay ninguno):

- Email: `SEED_ADMIN_EMAIL` (default `admin@anthroviahr.com`)
- Password: `SEED_ADMIN_PASSWORD` (default `AnthroviaAdmin2026!`)

Definilos en `.env` del VPS antes del `up --build`. Después abrí `/admin` e iniciá sesión.

Si ves `relation "users" does not exist`, la causa es que Payload **no hace push del schema en `NODE_ENV=production`**. La imagen aplica un patch (`scripts/patch-payload-push.mjs`) para respetar `push: true`. Reconstruí:

```bash
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml logs -f cms
```

Buscá en los logs: `[patch-payload-push]`, `Admin creado`, o `[debug-8b02e2]`.

- Admin: `http://IP_PUBLICA:60518/admin`
- Usuario: `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` (defaults en `.env.example`)
- API: `http://IP_PUBLICA:60518/api/...`
### Primera configuración

1. Usuario admin (wizard o seed local).
2. **Pages** `home` / `learning` → `sections` (JSON; `isVisible` para ocultar).
3. **Courses** → `blocks` + cohortes.
4. **Media** → reemplazos de imagen (si no subís nada, siguen `/ethos/` en la web).
5. **Leads** / **Bookings** → consultas y agenda.

### Volúmenes

| Volumen | Uso |
|---------|-----|
| `pgdata` | Postgres |
| `media` | Archivos subidos |

## Dev local

`docker-compose.yml` (sin `.prod`) expone Postgres en `localhost:5433` para seed/dev:

```bash
cd cms
cp .env.example .env
# DATABASE_URI=postgresql://anthrovia:anthrovia@localhost:5433/anthrovia_cms
docker compose up -d postgres
npm install
npm run seed   # opcional
npm run dev    # http://localhost:3000/admin
```

O stack completo en `:60518`:

```bash
docker compose up -d --build
```

## Front (Vercel)

```
VITE_CMS_URL=http://IP_PUBLICA:60518
```

Sin esa variable: contenido + imágenes locales; form por WhatsApp.

## API pública

```
GET  /api/pages?where[slug][equals]=home&limit=1
GET  /api/courses?limit=50
GET  /api/event-types?where[active][equals]=true
POST /api/leads
POST /api/bookings
GET  /api/globals/site-settings
```

## Agenda nativa

`event-types` + `bookings`. En la SPA: `/agendar` → `POST /api/bookings`.
