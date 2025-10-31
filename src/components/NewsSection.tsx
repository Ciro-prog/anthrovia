import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { Calendar, User, ArrowRight } from "lucide-react"
import newsData from "@/data/news.json"

interface NewsArticle {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  author: string
}

const NewsCard = ({ article, index }: { article: NewsArticle; index: number }) => {
  const animation = useScrollAnimation()

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
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.image}
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
          <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">
            {article.excerpt}
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
  const articles = newsData as NewsArticle[]
  // Mostrar solo las 3 noticias más recientes
  const latestArticles = articles.slice(0, 3)

  return (
    <section id="noticias" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-16 transition-all duration-700 ${
            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Noticias y Recursos
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-rose to-accent-burgundy mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mantente actualizado con las últimas tendencias, mejores prácticas y
            consejos expertos en gestión de recursos humanos
          </p>
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
