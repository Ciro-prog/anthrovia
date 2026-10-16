import { HoldingPage } from '@/components/HoldingPage'
import { useCMS } from '@/context/CMSContext'
import { defaultSiteSettings } from '@/lib/cmsApi'

export function NotFoundPage() {
  const { siteSettings } = useCMS()
  const title = siteSettings.notFoundTitle || defaultSiteSettings.notFoundTitle || 'En mantenimiento'
  const message =
    siteSettings.notFoundMessage ||
    defaultSiteSettings.notFoundMessage ||
    'Esta dirección no está disponible por ahora. Podés seguir recorriendo el sitio desde el menú o volver al inicio.'
  const ctaLabel = siteSettings.notFoundCtaLabel || defaultSiteSettings.notFoundCtaLabel || 'Volver al inicio'

  return <HoldingPage eyebrow="Sitio" title={title} message={message} ctaLabel={ctaLabel} />
}
