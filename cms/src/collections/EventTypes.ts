import type { CollectionConfig } from 'payload'

export const EventTypes: CollectionConfig = {
  slug: 'event-types',
  labels: {
    singular: 'Tipo de llamada',
    plural: 'Tipos de llamada',
  },
  admin: {
    hidden: true,
    useAsTitle: 'title',
    defaultColumns: ['title', 'durationMinutes', 'active'],
    description: 'Duración real de /agendar: Ajustes del sitio → Agenda.',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Nombre' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Identificador (ej. llamada-15). No lo cambies si ya está en uso.' },
    },
    { name: 'description', type: 'textarea', label: 'Descripción' },
    {
      name: 'durationMinutes',
      type: 'number',
      required: true,
      defaultValue: 30,
      min: 5,
      label: 'Duración (minutos)',
    },
    { name: 'active', type: 'checkbox', defaultValue: true, label: 'Visible en la web' },
  ],
}
