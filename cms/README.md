# Anthrovia CMS

CMS self-hosted (**Payload 3 + Postgres**) para editar la web Anthrovia: páginas, capacitaciones, media, leads y agenda.

- Corre solo en el **VPS** (Docker, puerto **`60518`**).
- La SPA queda en **Vercel** y consume esta API (`CMS_URL`).
- **No hace falta** subir el monorepo completo al servidor: solo esta carpeta `cms/`.

## Editar páginas (fase 1)

1. `/admin` → **Páginas**. Tienen que aparecer **Home** y **Capacitaciones** (publicadas).
2. Si ves **No Pages found**, el seed no corrió (migración rota o filtro solo Drafts). En la lista: **Published** o **All**. En logs: `Page creada: home` / `learning`.
3. Editá un texto (sin Publish) → **Live Preview** (panel derecho / ojo) = borrador en la SPA real. **Ver publicado** / Preview = lo que ya está en Vercel (no muestra drafts).
4. Cada bloque = sección. Las **Cards servicios** son tarjetas de la home. **Formaciones** = cards (título, imagen, texto).
5. Si el borrador está bien → **Publish**. Recién ahí anthroviahr.com y “Ver publicado” muestran el cambio. Al publicar Formaciones se crea `/capacitaciones/{slug-del-título}` y la página «conocer más» (plantilla Community Manager Nivel I en cards nuevas).
6. En la card: **Editar página** abre los bloques (FAQ, etc.). Liderazgo Emocional sigue en `#contacto`.

**Capacitaciones (colección):** editá «conocer más». La card se edita en Páginas → Formaciones.

| Página CMS | URL en Vercel | Qué editás |
|---|---|---|
| Home (`slug: home`) | https://anthroviahr.com/ | Hero, servicios (tarjetas), about, contacto, footer |
| Capacitaciones (`slug: learning`) | https://anthroviahr.com/capacitaciones | Hero, formaciones (cards), in company, about, contacto |
| Colección **Capacitaciones** | https://anthroviahr.com/capacitaciones/{slug} | Bloques «conocer más». Cards nuevas: plantilla CM Nivel I. |

**Live Preview** carga `?preview=1` **dentro del admin** y recibe el formulario (draft). Abrir `?preview=1` en una pestaña nueva **no** muestra el borrador. “Ver publicado” **no** sustituye al iframe.

Tras el primer deploy con blocks: si el volume de Postgres ya existía con el schema viejo, resetealo una vez:

```bash
docker compose -f docker-compose.prod.yml down
docker volume ls | grep pgdata   # ubicar el volumen
docker compose -f docker-compose.prod.yml down -v   # borra datos DB
docker compose -f docker-compose.prod.yml up -d --build
# luego seed páginas (desde el host con DATABASE_URI interno, o:
docker compose -f docker-compose.prod.yml exec cms node --import tsx scripts/seed.ts
```

(En la imagen prod puede no haber `tsx`; alternativa: correr seed en local apuntando al DB, o crear las pages a mano en admin y pegar contenido. Lo más simple: `npm run seed` en un entorno con acceso a la DB, o recrear pages desde admin usando los bloques.)

Para seed desde el repo en una máquina con acceso:

```bash
cd cms && npm run seed
```

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

Editá `cms/.env` en el **VPS** (estas **no** van en Vercel). La URL pública **no** puede ser `localhost` si abrís el admin desde otra máquina:

```
PAYLOAD_SECRET=un-secreto-largo-aleatorio
PAYLOAD_PUBLIC_SERVER_URL=http://pampaservers.com:60518
NEXT_PUBLIC_SERVER_URL=http://pampaservers.com:60518
PREVIEW_URL=https://anthroviahr.com
NEXT_PUBLIC_PREVIEW_URL=https://anthroviahr.com
CORS_ORIGINS=https://anthroviahr.com,https://tu-dominio.vercel.app,http://localhost:5173
```

`NEXT_PUBLIC_*` se incrusta en el JS del admin en **build time**. Si cambiás `NEXT_PUBLIC_*` o `PREVIEW_URL`, hace falta `--build` (no alcanza `up -d`).

Arranque **producción** (Postgres **no** expuesto al host; solo `60518`):

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Al primer arranque Payload corre las **migraciones de producción** (`src/migrations` → `prodMigrations`) y crea el usuario admin (si no hay ninguno):

