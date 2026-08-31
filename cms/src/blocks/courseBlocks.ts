import type { Block } from 'payload'
import { courseButtonFields, imagePair, linesField } from './fields'

const bgOpts = [
  { label: 'Surface', value: 'surface' },
  { label: 'Low', value: 'low' },
  { label: 'Container', value: 'container' },
]

export const coursePageBlocks: Block[] = [
  {
    slug: 'hero',
    labels: { singular: 'Hero', plural: 'Hero' },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'titleItalic', type: 'text' },
      linesField('paragraphsText', 'Párrafos'),
      { name: 'highlight', type: 'textarea' },
      ...imagePair('image', 'imageUrl', 'Imagen'),
      ...imagePair('logo', 'logoUrl', 'Logo'),
      {
        name: 'layout',
        type: 'select',
        options: [
          { label: 'Editorial', value: 'editorial' },
          { label: 'Centered', value: 'centered' },
        ],
      },
      linesField('checksText', 'Checks'),
      { name: 'buttons', type: 'array', fields: courseButtonFields },
    ],
  },
  {
    slug: 'richText',
    labels: { singular: 'Texto', plural: 'Textos' },
    fields: [
      { name: 'eyebrow', type: 'text' },
      { name: 'title', type: 'text', required: true },
      { name: 'titleItalic', type: 'text' },
      { name: 'body', type: 'textarea', required: true },
      linesField('paragraphsText', 'Párrafos extra'),
      { name: 'background', type: 'select', options: bgOpts },
      {
        name: 'align',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
        ],
      },
    ],
  },
  {
    slug: 'contextSplit',
    labels: { singular: 'Context split', plural: 'Context split' },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'titleItalic', type: 'text' },
      linesField('paragraphsText', 'Párrafos'),
      { name: 'formulaLabel', type: 'text' },
      {
        name: 'formulaItems',
        type: 'array',
        fields: [
          { name: 'iconName', type: 'text', required: true },
          { name: 'label', type: 'text', required: true },
        ],
      },
      { name: 'closing', type: 'textarea' },
      ...imagePair('image', 'imageUrl', 'Imagen'),
    ],
  },
  {
    slug: 'beforeAfter',
    labels: { singular: 'Antes / después', plural: 'Antes / después' },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'body', type: 'textarea' },
      { name: 'beforeTitle', type: 'text' },
      linesField('beforeItemsText', 'Antes (ítems)'),
      { name: 'afterTitle', type: 'text' },
      linesField('afterItemsText', 'Después (ítems)'),
    ],
  },
  {
    slug: 'triad',
    labels: { singular: 'Tríada', plural: 'Tríadas' },
    fields: [
      { name: 'title', type: 'text', required: true },
      {
        name: 'items',
        type: 'array',
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'body', type: 'textarea', required: true },
          { name: 'featured', type: 'checkbox' },
        ],
      },
    ],
  },
  {
    slug: 'desireFear',
    labels: { singular: 'Deseo / miedo', plural: 'Deseo / miedo' },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'desireTitle', type: 'text' },
      linesField('desireItemsText', 'Deseo (ítems)'),
      { name: 'fearTitle', type: 'text' },
      linesField('fearItemsText', 'Miedo (ítems)'),
    ],
  },
  {
    slug: 'pathway',
    labels: { singular: 'Recorrido', plural: 'Recorridos' },
    fields: [
      { name: 'eyebrow', type: 'text', required: true },
      linesField('introText', 'Intro'),
      { name: 'forYouLabel', type: 'text' },
      linesField('forYouText', 'Para vos'),
      { name: 'note', type: 'textarea' },
      { name: 'stepsTitle', type: 'text', required: true },
      { name: 'stepsTitleItalic', type: 'text' },
      { name: 'aside', type: 'textarea' },
      {
        name: 'steps',
        type: 'array',
        fields: [
          { name: 'title', type: 'text', required: true },
          linesField('paragraphsText', 'Párrafos'),
          { name: 'result', type: 'textarea', required: true },
          ...imagePair('image', 'imageUrl', 'Imagen'),
          { name: 'imageFirst', type: 'checkbox' },
          { name: 'highlight', type: 'checkbox' },
        ],
      },
    ],
  },
  {
    slug: 'toolsSplit',
    labels: { singular: 'Herramientas', plural: 'Herramientas' },
    fields: [
      { name: 'title', type: 'text', required: true },
      {
        name: 'categories',
        type: 'array',
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'tools', type: 'text', required: true },
        ],
      },
      linesField('paragraphsText', 'Párrafos'),
      ...imagePair('image', 'imageUrl', 'Imagen'),
    ],
  },
  {
    slug: 'philosophy',
    labels: { singular: 'Filosofía', plural: 'Filosofía' },
    fields: [
      { name: 'title', type: 'text', required: true },
      linesField('paragraphsText', 'Párrafos'),
      { name: 'emphasis', type: 'textarea' },
      linesField('paragraphsAfterText', 'Párrafos después'),
    ],
  },
  {
    slug: 'testimonials',
    labels: { singular: 'Testimonios', plural: 'Testimonios' },
    fields: [
      { name: 'title', type: 'text', required: true },
      {
        name: 'items',
        type: 'array',
        fields: [
          { name: 'quote', type: 'textarea', required: true },
          { name: 'author', type: 'text', required: true },
        ],
      },
    ],
  },
  {
    slug: 'teacherBand',
    labels: { singular: 'Docente', plural: 'Docentes' },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'lead', type: 'textarea' },
      { name: 'name', type: 'text', required: true },
      { name: 'role', type: 'text', required: true },
      { name: 'experienceLabel', type: 'text' },
      linesField('experienceText', 'Experiencia'),
      linesField('paragraphsText', 'Párrafos'),
      { name: 'emphasis', type: 'textarea' },
      ...imagePair('image', 'imageUrl', 'Imagen'),
    ],
  },
  {
    slug: 'investmentCard',
    labels: { singular: 'Inversión', plural: 'Inversión' },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'badge', type: 'text' },
      linesField('inclusionsText', 'Incluye'),
      { name: 'priceOld', type: 'text' },
      { name: 'priceNew', type: 'text', required: true },
      { name: 'discountBadge', type: 'text' },
    ],
  },
  {
    slug: 'bonuses',
    labels: { singular: 'Bonos', plural: 'Bonos' },
    fields: [
      { name: 'title', type: 'text', required: true },
      {
        name: 'items',
        type: 'array',
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: true },
          { name: 'valueLabel', type: 'text', required: true },
          { name: 'featured', type: 'checkbox' },
        ],
      },
      { name: 'footer', type: 'textarea', required: true },
    ],
  },
  {
    slug: 'closingCta',
    labels: { singular: 'Cierre CTA', plural: 'Cierres CTA' },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'titleItalic', type: 'text' },
      { name: 'primary', type: 'group', fields: courseButtonFields },
      { name: 'doubtTitle', type: 'text' },
      { name: 'doubtBody', type: 'textarea' },
      { name: 'secondary', type: 'group', fields: courseButtonFields },
    ],
  },
  {
    slug: 'twoColumn',
    labels: { singular: 'Dos columnas', plural: 'Dos columnas' },
    fields: [
      {
        name: 'left',
        type: 'group',
        fields: [
          { name: 'eyebrow', type: 'text' },
          { name: 'title', type: 'text', required: true },
          { name: 'body', type: 'textarea', required: true },
        ],
      },
      {
        name: 'right',
        type: 'group',
        fields: [
          { name: 'eyebrow', type: 'text' },
          { name: 'title', type: 'text', required: true },
          { name: 'body', type: 'textarea', required: true },
        ],
      },
      { name: 'background', type: 'select', options: bgOpts },
    ],
  },
  {
    slug: 'iconGrid',
    labels: { singular: 'Grilla íconos', plural: 'Grillas íconos' },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
      {
        name: 'items',
        type: 'array',
        fields: [
          { name: 'iconName', type: 'text', required: true },
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: true },
          {
            name: 'tone',
            type: 'select',
            options: [
              { label: 'Secondary', value: 'secondary' },
              { label: 'Primary', value: 'primary' },
            ],
          },
        ],
      },
      { name: 'background', type: 'select', options: bgOpts },
    ],
  },
  {
    slug: 'splitMedia',
    labels: { singular: 'Split media', plural: 'Split media' },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'body', type: 'textarea', required: true },
      ...imagePair('image', 'imageUrl', 'Imagen'),
      {
        name: 'imagePosition',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
        ],
      },
      {
        name: 'background',
        type: 'select',
        options: [...bgOpts, { label: 'Dark', value: 'dark' }],
      },
    ],
  },
  {
    slug: 'darkBand',
    labels: { singular: 'Banda oscura', plural: 'Bandas oscuras' },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'body', type: 'textarea', required: true },
      ...imagePair('image', 'imageUrl', 'Imagen'),
    ],
  },
  {
    slug: 'tags',
    labels: { singular: 'Tags', plural: 'Tags' },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'body', type: 'textarea' },
      linesField('tagsText', 'Tags'),
      { name: 'asideTitle', type: 'text' },
      { name: 'asideBody', type: 'textarea' },
    ],
  },
  {
    slug: 'instructors',
    labels: { singular: 'Instructores', plural: 'Instructores' },
    fields: [
      { name: 'title', type: 'text', required: true },
      {
        name: 'people',
        type: 'array',
        fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'role', type: 'text', required: true },
          { name: 'bio', type: 'textarea', required: true },
          ...imagePair('image', 'imageUrl', 'Foto'),
        ],
      },
    ],
  },
  {
    slug: 'faq',
    labels: { singular: 'FAQ', plural: 'FAQ' },
    fields: [
      { name: 'title', type: 'text', required: true },
      {
        name: 'items',
        type: 'array',
        fields: [
          { name: 'question', type: 'text', required: true },
          { name: 'answer', type: 'textarea', required: true },
        ],
      },
    ],
  },
  {
    slug: 'pricing',
    labels: { singular: 'Precio', plural: 'Precios' },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'body', type: 'textarea' },
      { name: 'priceLabel', type: 'text', required: true },
      { name: 'priceAmount', type: 'text', required: true },
      { name: 'strikethrough', type: 'text' },
      { name: 'badge', type: 'text' },
      {
        name: 'items',
        type: 'array',
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: true },
          { name: 'valueLabel', type: 'text' },
        ],
      },
      { name: 'buttons', type: 'array', fields: courseButtonFields },
    ],
  },
  {
    slug: 'scheduleCta',
    labels: { singular: 'CTA agenda', plural: 'CTA agenda' },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'body', type: 'textarea', required: true },
      { name: 'metaTitle', type: 'text' },
      { name: 'metaBody', type: 'textarea' },
      linesField('chipsText', 'Chips'),
      { name: 'buttons', type: 'array', fields: courseButtonFields, required: true },
    ],
  },
]
