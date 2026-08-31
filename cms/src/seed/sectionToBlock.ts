/**
 * Convierte SectionContent del front → bloques Payload para seed.
 * Las imágenes quedan como path/URL texto; el upload se completa desde el admin.
 */
type AnySection = Record<string, unknown> & { id: string; type: string }

function stringItems(arr?: string[]) {
  return (arr || []).map((item) => ({ item }))
}

export function sectionToBlock(section: AnySection): Record<string, unknown> | null {
  const base = {
    sectionId: section.id,
    isVisible: section.isVisible !== false,
  }

  switch (section.type) {
    case 'hero':
      return {
        blockType: 'hero',
        ...base,
        badge: section.badge || '',
        title: section.title,
        titleHighlight: section.titleHighlight || '',
        subtitle: section.subtitle,
        description: section.description,
        imageUrl: section.imageUrl || '',
        videoUrl: section.videoUrl || '',
        floatingCardTitle: section.floatingCardTitle || '',
        floatingCardSubtitle: section.floatingCardSubtitle || '',
        statsLabel: section.statsLabel || '',
        statsValue: section.statsValue || '',
        backgroundType: section.backgroundType || 'color',
        backgroundColor: section.backgroundColor || '',
        titleColor: section.titleColor || '',
        subtitleColor: section.subtitleColor || '',
        descriptionColor: section.descriptionColor || '',
        buttons: section.buttons || [],
      }
    case 'services': {
      const services = Array.isArray(section.services) ? section.services : []
      const modalidades = Array.isArray(section.modalidades) ? section.modalidades : []
      const inCompany = (section.inCompany || {}) as Record<string, unknown>
      const coming = (section.formacionesComingSoon || {}) as Record<string, unknown>
      return {
        blockType: 'services',
        ...base,
        eyebrow: section.eyebrow || '',
        title: section.title,
        description: section.description,
        videoUrl: section.videoUrl || '',
        backgroundType: section.backgroundType || 'color',
        backgroundColor: section.backgroundColor || '',
        headerBgColor: section.headerBgColor || '',
        titleColor: section.titleColor || '',
        descriptionColor: section.descriptionColor || '',
        services: services.map((s: Record<string, unknown>) => ({
          imageUrl: s.imageUrl || '',
          iconName: s.iconName,
          title: s.title,
          description: s.description,
          color: s.color || 'primary',
          category: s.category || '',
          includesLabel: s.includesLabel || '',
          includes: stringItems(s.includes as string[] | undefined),
          ctaText: s.ctaText || '',
          ctaLink: s.ctaLink || '',
        })),
        modalidadesTitle: section.modalidadesTitle || '',
        modalidades,
        formacionesTitle: section.formacionesTitle || '',
        formacionesDescription: section.formacionesDescription || '',
        formaciones: [],
        formacionesComingSoon: {
          title: coming.title || '',
          description: coming.description || '',
        },
        inCompany: {
          title: inCompany.title || '',
          highlight: inCompany.highlight || '',
          description: inCompany.description || '',
          imageUrl: inCompany.imageUrl || '',
          areas: stringItems(inCompany.areas as string[] | undefined),
          modalitiesTitle: inCompany.modalitiesTitle || '',
          modalities: inCompany.modalities || [],
          ctaText: inCompany.ctaText || '',
          ctaLink: inCompany.ctaLink || '',
        },
      }
    }
    case 'about': {
      const purpose = (section.purpose || {}) as Record<string, unknown>
      const mission = (section.mission || {}) as Record<string, unknown>
      return {
        blockType: 'about',
        ...base,
        title: section.title,
        eyebrow: section.eyebrow || '',
        personName: section.personName || '',
        personRole: section.personRole || '',
        personImage: section.personImage || '',
        specialties: stringItems(section.specialties as string[] | undefined),
        introText: stringItems(section.introText as string[] | undefined),
        purpose: { title: purpose.title || '', description: purpose.description || '' },
        mission: { title: mission.title || '', description: mission.description || '' },
        pillarsTitle: section.pillarsTitle || '',
        pillars: section.pillars || [],
        values: section.values || [],
        videoUrl: section.videoUrl || '',
        backgroundType: section.backgroundType || 'color',
        backgroundColor: section.backgroundColor || '',
        headerBgColor: section.headerBgColor || '',
        titleColor: section.titleColor || '',
      }
    }
    case 'contact': {
      const ct = (section.customTraining || {}) as Record<string, unknown>
      return {
        blockType: 'contact',
        ...base,
        title: section.title,
        description: section.description,
        whatsappNumber: section.whatsappNumber,
        email: section.email || '',
        customTraining: {
          title: ct.title || '',
          description: ct.description || '',
          ctaText: ct.ctaText || '',
          steps: ct.steps || [],
        },
        socialLinks: section.socialLinks || [],
        backgroundType: section.backgroundType || 'color',
        backgroundColor: section.backgroundColor || '',
        headerBgColor: section.headerBgColor || '',
        titleColor: section.titleColor || '',
        descriptionColor: section.descriptionColor || '',
        videoUrl: section.videoUrl || '',
      }
    }
    case 'settings':
      return {
        blockType: 'settings',
        ...base,
        cvUrl: section.cvUrl,
        cvText: section.cvText,
        footerTagline: section.footerTagline || '',
      }
    case 'posts': {
      const posts = Array.isArray(section.posts) ? section.posts : []
      return {
        blockType: 'posts',
        ...base,
        title: section.title,
        subtitle: section.subtitle || '',
        backgroundType: section.backgroundType || 'color',
        backgroundColor: section.backgroundColor || '',
        headerBgColor: section.headerBgColor || '',
        titleColor: section.titleColor || '',
        subtitleColor: section.subtitleColor || '',
        videoUrl: section.videoUrl || '',
        posts: posts.map((p: Record<string, unknown>) => ({
          itemId: p.id,
          imageUrl: p.imageUrl || '',
          description: p.description,
          postUrl: p.postUrl,
          platform: p.platform,
        })),
      }
    }
    case 'news': {
      const items = Array.isArray(section.newsItems) ? section.newsItems : []
      return {
        blockType: 'news',
        ...base,
        title: section.title,
        subtitle: section.subtitle || '',
        backgroundType: section.backgroundType || 'color',
        backgroundColor: section.backgroundColor || '',
        headerBgColor: section.headerBgColor || '',
        titleColor: section.titleColor || '',
        subtitleColor: section.subtitleColor || '',
        descriptionColor: section.descriptionColor || '',
        underlineColor: section.underlineColor || '',
        newsPageTitle: section.newsPageTitle || '',
        newsPageSubtitle: section.newsPageSubtitle || '',
        videoUrl: section.videoUrl || '',
        newsItems: items.map((n: Record<string, unknown>) => ({
          itemId: n.id,
          title: n.title,
          excerpt: n.excerpt,
          content: n.content,
          date: n.date,
          author: n.author,
          category: n.category,
          citation: n.citation || '',
          media: (Array.isArray(n.media) ? n.media : []).map((m: Record<string, unknown>) => ({
            type: m.type,
            url: m.url || '',
            isMain: Boolean(m.isMain),
          })),
          attachments: (Array.isArray(n.attachments) ? n.attachments : []).map(
            (a: Record<string, unknown>) => ({
              itemId: a.id,
              name: a.name,
              url: a.url,
              type: a.type,
            }),
          ),
        })),
      }
    }
    default:
      return null
  }
}

export function sectionsToBlocks(sections: AnySection[]): Record<string, unknown>[] {
  return sections
    .filter((s) => s.type !== 'courses')
    .map(sectionToBlock)
    .filter((b): b is Record<string, unknown> => Boolean(b))
}
