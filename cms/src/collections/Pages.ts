import type { CollectionConfig } from 'payload'
import { pageSectionBlocks } from '../blocks/pageSections'

const previewBase = () =>
  (process.env.PREVIEW_URL || process.env.FRONTEND_URL || 'https://anthroviahr.com').replace(
    /\/$/,
    '',
  )

const publicPathForSlug = (slug: unknown) => (slug === 'learning' ? '/capacitaciones' : '/')

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Página',
    plural: 'Páginas',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description:
      'Home = https://anthroviahr.com/ · Capacitaciones = https://anthroviahr.com/capacitaciones. En la lista usá Published o All (no solo Drafts).',
    preview: ({ slug }) => `${previewBase()}${publicPathForSlug(slug)}`,
    livePreview: {
      url: ({ data }) => {
        const base = previewBase()
        const path = publicPathForSlug(data?.slug)
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
      name: 'verEnElSitio',
      type: 'ui',
      admin: {
        components: {
          Field: '/admin/VerEnElSitio#VerEnElSitioField',
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'home → anthroviahr.com/ · learning → anthroviahr.com/capacitaciones',
      },
    },
    {
      name: 'sections',
      type: 'blocks',
      required: true,
      label: 'Secciones',
      blocks: pageSectionBlocks,
      admin: {
        description:
          'Cada bloque es una sección del sitio. Las tarjetas (servicios / formaciones) llevan título + imagen. Publicá cuando esté OK.',
      },
    },
  ],
}
