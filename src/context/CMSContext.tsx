import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, SectionContent } from '../types/cms';
import { initialContent } from '../data/initialContent';
import { supabase } from '../lib/supabase';

interface CMSContextType {
  content: SiteContent;
  updateSection: (sectionId: string, newContent: Partial<SectionContent>) => void;
  saveContent: () => void;
  isLoading: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [isLoading, setIsLoading] = useState(false);

  // Load from Supabase on mount
  useEffect(() => {
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
          // Map the rows back to our SiteContent structure
          const sections = data.map(row => row.content as SectionContent);
          
          // Merge with initial content to ensure we have all sections even if DB is partial
          // This is a simple merge strategy: DB wins if exists
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
    setIsLoading(true);
    try {
      // Upsert each section to Supabase
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
  };

  return (
    <CMSContext.Provider value={{ content, updateSection, saveContent, isLoading }}>
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
