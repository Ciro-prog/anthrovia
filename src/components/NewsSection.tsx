import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { Calendar, User, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCMS } from "@/context/CMSContext"
import { NewsSectionContent, NewsItem } from "@/types/cms"
import { motion } from "framer-motion"

// --- Components ---

const GeometricBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1440 560" className="w-full h-full object-cover">
            <g fill="none">
                {/* Background: Accent Wine / Deep Burgundy */}
                <rect width="1440" height="560" x="0" y="0" fill="#6B2A41"></rect>
                
                {/* Network Lines - Softened for Wine Background (Gold/Peach tint) */}
                <g stroke="#C79F93" strokeWidth="0.8" opacity="0.3">
                    <path d="M-77.8 411.28L-77.8 411.28"></path>
                    <path d="M-77.8 411.28L103.88 408.72"></path>
                    <path d="M-77.8 411.28L97.57 501.25"></path>
                    <path d="M103.88 408.72L224.12 360.17"></path>
                    <path d="M103.88 408.72L241.14 518.05"></path>
                    <path d="M97.57 501.25L241.14 518.05"></path>
                    <path d="M97.57 501.25L224.12 360.17"></path>
                    <path d="M224.12 360.17L357.34 391.22"></path>
                    <path d="M224.12 360.17L241.14 518.05"></path>
                    <path d="M357.34 391.22L373.74 542.99"></path>
                    <path d="M357.34 391.22L241.14 518.05"></path>
                    <path d="M357.34 391.22L533.03 349.49"></path>
                    <path d="M357.34 391.22L514.46 511.16"></path>
                    <path d="M533.03 349.49L705.72 373.41"></path>
                    <path d="M533.03 349.49L373.74 542.99"></path>
                    <path d="M705.72 373.41L852.03 366.79"></path>
                    <path d="M705.72 373.41L813.5 489.21"></path>
                    <path d="M705.72 373.41L789.85 229.76"></path>
                    <path d="M705.72 373.41L958.26 496.57"></path>
                    <path d="M852.03 366.79L813.5 489.21"></path>
                    <path d="M813.5 489.21L958.26 496.57"></path>
                    <path d="M961.13 244.08L989.48 363.13"></path>
                    <path d="M961.13 244.08L1118.18 211.41"></path>
                    <path d="M961.13 244.08L852.03 366.79"></path>
                    <path d="M961.13 244.08L1100.82 351.71"></path>
                    <path d="M989.48 363.13L1100.82 351.71"></path>
                    <path d="M989.48 363.13L958.26 496.57"></path>
                    <path d="M1100.82 351.71L1294.35 399.31"></path>
                    <path d="M1141.34 65.78L1118.18 211.41"></path>
                    <path d="M1286.86 65.74L1428.02 90.06"></path>
                </g>

                {/* Highlight Lines - Gold */}
                 <g stroke="#D4A74A" strokeWidth="1.5" opacity="0.6">
                    <path d="M101.14 537.15L209.48 555.31"></path>
                    <path d="M489.07 492.84L648.07 557.9"></path>
                    <path d="M944.57 498.61L960.81 377.2"></path>
                    <path d="M1160.19 671.78L1253.73 502.74"></path>
                    <path d="M1432.75 526.09L1583.26 554.07"></path>
                    <path d="M1561.65 -111.49L1584.78 213.25"></path>
                </g>

                {/* Dots - Peach/Secondary */}
                <g fill="#C79F93">
                     <circle r="3" cx="103.88" cy="408.72"></circle>
                     <circle r="3" cx="224.12" cy="360.17"></circle>
                     <circle r="3" cx="357.34" cy="391.22"></circle>
                     <circle r="3" cx="533.03" cy="349.49"></circle>
                     <circle r="3" cx="705.72" cy="373.41"></circle>
                     <circle r="3" cx="852.03" cy="366.79"></circle>
                     <circle r="3" cx="961.13" cy="244.08"></circle>
                     <circle r="3" cx="1118.18" cy="211.41"></circle>
                     <circle r="3" cx="1294.35" cy="399.31"></circle>
                </g>
                
                {/* Glowing Nodes - Radial Gradient (Gold) */}
                 <defs>
                    <radialGradient id="nodeGlow">
                        <stop stopColor="#D4A74A" offset="0.1"></stop>
                        <stop stopColor="rgba(212, 167, 74, 0)" offset="1"></stop>
                    </radialGradient>
                </defs>
                <circle r="15" cx="489.07" cy="492.84" fill="url(#nodeGlow)"></circle>
                <circle r="15" cx="944.57" cy="498.61" fill="url(#nodeGlow)"></circle>
                <circle r="15" cx="1253.73" cy="502.74" fill="url(#nodeGlow)"></circle>
            </g>
        </svg>
    </div>
)

