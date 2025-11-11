import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import {
  Users,
  Settings,
  Heart,
  GraduationCap,
  Layers,
  FileSearch,
  type LucideIcon
} from "lucide-react"

const services = [
  {
    icon: FileSearch,
    title: "Asesorías iniciales",
    description: "Diagnóstico estratégico rápido que identifica prioridades y propone una hoja de ruta práctica para gestionar talento y procesos.",
    color: "from-primary to-accent-teal"
  },
  {
    icon: Users,
    title: "Reclutamiento y Selección Estratégica por Competencias",
    description: "Identificamos, evaluamos y atraemos el mejor talento para tu organización mediante procesos estructurados y evaluaciones especializadas, asegurando incorporaciones alineadas a la cultura, los valores y los resultados del negocio.",
    color: "from-accent-teal to-primary-light"
  },
  {
    icon: Settings,
    title: "Diseño y Optimización de Procesos de RRHH",
    description: "Análisis y rediseño de los procesos clave del área con foco en la eficiencia, la trazabilidad y la experiencia del colaborador. Se aplican metodologías ágiles y herramientas digitales para simplificar tareas operativas, generar control de indicadores y fortalecer la toma de decisiones.",
    color: "from-primary-light to-accent-rose"
  },
  {
    icon: Heart,
    title: "Programas de Experiencia y Bienestar",
    description: "Desarrollamos estrategias que fortalecen la conexión entre las personas y la organización, integrando acciones de reconocimiento, bienestar físico y emocional, y salario emocional adaptadas a cada cultura. Nuestro enfoque impulsa el compromiso, la motivación y una experiencia laboral significativa.",
    color: "from-accent-rose to-accent-burgundy"
  },
  {
    icon: GraduationCap,
    title: "Capacitación y Entrenamiento",
    description: "Elaboración de programas de formación personalizados para potenciar las competencias individuales y colectivas. Se desarrollan capacitaciones presenciales, virtuales o híbridas, alineadas a las necesidades reales del negocio y orientadas a resultados medibles.",
    color: "from-primary to-primary-light"
  },
  {
    icon: Layers,
    title: "Servicios complementarios",
    description: "Asesoría legal laboral, Compensaciones y beneficios, Administración de nómina, Employer Branding, y Análisis y métricas HR (People Analytics). Disponibles próximamente.",
    color: "from-accent-burgundy to-accent-teal"
  }
]

interface ServiceCardProps {
  service: typeof services[0]
  Icon: LucideIcon
  index: number
}

const ServiceCard = ({ service, Icon, index }: ServiceCardProps) => {
  const animation = useScrollAnimation()

  return (
    <div
      ref={animation.ref}
      className={`transition-all duration-700 ${
        animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 overflow-hidden h-full">
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
    </div>
  )
}

export const ServicesSection = () => {
  const headerAnimation = useScrollAnimation()
  const ctaAnimation = useScrollAnimation()

  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-16 transition-all duration-700 ${
            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Nuestros servicios
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-rose to-accent-burgundy mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Diseñamos soluciones a medida que conectan estrategia, personas y cultura. Acompañamos a las organizaciones en cada etapa de su evolución, impulsando procesos más eficientes y experiencias laborales con propósito.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <ServiceCard
                key={index}
                service={service}
                Icon={Icon}
                index={index}
              />
            )
          })}
        </div>

        {/* CTA Section */}
        <div
          ref={ctaAnimation.ref}
          className={`mt-16 text-center transition-all duration-700 ${
            ctaAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gradient-to-r from-primary via-accent-teal to-primary-light rounded-2xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para potenciar tu talento?
            </h3>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Descubre cómo podemos ayudarte a alcanzar tus objetivos organizacionales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto"
              >
                <a href="#contacto">Contáctanos</a>
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
