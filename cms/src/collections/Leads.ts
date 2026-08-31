import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'service', 'createdAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'service',
      type: 'text',
      admin: {
        description: 'Interés / capacitación / servicio',
      },
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'contact-form',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Nuevo', value: 'new' },
        { label: 'Contactado', value: 'contacted' },
        { label: 'Agendado', value: 'booked' },
        { label: 'Cerrado', value: 'closed' },
      ],
    },
  ],
}
