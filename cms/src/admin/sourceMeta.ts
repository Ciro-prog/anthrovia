export const SOURCE_META: Record<
  string,
  { label: string; bg: string; fg: string; filter: 'home' | 'learning' | 'dossier' | 'postulacion' | 'other' }
> = {
  'home-contact': { label: 'Home', bg: '#dbeafe', fg: '#1e40af', filter: 'home' },
  'learning-contact': { label: 'Capacitaciones', bg: '#dcfce7', fg: '#166534', filter: 'learning' },
  dossier: { label: 'Dossier', bg: '#fef3c7', fg: '#92400e', filter: 'dossier' },
  postulacion: { label: 'Postulación', bg: '#ede9fe', fg: '#5b21b6', filter: 'postulacion' },
  'contact-form': { label: 'Formulario', bg: '#e5e7eb', fg: '#374151', filter: 'other' },
}

export function sourceMeta(source: string | null | undefined) {
  return SOURCE_META[source || ''] || { label: source || 'Otro', bg: '#e5e7eb', fg: '#374151', filter: 'other' as const }
}
