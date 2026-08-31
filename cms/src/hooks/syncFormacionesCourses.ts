import type { CollectionBeforeChangeHook, Payload } from 'payload'
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

async function findOrCreateCourse(
  payload: Payload,
  row: Record<string, unknown>,
  title: string,
  itemId: string,
): Promise<number | string | null> {
  const preferredSlug = KNOWN_ITEM_SLUGS[itemId] || slugifyTitle(title)

  const bySlug = await payload.find({
    collection: 'courses',
    where: { slug: { equals: preferredSlug } },
    limit: 1,
    overrideAccess: true,
    depth: 0,
  })
  if (bySlug.docs[0]?.id) return bySlug.docs[0].id

  const byTitle = await payload.find({
    collection: 'courses',
    where: { title: { equals: title } },
    limit: 1,
    overrideAccess: true,
    depth: 0,
  })
  if (byTitle.docs[0]?.id) return byTitle.docs[0].id

  let slug = preferredSlug
  for (let n = 2; n < 20; n++) {
    const clash = await payload.find({
      collection: 'courses',
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true,
      depth: 0,
    })
    if (clash.totalDocs === 0) break
    slug = `${preferredSlug}-${n}`
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
  payload.logger.info(`Course creado desde Formaciones: ${slug}`)
  return created.id
}

export const syncFormacionesCourses: CollectionBeforeChangeHook = async ({ data, req }) => {
  if (data.slug !== 'learning' || data._status !== 'published') return data

  const sections = data.sections
  if (!Array.isArray(sections)) return data

  const { payload } = req

  for (const section of sections) {
    if (!section || typeof section !== 'object') continue
    if ((section as { blockType?: string }).blockType !== 'services') continue
    const formaciones = (section as { formaciones?: unknown }).formaciones
    if (!Array.isArray(formaciones)) continue

    for (const row of formaciones) {
      if (!row || typeof row !== 'object') continue
      const rec = row as Record<string, unknown>
      const title = String(rec.title || '').trim()
      if (!title) continue

      const itemId = String(rec.itemId || '')
      const existingId = courseIdOf(rec.course)

      if (existingId) {
        try {
          await payload.update({
            collection: 'courses',
            id: existingId,
            data: cardPatch(rec) as never,
            overrideAccess: true,
          })
        } catch (err) {
          payload.logger.error(
            `Formaciones: no se pudo sync card → course ${existingId}: ${err instanceof Error ? err.message : String(err)}`,
          )
        }
        continue
      }

      if (SKIP_ITEM_IDS.has(itemId)) continue

      try {
        const courseId = await findOrCreateCourse(payload, rec, title, itemId)
        if (courseId) rec.course = courseId
      } catch (err) {
        payload.logger.error(
          `Formaciones: no se pudo crear página para "${title}": ${err instanceof Error ? err.message : String(err)}`,
        )
      }
    }
  }

  return data
}
