import type { CollectionBeforeChangeHook } from 'payload'

const LOCKED_HOME_BLOCKS = ['about', 'posts', 'news'] as const

type SectionBlock = { blockType?: string }

export const keepHomeSections: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  if (!data) return data
  const slug = (data.slug as string | undefined) || (originalDoc?.slug as string | undefined)
  if (slug !== 'home') return data
  if (!Array.isArray(data.sections) || !Array.isArray(originalDoc?.sections)) return data

  const previous = originalDoc.sections as SectionBlock[]
  const next = [...(data.sections as SectionBlock[])]
  for (const type of LOCKED_HOME_BLOCKS) {
    if (next.some((block) => block?.blockType === type)) continue
    const index = previous.findIndex((block) => block?.blockType === type)
    if (index < 0) continue
    next.splice(Math.min(index, next.length), 0, previous[index])
  }
  data.sections = next
  return data
}
