---
name: review-quality
description: Revisa si un cambio de Anthrovia está realmente cerrado (UI, lógica, carga, error, validación, PROGRESS.md). Usar antes de dar una feature por terminada, o cuando el usuario pide revisar calidad, el diff o si falta algo.
---

# Revisar calidad

Revisá el diff y el flujo, no el relato. Una feature a medias no se marca como terminada.

## Checklist

- [ ] El cambio vive en la ruta y la colección que ya existían, o el plan justificó una nueva.
- [ ] La UI muestra datos del CMS o el fallback de `src/data/`, no un placeholder nuevo.
- [ ] Hay carga visible. Un `return null` mientras `isLoading` no cuenta.
- [ ] El error de red o de API se ve en la pantalla.
- [ ] El vacío (sin cursos, sin turnos, sin archivos) tiene texto propio.
- [ ] Obligatorio, email, teléfono y archivo se rechazan antes de enviar.
- [ ] El submit deshabilita el botón y muestra que está enviando.
- [ ] No se agregó Supabase, Zod ni React Hook Form sin un pedido explícito.
- [ ] No hay secretos, URLs de webhook ni contraseñas nuevas en el código.
- [ ] `PROGRESS.md` describe el estado real después del cambio.

## Cómo informar

```markdown
## Veredicto
Cerrada | Falta trabajo

## Bloquea el cierre
- [archivo]: [qué falta para que un usuario pueda completar el flujo]

## Deuda que no bloquea
- [detalle menor]
```

Si algo bloquea, no actualices ese ítem a “Terminado”.
