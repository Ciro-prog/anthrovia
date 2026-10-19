import {
  ApplicationAnswer,
  ApplicationFormContent,
  CoursePageContent,
  ResourceFile,
  DossierIcon,
  DossierPageContent,
  ResourceItem,
  ResourcesPageContent,
  SectionContent,
  SiteContent,
  SiteSettingsContent,
} from '@/types/cms'
import { initialContent } from '@/data/initialContent'
import { coursesData } from '@/data/coursesContent'
import { mapCmsBlocksToSections } from '@/lib/mapCmsSections'
import { mapCmsCourseBlocks } from '@/lib/mapCmsCourseBlocks'

const CMS_URL = (
  (import.meta.env.CMS_URL as string | undefined) ||
  (import.meta.env.VITE_CMS_URL as string | undefined) ||
  ''
).replace(/\/$/, '')

/** Keys that hold image/video/media URLs — empty CMS values keep local /ethos/ defaults. */
const MEDIA_KEYS = new Set([
  'imageUrl',
  'personImage',
  'videoUrl',
  'logoUrl',
  'url',
  'src',
  'poster',
  'backgroundImage',
  'coverUrl',
  'avatarUrl',
])

type PayloadList<T> = {
  docs: T[]
  totalDocs: number
}

type PageDoc = {
  slug: string
  title: string
  sections: unknown
  _status?: string
}

type CourseDoc = {
  id: string | number
  title: string
  slug: string
  courseId?: string
  category?: string
  description?: string
  image?: { url?: string | null } | number | null
  imageUrl?: string
  blocks: unknown
  cohortStartDate?: string
  inscriptionDeadline?: string
  spots?: number
  cohortStatus?: string
  template?: string
}

export function isCmsConfigured() {
  return Boolean(CMS_URL)
}

export function getCmsBaseUrl() {
  return CMS_URL
}

export function isPreviewMode(): boolean {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('preview') === '1'
}

/** Usa la URL del CMS si viene con valor; si no, el fallback local (/ethos/...). */
export function resolveMediaUrl(
  value: string | null | undefined,
  fallback?: string | null | undefined
): string | undefined {
  const v = typeof value === 'string' ? value.trim() : ''
  if (v) return v
  const f = typeof fallback === 'string' ? fallback.trim() : ''
  return f || undefined
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

/**
 * Deep-merge: remote gana en textos/flags; campos de media vacíos conservan el local.
 */
export function mergeWithMediaFallback<T>(base: T, remote: T): T {
  if (remote === null || remote === undefined) return base
  if (base === null || base === undefined) return remote

  if (Array.isArray(remote)) {
    if (!Array.isArray(base) || base.length === 0) return remote as T
    if (remote.length === 0) return base
    return remote.map((item, i) => {
      const b = base[i]
      if (b === undefined) return item
      return mergeWithMediaFallback(b, item)
    }) as T
  }

  if (isPlainObject(remote) && isPlainObject(base as unknown)) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) }
    for (const [key, remoteVal] of Object.entries(remote)) {
      const baseVal = (base as Record<string, unknown>)[key]
      if (MEDIA_KEYS.has(key)) {
        out[key] = resolveMediaUrl(
          typeof remoteVal === 'string' ? remoteVal : undefined,
          typeof baseVal === 'string' ? baseVal : undefined
        )
        continue
      }
      if (remoteVal === null || remoteVal === undefined) {
        continue
      }
      if (typeof remoteVal === 'string' && remoteVal.trim() === '' && typeof baseVal === 'string') {
        out[key] = baseVal
        continue
      }
      out[key] = mergeWithMediaFallback(baseVal, remoteVal)
    }
    return out as T
  }

  return remote
}

