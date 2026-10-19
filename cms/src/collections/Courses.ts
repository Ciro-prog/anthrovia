import type { CollectionConfig } from 'payload'
import { coursePageBlocks } from '../blocks/courseBlocks'
import { removeCardAfterCourseDelete } from '../hooks/syncFormacionesCourses'
import { FORMACION_TEMPLATES } from '../lib/formacionTemplates'

const previewBase = () =>
  (process.env.PREVIEW_URL || process.env.FRONTEND_URL || 'https://anthroviahr.com').replace(
    /\/$/,
    '',
  )

export const Courses: CollectionConfig = {
  slug: 'courses',
  labels: {
    singular: 'Capacitación',
    plural: 'Capacitaciones',
  },
  admin: {
    group: 'Sitio',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'updatedAt'],
    description:
      'La card (título, imagen, texto) se edita en Páginas → Formaciones. Acá editá «conocer más». Una card nueva copia la plantilla que elijas al crearla.',
    livePreview: {
      url: ({ data }) => {
        const slug = typeof data?.slug === 'string' ? data.slug : ''
        return `${previewBase()}/capacitaciones/${encodeURIComponent(slug)}?preview=1&slug=${encodeURIComponent(slug)}`
      },
    },
  },
  access: {
    read: () => true,
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterDelete: [removeCardAfterCourseDelete],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Conocer más (página)',
          fields: [
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
                description: 'URL: /capacitaciones/{slug}. No cambia si renombrás la card.',
                readOnly: true,
              },
            },
            {
              name: 'blocks',
              type: 'blocks',
              label: 'Secciones de la página',
              blocks: coursePageBlocks,
              admin: {
                description: 'Contenido de /capacitaciones/{slug}. Publicá y se ve en «conocer más».',
              },
            },
          ],
        },
        {
          label: 'Card (grilla)',
          fields: [
            {
              name: 'courseId',
              type: 'text',
              admin: { description: 'ID estable (ej. course-cm-nivel-1)', readOnly: true },
            },
            {
              name: 'template',
              type: 'select',
              label: 'Plantilla',
              defaultValue: 'cm-nivel-1',
              options: [...FORMACION_TEMPLATES],
              admin: {
                readOnly: true,
                description: 'Se fija al crear la card en Formaciones.',
              },
            },
            {
              name: 'category',
              type: 'text',
              label: 'Categoría (card)',
              admin: { readOnly: true },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Descripción (card)',
              admin: { readOnly: true },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagen card (subir)',
              admin: { readOnly: true },
            },
            {
              name: 'imageUrl',
              type: 'text',
              label: 'Imagen card (path / URL)',
              admin: { readOnly: true, description: 'Fallback si no hay upload.' },
            },
          ],
        },
        {
          label: 'Cohorte',
          fields: [
            {
              name: 'cohortStartDate',
              type: 'date',
              admin: { date: { pickerAppearance: 'dayOnly' } },
            },
            {
              name: 'inscriptionDeadline',
              type: 'date',
              admin: { date: { pickerAppearance: 'dayOnly' } },
            },
            { name: 'spots', type: 'number', min: 0 },
            {
              name: 'cohortStatus',
              type: 'select',
              defaultValue: 'open',
              options: [
                { label: 'Inscripciones abiertas', value: 'open' },
                { label: 'Próximamente', value: 'upcoming' },
                { label: 'Cupos agotados', value: 'full' },
                { label: 'Finalizado', value: 'closed' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
