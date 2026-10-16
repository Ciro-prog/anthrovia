import type { SiteSettingsContent } from '@/types/cms'

export function siteLoadingMessage(settings: SiteSettingsContent, fallback: string) {
  const custom = settings.loadingMessage?.trim()
  return custom || fallback
}
