import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { PostsSection } from '@/components/PostsSection';
import { NewsSection } from '@/components/NewsSection';
import { NewsPage } from '@/pages/NewsPage';
import { NewsDetailContent } from '@/pages/NewsDetailPage';
import { SiteContent } from '@/types/cms';
import { CMSContext } from '@/context/CMSContext';
import { initialContent } from '@/data/initialContent';

export const PreviewPage = () => {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('section');
  const view = searchParams.get('view');
  const articleId = searchParams.get('articleId');

  useEffect(() => {
    // Listen for messages from the admin panel
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'cms-update') {
        setContent(event.data.content);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Notify parent that we are ready
    window.parent.postMessage({ type: 'preview-ready' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Mock the context for the previewed components
  const mockContextValue = {
    content,
    updateSection: () => {},
    saveContent: async () => {},
    isLoading: false
  };

  const renderSection = () => {
    if (!sectionId) {
      // Render full page if no specific section requested
      return (
        <div className="font-sans antialiased text-gray-900 bg-white">
           {content.sections.map(section => {
             if (!section.isVisible) return null;
             switch (section.type) {
               case 'hero': return <HeroSection key={section.id} />;
               case 'services': return <ServicesSection key={section.id} />;
               case 'about': return <AboutSection key={section.id} />;
               case 'contact': return <ContactSection key={section.id} />;
               case 'posts': return <PostsSection key={section.id} />;
               case 'news': return <NewsSection key={section.id} />;
               default: return null;
             }
           })}
        </div>
      );
    }

    // Render specific section
    const section = content.sections.find(s => s.id === sectionId);
    if (!section || !section.isVisible) return <div>Section hidden or not found</div>;

    switch (section.type) {
      case 'hero': return <HeroSection />;
      case 'services': return <ServicesSection />;
      case 'about': return <AboutSection />;
      case 'contact': return <ContactSection />;
      case 'posts': return <PostsSection />;
      case 'news':
        if (view === 'page') return <NewsPage />;
        if (view === 'items' && articleId) return <NewsDetailContent articleId={articleId} />;
        if (view === 'items') return <NewsPage />; // Fallback to list if no article selected
        return <NewsSection />; // Default to home section view
      default: return <div>Unknown section type</div>;
    }
  };

  return (
    <CMSContext.Provider value={mockContextValue}>
      {renderSection()}
    </CMSContext.Provider>
  );
};
