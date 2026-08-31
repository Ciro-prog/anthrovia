import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { SiteContent, SectionContent } from '../types/cms'
import { initialContent } from '../data/initialContent'
import { coursesData } from '../data/coursesContent'
import {
  applyRemoteSections,
  fetchSiteContent,
  getCmsBaseUrl,
  isPreviewMode,
} from '../lib/cmsApi'
import { mapCmsBlocksToSections } from '../lib/mapCmsSections'
import { mapCmsCourseBlocks } from '../lib/mapCmsCourseBlocks'
import { usePreviewFieldFocus } from '../lib/usePreviewFieldFocus'

interface CMSContextType {
  content: SiteContent
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
  sections?: unknown
  blocks?: unknown
}

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(fallbackContent)
  const [isLoading, setIsLoading] = useState(true)
  const [cmsOnline, setCmsOnline] = useState(false)
  const isPreview = isPreviewMode()
  const cmsBase = getCmsBaseUrl()

  const previewSlug = useMemo(() => {
    if (typeof window === 'undefined') return 'home'
    return new URLSearchParams(window.location.search).get('slug') || 'home'
  }, [])

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
        const remote = await fetchSiteContent()
        if (!cancelled) {
          setContent(remote)
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

  // Live Preview: página (sections) o capacitación (blocks)
  useEffect(() => {
    if (!isPreview || !liveData) return

    if (liveData.blocks) {
      const mapped = mapCmsCourseBlocks(liveData.blocks, cmsBase)
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
          }
          if (idx >= 0) courses[idx] = next
          else courses.push(next)
          return { ...section, courses }
        }),
      }))
      return
    }

    if (!liveData.sections) return
    const mapped = mapCmsBlocksToSections(liveData.sections, cmsBase)
    if (!mapped.length) return
    const scope = liveData.slug === 'learning' || previewSlug === 'learning' ? 'learning' : 'home'
    setContent((prev) => applyRemoteSections(prev, mapped, scope))
  }, [isPreview, liveData, cmsBase, previewSlug])

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
      value={{ content, updateSection, saveContent, isLoading, cmsOnline, isPreview }}
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
