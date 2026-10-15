import { useState, useEffect } from "react"
import { useCMS } from "@/context/CMSContext"
import { NewsSectionContent, Attachment } from "@/types/cms"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, FileText, FileSpreadsheet, Image as ImageIcon, Link as LinkIcon, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"

export const NewsDetailContent = ({ articleId }: { articleId?: string }) => {
  const { content, isLoading, cmsError } = useCMS()
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [articleId])
  
  const newsSection = content.sections.find(s => s.id === 'news') as NewsSectionContent
  const article = newsSection?.newsItems.find(item => item.id === articleId)

  if (!article) {
    const message = isLoading
      ? 'Cargando la noticia…'
      : cmsError
        ? 'No pudimos cargar esta noticia. Probá de nuevo en unos minutos.'
        : 'Noticia no encontrada'
    return (
      <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-heading text-2xl text-on-surface mb-4">{message}</h1>
          <Button onClick={() => navigate('/news')}>Volver a Noticias</Button>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getIcon = (type: Attachment['type']) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'excel': return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      case 'image': return <ImageIcon className="w-5 h-5 text-blue-500" />;
      default: return <LinkIcon className="w-5 h-5 text-on-surface-variant" />;
    }
  };

  const mediaList = article.media || [];
  const hasMultipleMedia = mediaList.length > 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mediaList.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mediaList.length) % mediaList.length);
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Handle ## Headings
      const headingMatch = line.match(/^##\s+(.+)/);
      if (headingMatch) {
        return (
          <h3 key={index} className="text-2xl font-bold text-primary mt-12 mb-6 border-l-4 border-primary pl-4 tracking-tight">
            {headingMatch[1]}
          </h3>
        );
      }

      // Handle Numbered Lists (1. Item)
      const listMatch = line.match(/^(\d+)\.\s+(.+)/);
      if (listMatch) {
         return (
           <div key={index} className="flex gap-4 mb-6 ml-2 md:ml-4 group">
             <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors">
               {listMatch[1]}
             </span>
             <p className="font-body text-lg text-on-surface-variant leading-relaxed pt-0.5">
               {listMatch[2].split('**').map((part, i) => 
                 i % 2 === 1 ? <strong key={i} className="text-primary font-semibold">{part}</strong> : part
               )}
             </p>
           </div>
         )
      }

      if (line.trim() === '') return <div key={index} className="h-4" />;

      // Standard paragraphs with basic bold support
      return (
        <p key={index} className="mb-6 leading-relaxed text-on-surface-variant font-body text-lg">
          {line.split('**').map((part, i) => 
            i % 2 === 1 ? <strong key={i} className="text-primary font-semibold">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/news')}
          className="mb-8 hover:bg-transparent hover:text-primary p-0"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Noticias
        </Button>

        <article className="max-w-4xl mx-auto bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden border border-outline-variant/30">
          {/* ... carousel code ... */}
          <div className="relative h-[400px] md:h-[500px] bg-black group">
            {mediaList.length > 0 ? (
              <>
                {mediaList[currentSlide].type === 'video' ? (
                  <video 
                    src={mediaList[currentSlide].url} 
                    controls 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img 
                    src={mediaList[currentSlide].url} 
                    alt={article.title} 
                    className="w-full h-full object-contain"
                  />
                )}
                
                {hasMultipleMedia && (
                  <>
                    <button 
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {mediaList.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                Sin imagen
              </div>
            )}
          </div>

          <div className="p-8 md:p-12 relative">
             <div className="mb-8 border-b pb-8">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                {article.category}
              </span>
              <h1 className="font-heading text-3xl md:text-5xl mb-6 leading-tight text-on-surface tracking-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-6 text-on-surface-variant font-body">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary/60" />
                  <span>{formatDate(article.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary/60" />
                  <span>{article.author}</span>
                </div>
              </div>
            </div>

            <div className="max-w-none text-on-surface mb-8">
              {renderContent(article.content || article.excerpt)}
            </div>

            {article.citation && (
              <div className="mb-12 pt-8 border-t border-gray-100 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-primary" />
                <p className="text-sm text-on-surface-variant italic font-body">
                  Fuente: <a 
                    href={article.citation} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    {article.citation.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                  </a>
                </p>
              </div>
            )}

            {article.attachments && article.attachments.length > 0 && (
              <div className="border-t pt-8">
                <h3 className="font-heading text-xl text-on-surface mb-6 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Recursos Descargables
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {article.attachments.map((attachment) => (
                    <Card key={attachment.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="p-2 bg-surface-container rounded-lg">
                            {getIcon(attachment.type)}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium text-on-surface truncate" title={attachment.name}>
                              {attachment.name}
                            </span>
                            <span className="text-xs text-on-surface-variant uppercase">{attachment.type}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                            Descargar
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}

export const NewsDetailPage = () => {
  const { id } = useParams()
  return <NewsDetailContent articleId={id} />
}
