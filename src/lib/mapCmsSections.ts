import type { SectionContent } from '@/types/cms'

type MediaDoc = {
  url?: string | null
  sizes?: Record<string, { url?: string | null } | undefined>
}

type CmsBlock = {
  blockType: string
  sectionId?: string
  id?: string
  isVisible?: boolean
  [key: string]: unknown
}

function absolutize(cmsBase: string, url?: string | null): string {
  if (!url || !String(url).trim()) return ''
  const u = String(url).trim()
  if (/^https?:\/\//i.test(u) || u.startsWith('data:')) return u
  if (u.startsWith('/media') || u.startsWith('/api/media')) {
    return cmsBase ? `${cmsBase}${u}` : u
  }
  return u
}

function mediaUrl(
  cmsBase: string,
  upload: unknown,
  fallback?: string | null,
): string {
  if (upload && typeof upload === 'object') {
    const m = upload as MediaDoc
    const fromUpload = m.url || m.sizes?.card?.url || m.sizes?.thumbnail?.url
    if (fromUpload) return absolutize(cmsBase, fromUpload)
  }
  return absolutize(cmsBase, fallback) || (fallback || '')
}

function unwrapItems(arr: unknown): string[] {
  if (!Array.isArray(arr)) return []
  return arr
    .map((row) => {
      if (typeof row === 'string') return row
      if (row && typeof row === 'object' && 'item' in row) {
        return String((row as { item: unknown }).item ?? '')
      }
      return ''
    })
    .filter(Boolean)
}

/**
 * Payload blocks → SectionContent del front.
 */
export function mapCmsBlocksToSections(
  blocks: unknown,
  cmsBase: string,
): SectionContent[] {
  if (!Array.isArray(blocks) || blocks.length === 0) return []

  const out: SectionContent[] = []

  for (const raw of blocks as CmsBlock[]) {
    if (!raw?.blockType) continue
    const sectionId = String(raw.sectionId || raw.id || raw.blockType)
    const isVisible = raw.isVisible !== false

    switch (raw.blockType) {
      case 'hero':
        out.push({
          id: sectionId,
          type: 'hero',
          isVisible,
          badge: String(raw.badge || ''),
          title: String(raw.title || ''),
          titleHighlight: String(raw.titleHighlight || '') || undefined,
          subtitle: String(raw.subtitle || ''),
          description: String(raw.description || ''),
          imageUrl: mediaUrl(cmsBase, raw.image, raw.imageUrl as string),
          videoUrl: mediaUrl(cmsBase, raw.video, raw.videoUrl as string),
          floatingCardTitle: String(raw.floatingCardTitle || '') || undefined,
          floatingCardSubtitle: String(raw.floatingCardSubtitle || '') || undefined,
          statsLabel: String(raw.statsLabel || '') || undefined,
          statsValue: String(raw.statsValue || '') || undefined,
          backgroundType: (raw.backgroundType as 'media' | 'color') || 'color',
          backgroundColor: String(raw.backgroundColor || '') || undefined,
          titleColor: String(raw.titleColor || '') || undefined,
          subtitleColor: String(raw.subtitleColor || '') || undefined,
          descriptionColor: String(raw.descriptionColor || '') || undefined,
          buttons: Array.isArray(raw.buttons)
            ? (raw.buttons as { text: string; link: string; variant: 'primary' | 'secondary' }[])
            : [],
        })
        break
      case 'services': {
        const inCompany = (raw.inCompany || {}) as Record<string, unknown>
        const coming = (raw.formacionesComingSoon || {}) as Record<string, unknown>
        out.push({
          id: sectionId,
          type: 'services',
          isVisible,
          eyebrow: String(raw.eyebrow || '') || undefined,
          title: String(raw.title || ''),
          description: String(raw.description || ''),
          videoUrl: mediaUrl(cmsBase, raw.video, raw.videoUrl as string),
          backgroundType: raw.backgroundType as 'media' | 'color' | undefined,
          backgroundColor: String(raw.backgroundColor || '') || undefined,
          headerBgColor: String(raw.headerBgColor || '') || undefined,
          titleColor: String(raw.titleColor || '') || undefined,
          descriptionColor: String(raw.descriptionColor || '') || undefined,
          services: Array.isArray(raw.services)
            ? (raw.services as Record<string, unknown>[]).map((s) => ({
                iconName: String(s.iconName || ''),
                title: String(s.title || ''),
                description: String(s.description || ''),
                color: String(s.color || 'primary'),
                category: s.category as 'companies' | 'individuals' | undefined,
                includesLabel: String(s.includesLabel || '') || undefined,
                includes: unwrapItems(s.includes),
                ctaText: String(s.ctaText || '') || undefined,
                ctaLink: String(s.ctaLink || '') || undefined,
              }))
            : [],
          modalidadesTitle: String(raw.modalidadesTitle || '') || undefined,
          modalidades: Array.isArray(raw.modalidades)
            ? (raw.modalidades as {
                iconName: string
                title: string
                description: string
                featured?: boolean
              }[])
            : undefined,
          formacionesTitle: String(raw.formacionesTitle || '') || undefined,
          formacionesDescription: String(raw.formacionesDescription || '') || undefined,
          formaciones: Array.isArray(raw.formaciones)
            ? (raw.formaciones as Record<string, unknown>[]).map((f) => ({
                id: String(f.itemId || f.id || ''),
                title: String(f.title || ''),
                description: String(f.description || ''),
                category: String(f.category || ''),
                imageUrl: mediaUrl(cmsBase, f.image, f.imageUrl as string),
                link: String(f.link || '') || undefined,
              }))
            : undefined,
          formacionesComingSoon:
            coming.title || coming.description
              ? {
                  title: String(coming.title || ''),
                  description: String(coming.description || ''),
                }
              : undefined,
          inCompany:
            inCompany.title || inCompany.highlight
              ? {
                  title: String(inCompany.title || ''),
                  highlight: String(inCompany.highlight || ''),
                  description: String(inCompany.description || ''),
                  imageUrl: mediaUrl(cmsBase, inCompany.image, inCompany.imageUrl as string),
                  areas: unwrapItems(inCompany.areas),
                  modalitiesTitle: String(inCompany.modalitiesTitle || ''),
                  modalities: Array.isArray(inCompany.modalities)
                    ? (inCompany.modalities as {
                        iconName: string
                        title: string
                        description: string
                      }[])
                    : [],
                  ctaText: String(inCompany.ctaText || ''),
                  ctaLink: String(inCompany.ctaLink || ''),
                }
              : undefined,
        })
        break
      }
      case 'about': {
        const purpose = (raw.purpose || {}) as Record<string, unknown>
        const mission = (raw.mission || {}) as Record<string, unknown>
        out.push({
          id: sectionId,
          type: 'about',
          isVisible,
          title: String(raw.title || ''),
          eyebrow: String(raw.eyebrow || '') || undefined,
          personName: String(raw.personName || '') || undefined,
          personRole: String(raw.personRole || '') || undefined,
          personImage: mediaUrl(cmsBase, raw.personImageUpload, raw.personImage as string),
          specialties: unwrapItems(raw.specialties),
          introText: unwrapItems(raw.introText),
          purpose: {
            title: String(purpose.title || ''),
            description: String(purpose.description || ''),
          },
          mission: {
            title: String(mission.title || ''),
            description: String(mission.description || ''),
          },
          pillarsTitle: String(raw.pillarsTitle || '') || undefined,
          pillars: Array.isArray(raw.pillars)
            ? (raw.pillars as {
                iconName: string
                title: string
                description: string
                color?: string
              }[])
            : undefined,
          values: Array.isArray(raw.values)
            ? (raw.values as {
                iconName: string
                title: string
                description: string
                color?: string
              }[])
            : [],
          videoUrl: mediaUrl(cmsBase, raw.video, raw.videoUrl as string),
          backgroundType: raw.backgroundType as 'media' | 'color' | undefined,
          backgroundColor: String(raw.backgroundColor || '') || undefined,
          headerBgColor: String(raw.headerBgColor || '') || undefined,
          titleColor: String(raw.titleColor || '') || undefined,
        })
        break
      }
      case 'contact': {
        const ct = (raw.customTraining || {}) as Record<string, unknown>
        out.push({
          id: sectionId,
          type: 'contact',
          isVisible,
          title: String(raw.title || ''),
          description: String(raw.description || ''),
          whatsappNumber: String(raw.whatsappNumber || ''),
          email: String(raw.email || '') || undefined,
          customTraining:
            ct.title || ct.description
              ? {
                  title: String(ct.title || ''),
                  description: String(ct.description || ''),
                  ctaText: String(ct.ctaText || ''),
                  steps: Array.isArray(ct.steps)
                    ? (ct.steps as { number: string; title: string; description: string }[])
                    : [],
                }
              : undefined,
          socialLinks: Array.isArray(raw.socialLinks)
            ? (raw.socialLinks as {
                platform: 'whatsapp' | 'linkedin' | 'instagram' | 'email'
                url: string
                label: string
              }[])
            : [],
          backgroundType: raw.backgroundType as 'media' | 'color' | undefined,
          backgroundColor: String(raw.backgroundColor || '') || undefined,
          headerBgColor: String(raw.headerBgColor || '') || undefined,
          titleColor: String(raw.titleColor || '') || undefined,
          descriptionColor: String(raw.descriptionColor || '') || undefined,
          videoUrl: mediaUrl(cmsBase, raw.video, raw.videoUrl as string) || undefined,
        })
        break
      }
      case 'settings':
        out.push({
          id: sectionId,
          type: 'settings',
          isVisible,
          cvUrl: String(raw.cvUrl || ''),
          cvText: String(raw.cvText || ''),
          footerTagline: String(raw.footerTagline || '') || undefined,
        })
        break
      case 'posts':
        out.push({
          id: sectionId,
          type: 'posts',
          isVisible,
          title: String(raw.title || ''),
          subtitle: String(raw.subtitle || ''),
          backgroundType: (raw.backgroundType as 'media' | 'color') || 'color',
          backgroundColor: String(raw.backgroundColor || '') || undefined,
          headerBgColor: String(raw.headerBgColor || '') || undefined,
          titleColor: String(raw.titleColor || '') || undefined,
          subtitleColor: String(raw.subtitleColor || '') || undefined,
          videoUrl: mediaUrl(cmsBase, raw.video, raw.videoUrl as string),
          posts: Array.isArray(raw.posts)
            ? (raw.posts as Record<string, unknown>[]).map((p) => ({
                id: String(p.itemId || p.id || ''),
                imageUrl: mediaUrl(cmsBase, p.image, p.imageUrl as string),
                description: String(p.description || ''),
                postUrl: String(p.postUrl || ''),
                platform: p.platform as 'instagram' | 'linkedin',
              }))
            : [],
        })
        break
      case 'news':
        out.push({
          id: sectionId,
          type: 'news',
          isVisible,
          title: String(raw.title || ''),
          subtitle: String(raw.subtitle || ''),
          backgroundType: (raw.backgroundType as 'media' | 'color') || 'color',
          backgroundColor: String(raw.backgroundColor || '') || undefined,
          headerBgColor: String(raw.headerBgColor || '') || undefined,
          titleColor: String(raw.titleColor || '') || undefined,
          subtitleColor: String(raw.subtitleColor || '') || undefined,
          descriptionColor: String(raw.descriptionColor || '') || undefined,
          underlineColor: String(raw.underlineColor || '') || undefined,
          newsPageTitle: String(raw.newsPageTitle || '') || undefined,
          newsPageSubtitle: String(raw.newsPageSubtitle || '') || undefined,
          videoUrl: mediaUrl(cmsBase, raw.video, raw.videoUrl as string) || undefined,
          newsItems: Array.isArray(raw.newsItems)
            ? (raw.newsItems as Record<string, unknown>[]).map((n) => ({
                id: String(n.itemId || n.id || ''),
                title: String(n.title || ''),
                excerpt: String(n.excerpt || ''),
                content: String(n.content || ''),
                date: String(n.date || ''),
                author: String(n.author || ''),
                category: String(n.category || ''),
                citation: String(n.citation || '') || undefined,
                media: Array.isArray(n.media)
                  ? (n.media as Record<string, unknown>[]).map((m) => ({
                      type: m.type as 'image' | 'video',
                      url: mediaUrl(cmsBase, m.file, m.url as string),
                      isMain: Boolean(m.isMain),
                    }))
                  : [],
                attachments: Array.isArray(n.attachments)
                  ? (n.attachments as Record<string, unknown>[]).map((a) => ({
                      id: String(a.itemId || a.id || ''),
                      name: String(a.name || ''),
                      url: String(a.url || ''),
                      type: a.type as 'pdf' | 'image' | 'excel' | 'link',
                    }))
                  : [],
              }))
            : [],
        })
        break
      default:
        break
    }
  }

  return out
}
