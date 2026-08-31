import type { Block, Field } from 'payload'

const sectionId: Field = {
  name: 'sectionId',
  type: 'text',
  required: true,
  admin: {
    description: 'ID estable para el front (hero, services, about, learning-hero, …)',
  },
}

const isVisible: Field = {
  name: 'isVisible',
  type: 'checkbox',
  defaultValue: true,
}

/** Upload opcional + path/URL de respaldo (ej. /ethos/...). */
function imagePair(uploadName: string, urlName: string, label: string): Field[] {
  return [
    {
      name: uploadName,
      type: 'upload',
      relationTo: 'media',
      label: `${label} (subir)`,
      admin: {
        description: 'Subí una imagen para reemplazar la actual. Preview en el admin.',
      },
    },
    {
      name: urlName,
      type: 'text',
      label: `${label} (path / URL)`,
      admin: {
        description: 'Fallback si no hay upload (ej. /ethos/hero.png). La web Vercel sirve /ethos/.',
      },
    },
  ]
}

const buttonFields: Field[] = [
  { name: 'text', type: 'text', required: true },
  { name: 'link', type: 'text', required: true },
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'primary',
    options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
    ],
  },
]

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero (cabecera)', plural: 'Heros' },
  fields: [
    {
      ...sectionId,
      admin: {
        description: 'hero = cabecera de anthroviahr.com/ · learning-hero = /capacitaciones',
      },
    },
    isVisible,
    { name: 'badge', type: 'text' },
    { name: 'title', type: 'text', required: true },
    { name: 'titleHighlight', type: 'text' },
    { name: 'subtitle', type: 'textarea', required: true },
    { name: 'description', type: 'textarea', required: true },
    ...imagePair('image', 'imageUrl', 'Imagen principal'),
    ...imagePair('video', 'videoUrl', 'Video / media de fondo'),
    { name: 'floatingCardTitle', type: 'text' },
    { name: 'floatingCardSubtitle', type: 'text' },
    { name: 'statsLabel', type: 'text' },
    { name: 'statsValue', type: 'text' },
    {
      name: 'backgroundType',
      type: 'select',
      defaultValue: 'color',
      options: [
        { label: 'Color', value: 'color' },
        { label: 'Media', value: 'media' },
      ],
    },
    { name: 'backgroundColor', type: 'text' },
    { name: 'titleColor', type: 'text' },
    { name: 'subtitleColor', type: 'text' },
    { name: 'descriptionColor', type: 'text' },
    {
      name: 'buttons',
      type: 'array',
      fields: buttonFields,
    },
  ],
}

