import type { Payload } from 'payload'
import { defaultDossierPage } from './dossierPageDefaults'

export async function seedDossierPage(payload: Payload) {
  try {
    const page = await payload.findGlobal({
      slug: 'dossier-page',
      overrideAccess: true,
    })
    const empty = !page.heroTitle && !page.pathTitle && (!Array.isArray(page.painPoints) || page.painPoints.length === 0)
    if (!empty) return
    await payload.updateGlobal({
      slug: 'dossier-page',
      data: defaultDossierPage as never,
      overrideAccess: true,
    })
    payload.logger.info('Página dossier: textos iniciales cargados')
  } catch (err) {
    payload.logger.error(
      `seedDossierPage falló: ${err instanceof Error ? err.message : String(err)}`,
    )
  }
}
