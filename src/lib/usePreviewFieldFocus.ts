import { useEffect, useRef } from 'react'

const MEDIA_KEYS = new Set([
  'image',
  'imageUrl',
  'logo',
  'logoUrl',
  'personImage',
  'video',
  'videoUrl',
])

type FocusMsg = {
  type?: string
  path?: string
  array?: string | null
  index?: number | null
  leaf?: string | null
  value?: string
  fieldPath?: string
  fieldSchemaPath?: string
  editedField?: string
}

function afterPaint(fn: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn)
  })
}

function pathsFromDiff(prev: unknown, next: unknown, prefix = ''): string[] {
  if (Object.is(prev, next)) return []
  if (typeof next !== 'object' || next === null || typeof prev !== 'object' || prev === null) {
    return prefix ? [prefix] : []
  }
  if (Array.isArray(next)) {
    const prevArr = Array.isArray(prev) ? prev : []
    const out: string[] = []
    const len = Math.max(next.length, prevArr.length)
    for (let i = 0; i < len; i++) {
      out.push(...pathsFromDiff(prevArr[i], next[i], prefix ? `${prefix}.${i}` : String(i)))
    }
    return out
  }
  const nextObj = next as Record<string, unknown>
  const prevObj = prev as Record<string, unknown>
  const keys = new Set([...Object.keys(nextObj), ...Object.keys(prevObj)])
  const out: string[] = []
  for (const key of keys) {
    if (key === 'id' || key === 'blockType' || key === 'updatedAt' || key === 'createdAt') continue
    out.push(...pathsFromDiff(prevObj[key], nextObj[key], prefix ? `${prefix}.${key}` : key))
  }
  return out
}

function shortenPath(path: string): string[] {
  const parts = path.split('.')
  const candidates = [path]
  const sec = parts.indexOf('sections')
  if (sec >= 0 && parts.length > sec + 2) {
    candidates.push(parts.slice(sec + 2).join('.'))
  }
  return [...new Set(candidates.filter(Boolean))]
}

function pathVariants(path: string): string[] {
  const extra: string[] = []
  for (const c of shortenPath(path)) {
    extra.push(c)
    extra.push(c.replace(/\.imageUrl$/, '.image'))
    extra.push(c.replace(/\.image$/, '.imageUrl'))
    extra.push(c.replace(/\.videoUrl$/, '.video'))
    extra.push(c.replace(/\.logoUrl$/, '.logo'))
    extra.push(c.replace(/\.personImage$/, '.personImage'))
    const segs = c.split('.')
    if (segs.length > 1) extra.push(segs.slice(0, -1).join('.'))
  }
  return [...new Set(extra.filter(Boolean))]
}

function queryField(path: string): HTMLElement | null {
  const escaped = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(path) : path
  const el = document.querySelector(`[data-cms-field="${escaped}"]`)
  return el instanceof HTMLElement ? el : null
}

function findEl(path: string): HTMLElement | null {
  for (const candidate of pathVariants(path)) {
    const el = queryField(candidate)
    if (el) return el
  }
  return null
}

function findByMessage(msg: FocusMsg): HTMLElement | null {
  const leaf = msg.leaf || ''
  if (msg.array != null && msg.index != null && leaf) {
    const hit = findEl(`${msg.array}.${msg.index}.${leaf}`) || findEl(`${msg.array}.${msg.index}`)
    if (hit) return hit
  }
  if (msg.path) {
    const hit = findEl(msg.path)
    if (hit) return hit
  }
  if (leaf && msg.array == null) {
    const hit = queryField(leaf)
    if (hit) return hit
  }
  const value = typeof msg.value === 'string' ? msg.value.trim() : ''
  if (value && leaf) {
    const nodes = document.querySelectorAll(`[data-cms-field$=".${leaf}"], [data-cms-field="${leaf}"]`)
    for (const node of nodes) {
      if (node instanceof HTMLElement && node.textContent?.trim() === value) return node
    }
  }
  return null
}

function isMediaLeaf(leaf: string) {
  return MEDIA_KEYS.has(leaf)
}

function highlight(el: HTMLElement, media: boolean) {
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  el.classList.remove('cms-preview-focus', 'cms-preview-focus-media')
  el.classList.add(media ? 'cms-preview-focus-media' : 'cms-preview-focus')
  window.setTimeout(() => {
    el.classList.remove('cms-preview-focus', 'cms-preview-focus-media')
  }, 2200)
}

function focusPath(path: string) {
  const el = findEl(path)
  if (!el) return
  highlight(el, isMediaLeaf(path.split('.').pop() || ''))
}

function parseMessage(data: unknown): FocusMsg | null {
  if (!data || typeof data !== 'object') return null
  const rec = data as FocusMsg
  if (rec.type === 'anthrovia-field-focus') return rec
  for (const key of ['fieldPath', 'fieldSchemaPath', 'path', 'editedField'] as const) {
    const v = rec[key]
    if (typeof v === 'string' && v.trim()) return { path: v, leaf: v.split('.').pop() }
  }
  return null
}

export function usePreviewFieldFocus(liveData: unknown, enabled: boolean) {
  const prevRef = useRef<unknown>(undefined)

  useEffect(() => {
    if (!enabled) return

    const onMessage = (event: MessageEvent) => {
      const msg = parseMessage(event.data)
      if (!msg) return
      afterPaint(() => {
        const el = findByMessage(msg)
        if (el) {
          highlight(el, isMediaLeaf(msg.leaf || msg.path?.split('.').pop() || ''))
          return
        }
        if (msg.path) focusPath(msg.path)
      })
    }
    window.addEventListener('message', onMessage)

    const prev = prevRef.current
    prevRef.current = liveData
    if (prev !== undefined && liveData) {
      const changed = pathsFromDiff(prev, liveData)
      const best = changed.sort((a, b) => b.length - a.length)[0]
      if (best) afterPaint(() => focusPath(best))
    }

    return () => window.removeEventListener('message', onMessage)
  }, [liveData, enabled])
}
