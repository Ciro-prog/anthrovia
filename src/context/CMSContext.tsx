import React, { createContext, useContext, useState, useEffect } from 'react'
import { SiteContent, SectionContent } from '../types/cms'
import { initialContent } from '../data/initialContent'
import { coursesData } from '../data/coursesContent'
import { fetchSiteContent } from '../lib/cmsApi'

interface CMSContextType {
  content: SiteContent
  updateSection: (sectionId: string, newContent: Partial<SectionContent>) => void
  saveContent: () => Promise<void>
  isLoading: boolean
  cmsOnline: boolean
}

export const CMSContext = createContext<CMSContextType | undefined>(undefined)

const fallbackContent: SiteContent = {
  sections: initialContent.sections.map((s) =>
    s.type === 'courses' ? { ...s, courses: s.courses?.length ? s.courses : coursesData } : s
  ),
}

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(fallbackContent)
  const [isLoading, setIsLoading] = useState(true)
  const [cmsOnline, setCmsOnline] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setIsLoading(true)
      try {
        const remote = await fetchSiteContent()
        if (!cancelled) {
          setContent(remote)
          setCmsOnline(Boolean(import.meta.env.VITE_CMS_URL))
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
  }, [])

  const updateSection = (sectionId: string, newContent: Partial<SectionContent>) => {
    setContent((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? ({ ...section, ...newContent } as SectionContent) : section
      ),
    }))
  }

  const saveContent = async () => {
    console.warn('El guardado se hace desde el panel admin del CMS (puerto 60518).')
  }

  return (
    <CMSContext.Provider value={{ content, updateSection, saveContent, isLoading, cmsOnline }}>
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
