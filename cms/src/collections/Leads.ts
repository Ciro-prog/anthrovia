import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: {
    singular: 'Consulta',
    plural: 'Consultas',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'source', 'service', 'status', 'createdAt'],
    defaultSort: '-createdAt',
    listSearchableFields: ['name', 'email', 'phone'],
    description:
      'Mensajes de contacto y de /dossier (Conversemos). Cambiá el Estado: Nuevo → Contactado → Agendado → Cerrado.',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nombre', admin: { readOnly: true } },
    { name: 'email', type: 'email', required: true, label: 'Email', admin: { readOnly: true } },
    { name: 'phone', type: 'text', label: 'Teléfono', admin: { readOnly: true } },
    {
      name: 'service',
      type: 'text',
      label: 'Interés',
      admin: {
        readOnly: true,
        description: 'Servicio o capacitación que eligió en el formulario',
      },
    },
    { name: 'message', type: 'textarea', label: 'Mensaje', admin: { readOnly: true } },
    { name: 'company', type: 'text', label: 'Empresa', admin: { readOnly: true } },
    { name: 'preferredDay', type: 'text', label: 'Día preferido', admin: { readOnly: true } },
    { name: 'preferredSlot', type: 'text', label: 'Franja horaria', admin: { readOnly: true } },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'contact-form',
      label: 'Origen',
      options: [
        { label: 'Home', value: 'home-contact' },
        { label: 'Capacitaciones', value: 'learning-contact' },
        { label: 'Dossier', value: 'dossier' },
        { label: 'Formulario', value: 'contact-form' },
      ],
      admin: {
        readOnly: true,
        description: 'Formulario desde el que escribió la persona.',
        components: {
          Cell: '/admin/SourceBadge#SourceCell',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado',
      defaultValue: 'new',
      admin: {
        description: 'Nuevo → Contactado → Agendado → Cerrado',
      },
      options: [
        { label: 'Nuevo', value: 'new' },
        { label: 'Contactado', value: 'contacted' },
        { label: 'Agendado', value: 'booked' },
        { label: 'Cerrado', value: 'closed' },
      ],
    },
  ],
}
