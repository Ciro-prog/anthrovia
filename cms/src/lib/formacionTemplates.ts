export const FORMACION_TEMPLATES = [
  { label: 'Community Manager Operativo · Nivel I', value: 'cm-nivel-1' },
  { label: 'Community Manager PRO', value: 'cm-pro' },
  { label: 'Hablar en Público', value: 'hablar-publico' },
  { label: 'Academia de Desarrollo Comercial', value: 'academia-comercial' },
  { label: 'Liderazgo Emocional', value: 'liderazgo-emocional' },
] as const

export type FormacionTemplate = (typeof FORMACION_TEMPLATES)[number]['value']

export const TEMPLATE_COURSE_SLUGS: Record<FormacionTemplate, string | null> = {
  'cm-nivel-1': 'community-manager-nivel-1',
  'cm-pro': 'community-manager-pro',
  'hablar-publico': 'hablar-en-publico',
  'academia-comercial': 'academia-desarrollo-comercial',
  'liderazgo-emocional': null,
}

export function normalizeFormacionTemplate(value: unknown, itemId?: string): FormacionTemplate {
  const raw = String(value || itemId || '').trim()
  if (FORMACION_TEMPLATES.some((t) => t.value === raw)) return raw as FormacionTemplate
  return 'cm-nivel-1'
}

export function isLiderazgoTemplate(value: unknown): boolean {
  return value === 'liderazgo-emocional'
}
