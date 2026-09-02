import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { Calendar, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCMS } from "@/context/CMSContext"
import { NewsSectionContent, NewsItem } from "@/types/cms"

const FeaturedNewsCard = ({ article }: { article: NewsItem }) => {
  const navigate = useNavigate()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <article
      className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-soft border border-surface-variant h-full cursor-pointer flex flex-col md:flex-row hover:shadow-ethereal transition-all duration-300"
      onClick={() => navigate(`/news/${article.id}`)}
    >
      <div className="absolute top-4 left-4 z-20 bg-secondary-fixed text-on-secondary-fixed-variant font-label-md text-xs px-3 py-1 uppercase tracking-widest rounded-full">
        Destacado
      </div>

      <div className="relative w-full md:w-1/2 h-56 md:h-auto overflow-hidden">
        <img
          src={article.media?.find(m => m.isMain)?.url || article.media?.[0]?.url || '/placeholder.png'}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>

      <div className="flex flex-col justify-center p-6 md:p-10 w-full md:w-1/2">
        <div className="flex items-center gap-3 text-xs font-label-md text-primary mb-4 uppercase tracking-wider">
          <span className="bg-primary-fixed/40 px-2 py-1 rounded-sm">{article.category}</span>
          <span className="text-on-surface-variant flex items-center gap-1 font-body normal-case tracking-normal">
            <Calendar className="w-3 h-3" /> {formatDate(article.date)}
          </span>
        </div>

        <h3
          className="text-2xl md:text-3xl font-heading text-on-surface mb-4 leading-tight group-hover:text-primary transition-colors text-balance"
          data-cms-field="newsItems.0.title"
        >
          {article.title}
        </h3>

        <p className="text-on-surface-variant font-body text-body-md leading-relaxed mb-6 line-clamp-3">
          {article.excerpt}
        </p>

        <span className="self-start text-primary font-label-md inline-flex items-center gap-2 group/btn">
          Leer artículo <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </span>
      </div>
    </article>
  )
}

const CompactNewsCard = ({ article, index }: { article: NewsItem; index: number }) => {
  const navigate = useNavigate()
  const animation = useScrollAnimation()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div
      ref={animation.ref}
      className={`transition-all duration-700 ${
        animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <button
        type="button"
        className="group flex gap-4 w-full text-left p-3 rounded-xl hover:bg-surface-container transition-all duration-300 items-start"
        onClick={() => navigate(`/news/${article.id}`)}
      >
        <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-lg relative">
          <img
            src={article.media?.find(m => m.isMain)?.url || article.media?.[0]?.url || '/placeholder.png'}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-label-md text-on-surface-variant mb-1 uppercase">
            <span className="text-primary">{article.category}</span>
            <span>•</span>
            <span className="normal-case tracking-normal font-body">{formatDate(article.date)}</span>
          </div>
          <h4
            className="text-base md:text-lg font-heading text-on-surface leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-2"
            data-cms-field={`newsItems.${index + 1}.title`}
          >
            {article.title}
          </h4>
          <span className="text-sm font-label-md text-primary inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Leer <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </button>
      {index < 2 && <div className="h-px bg-outline-variant/40 mx-3" />}
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
  const featuredArticle = articles[0]
  const recentArticles = articles.slice(1, 4)

  return (
    <section id="noticias" className="py-16 md:py-24 lg:py-section-gap px-margin-mobile lg:px-margin-desktop relative overflow-hidden bg-surface">
      <div className="max-w-container-max mx-auto relative z-10">
        <div
          ref={headerAnimation.ref}
          className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 transition-all duration-700 ${
            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl">
            <span className="text-primary font-label-md tracking-widest uppercase text-sm mb-2 block">
              Noticias
            </span>
            <h2
              className="text-headline-lg-mobile md:text-headline-lg font-heading text-on-surface leading-tight"
              data-cms-field="title"
            >
              {newsSection.title || "Últimas Noticias"}
            </h2>
            <p className="text-body-lg font-body text-on-surface-variant mt-4" data-cms-field="subtitle">
              {newsSection.subtitle}
            </p>
          </div>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/news')}
            className="hidden md:flex border border-outline-variant text-primary hover:bg-primary hover:text-on-primary transition-all font-label-md rounded-full px-6 bg-transparent"
          >
            Ver todas
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-7 xl:col-span-8">
            {featuredArticle ? (
              <FeaturedNewsCard article={featuredArticle} />
            ) : (
              <div className="h-full bg-surface-container rounded-2xl flex items-center justify-center p-12 text-on-surface-variant border border-surface-variant">
                No hay noticias destacadas.
              </div>
            )}
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              <h3 className="font-heading text-xl text-on-surface">Novedades</h3>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-3 border border-surface-variant shadow-soft flex flex-col gap-1 h-full">
              {recentArticles.length > 0 ? (
                recentArticles.map((article, index) => (
                  <CompactNewsCard key={article.id} article={article} index={index} />
                ))
              ) : (
                <p className="text-on-surface-variant text-sm p-4">Próximamente más novedades.</p>
              )}
            </div>
          </div>
        </div>

        <div className="text-center md:hidden">
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/news')}
            className="w-full border border-outline-variant text-primary hover:bg-primary hover:text-on-primary font-label-md rounded-full bg-transparent"
          >
            Ver todas las noticias
          </Button>
        </div>
      </div>
    </section>
  )
}
