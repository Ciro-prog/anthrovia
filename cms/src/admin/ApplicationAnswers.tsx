'use client'

import { useFormFields } from '@payloadcms/ui'

type AnswerRow = {
  name?: string
  label?: string
  value?: unknown
}

function formatValue(value: unknown): string {
  if (value == null || value === '') return '—'
  if (typeof value === 'boolean') return value ? 'Sí' : 'No'
  if (Array.isArray(value)) return value.map((v) => formatValue(v)).join(', ')
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

export function ApplicationAnswers() {
  const answers = useFormFields(([fields]) => fields.answers?.value) as unknown

  const rows: AnswerRow[] = Array.isArray(answers)
    ? (answers as AnswerRow[]).filter((row) => row && row.name !== 'cv')
    : answers && typeof answers === 'object'
      ? Object.entries(answers as Record<string, unknown>)
          .filter(([name]) => name !== 'cv')
          .map(([name, value]) => ({ name, label: name, value }))
      : []

  if (rows.length === 0) {
    return (
      <p style={{ fontSize: 14, color: 'var(--theme-elevation-600)' }}>
        Esta postulación no tiene respuestas guardadas (llegó antes del formulario dinámico).
        Mirà la pestaña Datos.
      </p>
    )
  }

  return (
    <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--theme-elevation-600)' }}>
        Respuestas tal como las envió la persona.
      </p>
      {rows.map((row, i) => (
        <div
          key={`${row.name || 'row'}-${i}`}
          style={{
            padding: '10px 12px',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 8,
            background: 'var(--theme-elevation-50)',
          }}
        >
          <div style={{ fontSize: 12, color: 'var(--theme-elevation-600)', marginBottom: 4 }}>
            {row.label || row.name}
          </div>
          <div style={{ fontSize: 15, whiteSpace: 'pre-wrap' }}>{formatValue(row.value)}</div>
        </div>
      ))}
    </div>
  )
}
