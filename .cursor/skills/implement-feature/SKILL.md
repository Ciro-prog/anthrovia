---
name: implement-feature
description: Implementa una feature ya delimitada de Anthrovia hasta dejarla usable, y actualiza PROGRESS.md. Usar cuando el usuario pide implementar, cerrar, terminar o corregir una pantalla, formulario o flujo existente.
---

# Implementar una feature

Seguí el plan si existe. Si no hay plan, leé igual `PROGRESS.md` y el código de esa ruta antes de editar.

## Pasos

1. Tocá solo los archivos del flujo. Front en `src/`. Persistencia en `cms/src/` y, si cambia el schema, una migración en `cms/src/migrations/`.
2. Reutilizá `cmsApi.ts` y `CMSContext` para leer o enviar. No crees un cliente HTTP paralelo.
3. Dejá la feature usable de punta a punta:
   - la UI renderiza datos reales o el fallback local que esa pantalla ya tiene
   - hay estado de carga mientras llega el CMS
   - un fallo de red o un 4xx/5xx se muestra en la página, no solo en consola
   - un listado vacío dice que no hay datos
   - los campos obligatorios se validan antes del submit y el botón muestra el envío en curso
4. Copiá el tono y las clases de la página que estás editando. No mezcles la paleta de `/postulacion` con los tokens de la home en el mismo componente.
5. No sumes dependencias ni pantallas vecinas “de paso”.
6. Actualizá `PROGRESS.md` en el mismo cambio: mové el ítem de “A medias” a “Terminado” solo si el criterio de arriba se cumple. Si queda un hueco, dejalo escrito.

## Comprobación mínima

- Recorré el flujo en el browser si la UI cambió: carga, error, vacío y un submit inválido.
- Si no hay servidor a mano, decí qué no pudiste ejecutar.
