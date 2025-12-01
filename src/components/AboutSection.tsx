import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Target, Users, TrendingUp, Heart, ShieldCheck, Sparkles, Compass } from "lucide-react"

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
  return (
    <section id="sobre-nosotros" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
      >
        <source src="/bg-mov-1.mp4" type="video/mp4" />
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/90 -z-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 bg-primary py-8 rounded-2xl shadow-lg max-w-full"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sobre Nosotros
          </h2>
          <div className="h-1 w-24 bg-white/50 mx-auto mb-6"></div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <p className="text-lg text-gray-600 text-center leading-relaxed mb-6">
            En <span className="font-bold text-primary">Anthrovia HR</span> somos tu aliado estratégico en la gestión y desarrollo del talento. Diseñamos soluciones integrales y a medida que transforman organizaciones y maximizan el potencial de los equipos. Como consultora digital, acompañamos a personas y organizaciones sin límites geográficos, adaptándonos a cada cultura y necesidad.
            </p>
          <p className="text-lg text-gray-600 text-center leading-relaxed">
            El nombre <span className="font-bold text-primary">Anthrovia</span> combina <em>"anthro"</em> (persona) y <em>"via"</em> (camino):
            representa nuestra visión práctica y estratégica del talento — un camino claro para que las personas y las organizaciones crezcan juntas.
            Trabajamos con metodologías probadas, entregables accionables y foco humano, para lograr resultados sostenibles y medibles.
          </p>
        </motion.div>

        {/* Purpose & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto">
          {/* Purpose */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-2 border-accent-teal/20 hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent-teal to-primary-light flex items-center justify-center mb-6">
                  <Compass className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Nuestro Propósito</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ser el puente que impulsa la evolución del talento y el desarrollo integral de las organizaciones.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-primary text-center mb-4">
              Nuestros Valores
            </h3>
            <div className="w-full h-1 bg-primary rounded-full opacity-80"></div>
          </div>
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
        </motion.div>
      </div>
    </section>
  )
}
