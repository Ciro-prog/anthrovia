import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { Calendar, User, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCMS } from "@/context/CMSContext"
import { NewsSectionContent, NewsItem } from "@/types/cms"

const NewsCard = ({ article, index }: { article: NewsItem; index: number }) => {
  const animation = useScrollAnimation()
  const navigate = useNavigate()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div
      ref={animation.ref}
      className={`transition-all duration-700 ${
        animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer" onClick={() => navigate(`/news/${article.id}`)}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.media?.find(m => m.isMain)?.url || article.media?.[0]?.url || '/placeholder.png'}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-primary to-accent-teal text-white px-3 py-1 rounded-full text-xs font-semibold">
              {article.category}
            </span>
          </div>
        </div>

          <CardHeader className="flex-grow">
          <CardTitle className="text-xl text-primary group-hover:text-accent-burgundy transition-colors line-clamp-2">
            {article.title}
          </CardTitle>
          <CardDescription className="text-gray-600 leading-relaxed">
            <p className="line-clamp-3">{article.excerpt}</p>
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
          </div>

          <Button
            variant="ghost"
            className="text-primary hover:text-accent-burgundy p-0 h-auto font-semibold group/btn w-full justify-start"
          >
            Leer más
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export const NewsSection = () => {
  const headerAnimation = useScrollAnimation()
  const navigate = useNavigate()
  const { content } = useCMS()
  
  const newsSection = content.sections.find(s => s.id === 'news') as NewsSectionContent
  
  if (!newsSection || !newsSection.isVisible) return null

  const articles = newsSection.newsItems || []
  const latestArticles = articles.slice(0, 3)

  return (
    <section id="noticias" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {newsSection.backgroundType === 'media' && newsSection.videoUrl ? (
          newsSection.videoUrl.match(/\.(mp4|webm|ogg)$/i) ? (
            <video
              className="w-full h-full object-cover opacity-20"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={newsSection.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <img 
              src={newsSection.videoUrl} 
              alt="Background" 
              className="w-full h-full object-cover opacity-20"
            />
          )
        ) : (
          <div 
            className="w-full h-full"
            style={{ background: newsSection.backgroundColor || '#ffffff' }}
          />
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-16 transition-all duration-700 ${
            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div 
            className="block w-full mb-4 px-6 py-2 shadow-lg backdrop-blur-sm rounded-xl"
            style={{ background: newsSection.headerBgColor || 'transparent' }}
          >
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: newsSection.titleColor || '#1f2937' }}
            >
              {newsSection.title}
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-accent-rose to-accent-burgundy mx-auto mb-6"></div>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: newsSection.descriptionColor || '#4b5563' }}
            >
              {newsSection.subtitle}
            </p>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestArticles.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/news')}
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
          >
            Ver todas las noticias
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
