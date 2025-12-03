import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, X } from "lucide-react"
import { NewsItem } from "@/types/cms"

interface AllNewsProps {
  articles: NewsItem[]
  onClose: () => void
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function AllNews({ articles, onClose }: AllNewsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/40">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-auto max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-2xl font-bold">Todas las noticias</h3>
          <Button variant="ghost" onClick={onClose} aria-label="Cerrar">
            <X />
          </Button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => {
            const isExpanded = expandedId === article.id
            return (
              <Card key={article.id} className="flex flex-col">
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={article.media?.[0]?.url || ''} 
                    alt={article.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-primary to-accent-teal text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {!isExpanded ? (
                      <p className="line-clamp-3">{article.excerpt}</p>
                    ) : (
                      <p className="whitespace-pre-line">{article.content || article.excerpt}</p>
                    )}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                    </div>

                    <div>
                      <Button variant="secondary" onClick={() => setExpandedId(isExpanded ? null : article.id)}>
                        {isExpanded ? "Ver menos" : "Leer más"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
