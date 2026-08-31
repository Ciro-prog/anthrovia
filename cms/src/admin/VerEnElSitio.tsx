'use client'

import { useFormFields } from '@payloadcms/ui'

const siteBase = () =>
  (
    process.env.NEXT_PUBLIC_PREVIEW_URL ||
    process.env.NEXT_PUBLIC_FRONTEND_URL ||
    'https://anthroviahr.com'
  ).replace(/\/$/, '')

export function VerEnElSitioField() {
  const slug = useFormFields(([fields]) => {
    const value = fields.slug?.value
    return typeof value === 'string' ? value : ''
  })
  const path = slug === 'learning' ? '/capacitaciones' : '/'
  const href = `${siteBase()}${path}`

  return (
    <div
      style={{
        marginBottom: '1.25rem',
        padding: '0.85rem 1rem',
        borderRadius: 6,
        background: 'var(--theme-elevation-50)',
        border: '1px solid var(--theme-elevation-150)',
      }}
    >
      <div
        style={{
          fontSize: 12,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'var(--theme-elevation-600)',
          marginBottom: 6,
        }}
      >
        Ver en el sitio
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        {href}
      </a>
      <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--theme-elevation-600)' }}>
        Home = inicio · Capacitaciones = /capacitaciones. En la lista, filtro Published o All (no
        solo Drafts).
      </p>
    </div>
  )
}