- Email: `SEED_ADMIN_EMAIL` (default `admin@anthroviahr.com`)
- Password: `SEED_ADMIN_PASSWORD` (default `AnthroviaAdmin2026!`)

Definilos en `.env` del VPS antes del `up --build`. Después abrí `/admin` e iniciá sesión.

**Importante (schema / migraciones):**

Payload guarda en `payload_migrations` qué migraciones ya corrieron: **la 2.ª vez no vuelve a crear tablas**.

Si ves `already exists` (enums) o `column "_status" does not exist`, el volumen tiene el schema **viejo** de `pages` (JSON, sin drafts). `CREATE TABLE IF NOT EXISTS` no altera esa tabla. La migración ahora detecta `pages` sin `_status` y resetea el schema `public` sola; igual lo más limpio es borrar el volumen una vez:

```bash
docker compose -f docker-compose.prod.yml down -v
docker volume ls | grep -E 'cms|pgdata'   # no debería quedar cms_*pgdata
docker compose -f docker-compose.prod.yml up -d --build
docker logs -f cms-cms-1
```

Éxito en logs: `Migrated: 20260831_041819_initial`, `Admin creado` / `Page creada`, sin `already exists` ni `_status does not exist`. Luego `/admin`.

Si el schema fallaba antes (volumen vacío / `users` inexistente), reconstruí:

```bash
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml logs -f cms
```

Éxito esperado en logs: migración aplicada, `Admin creado: …`, sin `drizzle-kit/api` ni `relation "users" does not exist`.

- Admin: `http://pampaservers.com:60518/admin`
- Usuario: `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` (defaults en `.env.example`)
- API: `http://pampaservers.com:60518/api/...`

Si el login falla con `ERR_CONNECTION_REFUSED` a `localhost:60518`, el `.env` del VPS todavía tiene localhost o no se rebuildió tras corregirlo.
### Primera configuración

1. Usuario admin (wizard o seed). En logs: `Admin creado`, `Page creada: home`, `Page creada: learning`.
2. **Páginas** `Home` / `Capacitaciones` → bloques (no JSON). Filtro **Published** o **All**.
3. **Courses** → `blocks` + cohortes (JSON; otra fase).
4. **Media** → reemplazos de imagen (si no subís nada, siguen `/ethos/` en la web).
5. **Leads** / **Bookings** → consultas y agenda.

### Volúmenes

| Volumen | Uso |
|---------|-----|
| `pgdata` | Postgres |
| `media` | Archivos subidos |

## Dev local

`docker-compose.yml` (sin `.prod`) expone Postgres en `localhost:5433` para seed/dev. El schema se aplica con migraciones (`push: false`):

```bash
cd cms
cp .env.example .env
# DATABASE_URI=postgresql://anthrovia:anthrovia@localhost:5433/anthrovia_cms
docker compose up -d postgres
npm install
npx payload migrate
npm run seed   # opcional
npm run dev    # http://localhost:3000/admin
```

Sin Docker local, para generar una migración nueva: `npm i -D embedded-postgres` y `node scripts/gen-initial-migration.mjs nombre`.

O stack completo en `:60518`:

```bash
docker compose up -d --build
```

## Front (Vercel)

`CMS_URL` va **solo** en el proyecto de la SPA (Vercel → Settings → Environment Variables → Production). **No** la pongas en `cms/.env` del VPS.

```
CMS_URL=http://pampaservers.com:60518
```

Sin `CMS_URL`: contenido local `/ethos` y Live Preview apunta a `localhost` → no ves el borrador. Tras agregarla, **redeploy** del front.

En local del front: `CMS_URL` o `VITE_CMS_URL` (no uses `VITE_*` en Vercel).

| Dónde | Variable | Valor |
|---|---|---|
| Vercel (SPA) | `CMS_URL` | `http://pampaservers.com:60518` |
| VPS `cms/.env` | `PREVIEW_URL` | `https://anthroviahr.com` |
| VPS `cms/.env` | `CORS_ORIGINS` | debe incluir `https://anthroviahr.com` |
| VPS `cms/.env` | `PAYLOAD_PUBLIC_SERVER_URL` / `NEXT_PUBLIC_SERVER_URL` | `http://pampaservers.com:60518` |

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
