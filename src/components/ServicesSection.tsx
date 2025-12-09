import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { type LucideIcon } from "lucide-react"
import { useCMS } from "@/context/CMSContext"
import { ServicesSectionContent } from "@/types/cms"
import { getIcon } from "@/lib/iconMap"

interface ServiceCardProps {
  service: ServicesSectionContent['services'][0]
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card 
        className="group relative h-full bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:shadow-primary-light/20 transition-all duration-500 overflow-hidden cursor-pointer rounded-2xl"
        onClick={handleCardClick}
      >
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="p-8 relative z-10 flex flex-col items-start h-full">
            {/* Icon Box - High Contrast */}
            <div className="mb-6 p-4 rounded-xl bg-white/10 group-hover:bg-accent-gold group-hover:scale-110 transition-all duration-500 relative shadow-inner">
                <Icon className="w-8 h-8 text-secondary-light group-hover:text-primary-dark transition-colors duration-500 relative z-10" />
            </div>

            {/* Title */}
            <CardTitle className="mb-4 text-2xl font-heading font-bold text-white group-hover:text-accent-gold transition-colors duration-300">
                {service.title}
            </CardTitle>

            {/* Description */}
            <CardContent className="p-0 mt-auto">
                <p className="font-body text-white/70 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                    {service.description}
                </p>
            </CardContent>

             {/* Decorative bottom line */}
             <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                <div className="h-full bg-gradient-to-r from-accent-gold to-secondary w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
             </div>
        </div>
      </Card>
    </motion.div>
  )
}

export const ServicesSection = () => {
  const { content } = useCMS();
  const servicesData = content.sections.find(s => s.id === 'services') as ServicesSectionContent;

  if (!servicesData || !servicesData.isVisible) return null;

  return (
    <section id="servicios" className="py-24 bg-primary relative overflow-hidden">
        {/* Background Gradients for Depth */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary-light/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary-dark/10 rounded-full blur-[120px]"></div>
        </div>

        {/* Decorative Grid of Squares (Subtle on Dark) */}
        <div className="absolute top-0 right-0 p-12 opacity-20 hidden lg:block">
            <div className="grid grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-sm transform rotate-45 ${i % 2 === 0 ? 'bg-white' : 'bg-accent-gold'}`}></div>
                ))}
            </div>
        </div>

        {/* Decorative "Tapes" / Ribbons */}
        <div className="absolute top-40 left-0 w-32 h-64 opacity-30 pointer-events-none">
            <div className="w-full h-1 bg-accent-gold rotate-45 transform translate-x-10 shadow-[0_0_15px_rgba(255,255,255,0.3)]"></div>
            <div className="w-full h-8 bg-white/5 backdrop-blur-sm rotate-45 transform -translate-x-10 mt-10 border border-white/10"></div>
        </div>


         {/* Floating decorative squares */}
        <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-20 h-20 border border-white/10 rounded-xl hidden md:block backdrop-blur-sm"
        />
        <motion.div 
            animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 right-10 w-24 h-24 bg-accent-gold/5 rounded-2xl hidden md:block border border-accent-gold/20"
        />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
             <span className="text-accent-gold font-cta font-bold tracking-widest uppercase text-sm mb-4 block">Nuestras Soluciones</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 relative inline-block">
              {servicesData.title}
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-body text-white/80 leading-relaxed max-w-2xl mx-auto mt-6"
          >
            {servicesData.description}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.services.map((service, index) => {
            const Icon = getIcon(service.iconName);
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
