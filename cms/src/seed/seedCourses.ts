import type { Payload } from 'payload'
import { courseBlocksToPayload } from './courseToBlock'
import coursesSnapshot from './coursesContent.json'
import siteContent from './siteContent.json'

type SiteFormacion = {
  id?: string
  title?: string
  description?: string
  category?: string
  imageUrl?: string
  link?: string
}

const siteFormaciones: SiteFormacion[] =
  (
    siteContent.learning as {
      type?: string
      formaciones?: SiteFormacion[]
    }[]
  ).find((s) => s.type === 'services')?.formaciones || []

const cardBySlug: Record<string, { category: string; description: string; imageUrl: string }> = {}
for (const f of siteFormaciones) {
  const slug = String(f.link || '').replace('/capacitaciones/', '')
  if (slug && !slug.startsWith('#')) {
    cardBySlug[slug] = {
      category: f.category || '',
      description: f.description || '',
      imageUrl: f.imageUrl || '',
    }
  }
}

type CourseSnap = {
  id: string
  slug: string
  title: string
  blocks: (Record<string, unknown> & { type: string })[]
}

function blocksAreEmpty(blocks: unknown): boolean {
  return !Array.isArray(blocks) || blocks.length === 0
}

async function backfillEmptyCourseBlocks(
  payload: Payload,
  log: (msg: string) => void,
  logError: (msg: string) => void,
) {
  const all = await payload.find({
    collection: 'courses',
    limit: 50,
    overrideAccess: true,
    depth: 0,
  })
  const bySlug = new Map((coursesSnapshot as CourseSnap[]).map((c) => [c.slug, c]))

  for (const doc of all.docs) {
    const slug = String(doc.slug || '')
    const snap = bySlug.get(slug)
    if (!snap || !blocksAreEmpty(doc.blocks)) continue
    try {
      await payload.update({
        collection: 'courses',
        id: doc.id,
        data: { blocks: courseBlocksToPayload(snap.blocks) } as never,
        overrideAccess: true,
      })
      log(`Course blocks rellenados: ${slug}`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      logError(`Course backfill falló (${slug}): ${msg}`)
    }
  }
}

function rowHasTitle(row: unknown): boolean {
  return Boolean(row && typeof row === 'object' && 'title' in row && (row as { title?: string }).title)
}

function rowHasCourse(row: unknown): boolean {
  return Boolean(row && typeof row === 'object' && 'course' in row && (row as { course?: unknown }).course)
}

export async function seedCourses(
  payload: Payload,
  log: (msg: string) => void = (msg) => payload.logger.info(msg),
  logError: (msg: string) => void = (msg) => payload.logger.error(msg),
): Promise<number[]> {
  const existing = await payload.find({
    collection: 'courses',
    limit: 1,
    overrideAccess: true,
    depth: 0,
  })

  const ids: number[] = []

  if (existing.totalDocs > 0) {
    const all = await payload.find({
      collection: 'courses',
      limit: 50,
      overrideAccess: true,
      depth: 0,
    })
    for (const doc of all.docs) ids.push(Number(doc.id))
    log(`Courses ya existen (${all.totalDocs}), skip create`)
    await backfillEmptyCourseBlocks(payload, log, logError)
  } else {
    for (const course of coursesSnapshot as CourseSnap[]) {
      try {
        const card = cardBySlug[course.slug] || { category: '', description: '', imageUrl: '' }
        const created = await payload.create({
          collection: 'courses',
          data: {
            title: course.title,
            slug: course.slug,
            courseId: course.id,
            category: card.category,
            description: card.description,
            imageUrl: card.imageUrl,
            blocks: courseBlocksToPayload(course.blocks) as never,
            cohortStatus: 'open',
          } as never,
          overrideAccess: true,
        })
        ids.push(Number(created.id))
        log(`Course creado: ${course.slug}`)
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        const extra =
          typeof err === 'object' && err && 'data' in err
            ? ` ${JSON.stringify((err as { data: unknown }).data)}`
            : ''
        logError(`Course seed falló (${course.slug}): ${msg}${extra}`)
        throw err
      }
    }
  }

  if (ids.length === 0) return ids

  const found = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'learning' } },
    limit: 1,
    overrideAccess: true,
    depth: 2,
    draft: true,
  })
  const page = found.docs[0] as
    | { id: number | string; sections?: { blockType?: string; formaciones?: unknown[] }[] }
    | undefined
  if (!page?.sections) return ids

  const services = page.sections.find((s) => s.blockType === 'services')
  const current = Array.isArray(services?.formaciones) ? services.formaciones : []
  const alreadyReady = current.length > 0 && current.every(rowHasTitle) && current.some(rowHasCourse)
  if (alreadyReady) return ids

  const allCourses = await payload.find({
    collection: 'courses',
    limit: 50,
    overrideAccess: true,
    depth: 0,
  })
  const bySlug = new Map(allCourses.docs.map((c) => [String(c.slug), c.id]))

  const formaciones = siteFormaciones.map((f) => {
    const slug = String(f.link || '').replace('/capacitaciones/', '')
    const courseId = slug && !slug.startsWith('#') ? bySlug.get(slug) : undefined
    return {
      itemId: f.id || '',
      title: f.title || '',
      description: f.description || '',
      category: f.category || '',
      imageUrl: f.imageUrl || '',
      ...(courseId ? { course: courseId } : {}),
    }
  })

  if (formaciones.length === 0) return ids

  const nextSections = page.sections.map((s) =>
    s.blockType === 'services' ? { ...s, formaciones } : s,
  )

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { sections: nextSections, _status: 'published' } as never,
    overrideAccess: true,
    draft: false,
    context: { skipFormacionesSync: true },
  })
  log('Page learning: formaciones (cards) + cursos vinculados')

  return ids
}
