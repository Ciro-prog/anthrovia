import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Anthrovia HR',
    },
    {
      name: 'bookingEnabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar agenda de llamadas en la web',
    },
    {
      name: 'defaultEventTypeSlug',
      type: 'text',
      defaultValue: 'llamada-15',
      admin: {
        description: 'Slug del event-type por defecto para CTAs “Agendar”',
      },
    },
    {
      name: 'whatsappNumber',
      type: 'text',
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
  ],
}
