'use client'

import { useEffect } from 'react'

function pathFromTarget(el: EventTarget | null): string | null {
  if (!(el instanceof Element)) return null
  const field = el.closest('[id^="field-"]')
  if (!field) return null
  const id = field.id || ''
  if (!id.startsWith('field-')) return null
  return id.slice('field-'.length)
}

function postToPreview(path: string) {
  document.querySelectorAll('iframe').forEach((iframe) => {
    try {
      iframe.contentWindow?.postMessage({ type: 'anthrovia-field-focus', path }, '*')
    } catch {
      // el iframe de preview es cross-origin; postMessage igual funciona
    }
  })
}

export function PreviewFieldBridge() {
  useEffect(() => {
    const onEvent = (e: Event) => {
      const path = pathFromTarget(e.target)
      if (path) postToPreview(path)
    }
    document.addEventListener('focusin', onEvent)
    document.addEventListener('click', onEvent, true)
    return () => {
      document.removeEventListener('focusin', onEvent)
      document.removeEventListener('click', onEvent, true)
    }
  }, [])
  return null
}
