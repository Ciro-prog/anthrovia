'use client'

import { useRowLabel } from '@payloadcms/ui'

export function CardRowLabel() {
  const { data, rowNumber } = useRowLabel<{ title?: string }>()
  const title = typeof data?.title === 'string' ? data.title.trim() : ''
  return <span>{title || `Card ${(rowNumber ?? 0) + 1}`}</span>
}
