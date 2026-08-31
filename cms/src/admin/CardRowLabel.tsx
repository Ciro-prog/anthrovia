'use client'

import { useRowLabel } from '@payloadcms/ui'

function courseIdFromValue(value: unknown): string | number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) return value
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id: string | number }).id
    if (id !== undefined && id !== null && String(id)) return id
  }
  return null
}

export function CardRowLabel() {
  const { data, rowNumber } = useRowLabel<{ title?: string; course?: unknown }>()
  const title = typeof data?.title === 'string' ? data.title.trim() : ''
  const label = title || `Card ${(rowNumber ?? 0) + 1}`
  const courseId = courseIdFromValue(data?.course)

  if (!courseId) return <span>{label}</span>

  return (
    <span>
      {label}
      {' · '}
      <a
        href={`/admin/collections/courses/${courseId}`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{ fontWeight: 600 }}
      >
        Editar página
      </a>
    </span>
  )
}
