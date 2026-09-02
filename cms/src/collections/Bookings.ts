import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: {
    singular: 'Reserva',
    plural: 'Reservas',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'eventType', 'startsAt', 'status', 'createdAt'],
    defaultSort: '-startsAt',
    listSearchableFields: ['name', 'email', 'phone'],
    description:
      'Llamadas agendadas desde la web. Cambiá el Estado: Pendiente → Confirmada / Cancelada / Completada.',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'eventType',
      type: 'relationship',
      relationTo: 'event-types',
      required: true,
      label: 'Tipo de llamada',
      admin: { readOnly: true },
    },
    { name: 'name', type: 'text', required: true, label: 'Nombre', admin: { readOnly: true } },
    { name: 'email', type: 'email', required: true, label: 'Email', admin: { readOnly: true } },
    { name: 'phone', type: 'text', label: 'Teléfono', admin: { readOnly: true } },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notas',
      admin: { description: 'Lo que escribió la persona. Podés agregar un seguimiento.' },
    },
    {
      name: 'startsAt',
      type: 'date',
      required: true,
      label: 'Fecha y hora',
      admin: {
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado',
      defaultValue: 'pending',
      admin: {
        description: 'Pendiente → Confirmada / Cancelada / Completada',
      },
      options: [
        { label: 'Pendiente', value: 'pending' },
        { label: 'Confirmada', value: 'confirmed' },
        { label: 'Cancelada', value: 'cancelled' },
        { label: 'Completada', value: 'completed' },
      ],
    },
  ],
}
