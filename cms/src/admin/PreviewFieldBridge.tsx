'use client'

import { useEffect } from 'react'

export type PreviewFocusPayload = {
  type: 'anthrovia-field-focus'
  path?: string
  array?: string | null
  index?: number | null
  leaf?: string | null
  value?: string
}

const ARRAY_NAMES = [
  'formaciones',
  'services',
  'blocks',
  'modalidades',
  'buttons',
  'pillars',
  'values',
  'fields',
  'steps',
  'files',
]

const ROW_SELECTORS = [
  '.array-field__row',
  '.array-field__card',
  '.blocks-field__row',
  '.blocks-field__card',
  '[class*="array-field__row"]',
  '[class*="blocks-field__row"]',
]

function rawPathFromTarget(el: Element): string | null {
  const withId = el.closest('[id^="field-"]')
  if (withId?.id?.startsWith('field-')) {
    return withId.id.slice('field-'.length).replace(/__/g, '.')
  }
  const named = el.closest<HTMLElement>('[data-path], [name]')
  const raw = named?.getAttribute('data-path') || named?.getAttribute('name')
  return raw ? raw.replace(/__/g, '.') : null
}

function parsePath(path: string): { array: string | null; index: number | null; leaf: string | null } {
  const parts = path.split('.').filter(Boolean)
  const leaf = parts[parts.length - 1] || null
  for (let i = parts.length - 2; i >= 0; i--) {
    if (ARRAY_NAMES.includes(parts[i])) {
      const next = parts[i + 1]
      const index = next !== undefined && /^\d+$/.test(next) ? Number(next) : null
      return { array: parts[i], index, leaf }
    }
  }
  return { array: null, index: null, leaf }
}

function closestRow(el: Element): HTMLElement | null {
  for (const sel of ROW_SELECTORS) {
    const row = el.closest(sel)
    if (row instanceof HTMLElement) return row
  }
  return null
}

function siblingIndex(row: HTMLElement): number {
  const parent = row.parentElement
  if (!parent) return 0
  const same = [...parent.children].filter(
    (c) => c instanceof HTMLElement && c.className === row.className,
  )
  const i = same.indexOf(row)
  return i >= 0 ? i : [...parent.children].indexOf(row)
}

function inputValue(el: Element): string {
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return el.value
  const inner = el.querySelector('input, textarea')
  if (inner instanceof HTMLInputElement || inner instanceof HTMLTextAreaElement) return inner.value
  return ''
}

function postToPreview(payload: PreviewFocusPayload) {
  document.querySelectorAll('iframe').forEach((iframe) => {
    try {
      iframe.contentWindow?.postMessage(payload, '*')
    } catch {
      // cross-origin: postMessage igual entrega el mensaje
    }
  })
}

export function PreviewFieldBridge() {
  useEffect(() => {
    const onEvent = (e: Event) => {
      const target = e.target
      if (!(target instanceof Element)) return
      const path = rawPathFromTarget(target)
      if (!path) return

      const parsed = parsePath(path)
      const row = closestRow(target)
      const index =
        parsed.index !== null ? parsed.index : row ? siblingIndex(row) : null

      postToPreview({
        type: 'anthrovia-field-focus',
        path,
        array: parsed.array,
        index,
        leaf: parsed.leaf,
        value: inputValue(target),
      })
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
