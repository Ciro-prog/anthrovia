import type { CollectionConfig } from 'payload'

/**
 * Capacitaciones. `blocks` = CourseBlock[] del front.
 */
export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'cohortStatus', 'updatedAt'],
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
    },
    {
      name: 'courseId',
      type: 'text',
      admin: {
        description: 'ID estable (ej. course-cm-nivel-1)',
      },
    },
    {
      name: 'blocks',
      type: 'json',
      required: true,
      admin: {
        description: 'Array CourseBlock (hero, pathway, faq, pricing, ...)',
      },
    },
    {
      name: 'cohortStartDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        description: 'Inicio de la próxima cohorte',
      },
    },
    {
      name: 'inscriptionDeadline',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'spots',
      type: 'number',
      min: 0,
    },
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
}
