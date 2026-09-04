import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import {
  SiteContent,
  SectionContent,
  SiteSettingsContent,
  ApplicationFormContent,
  ResourcesPageContent,
  ResourceItem,
} from '../types/cms'
import { initialContent } from '../data/initialContent'
import { coursesData } from '../data/coursesContent'
import { defaultApplicationForm } from '../data/applicationFormDefaults'
import { defaultResources, defaultResourcesPage } from '../data/resourcesDefaults'
import {
  applyRemoteSections,
  defaultSiteSettings,
  fetchApplicationForm,
  fetchResources,
  fetchResourcesPage,
  fetchSiteContent,
  fetchSiteSettings,
  getCmsBaseUrl,
  isPreviewMode,
  mapCmsResource,
  mapCmsResourcesPage,
} from '../lib/cmsApi'
import { mapCmsBlocksToSections } from '../lib/mapCmsSections'
import { mapCmsCourseBlocks } from '../lib/mapCmsCourseBlocks'
import { usePreviewFieldFocus } from '../lib/usePreviewFieldFocus'

interface CMSContextType {
  content: SiteContent
  siteSettings: SiteSettingsContent
  applicationForm: ApplicationFormContent
  resourcesPage: ResourcesPageContent
  resources: ResourceItem[]
  updateSection: (sectionId: string, newContent: Partial<SectionContent>) => void
  saveContent: () => Promise<void>
  isLoading: boolean
  cmsOnline: boolean
  isPreview: boolean
}

export const CMSContext = createContext<CMSContextType | undefined>(undefined)

const fallbackContent: SiteContent = {
  sections: initialContent.sections.map((s) =>
    s.type === 'courses' ? { ...s, courses: s.courses?.length ? s.courses : coursesData } : s
  ),
}

