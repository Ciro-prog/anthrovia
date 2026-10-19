# Progreso — Anthrovia HR

Actualizado el 19 de octubre de 2026. El dossier de módulos no se tocó.

## Cómo está armado

- Front en la raíz: Vite, React 18, TypeScript, Tailwind 3, React Router 7. Rutas en `src/App.tsx`.
- CMS en `cms/`: Payload 3.49, Next 15, Postgres. Colecciones: users, media, pages, courses, leads, event-types, bookings, applications, resources. Globals: site-settings, application-form, resources-page.
- La SPA publica en Vercel y consume el CMS del VPS (`CMS_URL`, puerto 60518). Si el fetch falla, casi todo el contenido cae al fallback de `src/data/`.
- No hay tests. El `README.md` de la raíz sigue describiendo solo hero y servicios.
- `zod`, `react-hook-form` y `@supabase/supabase-js` están en `package.json` y no se importan desde `src/`. Los scripts `check-*.js`, `create-admin.js` y `supabase_schema.sql` son de un enfoque anterior.

## Terminado

Usable de punta a punta con el CMS en línea y con fallback local si el CMS no responde.

- **Home** (`/`): navbar, hero, servicios, about, carrusel de posts, noticias, contacto y footer. Textos e imágenes salen de la página `home` del CMS, con merge sobre `src/data/initialContent.ts`. Live preview en el admin.
- **Capacitaciones** (`/capacitaciones`): misma estructura (hero, formaciones, in company, contacto). Las cards salen de la página `learning`. Al crear una card hay que elegir plantilla (las 5 actuales); el curso nuevo copia esa página. Liderazgo copia la ficha de documento. Las cards ya publicadas no se reclonan.
- **Ficha de curso** (`/capacitaciones/:slug`): bloques del CMS, badge de cohorte, mensaje de carga y error si el CMS no responde. Un slug desconocido vuelve a `/capacitaciones`.
- **Liderazgo Emocional** (`/capacitaciones/liderazgo-emocional`): ficha de venta del documento con el copy actual de la card. Formulario de nombre, email y teléfono → lead `source=liderazgo-manual`. Si el CMS falla, WhatsApp. La card apunta a esa ruta, no a `#contacto`.
- **Contacto** (home y capacitaciones): valida nombre, email, WhatsApp, servicio y mensaje, y envía un lead a Payload. Muestra envío, éxito y error.
- **Agenda** (`/agendar`): tipos de evento, días y horarios, validación de slot en el server, conflicto 409, éxito, error de red al cargar turnos, validación de nombre, email y WhatsApp, y alternativa por WhatsApp.
- **Recursos** (`/recursos` y `/recursos/:slug`): listado, detalle, descarga, imagen de card, carga y error. Un recurso despublicado no aparece; si el CMS responde con lista vacía, no se rellenan los 6 seed. Si `sectionVisible` está apagado, el menú se oculta y las rutas muestran Próximamente. La descarga pide nombre, apellido, correo y teléfono y manda un lead `source=resource-download` con el nombre del recurso. Si el envío falla, error + WhatsApp y el archivo no se desbloquea.
- **Dossier landing** (`/dossier`): textos e imágenes editables en el global `dossier-page`. Conversemos valida nombre/email/día/franja, envía lead `source=dossier` y tiene fallback WhatsApp. Días y franjas siguen en Ajustes. El bloque “Explorar módulos” y `/dossier/modulos` no se editan.
- **Noticias** (`/news`, `/news/:id`): salen del bloque Noticias de la home (CMS) con fallback en `initialContent.ts`. Están en el navbar. Carga, vacío y “no encontrada” usan los tokens del sitio.
- **Postulación** (`/postulacion`): formulario de 3 pasos alineado con `mejoras.md`, condicionales, rubros múltiples, motivación, CV, éxito y error. El envío guarda las respuestas en `applications`.
- **Legales**: modal de privacidad y términos, CMS con fallback en `src/data/legal-content.ts`.
- **Carga y 404**: textos editables en Ajustes → General. Una URL desconocida muestra “En mantenimiento” con navbar y footer. Los “Cargando…” de curso, recursos, noticias y agenda usan el copy de Ajustes.
- **Navegación**: “Recursos gratuitos” solo si la sección está visible. “Dejanos tu CV” apunta a `/postulacion` en el contenido local y en el seed.
- **Admin Payload**: usuarios, borradores, live preview, inbox de leads (incluye Manual Liderazgo y Recurso gratis), postulaciones y reservas. Migraciones en `cms/src/migrations/`.

## A medias

- **Dossier módulos** (`/dossier/modulos`): sigue fuera. No se edita el catálogo de módulos ni la simulación.

## No hacer todavía

- Unificar las dos paletas (postulación vs home) en un rediseño.
- Reescribir formularios con Zod o React Hook Form.
- Reactivar Supabase.
- Reescribir el README salvo que se pida.
- Editar `/dossier/modulos` desde el CMS.
- Pago online ni descarga automática del manual de Liderazgo.

## Agenda de llamadas

Esto ya está en el CMS y no forma parte del dossier:

- Ajustes → **Agenda** → **Días y horarios** (`bookingWeek`): qué días y qué franjas ofrece `/agendar`.
- Ajustes → **Agenda** → **Duración de la reunión** (`bookingDurationMinutes`): minutos de cada turno. El endpoint `/api/availability` arma los horarios con ese valor y `/agendar` lo muestra.

## Siguiente

Para ver plantillas de formaciones y el gate de recursos en el VPS hay que redeployar el CMS (incluye `20261019_121800_leads_source_resource_download` y `20261019_121900_formaciones_template`) y después Vercel. `/dossier/modulos` no se retoma.
