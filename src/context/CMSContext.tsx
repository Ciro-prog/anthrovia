import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, SectionContent } from '../types/cms';
import { initialContent } from '../data/initialContent';
// import { supabase } from '../lib/supabase';

interface CMSContextType {
  content: SiteContent;
  updateSection: (sectionId: string, newContent: Partial<SectionContent>) => void;
  saveContent: () => Promise<void>;
  isLoading: boolean;
}

export const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(initialContent);
  // const [isLoading, setIsLoading] = useState(false);

  // Load from Supabase on mount (DISABLED for now to avoid fetch errors)
  useEffect(() => {
    /*
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('sections')
          .select('*');

        if (error) {
          console.error('Error fetching content:', error);
          return;
        }

        if (data && data.length > 0) {
          const sections = data.map(row => row.content as SectionContent);
          const mergedSections = initialContent.sections.map(initSection => {
            const dbSection = sections.find(s => s.id === initSection.id);
            return dbSection || initSection;
          });
          setContent({ sections: mergedSections });
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
    */
  }, []);

  const updateSection = (sectionId: string, newContent: Partial<SectionContent>) => {
    setContent(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId ? { ...section, ...newContent } as SectionContent : section
      )
    }));
  };

  const saveContent = async () => {
    console.warn("Save functionality is disabled as Supabase integration is inactive.");
    alert("Funcionalidad de guardado desactivada temporalmente.");
    /*
    setIsLoading(true);
    try {
      const updates = content.sections.map(section => {
        return supabase
          .from('sections')
          .upsert({ 
            id: section.id, 
            type: section.type,
            content: section,
            updated_at: new Date().toISOString()
          });
      });

      await Promise.all(updates);
      alert("Contenido guardado en Supabase!");
    } catch (err) {
      console.error('Error saving content:', err);
      alert("Error al guardar.");
    } finally {
      setIsLoading(false);
    }
    */
  };

  return (
    <CMSContext.Provider value={{ content, updateSection, saveContent, isLoading: false }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
