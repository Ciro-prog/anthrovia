import type { CollectionConfig } from 'payload'

const previewBase = () =>
  (process.env.PREVIEW_URL || process.env.FRONTEND_URL || 'https://anthroviahr.com').replace(
    /\/$/,
    '',
  )

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const Resources: CollectionConfig = {
  slug: 'resources',
  labels: {
    singular: 'Recurso',
    plural: 'Recursos',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'published', 'updatedAt'],
    description:
      'Recursos gratuitos de /recursos. Cada uno abre /recursos/{slug}. Subí un PDF, un ZIP o varios archivos.',
    livePreview: {
      url: ({ data }) => {
        const slug = typeof data?.slug === 'string' ? data.slug : ''
        return `${previewBase()}/recursos/${encodeURIComponent(slug)}?preview=1&slug=${encodeURIComponent(slug)}`
      },
    },
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { published: { equals: true } }
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data
        const title = typeof data.title === 'string' ? data.title : ''
        if (!data.slug && title) data.slug = slugify(title)
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'URL',
      admin: { description: 'Se arma sola desde el título. URL: /recursos/{slug}' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Categoría',
      defaultValue: 'reclutamiento',
      options: [
        { label: 'Reclutamiento', value: 'reclutamiento' },
        { label: 'Empleabilidad', value: 'empleabilidad' },
        { label: 'Formación', value: 'formacion' },
        { label: 'Tecnología', value: 'tecnologia' },
      ],
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Ícono',
      defaultValue: 'description',
      options: [
        { label: 'Documento', value: 'description' },
        { label: 'Checklist', value: 'fact_check' },
        { label: 'Perfil', value: 'assignment_ind' },
        { label: 'Presentación', value: 'co_present' },
        { label: 'Tecnología', value: 'smart_toy' },
        { label: 'Indicadores', value: 'analytics' },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Texto de la card',
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Texto de la página',
      admin: { description: 'Si está vacío, se usa el texto de la card.' },
    },
    {
      name: 'files',
      type: 'array',
      label: 'Archivos',
      labels: { singular: 'Archivo', plural: 'Archivos' },
      admin: {
        description: 'Un PDF, un ZIP armado, o varios archivos sueltos. La persona los baja desde la página.',
      },
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Archivo',
        },
        { name: 'label', type: 'text', label: 'Nombre para mostrar' },
      ],
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      label: 'Publicado',
    },
  ],
}
