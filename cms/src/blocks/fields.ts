import type { Field } from 'payload'

export function imagePair(uploadName: string, urlName: string, label: string): Field[] {
  return [
    {
      name: uploadName,
      type: 'upload',
      relationTo: 'media',
      label: `Subir foto — ${label}`,
      admin: {
        description: 'Elegí o subí una imagen. Es lo que se ve en la web.',
      },
    },
    {
      name: urlName,
      type: 'text',
      label: `Path (solo si no subís foto)`,
      admin: {
        description: 'Opcional. Ej. /ethos/formacion-1.jpg si todavía no hay archivo subido.',
      },
    },
  ]
}

export const linesField = (name: string, label: string, description?: string): Field => ({
  name,
  type: 'textarea',
  label,
  admin: {
    description: description || 'Un ítem por línea.',
  },
})

export const courseButtonFields: Field[] = [
  { name: 'text', type: 'text', required: true },
  { name: 'link', type: 'text', required: true },
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'primary',
    options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Outline', value: 'outline' },
    ],
  },
]
