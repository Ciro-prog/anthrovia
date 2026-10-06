import type { Field, GlobalConfig } from 'payload'
import { defaultBookingWeek } from '../lib/bookingAvailability'

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

const weekdayFields = (): Field[] => {
  const defaults = defaultBookingWeek()
  const labels: Record<string, string> = {
    lun: 'Lunes',
    mar: 'Martes',
    mie: 'Miércoles',
    jue: 'Jueves',
    vie: 'Viernes',
    sab: 'Sábado',
    dom: 'Domingo',
  }
  return Object.entries(labels).map(([name, label]) => {
    const day = defaults[name as keyof typeof defaults]
    return {
      name,
      type: 'group' as const,
      label,
      fields: [
        {
          name: 'enabled',
          type: 'checkbox' as const,
          label: 'Atiende',
          defaultValue: Boolean(day.enabled),
        },
        {
          name: 'morningStart',
          type: 'text' as const,
          label: 'Mañana desde',
          defaultValue: day.morningStart || '',
          admin: { description: 'Ej. 09:00. Vacío si no hay turno a la mañana.' },
        },
        {
          name: 'morningEnd',
          type: 'text' as const,
          label: 'Mañana hasta',
          defaultValue: day.morningEnd || '',
        },
        {
          name: 'afternoonStart',
          type: 'text' as const,
          label: 'Tarde desde',
          defaultValue: day.afternoonStart || '',
          admin: { description: 'Ej. 14:00. Dejalo vacío si ese día solo atiende a la mañana.' },
        },
        {
          name: 'afternoonEnd',
          type: 'text' as const,
          label: 'Tarde hasta',
          defaultValue: day.afternoonEnd || '',
        },
      ],
    }
  })
}

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
    group: 'Agenda',
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
              admin: { hidden: true },
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
              name: 'bookingDurationMinutes',
              type: 'number',
              label: 'Duración de la reunión',
              defaultValue: 30,
              min: 5,
              admin: {
                description: 'Minutos que ocupa cada turno en /agendar. Si alguien reserva, ese bloque no se vuelve a ofrecer.',
              },
            },
            {
              name: 'bookingWeek',
              type: 'group',
              label: 'Días y horarios',
              admin: {
                description:
                  'Lunes a domingo. Cada día puede tener mañana y tarde. Si la tarde queda vacía, ese día solo atiende a la mañana.',
              },
              fields: weekdayFields(),
            },
            {
              name: 'bookingDays',
              type: 'select',
              hasMany: true,
              label: 'Días de atención (anterior)',
              defaultValue: ['lun', 'mar', 'mie', 'jue', 'vie'],
              options: dayOptions,
              admin: { hidden: true },
            },
            {
              name: 'bookingWindows',
              type: 'array',
              label: 'Horarios (anterior)',
              fields: [
                { name: 'start', type: 'text', label: 'Desde' },
                { name: 'end', type: 'text', label: 'Hasta' },
              ],
              admin: { hidden: true },
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
