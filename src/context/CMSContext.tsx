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
  sections?: unknown
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

  // Live Preview desde el admin Payload (iframe ?preview=1)
  useEffect(() => {
    if (!isPreview || !liveData?.sections) return
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
