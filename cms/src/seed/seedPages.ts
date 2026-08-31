import type { Payload } from 'payload'
import { sectionsToBlocks } from './sectionToBlock'
import siteContent from './siteContent.json'

function formatSeedError(err: unknown): string {
  if (err instanceof Error) {
    const extra =
      typeof err === 'object' && err && 'data' in err
        ? ` ${JSON.stringify((err as { data: unknown }).data)}`
        : ''
    return `${err.message}${extra}`
  }
  return String(err)
}

export const pagesToSeed = [
  {
    slug: 'home',
    title: 'Home',
    sections: sectionsToBlocks(siteContent.home as never),
  },
  {
    slug: 'learning',
    title: 'Capacitaciones',
    sections: sectionsToBlocks(siteContent.learning as never),
  },
]

/**
 * Crea o rellena Home / Capacitaciones publicadas.
 * `draft: true` en el find: con versions.drafts, un find normal no ve borradores.
 */
export async function seedPages(
  payload: Payload,
  log: (msg: string) => void = (msg) => payload.logger.info(msg),
  logError: (msg: string) => void = (msg) => payload.logger.error(msg),
): Promise<void> {
  for (const page of pagesToSeed) {
    try {
      const found = await payload.find({
        collection: 'pages',
        where: { slug: { equals: page.slug } },
        limit: 1,
        overrideAccess: true,
        depth: 0,
        draft: true,
      })
      const existing = found.docs[0] as { id: number | string; sections?: unknown[] } | undefined
      const empty =
        !existing || !Array.isArray(existing.sections) || existing.sections.length === 0

      if (!existing) {
        await payload.create({
          collection: 'pages',
          data: { ...page, _status: 'published' } as never,
          overrideAccess: true,
          draft: false,
        })
        log(`Page creada: ${page.slug} (${page.sections.length} secciones)`)
      } else if (empty) {
        await payload.update({
          collection: 'pages',
          id: existing.id,
          data: {
            title: page.title,
            sections: page.sections,
            _status: 'published',
          } as never,
          overrideAccess: true,
          draft: false,
        })
        log(`Page seed (vacía): ${page.slug}`)
      } else {
        log(`Page ya tiene contenido, skip: ${page.slug}`)
      }
    } catch (err) {
      logError(`Page seed falló (${page.slug}): ${formatSeedError(err)}`)
      throw err
    }
  }
}
