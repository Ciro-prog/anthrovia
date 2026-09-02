'use client'

import { useEffect, useMemo, useState } from 'react'
import { SourceBadge } from './SourceBadge'
import { sourceMeta } from './sourceMeta'

type Filter = 'all' | 'home' | 'learning' | 'dossier' | 'postulacion'

type InboxItem = {
  id: string | number
  kind: 'lead' | 'application'
  name: string
  email: string
  source: string
  status: string
  createdAt: string
  href: string
  summary: string
}

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'home', label: 'Home' },
  { id: 'learning', label: 'Capacitaciones' },
  { id: 'dossier', label: 'Dossier' },
  { id: 'postulacion', label: 'Postulación' },
]

function statusLabel(kind: InboxItem['kind'], status: string) {
  if (kind === 'application') {
    const map: Record<string, string> = {
      new: 'Nueva',
      reviewing: 'En revisión',
      interview: 'Entrevista',
      hired: 'Contratada',
      rejected: 'Descartada',
    }
    return map[status] || status
  }
  const map: Record<string, string> = {
    new: 'Nuevo',
    contacted: 'Contactado',
    booked: 'Agendado',
    closed: 'Cerrado',
  }
  return map[status] || status
}

export function InboxView() {
  const [items, setItems] = useState<InboxItem[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const [leadsRes, appsRes] = await Promise.all([
          fetch('/api/leads?limit=80&sort=-createdAt&depth=0', { credentials: 'include' }),
          fetch('/api/applications?limit=80&sort=-createdAt&depth=0', { credentials: 'include' }),
        ])
        const leadsJson = leadsRes.ok ? await leadsRes.json() : { docs: [] }
        const appsJson = appsRes.ok ? await appsRes.json() : { docs: [] }
        const leads: InboxItem[] = (leadsJson.docs || []).map(
          (d: {
            id: string | number
            name?: string
            email?: string
            source?: string
            status?: string
            createdAt?: string
            service?: string
            company?: string
          }) => ({
            id: d.id,
            kind: 'lead' as const,
            name: d.name || 'Sin nombre',
            email: d.email || '',
            source: d.source || 'contact-form',
            status: d.status || 'new',
            createdAt: d.createdAt || '',
            href: `/admin/collections/leads/${d.id}`,
            summary: [d.service, d.company].filter(Boolean).join(' · '),
          }),
        )
        const apps: InboxItem[] = (appsJson.docs || []).map(
          (d: {
            id: string | number
            firstName?: string
            lastName?: string
            email?: string
            status?: string
            createdAt?: string
          }) => ({
            id: d.id,
            kind: 'application' as const,
            name: [d.firstName, d.lastName].filter(Boolean).join(' ') || d.email || 'Postulación',
            email: d.email || '',
            source: 'postulacion',
            status: d.status || 'new',
            createdAt: d.createdAt || '',
            href: `/admin/collections/applications/${d.id}`,
            summary: 'Postulación · CV',
          }),
        )
        const merged = [...leads, ...apps].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        if (!cancelled) setItems(merged)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const visible = useMemo(() => {
    if (filter === 'all') return items
    return items.filter((item) => sourceMeta(item.source).filter === filter)
  }, [items, filter])

  return (
    <div style={{ padding: '1.5rem 0 2rem' }}>
      <h1 style={{ fontSize: 22, margin: '0 0 0.35rem' }}>Inbox</h1>
      <p style={{ margin: '0 0 1rem', color: 'var(--theme-elevation-600)', fontSize: 14 }}>
        Consultas y postulaciones, con el origen de cada formulario. Las reservas siguen en Reservas.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            style={{
              border: '1px solid var(--theme-elevation-150)',
              background: filter === f.id ? 'var(--theme-elevation-150)' : 'transparent',
              borderRadius: 999,
              padding: '6px 12px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
      {loading && <p style={{ fontSize: 14 }}>Cargando…</p>}
      {!loading && visible.length === 0 && (
        <p style={{ fontSize: 14, color: 'var(--theme-elevation-600)' }}>No hay mensajes en este filtro.</p>
      )}
      <div style={{ display: 'grid', gap: 8 }}>
        {visible.map((item) => (
          <a
            key={`${item.kind}-${item.id}`}
            href={item.href}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 8,
              padding: '12px 14px',
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: 8,
              background: 'var(--theme-elevation-50)',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{item.name}</div>
              <div style={{ fontSize: 13, color: 'var(--theme-elevation-600)' }}>
                {item.email}
                {item.summary ? ` · ${item.summary}` : ''}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <SourceBadge source={item.source} />
              <span style={{ fontSize: 12, color: 'var(--theme-elevation-600)' }}>
                {statusLabel(item.kind, item.status)}
                {item.createdAt
                  ? ` · ${new Date(item.createdAt).toLocaleDateString('es-AR')}`
                  : ''}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default InboxView
