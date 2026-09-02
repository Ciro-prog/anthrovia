'use client'

import { sourceMeta } from './sourceMeta'

export function SourceBadge({ source }: { source: string | null | undefined }) {
  const meta = sourceMeta(source)
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        background: meta.bg,
        color: meta.fg,
        whiteSpace: 'nowrap',
      }}
    >
      {meta.label}
    </span>
  )
}

export function SourceCell({ cellData }: { cellData?: string }) {
  return <SourceBadge source={cellData} />
}