async function cmsFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!CMS_URL) return null
  try {
    const res = await fetch(`${CMS_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
    })
    if (!res.ok) {
      console.warn(`[cms] ${path} → ${res.status}`)
      return null
    }
    return (await res.json()) as T
  } catch (err) {
    console.warn('[cms] fetch failed', err)
    return null
  }
}

function mergeSections(base: SectionContent[], remote?: SectionContent[]): SectionContent[] {
  if (!remote || remote.length === 0) return base
  const byId = new Map(remote.map((s) => [s.id, s]))
  const merged = base.map((s) => {
    const r = byId.get(s.id)
    return r ? mergeWithMediaFallback(s, r) : s
  })
  for (const s of remote) {
    if (!merged.find((m) => m.id === s.id)) merged.push(s)
  }
  return merged
}

function mergeCourses(
  local: CoursePageContent[],
  remote?: CoursePageContent[]
): CoursePageContent[] {
  // undefined = el fetch falló → fallback local. [] = CMS respondió vacío (borrados).
  if (remote === undefined) return local
  return remote.map((r) => {
    const base = local.find((c) => c.slug === r.slug)
    if (!base) return r
    return mergeWithMediaFallback(base, {
      ...r,
      blocks: r.blocks?.length ? r.blocks : base.blocks,
    })
  })
}

function pageSectionsFromDoc(doc: PageDoc | undefined): SectionContent[] {
  if (!doc?.sections) return []
  const first = Array.isArray(doc.sections) ? doc.sections[0] : null
  if (
    first &&
    typeof first === 'object' &&
    'type' in first &&
    !('blockType' in first)
  ) {
    return doc.sections as SectionContent[]
  }
  return mapCmsBlocksToSections(doc.sections, CMS_URL)
}

/** Aplica secciones remotas (p.ej. live preview) sobre el contenido base. */
export function applyRemoteSections(
  base: SiteContent,
  remoteSections: SectionContent[],
  scope: 'home' | 'learning' | 'all' = 'all',
): SiteContent {
  let sections = [...base.sections]

  if (scope === 'home' || scope === 'all') {
    const homeIds = new Set(
      initialContent.sections
        .filter((s) => !s.id.startsWith('learning-') && s.type !== 'courses')
        .map((s) => s.id),
    )
    const homeRemote = remoteSections.filter(
      (s) => homeIds.has(s.id) || (!s.id.startsWith('learning-') && s.type !== 'courses'),
    )
    if (homeRemote.length) {
      const homeBase = sections.filter((s) => homeIds.has(s.id))
      const homeMerged = mergeSections(homeBase, homeRemote)
      const byId = new Map(homeMerged.map((s) => [s.id, s]))
      sections = sections.map((s) => (homeIds.has(s.id) ? byId.get(s.id) || s : s))
      for (const s of homeMerged) {
        if (!sections.find((x) => x.id === s.id)) sections.push(s)
      }
    }
  }

  if (scope === 'learning' || scope === 'all') {
    const learningRemote = remoteSections.filter(
      (s) => s.id.startsWith('learning-') || s.id === 'contact',
    )
    if (learningRemote.length) {
      sections = sections.map((s) => {
        if (!s.id.startsWith('learning-') && s.id !== 'contact') return s
        const remote = learningRemote.find((r) => r.id === s.id)
        return remote ? mergeWithMediaFallback(s, remote) : s
      })
      for (const s of learningRemote) {
        if (!sections.find((x) => x.id === s.id)) sections.push(s)
      }
    }
  }

  return { sections }
}

export async function fetchSiteContent(): Promise<{ content: SiteContent; reachable: boolean }> {
  const depth = 'depth=2'
  const [home, learning, coursesRes] = await Promise.all([
    cmsFetch<PayloadList<PageDoc>>(`/api/pages?where[slug][equals]=home&limit=1&${depth}`),
    cmsFetch<PayloadList<PageDoc>>(`/api/pages?where[slug][equals]=learning&limit=1&${depth}`),
    cmsFetch<PayloadList<CourseDoc>>('/api/courses?limit=50&depth=2'),
  ])

  const fallback: SiteContent = {
    ...initialContent,
    sections: initialContent.sections.map((s) =>
      s.type === 'courses' ? { ...s, courses: coursesData } : s
    ),
  }

  if (!home && !learning && !coursesRes) {
    return { content: fallback, reachable: false }
  }

  let sections = [...fallback.sections]

  const homeMapped = pageSectionsFromDoc(home?.docs[0])
  if (homeMapped.length > 0) {
    ;({ sections } = applyRemoteSections({ sections }, homeMapped, 'home'))
  }

  const learningMapped = pageSectionsFromDoc(learning?.docs[0])
  if (learningMapped.length > 0) {
    ;({ sections } = applyRemoteSections({ sections }, learningMapped, 'learning'))
  }

  const remoteCourses = coursesRes
    ? (coursesRes.docs.map((c) => ({
        id: c.courseId || `course-${c.slug}`,
        slug: c.slug,
        title: c.title,
        template: c.template || undefined,
        blocks: mapCmsCourseBlocks(c.blocks, CMS_URL),
        cohortStartDate: c.cohortStartDate,
        inscriptionDeadline: c.inscriptionDeadline,
        spots: c.spots,
        cohortStatus: c.cohortStatus,
      })) as CoursePageContent[])
    : undefined

  const mergedCourses = mergeCourses(coursesData, remoteCourses)

  sections = sections.map((s) => {
    if (s.type !== 'courses') return s
    return { ...s, courses: mergedCourses }
  })

  if (!sections.find((s) => s.type === 'courses')) {
    sections.push({
      id: 'courses',
      type: 'courses',
      isVisible: true,
      courses: mergedCourses,
    })
  }

  return { content: { sections }, reachable: true }
}

export type LeadPayload = {
  name: string
  email: string
  phone?: string
  service?: string
  message?: string
  source?: string
  company?: string
  preferredDay?: string
  preferredSlot?: string
}

export async function submitLead(data: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  if (!CMS_URL) {
    return { ok: false, error: 'No se pudo enviar. Probá de nuevo.' }
  }
  try {
    const res = await fetch(`${CMS_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        service: data.service || '',
        message: data.message || '',
        source: data.source || 'contact-form',
        company: data.company || '',
        preferredDay: data.preferredDay || '',
        preferredSlot: data.preferredSlot || '',
        status: 'new',
      }),
    })
    if (!res.ok) {
      return { ok: false, error: 'No se pudo enviar. Probá de nuevo.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'No se pudo enviar. Probá de nuevo.' }
  }
}

