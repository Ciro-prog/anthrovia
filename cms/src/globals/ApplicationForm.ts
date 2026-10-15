import type { GlobalConfig } from 'payload'

const previewBase = () =>
  (process.env.PREVIEW_URL || process.env.FRONTEND_URL || 'https://anthroviahr.com').replace(
    /\/$/,
    '',
  )

export const ApplicationForm: GlobalConfig = {
  slug: 'application-form',
  label: 'Formulario postulación',
  admin: {
    group: 'Sistema',
    description:
      'Campos de /postulacion. Live Preview (ojo) muestra el formulario. Email y CV siempre se muestran, aunque los saques de la lista.',
    livePreview: {
      url: () => `${previewBase()}/postulacion?preview=1`,
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      defaultValue: 'Postulación – Asesor Comercial | Planes de Salud',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Bajada',
    },
    {
      name: 'fields',
      type: 'array',
      label: 'Campos',
      labels: { singular: 'Campo', plural: 'Campos' },
      admin: {
        description: 'Paso 1 = Datos · 2 = Experiencia · 3 = Condiciones y CV. El email y el CV no se pueden omitir en la web.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Clave',
          admin: {
            description: 'Sin espacios. Ej. firstName, email, cv. No cambies las de email y cv.',
          },
        },
        { name: 'label', type: 'text', required: true, label: 'Etiqueta' },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'text',
          label: 'Tipo',
          options: [
            { label: 'Texto', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Teléfono', value: 'tel' },
            { label: 'Párrafo', value: 'textarea' },
            { label: 'Lista', value: 'select' },
            { label: 'Casilla', value: 'checkbox' },
            { label: 'Archivo', value: 'file' },
          ],
        },
        { name: 'required', type: 'checkbox', defaultValue: true, label: 'Obligatorio' },
        {
          name: 'multiple',
          type: 'checkbox',
          label: 'Varias opciones',
          admin: {
            condition: (_, sibling) => sibling?.type === 'select',
          },
        },
        {
          name: 'showWhenField',
          type: 'text',
          label: 'Mostrar si el campo',
          admin: { description: 'Clave de otro campo. Vacío = siempre visible.' },
        },
        {
          name: 'showWhenEquals',
          type: 'text',
          label: 'Vale',
          admin: { description: 'El campo se muestra solo cuando esa clave tiene este valor.' },
        },
        {
          name: 'step',
          type: 'number',
          min: 1,
          max: 3,
          defaultValue: 1,
          label: 'Paso',
        },
        {
          name: 'options',
          type: 'array',
          label: 'Opciones',
          labels: { singular: 'Opción', plural: 'Opciones' },
          admin: {
            condition: (_, sibling) => sibling?.type === 'select',
          },
          fields: [
            { name: 'label', type: 'text', required: true, label: 'Texto' },
            { name: 'value', type: 'text', required: true, label: 'Valor' },
          ],
        },
      ],
    },
  ],
}
