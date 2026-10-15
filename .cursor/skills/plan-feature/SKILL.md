---
name: plan-feature
description: Planifica una feature de Anthrovia contra el código y PROGRESS.md, sin implementar. Usar cuando el usuario pide planificar, diseñar o priorizar una feature, pantalla, formulario o flujo antes de codear.
---

# Planificar una feature

No escribas código en este paso. El plan sale del repo, no de un stack ideal.

## Pasos

1. Leé `PROGRESS.md` y ubicá si la feature ya está empezada.
2. Abrí la ruta en `src/App.tsx`, la página en `src/pages/`, el fetch en `src/lib/cmsApi.ts` y, si persiste datos, la colección o global en `cms/src/`.
3. Anotá qué ya funciona y qué falta para que quede cerrada: UI, lógica, carga, error, vacío y validación.
4. Si el pedido agrega una pantalla o colección nueva y hay ítems a medias arriba en `PROGRESS.md`, decilo y proponé cerrar eso primero.
5. No propongas Supabase, ni adoptar Zod o React Hook Form, ni un design system nuevo. Esos paquetes están instalados y no se usan.

## Salida

```markdown
# Plan: [nombre]

Estado hoy: [hecho / a medias / no existe] — [archivo principal]

## Alcance
- [cambio concreto en un archivo existente]

## Fuera de alcance
- [lo que no se toca en este paso]

## Criterio de listo
- [ ] UI en la ruta real
- [ ] Lógica conectada al CMS o al fallback que esa pantalla ya usa
- [ ] Carga, error y vacío visibles
- [ ] Inputs inválidos no se envían
- [ ] PROGRESS.md actualizado
```

Máximo una pantalla o un flujo por plan. Si hace falta schema nuevo, nombrá la migración; no la escribas todavía.
