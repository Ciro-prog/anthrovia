import type { GlobalConfig } from 'payload'

const previewBase = () =>
  (process.env.PREVIEW_URL || process.env.FRONTEND_URL || 'https://anthroviahr.com').replace(
    /\/$/,
    '',
  )

const dayOptions = [
  { label: 'Lunes', value: 'lun' },
  { label: 'Martes', value: 'mar' },
  { label: 'Miércoles', value: 'mie' },
  { label: 'Jueves', value: 'jue' },
  { label: 'Viernes', value: 'vie' },
  { label: 'Sábado', value: 'sab' },
  { label: 'Domingo', value: 'dom' },
]

const legalSections = (name: 'privacySections' | 'termsSections', label: string) => ({
  name,
  type: 'array' as const,
  label,
  labels: { singular: 'Apartado', plural: 'Apartados' },
  fields: [
    { name: 'title', type: 'text' as const, label: 'Título', required: true },
    { name: 'content', type: 'textarea' as const, label: 'Texto', required: true },
  ],
})

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Ajustes del sitio',
  admin: {
    description: 'WhatsApp, agenda, días/franjas del dossier y textos legales.',
    livePreview: {
      url: () => `${previewBase()}/?preview=1`,
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              defaultValue: 'Anthrovia HR',
              label: 'Nombre del sitio',
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
              label: 'Tipo de llamada por defecto',
              admin: {
                description: 'Ej. llamada-15. Tiene que coincidir con un tipo de llamada activo.',
              },
            },
            {
              name: 'whatsappNumber',
              type: 'text',
              label: 'WhatsApp',
            },
            {
              name: 'contactEmail',
              type: 'email',
              label: 'Email de contacto',
            },
          ],
        },
        {
          label: 'Consulta dossier',
          fields: [
            {
              name: 'dossierDays',
              type: 'select',
              hasMany: true,
              label: 'Días disponibles',
              defaultValue: ['lun', 'mar', 'mie', 'jue', 'vie'],
              options: dayOptions,
              admin: {
                description: 'Los días que se muestran en /dossier → Conversemos.',
              },
            },
            {
              name: 'dossierSlots',
              type: 'array',
              label: 'Franjas horarias',
              labels: { singular: 'Franja', plural: 'Franjas' },
              admin: {
                description: 'Si está vacío, la web usa Mañana 9–13 y Tarde 14–18.',
              },
              fields: [
                { name: 'label', type: 'text', required: true, label: 'Nombre (ej. Mañana)' },
                { name: 'start', type: 'text', required: true, label: 'Desde (ej. 09:00)' },
                { name: 'end', type: 'text', required: true, label: 'Hasta (ej. 13:00)' },
              ],
            },
          ],
        },
        {
          label: 'Legales',
          fields: [
            {
              name: 'privacyTitle',
              type: 'text',
              label: 'Título privacidad',
              defaultValue: 'Política de Privacidad',
            },
            legalSections('privacySections', 'Apartados de privacidad'),
            {
              name: 'termsTitle',
              type: 'text',
              label: 'Título términos',
              defaultValue: 'Términos y Condiciones',
            },
            legalSections('termsSections', 'Apartados de términos'),
          ],
        },
      ],
    },
  ],
}
