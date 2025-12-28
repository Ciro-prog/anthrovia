import { useEffect } from "react"
import { useCMS } from "@/context/CMSContext"
import { NewsSectionContent, NewsItem } from "@/types/cms"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { getTextStyle } from "@/lib/utils"

const NewsCard = ({ article }: { article: NewsItem }) => {
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
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer" onClick={() => navigate(`/news/${article.id}`)}>
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
  )
}

export const NewsPage = () => {
  const { content } = useCMS()
  const navigate = useNavigate()
  
  const newsSection = content.sections.find(s => s.id === 'news') as NewsSectionContent
  const articles = newsSection?.newsItems || []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-transparent hover:text-primary p-0"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Inicio
        </Button>

        <div className="text-center mb-16">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={getTextStyle(newsSection?.titleColor || '#1f2937')}
          >
            {newsSection?.newsPageTitle || newsSection?.title || 'Noticias y Recursos'}
          </h1>
          <div 
            className="h-1 w-24 mx-auto mb-6 rounded-full"
            style={{ background: newsSection?.underlineColor || 'linear-gradient(to right, #e11d48, #9f1239)' }}
          ></div>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={getTextStyle(newsSection?.descriptionColor || '#4b5563')}
          >
            {newsSection?.newsPageSubtitle || newsSection?.subtitle || 'Explora todas nuestras publicaciones y recursos'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