export type BookingPayload = {
  eventTypeId: string | number
  name: string
  email: string
  phone?: string
  notes?: string
  startsAt: string
}

export async function submitBooking(
  data: BookingPayload,
): Promise<{ ok: boolean; error?: string; conflict?: boolean }> {
  if (!CMS_URL) {
    return { ok: false, error: 'No se pudo enviar. Probá de nuevo.' }
  }
  try {
    const res = await fetch(`${CMS_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: data.eventTypeId,
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        notes: data.notes || '',
        startsAt: data.startsAt,
        status: 'pending',
      }),
    })
    if (!res.ok) {
      const json = (await res.json().catch(() => null)) as
        | { errors?: { message?: string }[]; message?: string }
        | null
      const message =
        json?.errors?.[0]?.message ||
        json?.message ||
        (res.status === 409
          ? 'Ese horario ya no está disponible. Elegí otro turno.'
          : 'No se pudo enviar. Probá de nuevo.')
      return { ok: false, error: message, conflict: res.status === 409 }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'No se pudo enviar. Probá de nuevo.' }
  }
}

export type AvailabilityDay = { date: string; slots: string[] }

export async function fetchAvailability(opts?: {
  eventTypeId?: string | number
  from?: string
  to?: string
}): Promise<{ days: AvailabilityDay[]; durationMinutes?: number } | null> {
  const params = new URLSearchParams()
  if (opts?.eventTypeId) params.set('eventType', String(opts.eventTypeId))
  if (opts?.from) params.set('from', opts.from)
  if (opts?.to) params.set('to', opts.to)
  const qs = params.toString()
  return cmsFetch<{ days: AvailabilityDay[]; durationMinutes?: number }>(
    `/api/availability${qs ? `?${qs}` : ''}`,
  )
}

export async function fetchActiveEventTypes() {
  return cmsFetch<PayloadList<{ id: string | number; title: string; slug: string; durationMinutes: number }>>(
    '/api/event-types?where[active][equals]=true&limit=20'
  )
}

export async function fetchSiteSettings(): Promise<SiteSettingsContent | null> {
  return cmsFetch<SiteSettingsContent>('/api/globals/site-settings')
}

export async function fetchApplicationForm(): Promise<ApplicationFormContent | null> {
  return cmsFetch<ApplicationFormContent>('/api/globals/application-form')
}

type MediaRef = { url?: string | null; filename?: string | null; mimeType?: string | null } | number | null

function absolutizeUrl(url?: string | null): string {
  if (!url || !String(url).trim()) return ''
  const u = String(url).trim()
  if (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('data:')) return u
  return CMS_URL ? `${CMS_URL}${u.startsWith('/') ? u : `/${u}`}` : u
}

function mediaRefUrl(value: MediaRef | undefined): string {
  if (!value || typeof value === 'number') return ''
  return absolutizeUrl(value.url)
}

export function mapCmsResource(raw: Record<string, unknown>): ResourceItem {
  const files: ResourceFile[] = []
  if (Array.isArray(raw.files)) {
    for (const row of raw.files) {
      if (!row || typeof row !== 'object') continue
      const rec = row as { file?: MediaRef; label?: string }
      const url = mediaRefUrl(rec.file)
      if (!url) continue
      const file = typeof rec.file === 'object' && rec.file ? rec.file : null
      files.push({
        url,
        label: rec.label || file?.filename || 'Archivo',
        filename: file?.filename || undefined,
        mimeType: file?.mimeType || undefined,
      })
    }
  }
  const category = raw.category
  return {
    id: String(raw.id ?? raw.slug ?? ''),
    title: String(raw.title || ''),
    slug: String(raw.slug || ''),
    category:
      category === 'empleabilidad' || category === 'formacion' || category === 'tecnologia'
        ? category
        : 'reclutamiento',
    icon: (raw.icon as ResourceItem['icon']) || 'description',
    image: mediaRefUrl(raw.image as MediaRef) || undefined,
    excerpt: String(raw.excerpt || ''),
    body: raw.body ? String(raw.body) : undefined,
    files,
    published: raw.published !== false,
  }
}

export function mapCmsResourcesPage(raw: Record<string, unknown>): ResourcesPageContent {
  const steps = Array.isArray(raw.steps)
    ? raw.steps
        .filter((s): s is { title?: string; text?: string } => Boolean(s && typeof s === 'object'))
        .map((s) => ({ title: String(s.title || ''), text: String(s.text || '') }))
        .filter((s) => s.title || s.text)
    : undefined
  return {
    sectionVisible: raw.sectionVisible !== false,
    comingSoonTitle: raw.comingSoonTitle ? String(raw.comingSoonTitle) : undefined,
    comingSoonText: raw.comingSoonText ? String(raw.comingSoonText) : undefined,
    eyebrow: raw.eyebrow ? String(raw.eyebrow) : undefined,
    title: raw.title ? String(raw.title) : undefined,
    subtitle: raw.subtitle ? String(raw.subtitle) : undefined,
    ctaLabel: raw.ctaLabel ? String(raw.ctaLabel) : undefined,
    introTitle: raw.introTitle ? String(raw.introTitle) : undefined,
    introText: raw.introText ? String(raw.introText) : undefined,
    introCallout: raw.introCallout ? String(raw.introCallout) : undefined,
    introImage1: mediaRefUrl(raw.introImage1 as MediaRef) || undefined,
    introImage2: mediaRefUrl(raw.introImage2 as MediaRef) || undefined,
    introImage3: mediaRefUrl(raw.introImage3 as MediaRef) || undefined,
    catalogTitle: raw.catalogTitle ? String(raw.catalogTitle) : undefined,
    howTitle: raw.howTitle ? String(raw.howTitle) : undefined,
    steps,
    closingTitle: raw.closingTitle ? String(raw.closingTitle) : undefined,
    closingText: raw.closingText ? String(raw.closingText) : undefined,
    closingCta: raw.closingCta ? String(raw.closingCta) : undefined,
  }
}

export async function fetchResourcesPage(): Promise<ResourcesPageContent | null> {
  const raw = await cmsFetch<Record<string, unknown>>('/api/globals/resources-page?depth=1')
  return raw ? mapCmsResourcesPage(raw) : null
}

export async function fetchResources(): Promise<ResourceItem[] | null> {
  const list = await cmsFetch<PayloadList<Record<string, unknown>>>(
    '/api/resources?where[published][equals]=true&limit=60&sort=title&depth=1',
  )
  if (!list) return null
  return (list.docs || []).map(mapCmsResource)
}

function asRows(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return []
  return value.filter((row): row is Record<string, unknown> => Boolean(row && typeof row === 'object'))
}

function asIcon(value: unknown): DossierIcon | undefined {
  return typeof value === 'string' && value ? (value as DossierIcon) : undefined
}

export function mapCmsDossierPage(raw: Record<string, unknown>): DossierPageContent {
  return {
    heroTitle: raw.heroTitle ? String(raw.heroTitle) : undefined,
    heroHighlight: raw.heroHighlight ? String(raw.heroHighlight) : undefined,
    heroSubtitle: raw.heroSubtitle ? String(raw.heroSubtitle) : undefined,
    heroCtaPrimary: raw.heroCtaPrimary ? String(raw.heroCtaPrimary) : undefined,
    heroCtaSecondary: raw.heroCtaSecondary ? String(raw.heroCtaSecondary) : undefined,
    heroImage: mediaRefUrl(raw.heroImage as MediaRef) || undefined,
    trustLabel: raw.trustLabel ? String(raw.trustLabel) : undefined,
    trustLogos: asRows(raw.trustLogos)
      .map((row) => ({ name: String(row.name || '') }))
      .filter((row) => row.name),
    challengeTitle: raw.challengeTitle ? String(raw.challengeTitle) : undefined,
    challengeText: raw.challengeText ? String(raw.challengeText) : undefined,
    challengeQuote: raw.challengeQuote ? String(raw.challengeQuote) : undefined,
    challengeCta: raw.challengeCta ? String(raw.challengeCta) : undefined,
    challengeChips: asRows(raw.challengeChips)
      .map((row) => ({ label: String(row.label || '') }))
      .filter((row) => row.label),
    familiarTitle: raw.familiarTitle ? String(raw.familiarTitle) : undefined,
    painPoints: asRows(raw.painPoints)
      .map((row) => ({
        icon: asIcon(row.icon),
        title: String(row.title || ''),
        body: String(row.body || ''),
      }))
      .filter((row) => row.title || row.body),
    familiarQuote: raw.familiarQuote ? String(raw.familiarQuote) : undefined,
    familiarCta: raw.familiarCta ? String(raw.familiarCta) : undefined,
    transformTitle: raw.transformTitle ? String(raw.transformTitle) : undefined,
    transformImage: mediaRefUrl(raw.transformImage as MediaRef) || undefined,
    pillars: asRows(raw.pillars)
      .map((row) => ({
        icon: asIcon(row.icon),
        title: String(row.title || ''),
        body: String(row.body || ''),
      }))
      .filter((row) => row.title || row.body),
    transformQuote: raw.transformQuote ? String(raw.transformQuote) : undefined,
    transformCta: raw.transformCta ? String(raw.transformCta) : undefined,
    featuresTitle: raw.featuresTitle ? String(raw.featuresTitle) : undefined,
    features: asRows(raw.features)
      .map((row) => ({
        icon: asIcon(row.icon),
        title: String(row.title || ''),
        body: String(row.body || ''),
        wide: row.wide === true,
      }))
      .filter((row) => row.title || row.body),
    featuresQuote: raw.featuresQuote ? String(raw.featuresQuote) : undefined,
    featuresCta: raw.featuresCta ? String(raw.featuresCta) : undefined,
    statsTitle: raw.statsTitle ? String(raw.statsTitle) : undefined,
    stats: asRows(raw.stats)
      .map((row) => ({
        icon: asIcon(row.icon),
        value: String(row.value || ''),
        label: String(row.label || ''),
      }))
      .filter((row) => row.value || row.label),
    statsCta: raw.statsCta ? String(raw.statsCta) : undefined,
    whyTitle: raw.whyTitle ? String(raw.whyTitle) : undefined,
    whyText: raw.whyText ? String(raw.whyText) : undefined,
    whyItems: asRows(raw.whyItems)
      .map((row) => ({ title: String(row.title || ''), body: String(row.body || '') }))
      .filter((row) => row.title || row.body),
    whyCta: raw.whyCta ? String(raw.whyCta) : undefined,
    whyImage: mediaRefUrl(raw.whyImage as MediaRef) || undefined,
    whyQuote: raw.whyQuote ? String(raw.whyQuote) : undefined,
    pathTitle: raw.pathTitle ? String(raw.pathTitle) : undefined,
    steps: asRows(raw.steps)
      .map((row) => ({
        n: String(row.n || ''),
        title: String(row.title || ''),
        body: String(row.body || ''),
      }))
      .filter((row) => row.title || row.body),
    pathQuote: raw.pathQuote ? String(raw.pathQuote) : undefined,
    formTitle: raw.formTitle ? String(raw.formTitle) : undefined,
    formSuccessTitle: raw.formSuccessTitle ? String(raw.formSuccessTitle) : undefined,
    formSuccessText: raw.formSuccessText ? String(raw.formSuccessText) : undefined,
  }
}

export async function fetchDossierPage(): Promise<DossierPageContent | null> {
  const raw = await cmsFetch<Record<string, unknown>>('/api/globals/dossier-page?depth=1')
  return raw ? mapCmsDossierPage(raw) : null
}

export const defaultSiteSettings: SiteSettingsContent = {
  siteName: 'Anthrovia HR',
  bookingEnabled: true,
  defaultEventTypeSlug: 'llamada-15',
  loadingTitle: 'Cargando',
  loadingMessage: 'Estamos cargando el contenido…',
  notFoundTitle: 'En mantenimiento',
  notFoundMessage:
    'Esta dirección no está disponible por ahora. Podés seguir recorriendo el sitio desde el menú o volver al inicio.',
  notFoundCtaLabel: 'Volver al inicio',
  bookingDurationMinutes: 30,
  bookingDays: ['lun', 'mar', 'mie', 'jue', 'vie'],
  bookingWindows: [
    { start: '09:00', end: '13:00' },
    { start: '14:00', end: '18:00' },
  ],
  dossierDays: ['lun', 'mar', 'mie', 'jue', 'vie'],
  dossierSlots: [
    { label: 'Mañana', start: '09:00', end: '13:00' },
    { label: 'Tarde', start: '14:00', end: '18:00' },
  ],
}

export type ApplicationPayload = {
  email: string
  firstName?: string
  lastName?: string
  age?: string
  phone?: string
  linkedin?: string
  country?: string
  province?: string
  city?: string
  residencyStatus?: string
  educationLevel?: string
  secondaryStatus?: string
  educationArea?: string
  careerRun?: string
  salesSectors?: string
  motivation?: string
  healthAttraction?: string
  salesExperienceYears?: string
  healthSalesExperience?: string
  healthSalesExperienceDesc?: string
  isWorking?: string
  currentRole?: string
  lookingForChange?: string
  willingToChange?: string
  changeCondition?: string
  startDate?: string
  remoteWorkAgreement?: string
  commissionSchemeAgreement?: string
  desiredIncomeScheme?: string
  contractTypeAgreement?: string
  monotributo?: string
  hasPC?: string
  hasInternet?: string
  consent?: boolean
  answers?: ApplicationAnswer[]
}

export async function submitApplication(
  data: ApplicationPayload,
  cv?: File | null,
): Promise<{ ok: boolean; error?: string }> {
  if (!CMS_URL) {
    return { ok: false, error: 'No se pudo enviar. Probá de nuevo.' }
  }
  try {
    const payload = { ...data, status: 'new' }
    let res: Response
    if (cv) {
      const form = new FormData()
      form.append('_payload', JSON.stringify(payload))
      form.append('cv', cv)
      res = await fetch(`${CMS_URL}/api/applications`, {
        method: 'POST',
        body: form,
      })
    } else {
      res = await fetch(`${CMS_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }
    if (!res.ok) {
      return { ok: false, error: 'No se pudo enviar. Probá de nuevo.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'No se pudo enviar. Probá de nuevo.' }
  }
}
