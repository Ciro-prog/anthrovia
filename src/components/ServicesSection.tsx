import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  Users,
  Settings,
  Heart,
  Layers,
  FileSearch,
  GraduationCap,
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
    description: "Desarrollamos programas que fortalecen la conexión entre las personas y su entorno laboral, integrando acciones de reconocimiento, bienestar integral y propuestas de salario emocional adaptadas a cada cultura organizacional. Nuestro enfoque impulsa el compromiso, promueve la motivación y genera experiencias laborales más significativas.",
    color: "from-accent-rose to-accent-burgundy"
  },
   {
     icon: GraduationCap,
     title: "Career Coaching & Desarrollo Profesional",
     description: "Brindamos acompañamiento personalizado para impulsar tu empleabilidad: optimizamos tu CV, potenciamos tu perfil de LinkedIn y te preparamos para entrevistas laborales con técnicas y estrategias actuales del mercado. Un enfoque práctico, claro y orientado a que te postules con seguridad y destaques en cada proceso.",
     color: "from-primary to-primary-light"
   },
  {
    icon: Layers,
    title: "Servicios complementarios",
    description: "Asesoría legal laboral, Compensaciones y beneficios, Administración de nómina, Employer Branding y People Analytics. (Disponibles próximamente.)",
    color: "from-accent-burgundy to-accent-teal"
  }
]

interface ServiceCardProps {
  service: typeof services[0]
  Icon: LucideIcon
  index: number
}

const ServiceCard = ({ service, Icon, index }: ServiceCardProps) => {
  const handleCardClick = () => {
    // Set the service parameter in the URL
    const serviceParam = encodeURIComponent(service.title)
    window.location.hash = `#contacto?service=${serviceParam}`
    
    // Scroll to contact section with offset for desktop
    setTimeout(() => {
      const contactSection = document.getElementById('contacto')
      if (contactSection) {
        const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition + 260 // 240px offset to scroll up
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 overflow-hidden h-full cursor-pointer"
        onClick={handleCardClick}
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
        </CardContent>
      </Card>
    </motion.div>
  )
}

export const ServicesSection = () => {
  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
      >
        <source src="/bg-mov.mp4" type="video/mp4" />
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/90 -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 bg-accent-burgundy py-8 rounded-2xl shadow-lg max-w-full"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros servicios
          </h2>
          <div className="h-1 w-24 bg-white/50 mx-auto mb-6"></div>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto px-4">
            Diseñamos soluciones a medida que conectan estrategia, personas y cultura.
            Acompañamos a las organizaciones en cada etapa de su evolución, impulsando procesos más eficientes y experiencias laborales con propósito.          </p>
        </motion.div>

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
      </div>
    </section>
  )
}
