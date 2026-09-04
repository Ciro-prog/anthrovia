import type { ResourceItem, ResourcesPageContent } from '@/types/cms'

export const defaultResourcesPage: ResourcesPageContent = {
  eyebrow: 'Recursos Gratuitos',
  title: 'Herramientas para potenciar tu desarrollo y tu gestión de personas.',
  subtitle:
    'Guías, plantillas, checklists y recursos prácticos creados por Anthrovia HR para ayudarte a resolver situaciones concretas, desarrollar nuevas habilidades y optimizar la gestión de Recursos Humanos.',
  ctaLabel: 'VER RECURSOS',
  introTitle: 'Recursos prácticos, cuando los necesitás.',
  introText:
    'Seleccionamos herramientas pensadas para acompañarte en distintos desafíos: desde encontrar talento y mejorar tu perfil profesional hasta desarrollar habilidades y optimizar procesos de Recursos Humanos.',
  introCallout: 'Elegí el recurso que necesitás y solicitá el acceso.',
  introImage1: '/ethos/formacion-1.jpg',
  introImage2: '/ethos/formacion-2.jpg',
  introImage3: '/ethos/formacion-3.jpg',
  catalogTitle: 'Catálogo de Recursos',
  howTitle: 'Cómo acceder a los recursos',
  steps: [
    { title: 'ELEGÍ', text: 'Encontrá el recurso que necesitás en nuestro catálogo.' },
    { title: 'ABRÍ', text: 'Entrá a la página del recurso para ver de qué se trata.' },
    { title: 'DESCARGÁ', text: 'Bajá el archivo o el ZIP directo desde la página.' },
  ],
  closingTitle: 'Seguimos creando herramientas para vos.',
  closingText:
    'Nuevos recursos se incorporarán periódicamente para acompañarte en tus desafíos profesionales y de gestión.',
  closingCta: 'EXPLORAR RECURSOS',
}

export const defaultResources: ResourceItem[] = [
  {
    id: 'guia-entrevistas-competencias',
    title: 'Guía para entrevistas por competencias',
    slug: 'guia-entrevistas-competencias',
    category: 'reclutamiento',
    icon: 'description',
    excerpt:
      'Aprende a estructurar entrevistas basadas en el comportamiento para predecir el desempeño futuro del candidato con precisión.',
    files: [],
  },
  {
    id: 'checklist-iniciar-busqueda',
    title: 'Checklist para iniciar una búsqueda',
    slug: 'checklist-iniciar-busqueda',
    category: 'reclutamiento',
    icon: 'fact_check',
    excerpt:
      'Pasos esenciales para definir el perfil, alinear expectativas con el hiring manager y lanzar una búsqueda efectiva.',
    files: [],
  },
  {
    id: 'guia-mejorar-cv',
    title: 'Guía práctica para mejorar tu CV',
    slug: 'guia-mejorar-cv',
    category: 'empleabilidad',
    icon: 'assignment_ind',
    excerpt:
      'Estructuras probadas, palabras clave y consejos de diseño para que tu currículum destaque frente a los reclutadores.',
    files: [],
  },
  {
    id: 'guia-presentacion-efectiva',
    title: 'Guía para preparar una presentación efectiva',
    slug: 'guia-presentacion-efectiva',
    category: 'formacion',
    icon: 'co_present',
    excerpt:
      'Técnicas de storytelling y estructuración visual para comunicar tus ideas con impacto y claridad a cualquier audiencia.',
    files: [],
  },
  {
    id: 'procesos-rrhh-automatizar',
    title: '¿Qué procesos de RR. HH. puedo automatizar?',
    slug: 'procesos-rrhh-automatizar',
    category: 'tecnologia',
    icon: 'smart_toy',
    excerpt:
      'Identifica tareas operativas que consumen tiempo y descubre herramientas para digitalizarlas, liberando tiempo para el lado estratégico.',
    files: [],
  },
  {
    id: 'checklist-indicadores-rrhh',
    title: 'Checklist de indicadores de RR. HH.',
    slug: 'checklist-indicadores-rrhh',
    category: 'tecnologia',
    icon: 'analytics',
    excerpt:
      'Métricas clave (KPIs) que todo departamento moderno debe medir para demostrar su impacto en los resultados del negocio.',
    files: [],
  },
]

export const RESOURCE_CATEGORIES: { id: ResourceItem['category'] | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'reclutamiento', label: 'Reclutamiento' },
  { id: 'empleabilidad', label: 'Empleabilidad' },
  { id: 'formacion', label: 'Formación' },
  { id: 'tecnologia', label: 'Tecnología & RR.HH.' },
]

export const RESOURCE_CATEGORY_LABEL: Record<ResourceItem['category'], string> = {
  reclutamiento: 'Reclutamiento',
  empleabilidad: 'Empleabilidad',
  formacion: 'Formación',
  tecnologia: 'Tecnología',
}
