type CourseBlockIn = Record<string, unknown> & { type: string }

const lines = (arr?: unknown) =>
  Array.isArray(arr) ? arr.map((x) => String(x)).join('\n') : ''

function buttons(arr: unknown) {
  if (!Array.isArray(arr)) return []
  return arr.map((b: Record<string, unknown>) => ({
    text: b.text,
    link: b.link,
    variant: b.variant || 'primary',
  }))
}

/** CourseBlock del front → bloque Payload. */
export function courseBlockToPayload(block: CourseBlockIn): Record<string, unknown> | null {
  const t = block.type
  switch (t) {
    case 'hero':
      return {
        blockType: 'hero',
        title: block.title,
        titleItalic: block.titleItalic || '',
        paragraphsText: lines(block.paragraphs),
        highlight: block.highlight || '',
        imageUrl: block.imageUrl || '',
        logoUrl: block.logoUrl || '',
        ...(block.layout ? { layout: block.layout } : {}),
        checksText: lines(block.checks),
        buttons: buttons(block.buttons),
      }
    case 'richText':
      return {
        blockType: 'richText',
        eyebrow: block.eyebrow || '',
        title: block.title,
        titleItalic: block.titleItalic || '',
        body: block.body || '',
        paragraphsText: lines(block.paragraphs),
        ...(block.background ? { background: block.background } : {}),
        ...(block.align ? { align: block.align } : {}),
      }
    case 'contextSplit':
      return {
        blockType: 'contextSplit',
        title: block.title,
        titleItalic: block.titleItalic || '',
        paragraphsText: lines(block.paragraphs),
        formulaLabel: block.formulaLabel || '',
        formulaItems: block.formulaItems || [],
        closing: block.closing || '',
        imageUrl: block.imageUrl || '',
      }
    case 'beforeAfter': {
      const before = (block.before || {}) as { title?: string; items?: string[] }
      const after = (block.after || {}) as { title?: string; items?: string[] }
      return {
        blockType: 'beforeAfter',
        title: block.title,
        body: block.body || '',
        beforeTitle: before.title || '',
        beforeItemsText: lines(before.items),
        afterTitle: after.title || '',
        afterItemsText: lines(after.items),
      }
    }
    case 'triad':
      return { blockType: 'triad', title: block.title, items: block.items || [] }
    case 'desireFear': {
      const desire = (block.desire || {}) as { title?: string; items?: string[] }
      const fear = (block.fear || {}) as { title?: string; items?: string[] }
      return {
        blockType: 'desireFear',
        title: block.title,
        desireTitle: desire.title || '',
        desireItemsText: lines(desire.items),
        fearTitle: fear.title || '',
        fearItemsText: lines(fear.items),
      }
    }
    case 'pathway':
      return {
        blockType: 'pathway',
        eyebrow: block.eyebrow,
        introText: lines(block.intro),
        forYouLabel: block.forYouLabel || '',
        forYouText: lines(block.forYou),
        note: block.note || '',
        stepsTitle: block.stepsTitle,
        stepsTitleItalic: block.stepsTitleItalic || '',
        aside: block.aside || '',
        steps: Array.isArray(block.steps)
          ? (block.steps as Record<string, unknown>[]).map((s) => ({
              title: s.title,
              paragraphsText: lines(s.paragraphs),
              result: s.result,
              imageUrl: s.imageUrl || '',
              imageFirst: Boolean(s.imageFirst),
              highlight: Boolean(s.highlight),
            }))
          : [],
      }
    case 'toolsSplit':
      return {
        blockType: 'toolsSplit',
        title: block.title,
        categories: block.categories || [],
        paragraphsText: lines(block.paragraphs),
        imageUrl: block.imageUrl || '',
      }
    case 'philosophy':
      return {
        blockType: 'philosophy',
        title: block.title,
        paragraphsText: lines(block.paragraphs),
        emphasis: block.emphasis || '',
        paragraphsAfterText: lines(block.paragraphsAfter),
      }
    case 'testimonials':
      return { blockType: 'testimonials', title: block.title, items: block.items || [] }
    case 'teacherBand':
      return {
        blockType: 'teacherBand',
        title: block.title,
        lead: block.lead || '',
        name: block.name,
        role: block.role,
        experienceLabel: block.experienceLabel || '',
        experienceText: lines(block.experience),
        paragraphsText: lines(block.paragraphs),
        emphasis: block.emphasis || '',
        imageUrl: block.imageUrl || '',
      }
    case 'investmentCard':
      return {
        blockType: 'investmentCard',
        title: block.title,
        badge: block.badge || '',
        inclusionsText: lines(block.inclusions),
        priceOld: block.priceOld || '',
        priceNew: block.priceNew,
        discountBadge: block.discountBadge || '',
      }
    case 'bonuses':
      return {
        blockType: 'bonuses',
        title: block.title,
        items: block.items || [],
        footer: block.footer,
      }
    case 'closingCta':
      return {
        blockType: 'closingCta',
        title: block.title,
        titleItalic: block.titleItalic || '',
        primary: block.primary || { text: 'Contactar', link: '/capacitaciones#contacto' },
        doubtTitle: block.doubtTitle || '',
        doubtBody: block.doubtBody || '',
        secondary: block.secondary || undefined,
      }
    case 'twoColumn':
      return {
        blockType: 'twoColumn',
        left: block.left,
        right: block.right,
        ...(block.background ? { background: block.background } : {}),
      }
    case 'iconGrid':
      return {
        blockType: 'iconGrid',
        title: block.title,
        description: block.description || '',
        items: block.items || [],
        ...(block.background ? { background: block.background } : {}),
      }
    case 'splitMedia':
      return {
        blockType: 'splitMedia',
        title: block.title,
        body: block.body,
        imageUrl: block.imageUrl || '',
        ...(block.imagePosition ? { imagePosition: block.imagePosition } : {}),
        ...(block.background ? { background: block.background } : {}),
      }
    case 'darkBand':
      return {
        blockType: 'darkBand',
        title: block.title,
        body: block.body,
        imageUrl: block.imageUrl || '',
      }
    case 'tags':
      return {
        blockType: 'tags',
        title: block.title,
        body: block.body || '',
        tagsText: lines(block.tags),
        asideTitle: block.asideTitle || '',
        asideBody: block.asideBody || '',
      }
    case 'instructors':
      return {
        blockType: 'instructors',
        title: block.title,
        people: Array.isArray(block.people)
          ? (block.people as Record<string, unknown>[]).map((p) => ({
              name: p.name,
              role: p.role,
              bio: p.bio,
              imageUrl: p.imageUrl || '',
            }))
          : [],
      }
    case 'faq':
      return { blockType: 'faq', title: block.title, items: block.items || [] }
    case 'pricing':
      return {
        blockType: 'pricing',
        title: block.title,
        body: block.body || '',
        priceLabel: block.priceLabel,
        priceAmount: block.priceAmount,
        strikethrough: block.strikethrough || '',
        badge: block.badge || '',
        items: block.items || [],
        buttons: buttons(block.buttons),
      }
    case 'scheduleCta':
      return {
        blockType: 'scheduleCta',
        title: block.title,
        body: block.body,
        metaTitle: block.metaTitle || '',
        metaBody: block.metaBody || '',
        chipsText: lines(block.chips),
        buttons: buttons(block.buttons),
      }
    default:
      return null
  }
}

export function courseBlocksToPayload(blocks: CourseBlockIn[]): Record<string, unknown>[] {
  return blocks.map(courseBlockToPayload).filter((b): b is Record<string, unknown> => Boolean(b))
}