export const ServicesBlock: Block = {
  slug: 'services',
  labels: { singular: 'Servicios / Formaciones', plural: 'Servicios' },
  fields: [
    {
      ...sectionId,
      admin: {
        description:
          'services = anthroviahr.com/#servicios · learning-services = /capacitaciones#formaciones',
      },
    },
    isVisible,
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    ...imagePair('video', 'videoUrl', 'Video de fondo'),
    { name: 'backgroundType', type: 'select', options: [
      { label: 'Color', value: 'color' },
      { label: 'Media', value: 'media' },
    ]},
    { name: 'backgroundColor', type: 'text' },
    { name: 'headerBgColor', type: 'text' },
    { name: 'titleColor', type: 'text' },
    { name: 'descriptionColor', type: 'text' },
    {
      name: 'services',
      type: 'array',
      labels: { singular: 'Card servicio', plural: 'Cards servicios' },
      admin: {
        initCollapsed: true,
        description: 'Tarjetas de https://anthroviahr.com/#servicios',
        components: {
          RowLabel: '/admin/CardRowLabel#CardRowLabel',
        },
      },
      fields: [
        ...imagePair('image', 'imageUrl', 'Imagen card'),
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'iconName', type: 'text', required: true },
        { name: 'color', type: 'text', defaultValue: 'primary' },
        { name: 'category', type: 'text' },
        { name: 'includesLabel', type: 'text' },
        {
          name: 'includes',
          type: 'array',
          fields: [{ name: 'item', type: 'text', required: true }],
        },
        { name: 'ctaText', type: 'text' },
        { name: 'ctaLink', type: 'text' },
      ],
    },
    { name: 'modalidadesTitle', type: 'text' },
    {
      name: 'modalidades',
      type: 'array',
      fields: [
        { name: 'iconName', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'featured', type: 'checkbox', defaultValue: false },
      ],
    },
    { name: 'formacionesTitle', type: 'text' },
    { name: 'formacionesDescription', type: 'textarea' },
    {
      name: 'formaciones',
      type: 'array',
      labels: { singular: 'Card formación', plural: 'Formaciones' },
      admin: {
        initCollapsed: true,
        description:
          'Elegí capacitaciones. El contenido de «conocer más» se edita en Capacitaciones. Borrar un curso quita la card.',
      },
      fields: [
        {
          name: 'course',
          type: 'relationship',
          relationTo: 'courses',
          required: true,
          admin: {
            description: 'Card + /capacitaciones/{slug}',
          },
        },
      ],
    },
    {
      name: 'formacionesComingSoon',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'inCompany',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'highlight', type: 'text' },
        { name: 'description', type: 'textarea' },
        ...imagePair('image', 'imageUrl', 'Imagen In Company'),
        {
          name: 'areas',
          type: 'array',
          fields: [{ name: 'item', type: 'text', required: true }],
        },
        { name: 'modalitiesTitle', type: 'text' },
        {
          name: 'modalities',
          type: 'array',
          fields: [
            { name: 'iconName', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
          ],
        },
        { name: 'ctaText', type: 'text' },
        { name: 'ctaLink', type: 'text' },
      ],
    },
  ],
}

