import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  labels: {
    singular: 'Usuario',
    plural: 'Usuarios',
  },
  admin: {
    group: 'Sistema',
    useAsTitle: 'email',
    description: 'Quienes pueden entrar al panel.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
    },
  ],
}
