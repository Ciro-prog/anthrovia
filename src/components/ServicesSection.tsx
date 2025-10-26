import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  TrendingUp,
  Award,
  BookOpen,
  Target,
  Briefcase,
  UserCheck,
  LineChart,
  GraduationCap
} from "lucide-react"

const services = [
  {
    icon: Users,
    title: "Reclutamiento y Selección",
    description: "Identificamos y atraemos el mejor talento para tu organización mediante procesos estructurados y evaluaciones especializadas.",
    color: "from-primary to-accent-teal"
  },
  {
    icon: TrendingUp,
    title: "Consultoría Organizacional",
    description: "Optimizamos la estructura y procesos de tu empresa para mejorar la eficiencia operativa y el clima laboral.",
    color: "from-accent-teal to-primary-light"
  },
  {
    icon: Award,
    title: "Evaluación de Desempeño",
    description: "Implementamos sistemas de evaluación que impulsan el desarrollo profesional y alinean objetivos individuales con metas organizacionales.",
    color: "from-primary-light to-accent-rose"
  },
  {
    icon: BookOpen,
    title: "Capacitación y Desarrollo",
    description: "Diseñamos programas de formación personalizados para potenciar las competencias de tu equipo.",
    color: "from-accent-rose to-accent-burgundy"
  },
  {
    icon: Target,
    title: "Gestión del Cambio",
    description: "Acompañamos a tu organización en procesos de transformación, asegurando una transición exitosa y sostenible.",
    color: "from-primary to-primary-light"
  },
  {
    icon: Briefcase,
    title: "Administración de Nómina",
    description: "Gestionamos de manera eficiente y precisa todos los aspectos relacionados con la compensación de tu personal.",
    color: "from-accent-burgundy to-accent-teal"
  },
  {
    icon: UserCheck,
    title: "Onboarding y Cultura",
    description: "Facilitamos la integración de nuevos colaboradores y fortalecemos la cultura organizacional.",
    color: "from-accent-teal to-primary"
  },
  {
    icon: LineChart,
    title: "Análisis y Métricas HR",
    description: "Transformamos datos en insights estratégicos para la toma de decisiones basada en evidencia.",
    color: "from-primary-light to-accent-rose"
  },
  {
    icon: GraduationCap,
    title: "Desarrollo de Liderazgo",
    description: "Formamos líderes capaces de inspirar equipos y conducir a tu organización hacia el éxito.",
    color: "from-accent-rose to-primary"
  }
]

export const ServicesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Nuestros Servicios
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-rose to-accent-burgundy mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Soluciones integrales de recursos humanos adaptadas a las necesidades
            específicas de tu organización
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 overflow-hidden"
              >
                {/* Gradient header */}
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>

                <CardHeader>
                  <div className="mb-4">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-primary group-hover:text-accent-burgundy transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>

                  <Button
                    variant="ghost"
                    className="mt-4 text-primary hover:text-accent-burgundy p-0 h-auto font-semibold group/btn"
                  >
                    Conoce más
                    <span className="ml-2 group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary via-accent-teal to-primary-light rounded-2xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para potenciar tu talento?
            </h3>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Agenda una consultoría gratuita y descubre cómo podemos ayudarte a
              alcanzar tus objetivos organizacionales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto"
              >
                Agendar consultoría
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
              >
                Descargar brochure
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
