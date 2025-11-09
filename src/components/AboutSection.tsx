import { Card, CardContent } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { Target, Users, TrendingUp, Heart, ShieldCheck, Sparkles } from "lucide-react"

const values = [
  {
    icon: ShieldCheck,
    title: "Integridad",
    description: "Actuamos con ética, respeto y coherencia en cada acción"
  },
  {
    icon: Heart,
    title: "Compromiso",
    description: "Nos dedicamos completamente al éxito de nuestros clientes y sus equipos"
  },
  {
    icon: Users,
    title: "Colaboración",
    description: "Trabajamos en conjunto para crear soluciones innovadoras y efectivas"
  },
  {
    icon: Sparkles,
    title: "Sinergia",
    description: "Conectamos personas, ideas y propósitos para lograr resultados compartidos"
  },
  {
    icon: TrendingUp,
    title: "Innovación",
    description: "Adoptamos nuevas tendencias, tecnologías y metodologías en gestión de talento"
  }
]

export const AboutSection = () => {
  const headerAnimation = useScrollAnimation()
  const contentAnimation = useScrollAnimation()
  const missionAnimation = useScrollAnimation()
  const visionAnimation = useScrollAnimation()
  const valuesAnimation = useScrollAnimation()

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
            En <span className="font-bold text-primary">Anthrovia HR</span> somos tu aliado estratégico en la gestión y desarrollo del talento.
            Con sede en Argentina, diseñamos soluciones integrales y a medida que transforman organizaciones y maximizan el potencial de los equipos.
          </p>
          <p className="text-lg text-gray-600 text-center leading-relaxed">
            El nombre <span className="font-bold text-primary">Anthrovia</span> combina <em>"anthro"</em> (persona) y <em>"via"</em> (camino):
            representa nuestra visión práctica y estratégica del talento — un camino claro para que las personas y las organizaciones crezcan juntas.
            Trabajamos con metodologías probadas, entregables accionables y foco humano, para lograr resultados sostenibles y medibles.
          </p>
        </div>

        {/* Purpose & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto">
          {/* Purpose */}
          <div
            ref={missionAnimation.ref}
            className={`transition-all duration-700 ${
              missionAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <Card className="h-full border-2 border-accent-teal/20 hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent-teal to-primary-light flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Nuestro Propósito</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ser el puente que impulsa la evolución del talento y el desarrollo integral de las organizaciones.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Mission */}
          <div
            ref={visionAnimation.ref}
            className={`transition-all duration-700 ${
              visionAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
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
      </div>
    </section>
  )
}
