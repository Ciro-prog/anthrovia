# Progreso — Anthrovia HR

Actualizado el 15 de octubre de 2026, después de cerrar lo que estaba a medias. El dossier no se tocó.

## Cómo está armado

- Front en la raíz: Vite, React 18, TypeScript, Tailwind 3, React Router 7. Rutas en `src/App.tsx`.
- CMS en `cms/`: Payload 3.49, Next 15, Postgres. Colecciones: users, media, pages, courses, leads, event-types, bookings, applications, resources. Globals: site-settings, application-form, resources-page.
- La SPA publica en Vercel y consume el CMS del VPS (`CMS_URL`, puerto 60518). Si el fetch falla, casi todo el contenido cae al fallback de `src/data/`.
- No hay tests. El `README.md` de la raíz sigue describiendo solo hero y servicios.
- `zod`, `react-hook-form` y `@supabase/supabase-js` están en `package.json` y no se importan desde `src/`. Los scripts `check-*.js`, `create-admin.js` y `supabase_schema.sql` son de un enfoque anterior.

## Terminado

Usable de punta a punta con el CMS en línea y con fallback local si el CMS no responde.

- **Home** (`/`): navbar, hero, servicios, about, carrusel de posts, noticias, contacto y footer. Textos e imágenes salen de la página `home` del CMS, con merge sobre `src/data/initialContent.ts`. Live preview en el admin.
- **Capacitaciones** (`/capacitaciones`): misma estructura (hero, formaciones, in company, contacto). Las cards salen de la página `learning`.
- **Ficha de curso** (`/capacitaciones/:slug`): bloques del CMS, badge de cohorte, mensaje de carga y error si el CMS no responde. Un slug desconocido vuelve a `/capacitaciones`.
- **Contacto** (home y capacitaciones): valida nombre, email, WhatsApp, servicio y mensaje, y envía un lead a Payload. Muestra envío, éxito y error.
- **Agenda** (`/agendar`): tipos de evento, días y horarios, validación de slot en el server, conflicto 409, éxito, error de red al cargar turnos, validación de nombre, email y WhatsApp, y alternativa por WhatsApp.
- **Recursos** (`/recursos` y `/recursos/:slug`): listado con filtro, vacío, detalle, descarga, carga y error de CMS. Editables en `resources` y `resources-page`.
- **Noticias** (`/news`, `/news/:id`): salen del bloque Noticias de la home (CMS) con fallback en `initialContent.ts`. Están en el navbar. Carga, vacío y “no encontrada” usan los tokens del sitio. Se eliminó `src/data/news.json`, que no se importaba.
- **Postulación** (`/postulacion`): formulario de 3 pasos alineado con `mejoras.md`, condicionales, rubros múltiples, motivación, CV, éxito y error. El envío guarda las respuestas en `applications`. Si el CMS ya tenía el formulario viejo, al arrancar completa los campos que faltan.
- **Legales**: modal de privacidad y términos, CMS con fallback en `src/data/legal-content.ts`.
- **Navegación**: ruta 404, “Recursos gratuitos” y “Noticias” en el menú, y “Dejanos tu CV” apunta a `/postulacion` en el contenido local y en el seed. Si el CMS en producción ya publicó otra URL, esa sigue ganando hasta editarla en Ajustes.
- **Admin Payload**: usuarios, borradores, live preview, inbox de leads, postulaciones y reservas (con error si una bandeja no carga), migraciones en `cms/src/migrations/`.

## A medias

- **Dossier** (`/dossier`, `/dossier/modulos`): queda fuera de este cierre, a pedido. La landing y los módulos siguen armados a mano, con logos de ejemplo. El formulario “Solicitar reunión” sí crea un lead. El contenido no se edita en el CMS.

## No hacer todavía

- Unificar las dos paletas (postulación vs home) en un rediseño.
- Reescribir formularios con Zod o React Hook Form.
- Reactivar Supabase.
- Reescribir el README salvo que se pida.
- Tocar el dossier salvo un pedido explícito.

## Siguiente

1. Dossier, cuando se decida retomarlo: sacar los logos de ejemplo y definir qué textos salen del CMS.