type PreviewPageDoc = {
  slug?: string
  title?: string
  subtitle?: string
  fields?: unknown
  sections?: unknown
  blocks?: unknown
  bookingEnabled?: boolean
  defaultEventTypeSlug?: string
  whatsappNumber?: string
  contactEmail?: string
  siteName?: string
  cohortStartDate?: string
  inscriptionDeadline?: string
  spots?: number
  cohortStatus?: string
  excerpt?: string
  category?: string
  files?: unknown
  body?: string
  icon?: string
  published?: boolean
  eyebrow?: string
  catalogTitle?: string
  introTitle?: string
  introText?: string
  introCallout?: string
  howTitle?: string
  steps?: unknown
  ctaLabel?: string
  closingTitle?: string
  closingText?: string
  closingCta?: string
  introImage1?: unknown
  introImage2?: unknown
  introImage3?: unknown
}

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(fallbackContent)
  const [siteSettings, setSiteSettings] = useState<SiteSettingsContent>(defaultSiteSettings)
  const [applicationForm, setApplicationForm] = useState<ApplicationFormContent>(defaultApplicationForm)
  const [resourcesPage, setResourcesPage] = useState<ResourcesPageContent>(defaultResourcesPage)
  const [resources, setResources] = useState<ResourceItem[]>(defaultResources)
  const [isLoading, setIsLoading] = useState(true)
  const [cmsOnline, setCmsOnline] = useState(false)
  const isPreview = isPreviewMode()
  const cmsBase = getCmsBaseUrl()

  const previewSlug = useMemo(() => {
    if (typeof window === 'undefined') return 'home'
    const q = new URLSearchParams(window.location.search).get('slug')
    if (q) return q
    const course = window.location.pathname.match(/^\/capacitaciones\/([^/]+)/)
    if (course) return course[1]
    if (window.location.pathname.startsWith('/capacitaciones')) return 'learning'
    const resource = window.location.pathname.match(/^\/recursos\/([^/]+)/)
    if (resource) return resource[1]
    if (window.location.pathname.startsWith('/recursos')) return 'recursos'
    return 'home'
  }, [])

  const isCoursePreview =
    typeof window !== 'undefined' && /^\/capacitaciones\/[^/]+/.test(window.location.pathname)

  const { data: liveData } = useLivePreview<PreviewPageDoc>({
    serverURL: cmsBase || 'http://localhost:60518',
    depth: 2,
    initialData: { slug: previewSlug, sections: [] },
  })

  usePreviewFieldFocus(liveData, isPreview)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setIsLoading(true)
      try {
        const [remote, settings, form, page, list] = await Promise.all([
          fetchSiteContent(),
          fetchSiteSettings(),
          fetchApplicationForm(),
          fetchResourcesPage(),
          fetchResources(),
        ])
        if (!cancelled) {
          setContent(remote)
          if (settings) {
            setSiteSettings({
              ...defaultSiteSettings,
              ...settings,
              dossierDays: settings.dossierDays?.length
                ? settings.dossierDays
                : defaultSiteSettings.dossierDays,
              dossierSlots: settings.dossierSlots?.length
                ? settings.dossierSlots
                : defaultSiteSettings.dossierSlots,
            })
          }
          if (form?.fields?.length) {
            setApplicationForm({
              title: form.title || defaultApplicationForm.title,
              subtitle: form.subtitle || defaultApplicationForm.subtitle,
              fields: form.fields,
            })
          }
          if (page) {
            setResourcesPage({
              ...defaultResourcesPage,
              ...page,
              steps: page.steps?.length ? page.steps : defaultResourcesPage.steps,
              introImage1: page.introImage1 || defaultResourcesPage.introImage1,
              introImage2: page.introImage2 || defaultResourcesPage.introImage2,
              introImage3: page.introImage3 || defaultResourcesPage.introImage3,
            })
          }
          if (list?.length) setResources(list)
          setCmsOnline(Boolean(cmsBase))
        }
      } catch (err) {
        console.warn('CMS load failed, using local content', err)
        if (!cancelled) {
          setContent(fallbackContent)
          setCmsOnline(false)
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [cmsBase])

  // Live Preview: página (sections) o capacitación (blocks). No pisar con arrays vacíos.
  useEffect(() => {
    if (!isPreview || !liveData) return

    if (liveData.catalogTitle || liveData.introTitle || liveData.howTitle || liveData.introCallout) {
      const mapped = mapCmsResourcesPage(liveData as Record<string, unknown>)
      setResourcesPage({
        ...defaultResourcesPage,
        ...mapped,
        steps: mapped.steps?.length ? mapped.steps : defaultResourcesPage.steps,
        introImage1: mapped.introImage1 || defaultResourcesPage.introImage1,
        introImage2: mapped.introImage2 || defaultResourcesPage.introImage2,
        introImage3: mapped.introImage3 || defaultResourcesPage.introImage3,
      })
    }

    if (liveData.excerpt || Array.isArray(liveData.files) || liveData.category) {
      const mapped = mapCmsResource(liveData as Record<string, unknown>)
      if (mapped.slug || mapped.title) {
        setResources((prev) => {
          const slug = mapped.slug || previewSlug
          const next = { ...mapped, slug }
          const idx = prev.findIndex((r) => r.slug === slug)
          if (idx >= 0) {
            const copy = [...prev]
            copy[idx] = { ...copy[idx], ...next }
            return copy
          }
          return [...prev, next]
        })
      }
    }

    if (Array.isArray(liveData.fields)) {
      setApplicationForm({
        title: typeof liveData.title === 'string' ? liveData.title : defaultApplicationForm.title,
        subtitle: typeof liveData.subtitle === 'string' ? liveData.subtitle : defaultApplicationForm.subtitle,
        fields: liveData.fields as ApplicationFormContent['fields'],
      })
    }

    const liveBlocks = Array.isArray(liveData.blocks) ? liveData.blocks : null
    if ((isCoursePreview || liveBlocks) && liveBlocks && liveBlocks.length > 0) {
      const mapped = mapCmsCourseBlocks(liveBlocks, cmsBase)
      if (!mapped.length) return
      const slug = String(liveData.slug || previewSlug)
      setContent((prev) => ({
        ...prev,
        sections: prev.sections.map((section) => {
          if (section.type !== 'courses') return section
          const courses = [...section.courses]
          const idx = courses.findIndex((c) => c.slug === slug)
          const next = {
            id: idx >= 0 ? courses[idx].id : `preview-${slug}`,
            slug,
            title: liveData.title || (idx >= 0 ? courses[idx].title : slug),
            blocks: mapped,
            cohortStartDate: liveData.cohortStartDate,
            inscriptionDeadline: liveData.inscriptionDeadline,
            spots: liveData.spots,
            cohortStatus: liveData.cohortStatus,
          }
          if (idx >= 0) courses[idx] = next
          else courses.push(next)
          return { ...section, courses }
        }),
      }))
      return
    }

    if (typeof liveData.bookingEnabled === 'boolean' || liveData.contactEmail || liveData.whatsappNumber) {
      setSiteSettings((prev) => ({
        ...prev,
        ...(typeof liveData.bookingEnabled === 'boolean' ? { bookingEnabled: liveData.bookingEnabled } : {}),
        ...(liveData.defaultEventTypeSlug ? { defaultEventTypeSlug: liveData.defaultEventTypeSlug } : {}),
        ...(liveData.whatsappNumber ? { whatsappNumber: liveData.whatsappNumber } : {}),
        ...(liveData.contactEmail ? { contactEmail: liveData.contactEmail } : {}),
        ...(liveData.siteName ? { siteName: liveData.siteName } : {}),
      }))
    }

    const liveSections = Array.isArray(liveData.sections) ? liveData.sections : null
    if (!liveSections || liveSections.length === 0) return
    const mapped = mapCmsBlocksToSections(liveSections, cmsBase)
    if (!mapped.length) return
    const scope = liveData.slug === 'learning' || previewSlug === 'learning' ? 'learning' : 'home'
    setContent((prev) => applyRemoteSections(prev, mapped, scope))
  }, [isPreview, liveData, cmsBase, previewSlug, isCoursePreview])

  const updateSection = (sectionId: string, newContent: Partial<SectionContent>) => {
    setContent((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? ({ ...section, ...newContent } as SectionContent) : section
      ),
    }))
  }

  const saveContent = async () => {
    console.warn('El guardado se hace desde el panel admin del CMS (Publish).')
  }

  return (
    <CMSContext.Provider
      value={{
        content,
        siteSettings,
        applicationForm,
        resourcesPage,
        resources,
        updateSection,
        saveContent,
        isLoading,
        cmsOnline,
        isPreview,
      }}
    >
      {children}
    </CMSContext.Provider>
  )
}

export const useCMS = () => {
  const context = useContext(CMSContext)
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider')
  }
  return context
}