export const AboutBlock: Block = {
  slug: 'about',
  labels: { singular: 'About (quiénes somos)', plural: 'About' },
  fields: [
    {
      ...sectionId,
      admin: {
        description: 'about = anthroviahr.com · learning-about = /capacitaciones',
      },
    },
    isVisible,
    { name: 'title', type: 'text', required: true },
    { name: 'eyebrow', type: 'text' },
    { name: 'personName', type: 'text' },
    { name: 'personRole', type: 'text' },
    ...imagePair('personImageUpload', 'personImage', 'Foto persona'),
    {
      name: 'specialties',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'introText',
      type: 'array',
      fields: [{ name: 'item', type: 'textarea', required: true }],
    },
    {
      name: 'purpose',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'mission',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    { name: 'pillarsTitle', type: 'text' },
    {
      name: 'pillars',
      type: 'array',
      fields: [
        { name: 'iconName', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'color', type: 'text' },
      ],
    },
    {
      name: 'values',
      type: 'array',
      fields: [
        { name: 'iconName', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'color', type: 'text' },
      ],
    },
    ...imagePair('video', 'videoUrl', 'Video de fondo'),
    { name: 'backgroundType', type: 'select', options: [
      { label: 'Color', value: 'color' },
      { label: 'Media', value: 'media' },
    ]},
    { name: 'backgroundColor', type: 'text' },
    { name: 'headerBgColor', type: 'text' },
    { name: 'titleColor', type: 'text' },
  ],
}

export const ContactBlock: Block = {
  slug: 'contact',
  labels: { singular: 'Contacto', plural: 'Contacto' },
  fields: [
    {
      ...sectionId,
      admin: {
        description: 'contact = pie de página / WhatsApp (anthroviahr.com/#contacto)',
      },
    },
    isVisible,
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'whatsappNumber', type: 'text', required: true },
    { name: 'email', type: 'email' },
    {
      name: 'customTraining',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'ctaText', type: 'text' },
        {
          name: 'steps',
          type: 'array',
          fields: [
            { name: 'number', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Email', value: 'email' },
          ],
        },
        { name: 'url', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    { name: 'backgroundType', type: 'select', options: [
      { label: 'Color', value: 'color' },
      { label: 'Media', value: 'media' },
    ]},
    { name: 'backgroundColor', type: 'text' },
    { name: 'headerBgColor', type: 'text' },
    { name: 'titleColor', type: 'text' },
    { name: 'descriptionColor', type: 'text' },
    ...imagePair('video', 'videoUrl', 'Video de fondo'),
  ],
}

export const SettingsBlock: Block = {
  slug: 'settings',
  labels: { singular: 'Footer / Settings', plural: 'Settings' },
  fields: [
    {
      ...sectionId,
      admin: {
        description: 'settings = textos del footer en todas las páginas',
      },
    },
    isVisible,
    { name: 'cvUrl', type: 'text', required: true },
    { name: 'cvText', type: 'text', required: true },
    { name: 'footerTagline', type: 'textarea' },
  ],
}

export const PostsBlock: Block = {
  slug: 'posts',
  labels: { singular: 'Posts redes', plural: 'Posts' },
  fields: [
    sectionId,
    isVisible,
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    { name: 'backgroundType', type: 'select', options: [
      { label: 'Color', value: 'color' },
      { label: 'Media', value: 'media' },
    ]},
    { name: 'backgroundColor', type: 'text' },
    { name: 'headerBgColor', type: 'text' },
    { name: 'titleColor', type: 'text' },
    { name: 'subtitleColor', type: 'text' },
    ...imagePair('video', 'videoUrl', 'Video de fondo'),
    {
      name: 'posts',
      type: 'array',
      fields: [
        { name: 'itemId', type: 'text', required: true, label: 'ID' },
        ...imagePair('image', 'imageUrl', 'Imagen post'),
        { name: 'description', type: 'textarea', required: true },
        { name: 'postUrl', type: 'text', required: true },
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
        },
      ],
    },
  ],
}

export const NewsBlock: Block = {
  slug: 'news',
  labels: { singular: 'News', plural: 'News' },
  fields: [
    sectionId,
    isVisible,
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'textarea' },
    {
      name: 'backgroundType',
      type: 'select',
      defaultValue: 'color',
      options: [
        { label: 'Color', value: 'color' },
        { label: 'Media', value: 'media' },
      ],
    },
    { name: 'backgroundColor', type: 'text' },
    { name: 'headerBgColor', type: 'text' },
    { name: 'titleColor', type: 'text' },
    { name: 'subtitleColor', type: 'text' },
    { name: 'descriptionColor', type: 'text' },
    { name: 'underlineColor', type: 'text' },
    { name: 'newsPageTitle', type: 'text' },
    { name: 'newsPageSubtitle', type: 'text' },
    ...imagePair('video', 'videoUrl', 'Video de fondo'),
    {
      name: 'newsItems',
      type: 'array',
      fields: [
        { name: 'itemId', type: 'text', required: true, label: 'ID' },
        { name: 'title', type: 'text', required: true },
        { name: 'excerpt', type: 'textarea', required: true },
        { name: 'content', type: 'textarea', required: true },
        { name: 'date', type: 'text', required: true },
        { name: 'author', type: 'text', required: true },
        { name: 'category', type: 'text', required: true },
        { name: 'citation', type: 'textarea' },
        {
          name: 'media',
          type: 'array',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              options: [
                { label: 'Image', value: 'image' },
                { label: 'Video', value: 'video' },
              ],
            },
            ...imagePair('file', 'url', 'Media'),
            { name: 'isMain', type: 'checkbox', defaultValue: false },
          ],
        },
        {
          name: 'attachments',
          type: 'array',
          fields: [
            { name: 'itemId', type: 'text', required: true },
            { name: 'name', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
            {
              name: 'type',
              type: 'select',
              required: true,
              options: [
                { label: 'PDF', value: 'pdf' },
                { label: 'Image', value: 'image' },
                { label: 'Excel', value: 'excel' },
                { label: 'Link', value: 'link' },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const pageSectionBlocks: Block[] = [
  HeroBlock,
  ServicesBlock,
  AboutBlock,
  ContactBlock,
  SettingsBlock,
  PostsBlock,
  NewsBlock,
]
