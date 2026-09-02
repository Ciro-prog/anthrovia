import type { CollectionConfig, PayloadRequest } from 'payload'

const ro = { admin: { readOnly: true } }

type AnswerRow = { name?: string; label?: string; value?: unknown }

const FIXED_TEXT = [
  'firstName',
  'lastName',
  'age',
  'phone',
  'linkedin',
  'country',
  'province',
  'city',
  'residencyStatus',
  'educationLevel',
  'secondaryStatus',
  'careerRun',
  'salesExperienceYears',
  'healthSalesExperience',
  'healthSalesExperienceDesc',
  'isWorking',
  'currentRole',
  'lookingForChange',
  'willingToChange',
  'changeCondition',
  'startDate',
  'remoteWorkAgreement',
  'commissionSchemeAgreement',
  'desiredIncomeScheme',
  'contractTypeAgreement',
  'monotributo',
  'hasPC',
  'hasInternet',
] as const

function applyAnswersToDoc(data: Record<string, unknown>) {
  const answers = data.answers
  if (!Array.isArray(answers)) return data
  for (const raw of answers as AnswerRow[]) {
    if (!raw || typeof raw.name !== 'string') continue
    const { name, value } = raw
    if (name === 'email' && !data.email && value) data.email = String(value)
    if (name === 'consent') {
      data.consent = value === true || value === 'true' || value === 'on' || value === 'sí' || value === 'si'
    }
    if ((FIXED_TEXT as readonly string[]).includes(name) && (data[name] == null || data[name] === '')) {
      if (value != null && value !== '') data[name] = String(value)
    }
  }
  return data
}

async function attachCvFromRequest(req: PayloadRequest, data: Record<string, unknown>) {
  if (data.cv) return data
  const file = req.file
  if (!file) return data
  try {
    const media = await req.payload.create({
      collection: 'media',
      data: { alt: file.name || 'CV' },
      file,
      overrideAccess: true,
    })
    if (media?.id) data.cv = media.id
  } catch (err) {
    req.payload.logger.error(
      `Postulación: no se pudo guardar el CV: ${err instanceof Error ? err.message : String(err)}`,
    )
  }
  return data
}

export const Applications: CollectionConfig = {
  slug: 'applications',
  labels: {
    singular: 'Postulación',
    plural: 'Postulaciones',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'status', 'createdAt'],
    defaultSort: '-createdAt',
    listSearchableFields: ['firstName', 'lastName', 'email', 'phone'],
    description:
      'Postulaciones de /postulacion. Cambiá el Estado: Nueva → En revisión → Entrevista → Contratada / Descartada.',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        const next = applyAnswersToDoc((data || {}) as Record<string, unknown>)
        if (operation === 'create') {
          return attachCvFromRequest(req, next)
        }
        return next
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Respuestas',
          fields: [
            {
              name: 'answers',
              type: 'json',
              label: 'Respuestas',
              admin: {
                readOnly: true,
                components: {
                  Field: '/admin/ApplicationAnswers#ApplicationAnswers',
                },
              },
            },
            {
              name: 'cvPreview',
              type: 'ui',
              admin: {
                components: {
                  Field: '/admin/CvPreview#CvPreview',
                },
              },
            },
            {
              name: 'cv',
              type: 'upload',
              relationTo: 'media',
              label: 'CV',
              admin: { readOnly: true },
            },
          ],
        },
        {
          label: 'Datos',
          fields: [
            { name: 'firstName', type: 'text', label: 'Nombre', ...ro },
            { name: 'lastName', type: 'text', label: 'Apellido', ...ro },
            { name: 'age', type: 'text', label: 'Edad', ...ro },
            { name: 'email', type: 'email', required: true, label: 'Email', ...ro },
            { name: 'phone', type: 'text', label: 'Teléfono', ...ro },
            { name: 'linkedin', type: 'text', label: 'LinkedIn', ...ro },
            { name: 'country', type: 'text', label: 'País', ...ro },
            { name: 'province', type: 'text', label: 'Provincia', ...ro },
            { name: 'city', type: 'text', label: 'Ciudad', ...ro },
            { name: 'residencyStatus', type: 'text', label: 'Residencia', ...ro },
          ],
        },
        {
          label: 'Perfil',
          fields: [
            { name: 'educationLevel', type: 'text', label: 'Formación', ...ro },
            { name: 'secondaryStatus', type: 'text', label: 'Secundario', ...ro },
            { name: 'careerRun', type: 'text', label: 'Carrera', ...ro },
            { name: 'salesExperienceYears', type: 'text', label: 'Años en ventas', ...ro },
            { name: 'healthSalesExperience', type: 'text', label: 'Ventas en salud', ...ro },
            {
              name: 'healthSalesExperienceDesc',
              type: 'textarea',
              label: 'Detalle ventas salud',
              ...ro,
            },
            { name: 'isWorking', type: 'text', label: 'Está trabajando', ...ro },
            { name: 'currentRole', type: 'text', label: 'Rol actual', ...ro },
            { name: 'lookingForChange', type: 'text', label: 'Busca cambio', ...ro },
            { name: 'willingToChange', type: 'text', label: 'Dispuesto a cambiar', ...ro },
            { name: 'changeCondition', type: 'text', label: 'Condición de cambio', ...ro },
            { name: 'startDate', type: 'text', label: 'Inicio', ...ro },
            { name: 'remoteWorkAgreement', type: 'text', label: 'Modalidad remota', ...ro },
            { name: 'commissionSchemeAgreement', type: 'text', label: 'Esquema de ingresos', ...ro },
            { name: 'desiredIncomeScheme', type: 'text', label: 'Esquema deseado', ...ro },
            { name: 'contractTypeAgreement', type: 'text', label: 'Contratación', ...ro },
            { name: 'monotributo', type: 'text', label: 'Monotributo', ...ro },
            { name: 'hasPC', type: 'text', label: 'PC', ...ro },
            { name: 'hasInternet', type: 'text', label: 'Internet', ...ro },
            { name: 'consent', type: 'checkbox', label: 'Consentimiento', ...ro },
          ],
        },
        {
          label: 'Estado',
          fields: [
            {
              name: 'status',
              type: 'select',
              label: 'Estado',
              defaultValue: 'new',
              admin: {
                description: 'Nueva → En revisión → Entrevista → Contratada / Descartada',
              },
              options: [
                { label: 'Nueva', value: 'new' },
                { label: 'En revisión', value: 'reviewing' },
                { label: 'Entrevista', value: 'interview' },
                { label: 'Contratada', value: 'hired' },
                { label: 'Descartada', value: 'rejected' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
