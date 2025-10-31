import { Card, CardContent } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { Target, Eye, Award, Users, TrendingUp, Heart } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Compromiso",
    description: "Nos dedicamos completamente al éxito de nuestros clientes y sus equipos"
  },
  {
    icon: Award,
    title: "Excelencia",
    description: "Buscamos la calidad en cada proyecto y solución que desarrollamos"
  },
  {
    icon: Users,
    title: "Colaboración",
    description: "Trabajamos en conjunto para crear soluciones innovadoras y efectivas"
  },
  {
    icon: TrendingUp,
    title: "Innovación",
    description: "Adoptamos las últimas tendencias y tecnologías en gestión de talento"
  }
]

const stats = [
  { number: "500+", label: "Clientes Satisfechos" },
  { number: "15+", label: "Años de Experiencia" },
  { number: "50+", label: "Profesionales Certificados" },
  { number: "98%", label: "Satisfacción del Cliente" }
]

export const AboutSection = () => {
  const headerAnimation = useScrollAnimation()
  const contentAnimation = useScrollAnimation()
  const missionAnimation = useScrollAnimation()
  const visionAnimation = useScrollAnimation()
  const valuesAnimation = useScrollAnimation()
  const statsAnimation = useScrollAnimation()

  return (
    <section id="sobre-nosotros" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-16 transition-all duration-700 ${
            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Sobre Nosotros
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-rose to-accent-burgundy mx-auto mb-6"></div>
        </div>

        {/* Introduction */}
        <div
          ref={contentAnimation.ref}
          className={`max-w-4xl mx-auto mb-20 transition-all duration-700 ${
            contentAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-lg text-gray-600 text-center leading-relaxed mb-6">
            En <span className="font-bold text-primary">Anthrovia HR</span>, somos más que una consultora de recursos humanos.
            Somos tu aliado estratégico en la gestión y desarrollo del talento humano. Con sede en Mendoza, Argentina,
            ofrecemos soluciones integrales que transforman organizaciones y potencian equipos.
          </p>
          <p className="text-lg text-gray-600 text-center leading-relaxed">
            Nuestra experiencia y enfoque personalizado nos permite entender las necesidades únicas de cada organización,
            brindando servicios que van desde el reclutamiento hasta el desarrollo de liderazgo.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto">
          {/* Mission */}
          <div
            ref={missionAnimation.ref}
            className={`transition-all duration-700 ${
              missionAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <Card className="h-full border-2 border-primary/20 hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-accent-teal flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Nuestra Misión</h3>
                <p className="text-gray-600 leading-relaxed">
                  Potenciar el talento humano de las organizaciones mediante soluciones innovadoras
                  y personalizadas que generen impacto real en su cultura, productividad y crecimiento.
                  Nos comprometemos a ser el puente entre las empresas y el éxito de sus equipos.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Vision */}
          <div
            ref={visionAnimation.ref}
            className={`transition-all duration-700 ${
              visionAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <Card className="h-full border-2 border-accent-teal/20 hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent-teal to-primary-light flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Nuestra Visión</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ser la consultora de recursos humanos líder en Argentina, reconocida por transformar
                  organizaciones a través de estrategias innovadoras en gestión del talento. Aspiramos a
                  crear entornos laborales donde cada persona alcance su máximo potencial.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values */}
        <div
          ref={valuesAnimation.ref}
          className={`mb-20 transition-all duration-700 ${
            valuesAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-3xl font-bold text-primary text-center mb-12">
            Nuestros Valores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent-teal flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h4 className="font-bold text-lg text-primary mb-2">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsAnimation.ref}
          className={`transition-all duration-700 ${
            statsAnimation.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="bg-gradient-to-r from-primary via-accent-teal to-primary-light rounded-2xl p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center text-white">
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base opacity-90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
