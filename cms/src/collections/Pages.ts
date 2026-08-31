import type { CollectionConfig } from 'payload'

/**
 * Páginas del sitio (home, learning, etc.).
 * `sections` es JSON editable: array de secciones tipadas como en el front.
 * El editor puede agregar/reordenar/ocultar secciones desde el admin.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
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
        description: 'home | learning | etc.',
      },
    },
    {
      name: 'sections',
      type: 'json',
      required: true,
      admin: {
        description:
          'Array de secciones (hero, services, about, contact, ...). Incluí isVisible para ocultar.',
      },
    },
  ],
}
