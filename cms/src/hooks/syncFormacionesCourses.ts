import type { CollectionAfterChangeHook } from 'payload'
import { courseBlocksToPayload } from '../seed/courseToBlock'
import { getCmNivel1TemplateBlocks } from '../seed/cmNivel1Template'

const SKIP_ITEM_IDS = new Set(['liderazgo-emocional'])

const KNOWN_ITEM_SLUGS: Record<string, string> = {
  'cm-nivel-1': 'community-manager-nivel-1',
  'cm-pro': 'community-manager-pro',
  'hablar-publico': 'hablar-en-publico',
  'academia-comercial': 'academia-desarrollo-comercial',
}

export function slugifyTitle(title: string): string {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/·/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function courseIdOf(value: unknown): number | string | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) return value
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id: number | string }).id
    if (id !== undefined && id !== null && String(id)) return id
  }
  return null
}

function cardPatch(row: Record<string, unknown>) {
  const image = row.image
  return {
    title: String(row.title || '').trim(),
    category: String(row.category || ''),
    description: String(row.description || ''),
    imageUrl: String(row.imageUrl || ''),
    ...(typeof image === 'number' || typeof image === 'string' ? { image } : {}),
  }
}

export const syncFormacionesCourses: CollectionAfterChangeHook = async ({
  doc,
  req,
  context,
}) => {
  if (context?.skipFormacionesSync) return doc
  if (doc.slug !== 'learning' || doc._status !== 'published') return doc

  const sections = Array.isArray(doc.sections) ? doc.sections : []
  const services = sections.find(
    (s: { blockType?: string }) => s.blockType === 'services',
  ) as { blockType?: string; formaciones?: Record<string, unknown>[] } | undefined
  if (!services || !Array.isArray(services.formaciones)) return doc

  const { payload } = req
  let changed = false
  const nextFormaciones: Record<string, unknown>[] = []

  for (const row of services.formaciones) {
    if (!row || typeof row !== 'object') continue
    const title = String(row.title || '').trim()
    if (!title) {
      nextFormaciones.push(row)
      continue
    }

    const itemId = String(row.itemId || '')
    const existingId = courseIdOf(row.course)

    if (existingId) {
      try {
        await payload.update({
          collection: 'courses',
          id: existingId,
          data: cardPatch(row) as never,
          overrideAccess: true,
          context: { skipFormacionesSync: true },
        })
      } catch (err) {
        payload.logger.error(
          `Formaciones: no se pudo sync card → course ${existingId}: ${err instanceof Error ? err.message : String(err)}`,
        )
      }
      nextFormaciones.push(row)
      continue
    }

    if (SKIP_ITEM_IDS.has(itemId)) {
      nextFormaciones.push(row)
      continue
    }

    const preferredSlug = KNOWN_ITEM_SLUGS[itemId] || slugifyTitle(title)
    let courseId: number | string | null = null

    const bySlug = await payload.find({
      collection: 'courses',
      where: { slug: { equals: preferredSlug } },
      limit: 1,
      overrideAccess: true,
      depth: 0,
    })
    courseId = bySlug.docs[0]?.id ?? null

    if (!courseId) {
      const byTitle = await payload.find({
        collection: 'courses',
        where: { title: { equals: title } },
        limit: 1,
        overrideAccess: true,
        depth: 0,
      })
      courseId = byTitle.docs[0]?.id ?? null
    }

    if (!courseId) {
      let slug = preferredSlug
      let n = 2
      while (true) {
        const clash = await payload.find({
          collection: 'courses',
          where: { slug: { equals: slug } },
          limit: 1,
          overrideAccess: true,
          depth: 0,
        })
        if (clash.totalDocs === 0) break
        slug = `${preferredSlug}-${n++}`
      }

      const created = await payload.create({
        collection: 'courses',
        data: {
          ...cardPatch(row),
          slug,
          courseId: itemId || `course-${slug}`,
          blocks: courseBlocksToPayload(getCmNivel1TemplateBlocks()) as never,
          cohortStatus: 'open',
        } as never,
        overrideAccess: true,
      })
      courseId = created.id
      payload.logger.info(`Course creado desde Formaciones: ${slug}`)
    }

    changed = true
    nextFormaciones.push({ ...row, course: courseId })
  }

  if (!changed) return doc

  const nextSections = sections.map((s: { blockType?: string }) =>
    s.blockType === 'services' ? { ...s, formaciones: nextFormaciones } : s,
  )

  return payload.update({
    collection: 'pages',
    id: doc.id,
    data: { sections: nextSections, _status: 'published' } as never,
    overrideAccess: true,
    draft: false,
    context: { skipFormacionesSync: true },
  })
}
