import type { GlobalConfig } from 'payload'

const previewBase = () =>
  (process.env.PREVIEW_URL || process.env.FRONTEND_URL || 'https://anthroviahr.com').replace(
    /\/$/,
    '',
  )

export const ResourcesPage: GlobalConfig = {
  slug: 'resources-page',
  label: 'Página recursos',
  admin: {
    description: 'Textos e imágenes de /recursos. Las cards se editan en Recursos.',
    livePreview: {
      url: () => `${previewBase()}/recursos?preview=1`,
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'eyebrow', type: 'text', label: 'Etiqueta', defaultValue: 'Recursos Gratuitos' },
            {
              name: 'title',
              type: 'text',
              label: 'Título',
              defaultValue: 'Herramientas para potenciar tu desarrollo y tu gestión de personas.',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Bajada',
            },
            { name: 'ctaLabel', type: 'text', label: 'Botón', defaultValue: 'VER RECURSOS' },
          ],
        },
        {
          label: 'Intro',
          fields: [
            {
              name: 'introTitle',
              type: 'text',
              label: 'Título',
              defaultValue: 'Recursos prácticos, cuando los necesitás.',
            },
            { name: 'introText', type: 'textarea', label: 'Texto' },
            {
              name: 'introCallout',
              type: 'text',
              label: 'Destacado',
              defaultValue: 'Elegí el recurso que necesitás y solicitá el acceso.',
            },
            { name: 'introImage1', type: 'upload', relationTo: 'media', label: 'Foto 1' },
            { name: 'introImage2', type: 'upload', relationTo: 'media', label: 'Foto 2' },
            { name: 'introImage3', type: 'upload', relationTo: 'media', label: 'Foto 3' },
          ],
        },
        {
          label: 'Catálogo y cierre',
          fields: [
            {
              name: 'catalogTitle',
              type: 'text',
              label: 'Título del catálogo',
              defaultValue: 'Catálogo de Recursos',
            },
            {
              name: 'howTitle',
              type: 'text',
              label: 'Título de los pasos',
              defaultValue: 'Cómo acceder a los recursos',
            },
            {
              name: 'steps',
              type: 'array',
              label: 'Pasos',
              labels: { singular: 'Paso', plural: 'Pasos' },
              maxRows: 3,
              fields: [
                { name: 'title', type: 'text', required: true, label: 'Título' },
                { name: 'text', type: 'textarea', required: true, label: 'Texto' },
              ],
            },
            {
              name: 'closingTitle',
              type: 'text',
              label: 'Cierre — título',
              defaultValue: 'Seguimos creando herramientas para vos.',
            },
            { name: 'closingText', type: 'textarea', label: 'Cierre — texto' },
            { name: 'closingCta', type: 'text', label: 'Cierre — botón', defaultValue: 'EXPLORAR RECURSOS' },
          ],
        },
      ],
    },
  ],
}