const FeaturedNewsCard = ({ article }: { article: NewsItem }) => {
    const navigate = useNavigate()
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    return (
        <Card className="group relative border-none bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl h-full cursor-pointer flex flex-col md:flex-row hover:bg-white/10 transition-all duration-300" onClick={() => navigate(`/news/${article.id}`)}>
             {/* Decorative Tape */}
             <div className="absolute top-6 left-6 z-20 bg-accent-gold hover:bg-white hover:text-accent-wine text-accent-wine font-bold text-xs px-3 py-1 uppercase tracking-widest transform -rotate-2 shadow-sm transition-colors">
                Destacado
             </div>

            {/* Image Side */}
             <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img
                    src={article.media?.find(m => m.isMain)?.url || article.media?.[0]?.url || '/placeholder.png'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent-wine/90 to-transparent md:bg-gradient-to-r md:from-transparent md:to-accent-wine/50 mix-blend-multiply"></div>
            </div>

            {/* Content Side */}
            <div className="flex flex-col justify-center p-8 md:p-12 w-full md:w-1/2 relative">
                 <div className="flex items-center gap-3 text-xs font-cta font-bold text-accent-gold mb-4 uppercase tracking-wider">
                     <span className="bg-white/10 px-2 py-1 rounded-sm">{article.category}</span>
                     <span className="text-white/60 flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(article.date)}</span>
                 </div>

                 <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 leading-tight group-hover:text-accent-gold transition-colors text-balance">
                     {article.title}
                 </h3>

                 <p className="text-white/80 font-body text-lg leading-relaxed mb-8 line-clamp-3">
                     {article.excerpt}
                 </p>

                 <Button
                    variant="link"
                    className="self-start text-accent-gold font-cta font-bold p-0 text-lg hover:text-white hover:no-underline group/btn"
                 >
                    Leer Artículo Completo <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                 </Button>
            </div>
        </Card>
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
                animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
             <div className="group flex gap-4 cursor-pointer hover:bg-white/10 p-4 rounded-xl transition-all duration-300 border border-transparent hover:border-white/10 items-start" onClick={() => navigate(`/news/${article.id}`)}>
                 {/* Thumbnail */}
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-lg relative">
                    <img
                        src={article.media?.find(m => m.isMain)?.url || article.media?.[0]?.url || '/placeholder.png'}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between h-full">
                     <div className="flex items-center gap-2 text-[10px] sm:text-xs font-cta font-bold text-white/50 mb-1 uppercase">
                         <span className="text-accent-gold">{article.category}</span>
                         <span>•</span>
                         <span>{formatDate(article.date)}</span>
                     </div>
                    <h4 className="text-lg font-heading font-bold text-white leading-snug group-hover:text-accent-gold transition-colors mb-2 line-clamp-2">
                        {article.title}
                    </h4>
                    <span className="text-sm font-cta font-bold text-white/80 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Leer <ArrowRight className="w-3 h-3" />
                    </span>
                </div>
             </div>
             {index < 2 && <div className="h-px bg-white/10 mt-4 mx-4" />}
        </div>
    )
}

// --- Main Section ---

export const NewsSection = () => {
  const headerAnimation = useScrollAnimation()
  const navigate = useNavigate()
  const { content } = useCMS()
  
  const newsSection = content.sections.find(s => s.id === 'news') as NewsSectionContent
  
  if (!newsSection || !newsSection.isVisible) return null

  const articles = newsSection.newsItems || []
  const featuredArticle = articles[0]
  const recentArticles = articles.slice(1, 4) // Next 3 articles

  return (
    <section id="noticias" className="py-24 relative overflow-hidden bg-accent-wine">
      {/* Background */}
      <GeometricBackground />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          ref={headerAnimation.ref}
          className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 transition-all duration-700 ${
            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-2xl">
              <span className="text-accent-gold font-cta font-bold tracking-widest uppercase text-sm mb-2 block">Actualidad Anthrovia</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
              {newsSection.title}
            </h2>
             <p className="text-xl font-body text-white/80 mt-4">
                {newsSection.subtitle}
             </p>
          </div>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/news')}
            className="hidden md:flex border-2 border-white/20 text-white hover:bg-white hover:text-accent-wine transition-all font-cta font-bold rounded-xl px-6 bg-transparent"
          >
            Ver Todas las Noticias
          </Button>
        </div>

        {/* Magazine Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* Featured Article (Left - Larger) */}
            <div className="lg:col-span-7 xl:col-span-8">
                {featuredArticle ? (
                   <FeaturedNewsCard article={featuredArticle} />
                ) : (
                    <div className="h-full bg-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center p-12 text-white/50 border border-white/10">
                        No hay noticias destacadas.
                    </div>
                )}
            </div>

            {/* Recent List (Right - Sidebar) */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
                 <div className="flex items-center gap-2 mb-2">
                    <span className="w-1 h-6 bg-accent-gold rounded-full"></span>
                    <h3 className="font-heading font-bold text-xl text-white">Más Recientes</h3>
                 </div>
                 
                 <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg flex flex-col gap-2 h-full">
                    {recentArticles.length > 0 ? (
                        recentArticles.map((article, index) => (
                            <CompactNewsCard key={article.id} article={article} index={index} />
                        ))
                    ) : (
                        <p className="text-white/50 text-sm p-4">Próximamente más novedades.</p>
                    )}
                 </div>
            </div>
        </div>
        
        {/* Mobile View All Button */}
        <div className="text-center md:hidden">
            <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/news')}
            className="w-full border-2 border-white/20 text-white hover:bg-white hover:text-accent-wine transition-all font-cta font-bold rounded-xl bg-transparent"
            >
            Ver Todas las Noticias
            </Button>
        </div>
      </div>
    </section>
  )
}
