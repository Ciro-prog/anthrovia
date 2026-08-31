'use client'

import { useFormFields } from '@payloadcms/ui'

function courseIdFromValue(value: unknown): string | number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) return value
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id: string | number }).id
    if (id !== undefined && id !== null && String(id)) return id
  }
  return null
}

export function EditarPaginaFormacion({ path }: { path: string }) {
  const coursePath = path.replace(/\.editarPagina$/, '.course')
  const courseValue = useFormFields(([fields]) => fields[coursePath]?.value)
  const id = courseIdFromValue(courseValue)

  if (!id) {
    return (
      <p style={{ margin: '0 0 1rem', fontSize: 13, color: 'var(--theme-elevation-600)' }}>
        Publicá la página para crear la URL y poder editar «conocer más» (plantilla Community Manager
        Nivel I).
      </p>
    )
  }

  const href = `/admin/collections/courses/${id}`

  return (
    <div
      style={{
        margin: '0 0 1rem',
        padding: '0.75rem 1rem',
        borderRadius: 6,
        background: 'var(--theme-elevation-50)',
        border: '1px solid var(--theme-elevation-150)',
      }}
    >
      <a href={href} style={{ fontWeight: 600 }}>
        Editar página «conocer más»
      </a>
      <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--theme-elevation-600)' }}>
        FAQ, bloques y Live Preview de /capacitaciones/…
      </p>
    </div>
  )
}
