import { CoursePageContent, SectionContent, SiteContent } from '@/types/cms'
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

export async function fetchSiteContent(): Promise<SiteContent> {
  const depth = 'depth=2'
  const [home, learning, coursesRes] = await Promise.all([
    cmsFetch<PayloadList<PageDoc>>(`/api/pages?where[slug][equals]=home&limit=1&${depth}`),
    cmsFetch<PayloadList<PageDoc>>(`/api/pages?where[slug][equals]=learning&limit=1&${depth}`),
    cmsFetch<PayloadList<CourseDoc>>('/api/courses?limit=50&depth=2'),
  ])

  if (!home && !learning && !coursesRes) {
    return {
      ...initialContent,
      sections: initialContent.sections.map((s) =>
        s.type === 'courses' ? { ...s, courses: coursesData } : s
      ),
    }
  }

  let sections = [...initialContent.sections]

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
        blocks: mapCmsCourseBlocks(c.blocks, CMS_URL),
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

  return { sections }
}

export type LeadPayload = {
  name: string
  email: string
  phone?: string
  service?: string
  message?: string
  source?: string
}

export async function submitLead(data: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  if (!CMS_URL) {
    return { ok: false, error: 'CMS no configurado (CMS_URL)' }
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
        status: 'new',
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      return { ok: false, error: body || `HTTP ${res.status}` }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Error de red' }
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

export async function submitBooking(data: BookingPayload): Promise<{ ok: boolean; error?: string }> {
  if (!CMS_URL) {
    return { ok: false, error: 'CMS no configurado (CMS_URL)' }
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
      const body = await res.text()
      return { ok: false, error: body || `HTTP ${res.status}` }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Error de red' }
  }
}

export async function fetchActiveEventTypes() {
  return cmsFetch<PayloadList<{ id: string | number; title: string; slug: string; durationMinutes: number }>>(
    '/api/event-types?where[active][equals]=true&limit=20'
  )
}
