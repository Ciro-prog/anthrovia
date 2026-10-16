import type { Field, GlobalConfig } from 'payload'

const previewBase = () =>
  (process.env.PREVIEW_URL || process.env.FRONTEND_URL || 'https://anthroviahr.com').replace(
    /\/$/,
    '',
  )

const iconOptions = [
  { label: 'Carpeta', value: 'folder' },
  { label: 'Mensajes', value: 'messages' },
  { label: 'Lista', value: 'clipboard' },
  { label: 'Tendencia', value: 'trending' },
  { label: 'Equipo', value: 'usersround' },
  { label: 'Actividad', value: 'activity' },
  { label: 'Red', value: 'network' },
  { label: 'Chat', value: 'message' },
  { label: 'Gráfico', value: 'linechart' },
  { label: 'Sonrisa', value: 'smile' },
  { label: 'Ramas', value: 'git' },
  { label: 'Tareas', value: 'todo' },
  { label: 'Formación', value: 'graduation' },
  { label: 'Cultura', value: 'heart' },
  { label: 'Indicadores', value: 'barchart' },
  { label: 'Empresa', value: 'building' },
  { label: 'Globo', value: 'globe' },
  { label: 'Personas', value: 'users' },
  { label: 'Celular', value: 'smartphone' },
]

const iconField = (): Field => ({
  name: 'icon',
  type: 'select',
  label: 'Ícono',
  options: iconOptions,
})

export const DossierPage: GlobalConfig = {
  slug: 'dossier-page',
  label: 'Página dossier',
  admin: {
    group: 'Sitio',
    description: 'Textos e imágenes de /dossier. Los módulos no se editan acá.',
    livePreview: {
      url: () => `${previewBase()}/dossier?preview=1`,
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
          label: 'Hero',
          fields: [
            { name: 'heroTitle', type: 'textarea', label: 'Título' },
            { name: 'heroHighlight', type: 'textarea', label: 'Destacado (cursiva)' },
            { name: 'heroSubtitle', type: 'textarea', label: 'Bajada' },
            { name: 'heroCtaPrimary', type: 'text', label: 'Botón principal' },
            { name: 'heroCtaSecondary', type: 'text', label: 'Botón secundario' },
            { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Imagen' },
            { name: 'trustLabel', type: 'text', label: 'Etiqueta de logos' },
            {
              name: 'trustLogos',
              type: 'array',
              label: 'Logos (nombre)',
              fields: [{ name: 'name', type: 'text', required: true, label: 'Nombre' }],
            },
          ],
        },
        {
          label: 'Desafío',
          fields: [
            { name: 'challengeTitle', type: 'textarea', label: 'Título' },
            { name: 'challengeText', type: 'textarea', label: 'Texto' },
            { name: 'challengeQuote', type: 'textarea', label: 'Cita' },
            { name: 'challengeCta', type: 'text', label: 'Enlace' },
            {
              name: 'challengeChips',
              type: 'array',
              label: 'Chips',
              maxRows: 3,
              fields: [{ name: 'label', type: 'text', required: true, label: 'Texto' }],
            },
          ],
        },
        {
          label: 'Familiar',
          fields: [
            { name: 'familiarTitle', type: 'textarea', label: 'Título' },
            {
              name: 'painPoints',
              type: 'array',
              label: 'Cards',
              fields: [
                iconField(),
                { name: 'title', type: 'text', required: true, label: 'Título' },
                { name: 'body', type: 'textarea', required: true, label: 'Texto' },
              ],
            },
            { name: 'familiarQuote', type: 'textarea', label: 'Cita' },
            { name: 'familiarCta', type: 'text', label: 'Botón' },
          ],
        },
        {
          label: 'Transformación',
          fields: [
            { name: 'transformTitle', type: 'textarea', label: 'Título' },
            { name: 'transformImage', type: 'upload', relationTo: 'media', label: 'Imagen' },
            {
              name: 'pillars',
              type: 'array',
              label: 'Pilares',
              maxRows: 4,
              fields: [
                iconField(),
                { name: 'title', type: 'text', required: true, label: 'Título' },
                { name: 'body', type: 'textarea', required: true, label: 'Texto' },
              ],
            },
            { name: 'transformQuote', type: 'textarea', label: 'Cita' },
            { name: 'transformCta', type: 'text', label: 'Botón' },
          ],
        },
        {
          label: 'Plataforma',
          fields: [
            { name: 'featuresTitle', type: 'textarea', label: 'Título' },
            {
              name: 'features',
              type: 'array',
              label: 'Cards',
              fields: [
                iconField(),
                { name: 'title', type: 'text', required: true, label: 'Título' },
                { name: 'body', type: 'textarea', required: true, label: 'Texto' },
                { name: 'wide', type: 'checkbox', label: 'Card ancha', defaultValue: false },
              ],
            },
            { name: 'featuresQuote', type: 'textarea', label: 'Cita' },
            { name: 'featuresCta', type: 'text', label: 'Botón (va a Conversemos)' },
          ],
        },
        {
          label: 'Números',
          fields: [
            { name: 'statsTitle', type: 'textarea', label: 'Título' },
            {
              name: 'stats',
              type: 'array',
              label: 'Cifras',
              maxRows: 4,
              fields: [
                iconField(),
                { name: 'value', type: 'text', required: true, label: 'Cifra' },
                { name: 'label', type: 'text', required: true, label: 'Etiqueta' },
              ],
            },
            { name: 'statsCta', type: 'text', label: 'Botón' },
          ],
        },
        {
          label: 'Por qué',
          fields: [
            { name: 'whyTitle', type: 'textarea', label: 'Título' },
            { name: 'whyText', type: 'textarea', label: 'Bajada' },
            {
              name: 'whyItems',
              type: 'array',
              label: 'Ítems',
              fields: [
                { name: 'title', type: 'text', required: true, label: 'Título' },
                { name: 'body', type: 'textarea', required: true, label: 'Texto' },
              ],
            },
            { name: 'whyCta', type: 'text', label: 'Botón' },
            { name: 'whyImage', type: 'upload', relationTo: 'media', label: 'Imagen' },
            { name: 'whyQuote', type: 'textarea', label: 'Cita sobre la imagen' },
          ],
        },
        {
          label: 'Conversemos',
          fields: [
            { name: 'pathTitle', type: 'textarea', label: 'Título del camino' },
            {
              name: 'steps',
              type: 'array',
              label: 'Pasos',
              maxRows: 6,
              fields: [
                { name: 'n', type: 'text', required: true, label: 'Número' },
                { name: 'title', type: 'text', required: true, label: 'Título' },
                { name: 'body', type: 'textarea', required: true, label: 'Texto' },
              ],
            },
            { name: 'pathQuote', type: 'textarea', label: 'Cita' },
            { name: 'pathMailtoLabel', type: 'text', label: 'Enlace de mail' },
            { name: 'formTitle', type: 'text', label: 'Título del formulario' },
            { name: 'formSuccessTitle', type: 'text', label: 'Éxito — título' },
            { name: 'formSuccessText', type: 'textarea', label: 'Éxito — texto' },
          ],
        },
      ],
    },
  ],
}
