import type { CollectionConfig } from 'payload'

/** Tipos de reunión (equivalente a event types de Calendly/Cal.com). */
export const EventTypes: CollectionConfig = {
  slug: 'event-types',
  admin: {
    useAsTitle: 'title',
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
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'durationMinutes',
      type: 'number',
      required: true,
      defaultValue: 15,
      min: 5,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
