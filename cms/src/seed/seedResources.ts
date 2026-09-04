import type { Payload } from 'payload'
import { defaultResources, defaultResourcesPage } from './resourcesDefaults'

export async function seedResources(payload: Payload) {
  try {
    const page = await payload.findGlobal({
      slug: 'resources-page',
      overrideAccess: true,
    })
    const empty = !page.subtitle && (!Array.isArray(page.steps) || page.steps.length === 0)
    if (empty) {
      await payload.updateGlobal({
        slug: 'resources-page',
        data: defaultResourcesPage as never,
        overrideAccess: true,
      })
      payload.logger.info('Página de recursos: textos iniciales cargados')
    }
  } catch {
    // schema puede no estar listo
  }

  try {
    const existing = await payload.find({
      collection: 'resources',
      limit: 1,
      overrideAccess: true,
    })
    if (existing.totalDocs > 0) return

    for (const item of defaultResources) {
      await payload.create({
        collection: 'resources',
        data: item as never,
        overrideAccess: true,
      })
    }
    payload.logger.info(`Recursos iniciales: ${defaultResources.length}`)
  } catch (err) {
    payload.logger.error(
      `seedResources falló: ${err instanceof Error ? err.message : String(err)}`,
    )
  }
}
