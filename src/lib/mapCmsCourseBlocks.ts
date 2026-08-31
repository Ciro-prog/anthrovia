import type { CourseBlock, CourseBlockButton } from '@/types/cms'

type MediaDoc = {
  url?: string | null
  sizes?: Record<string, { url?: string | null } | undefined>
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

function mediaUrl(cmsBase: string, upload: unknown, fallback?: string | null): string {
  if (upload && typeof upload === 'object') {
    const m = upload as MediaDoc
    const fromUpload = m.url || m.sizes?.card?.url || m.sizes?.thumbnail?.url
    if (fromUpload) return absolutize(cmsBase, fromUpload)
  }
  return absolutize(cmsBase, fallback) || fallback || ''
}

function splitLines(text: unknown): string[] {
  if (Array.isArray(text)) return text.map(String).filter(Boolean)
  if (typeof text !== 'string' || !text.trim()) return []
  return text.split('\n').map((s) => s.trim()).filter(Boolean)
}

function btns(arr: unknown): CourseBlockButton[] {
  if (!Array.isArray(arr)) return []
  return arr.map((b: Record<string, unknown>) => ({
    text: String(b.text || ''),
    link: String(b.link || ''),
    variant: (b.variant as CourseBlockButton['variant']) || 'primary',
  }))
}

/**
 * Payload course blocks o CourseBlock[] legacy → CourseBlock[] del front.
 */
export function mapCmsCourseBlocks(blocks: unknown, cmsBase: string): CourseBlock[] {
  if (!Array.isArray(blocks) || blocks.length === 0) return []

  const out: CourseBlock[] = []

  for (const raw of blocks as Record<string, unknown>[]) {
    const kind = String(raw.blockType || raw.type || '')
    if (!kind) continue

    // Legacy: ya es CourseBlock
    if (raw.type && !raw.blockType) {
      out.push(raw as unknown as CourseBlock)
      continue
    }

    switch (kind) {
      case 'hero':
        out.push({
          type: 'hero',
          title: String(raw.title || ''),
          titleItalic: String(raw.titleItalic || '') || undefined,
          paragraphs: splitLines(raw.paragraphsText),
          highlight: String(raw.highlight || '') || undefined,
          imageUrl: mediaUrl(cmsBase, raw.image, raw.imageUrl as string) || undefined,
          logoUrl: mediaUrl(cmsBase, raw.logo, raw.logoUrl as string) || undefined,
          layout: (raw.layout as 'editorial' | 'centered') || undefined,
          checks: splitLines(raw.checksText),
          buttons: btns(raw.buttons),
        })
        break
      case 'richText':
        out.push({
          type: 'richText',
          eyebrow: String(raw.eyebrow || '') || undefined,
          title: String(raw.title || ''),
          titleItalic: String(raw.titleItalic || '') || undefined,
          body: String(raw.body || ''),
          paragraphs: splitLines(raw.paragraphsText),
          background: raw.background as 'surface' | 'low' | 'container' | undefined,
          align: raw.align as 'left' | 'center' | undefined,
        })
        break
      case 'contextSplit':
        out.push({
          type: 'contextSplit',
          title: String(raw.title || ''),
          titleItalic: String(raw.titleItalic || '') || undefined,
          paragraphs: splitLines(raw.paragraphsText),
          formulaLabel: String(raw.formulaLabel || '') || undefined,
          formulaItems: Array.isArray(raw.formulaItems)
            ? (raw.formulaItems as { iconName: string; label: string }[])
            : undefined,
          closing: String(raw.closing || '') || undefined,
          imageUrl: mediaUrl(cmsBase, raw.image, raw.imageUrl as string),
        })
        break
      case 'beforeAfter':
        out.push({
          type: 'beforeAfter',
          title: String(raw.title || ''),
          body: String(raw.body || '') || undefined,
          before: {
            title: String(raw.beforeTitle || 'Antes'),
            items: splitLines(raw.beforeItemsText),
          },
          after: {
            title: String(raw.afterTitle || 'Después'),
            items: splitLines(raw.afterItemsText),
          },
        })
        break
      case 'triad':
        out.push({
          type: 'triad',
          title: String(raw.title || ''),
          items: Array.isArray(raw.items)
            ? (raw.items as { title: string; body: string; featured?: boolean }[])
            : [],
        })
        break
      case 'desireFear':
        out.push({
          type: 'desireFear',
          title: String(raw.title || ''),
          desire: {
            title: String(raw.desireTitle || ''),
            items: splitLines(raw.desireItemsText),
          },
          fear: {
            title: String(raw.fearTitle || ''),
            items: splitLines(raw.fearItemsText),
          },
        })
        break
      case 'pathway':
        out.push({
          type: 'pathway',
          eyebrow: String(raw.eyebrow || ''),
          intro: splitLines(raw.introText),
          forYouLabel: String(raw.forYouLabel || '') || undefined,
          forYou: splitLines(raw.forYouText),
          note: String(raw.note || '') || undefined,
          stepsTitle: String(raw.stepsTitle || ''),
          stepsTitleItalic: String(raw.stepsTitleItalic || '') || undefined,
          aside: String(raw.aside || '') || undefined,
          steps: Array.isArray(raw.steps)
            ? (raw.steps as Record<string, unknown>[]).map((s) => ({
                title: String(s.title || ''),
                paragraphs: splitLines(s.paragraphsText),
                result: String(s.result || ''),
                imageUrl: mediaUrl(cmsBase, s.image, s.imageUrl as string),
                imageFirst: Boolean(s.imageFirst),
                highlight: Boolean(s.highlight),
              }))
            : [],
        })
        break
      case 'toolsSplit':
        out.push({
          type: 'toolsSplit',
          title: String(raw.title || ''),
          categories: Array.isArray(raw.categories)
            ? (raw.categories as { title: string; tools: string }[])
            : [],
          paragraphs: splitLines(raw.paragraphsText),
          imageUrl: mediaUrl(cmsBase, raw.image, raw.imageUrl as string),
        })
        break
      case 'philosophy':
        out.push({
          type: 'philosophy',
          title: String(raw.title || ''),
          paragraphs: splitLines(raw.paragraphsText),
          emphasis: String(raw.emphasis || '') || undefined,
          paragraphsAfter: splitLines(raw.paragraphsAfterText),
        })
        break
      case 'testimonials':
        out.push({
          type: 'testimonials',
          title: String(raw.title || ''),
          items: Array.isArray(raw.items)
            ? (raw.items as { quote: string; author: string }[])
            : [],
        })
        break
      case 'teacherBand':
        out.push({
          type: 'teacherBand',
          title: String(raw.title || ''),
          lead: String(raw.lead || '') || undefined,
          name: String(raw.name || ''),
          role: String(raw.role || ''),
          experienceLabel: String(raw.experienceLabel || '') || undefined,
          experience: splitLines(raw.experienceText),
          paragraphs: splitLines(raw.paragraphsText),
          emphasis: String(raw.emphasis || '') || undefined,
          imageUrl: mediaUrl(cmsBase, raw.image, raw.imageUrl as string),
        })
        break
      case 'investmentCard':
        out.push({
          type: 'investmentCard',
          title: String(raw.title || ''),
          badge: String(raw.badge || '') || undefined,
          inclusions: splitLines(raw.inclusionsText),
          priceOld: String(raw.priceOld || '') || undefined,
          priceNew: String(raw.priceNew || ''),
          discountBadge: String(raw.discountBadge || '') || undefined,
        })
        break
      case 'bonuses':
        out.push({
          type: 'bonuses',
          title: String(raw.title || ''),
          items: Array.isArray(raw.items)
            ? (raw.items as {
                label: string
                title: string
                description: string
                valueLabel: string
                featured?: boolean
              }[])
            : [],
          footer: String(raw.footer || ''),
        })
        break
      case 'closingCta': {
        const primary = (raw.primary || {}) as Record<string, unknown>
        const secondary = (raw.secondary || {}) as Record<string, unknown>
        out.push({
          type: 'closingCta',
          title: String(raw.title || ''),
          titleItalic: String(raw.titleItalic || '') || undefined,
          primary: {
            text: String(primary.text || ''),
            link: String(primary.link || ''),
            variant: primary.variant as CourseBlockButton['variant'],
          },
          doubtTitle: String(raw.doubtTitle || '') || undefined,
          doubtBody: String(raw.doubtBody || '') || undefined,
          secondary: secondary.text
            ? {
                text: String(secondary.text),
                link: String(secondary.link || ''),
                variant: secondary.variant as CourseBlockButton['variant'],
              }
            : undefined,
        })
        break
      }
      case 'twoColumn': {
        const left = (raw.left || {}) as Record<string, unknown>
        const right = (raw.right || {}) as Record<string, unknown>
        out.push({
          type: 'twoColumn',
          left: {
            eyebrow: String(left.eyebrow || '') || undefined,
            title: String(left.title || ''),
            body: String(left.body || ''),
          },
          right: {
            eyebrow: String(right.eyebrow || '') || undefined,
            title: String(right.title || ''),
            body: String(right.body || ''),
          },
          background: raw.background as 'surface' | 'low' | 'container' | undefined,
        })
        break
      }
      case 'iconGrid':
        out.push({
          type: 'iconGrid',
          title: String(raw.title || ''),
          description: String(raw.description || '') || undefined,
          items: Array.isArray(raw.items)
            ? (raw.items as {
                iconName: string
                title: string
                description: string
                tone?: 'secondary' | 'primary'
              }[])
            : [],
          background: raw.background as 'surface' | 'low' | 'container' | undefined,
        })
        break
      case 'splitMedia':
        out.push({
          type: 'splitMedia',
          title: String(raw.title || ''),
          body: String(raw.body || ''),
          imageUrl: mediaUrl(cmsBase, raw.image, raw.imageUrl as string),
          imagePosition: raw.imagePosition as 'left' | 'right' | undefined,
          background: raw.background as 'surface' | 'low' | 'container' | 'dark' | undefined,
        })
        break
      case 'darkBand':
        out.push({
          type: 'darkBand',
          title: String(raw.title || ''),
          body: String(raw.body || ''),
          imageUrl: mediaUrl(cmsBase, raw.image, raw.imageUrl as string) || undefined,
        })
        break
      case 'tags':
        out.push({
          type: 'tags',
          title: String(raw.title || ''),
          body: String(raw.body || '') || undefined,
          tags: splitLines(raw.tagsText),
          asideTitle: String(raw.asideTitle || '') || undefined,
          asideBody: String(raw.asideBody || '') || undefined,
        })
        break
      case 'instructors':
        out.push({
          type: 'instructors',
          title: String(raw.title || ''),
          people: Array.isArray(raw.people)
            ? (raw.people as Record<string, unknown>[]).map((p) => ({
                name: String(p.name || ''),
                role: String(p.role || ''),
                bio: String(p.bio || ''),
                imageUrl: mediaUrl(cmsBase, p.image, p.imageUrl as string),
              }))
            : [],
        })
        break
      case 'faq':
        out.push({
          type: 'faq',
          title: String(raw.title || ''),
          items: Array.isArray(raw.items)
            ? (raw.items as { question: string; answer: string }[])
            : [],
        })
        break
      case 'pricing':
        out.push({
          type: 'pricing',
          title: String(raw.title || ''),
          body: String(raw.body || '') || undefined,
          priceLabel: String(raw.priceLabel || ''),
          priceAmount: String(raw.priceAmount || ''),
          strikethrough: String(raw.strikethrough || '') || undefined,
          badge: String(raw.badge || '') || undefined,
          items: Array.isArray(raw.items)
            ? (raw.items as { title: string; description: string; valueLabel?: string }[])
            : undefined,
          buttons: btns(raw.buttons),
        })
        break
      case 'scheduleCta':
        out.push({
          type: 'scheduleCta',
          title: String(raw.title || ''),
          body: String(raw.body || ''),
          metaTitle: String(raw.metaTitle || '') || undefined,
          metaBody: String(raw.metaBody || '') || undefined,
          chips: splitLines(raw.chipsText),
          buttons: btns(raw.buttons),
        })
        break
      default:
        break
    }
  }

  return out
}
