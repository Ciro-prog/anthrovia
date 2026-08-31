import type { CollectionConfig } from 'payload'
import { pageSectionBlocks } from '../blocks/pageSections'

const previewBase = () =>
  (process.env.PREVIEW_URL || process.env.FRONTEND_URL || 'https://anthroviahr.com').replace(
    /\/$/,
    '',
  )

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const base = previewBase()
        const path = data?.slug === 'learning' ? '/capacitaciones' : '/'
        const slug = typeof data?.slug === 'string' ? data.slug : 'home'
        return `${base}${path}?preview=1&slug=${encodeURIComponent(slug)}`
      },
    },
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'home | learning',
      },
    },
    {
      name: 'sections',
      type: 'blocks',
      required: true,
      blocks: pageSectionBlocks,
      admin: {
        description:
          'Secciones de la página. Subí imágenes para ver preview; publicá cuando esté OK.',
      },
    },
  ],
}
