'use client'

import { useEffect, useState } from 'react'
import { useFormFields } from '@payloadcms/ui'

type MediaDoc = {
  id?: string | number
  url?: string
  filename?: string
  mimeType?: string
}

function isMediaDoc(v: unknown): v is MediaDoc {
  return typeof v === 'object' && v !== null && ('url' in v || 'id' in v)
}

export function CvPreview() {
  const raw = useFormFields(([fields]) => fields.cv?.value) as unknown
  const [media, setMedia] = useState<MediaDoc | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      if (!raw) {
        setMedia(null)
        return
      }
      if (isMediaDoc(raw) && raw.url) {
        setMedia(raw)
        return
      }
      const id = isMediaDoc(raw) ? raw.id : raw
      if (id == null) {
        setMedia(null)
        return
      }
      try {
        const res = await fetch(`/api/media/${id}`, { credentials: 'include' })
        if (!res.ok) return
        const doc = (await res.json()) as MediaDoc
        if (!cancelled) setMedia(doc)
      } catch {
        // ignore
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [raw])

  if (!media?.url) {
    return (
      <p style={{ fontSize: 14, color: 'var(--theme-elevation-600)' }}>No hay CV adjunto.</p>
    )
  }

  const mime = media.mimeType || ''
  const isPdf = mime.includes('pdf') || media.url.toLowerCase().endsWith('.pdf')
  const isImage = mime.startsWith('image/') || /\.(png|jpe?g|webp|gif)$/i.test(media.url)

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>CV</div>
      <a href={media.url} target="_blank" rel="noreferrer" style={{ fontSize: 13 }}>
        {media.filename || 'Abrir archivo'}
      </a>
      {isPdf && (
        <iframe
          title="Vista previa del CV"
          src={media.url}
          style={{
            width: '100%',
            minHeight: 520,
            marginTop: 12,
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 8,
            background: '#fff',
          }}
        />
      )}
      {isImage && (
        <img
          src={media.url}
          alt={media.filename || 'CV'}
          style={{
            display: 'block',
            maxWidth: '100%',
            marginTop: 12,
            borderRadius: 8,
            border: '1px solid var(--theme-elevation-150)',
          }}
        />
      )}
    </div>
  )
}
