import type { Field } from 'payload'

export function imagePair(uploadName: string, urlName: string, label: string): Field[] {
  return [
    {
      name: uploadName,
      type: 'upload',
      relationTo: 'media',
      label: `${label} (subir)`,
    },
    {
      name: urlName,
      type: 'text',
      label: `${label} (path / URL)`,
      admin: {
        description: 'Fallback si no hay upload (ej. /ethos/courses/...).',
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
