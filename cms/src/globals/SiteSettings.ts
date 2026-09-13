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
    description: 'WhatsApp, horarios de /agendar, días/franjas del dossier y textos legales.',
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
          label: 'Agenda',
          fields: [
            {
              name: 'bookingDays',
              type: 'select',
              hasMany: true,
              label: 'Días de atención',
              defaultValue: ['lun', 'mar', 'mie', 'jue', 'vie'],
              options: dayOptions,
              admin: {
                description: 'Los días que /agendar muestra turnos de 15 minutos.',
              },
            },
            {
              name: 'bookingWindows',
              type: 'array',
              label: 'Horarios',
              labels: { singular: 'Franja', plural: 'Franjas' },
              admin: {
                description: 'Dentro de cada franja se arman turnos de 15 min. Ej. 09:00–13:00 y 14:00–18:00.',
              },
              fields: [
                { name: 'start', type: 'text', required: true, label: 'Desde (ej. 09:00)' },
                { name: 'end', type: 'text', required: true, label: 'Hasta (ej. 13:00)' },
              ],
            },
            {
              name: 'bookingBlocks',
              type: 'array',
              label: 'Días o horarios anulados',
              labels: { singular: 'Bloqueo', plural: 'Bloqueos' },
              admin: {
                description: 'Cerrá un día entero (feriado) o un tramo (ej. el 20/09 de 14:00 a 18:00).',
              },
              fields: [
                {
                  name: 'date',
                  type: 'date',
                  required: true,
                  label: 'Fecha',
                  admin: { date: { pickerAppearance: 'dayOnly' } },
                },
                {
                  name: 'allDay',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Todo el día',
                },
                {
                  name: 'start',
                  type: 'text',
                  label: 'Desde',
                  admin: { condition: (_, sibling) => !sibling?.allDay },
                },
                {
                  name: 'end',
                  type: 'text',
                  label: 'Hasta',
                  admin: { condition: (_, sibling) => !sibling?.allDay },
                },
              ],
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
