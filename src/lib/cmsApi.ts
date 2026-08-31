import { CoursePageContent, SectionContent, SiteContent } from '@/types/cms'
import { initialContent } from '@/data/initialContent'
import { coursesData } from '@/data/coursesContent'

const CMS_URL = (import.meta.env.VITE_CMS_URL as string | undefined)?.replace(/\/$/, '') || ''

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
  sections: SectionContent[]
}

type CourseDoc = {
  id: string | number
  title: string
  slug: string
  courseId?: string
  blocks: CoursePageContent['blocks']
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
 * Así siempre hay imagen (/ethos/...) hasta que el CMS suba un reemplazo.
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

/** Fusiona secciones CMS por id; media vacía → default local. */
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
  if (!remote || remote.length === 0) return local
  const bySlug = new Map(local.map((c) => [c.slug, c]))
  return remote.map((r) => {
    const base = bySlug.get(r.slug)
    if (!base) return r
    return mergeWithMediaFallback(base, {
      ...r,
      blocks: r.blocks?.length ? r.blocks : base.blocks,
    })
  })
}

export async function fetchSiteContent(): Promise<SiteContent> {
  const [home, learning, coursesRes] = await Promise.all([
    cmsFetch<PayloadList<PageDoc>>('/api/pages?where[slug][equals]=home&limit=1'),
    cmsFetch<PayloadList<PageDoc>>('/api/pages?where[slug][equals]=learning&limit=1'),
    cmsFetch<PayloadList<CourseDoc>>('/api/courses?limit=50&depth=0'),
  ])

  if (!home && !learning && !coursesRes) {
    return {
      ...initialContent,
      sections: initialContent.sections.map((s) =>
        s.type === 'courses' ? { ...s, courses: coursesData } : s
      ),
    }
  }

  const homeSections = home?.docs[0]?.sections
  const learningSections = learning?.docs[0]?.sections

  let sections = [...initialContent.sections]

  if (homeSections && Array.isArray(homeSections) && homeSections.length > 0) {
    const homeIds = new Set(
      initialContent.sections
        .filter((s) => !s.id.startsWith('learning-') && s.type !== 'courses')
        .map((s) => s.id)
    )
    const homeRemote = homeSections.filter((s) => homeIds.has(s.id) || !s.id.startsWith('learning-'))
    const homeBase = sections.filter((s) => homeIds.has(s.id))
    const homeMerged = mergeSections(homeBase, homeRemote)
    const homeMergedById = new Map(homeMerged.map((s) => [s.id, s]))
    sections = sections.map((s) => (homeIds.has(s.id) ? homeMergedById.get(s.id) || s : s))
    for (const s of homeMerged) {
      if (!sections.find((x) => x.id === s.id)) sections.push(s)
    }
  }

  if (learningSections && Array.isArray(learningSections) && learningSections.length > 0) {
    sections = sections.map((s) => {
      if (!s.id.startsWith('learning-') && s.id !== 'contact') return s
      const remote = learningSections.find((r) => r.id === s.id)
      if (!remote) return s
      return mergeWithMediaFallback(s, remote)
    })
    for (const s of learningSections) {
      if (!sections.find((x) => x.id === s.id)) sections.push(s)
    }
  }

  const remoteCourses = coursesRes?.docs?.map((c) => ({
    id: c.courseId || `course-${c.slug}`,
    slug: c.slug,
    title: c.title,
    blocks: (c.blocks || []) as CoursePageContent['blocks'],
  })) as CoursePageContent[] | undefined

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
    return { ok: false, error: 'CMS no configurado (VITE_CMS_URL)' }
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
    return { ok: false, error: 'CMS no configurado (VITE_CMS_URL)' }
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
