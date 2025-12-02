import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { type LucideIcon } from "lucide-react"
import { useCMS } from "@/context/CMSContext"
import { ServicesSectionContent } from "@/types/cms"
import { getIcon } from "@/lib/iconMap"
import { getTextStyle } from "@/lib/utils"

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
  const { content } = useCMS();
  const servicesData = content.sections.find(s => s.id === 'services') as ServicesSectionContent;

  if (!servicesData || !servicesData.isVisible) return null;

  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Media */}
      {/* Background Media */}
      <div className="absolute inset-0">
        {servicesData.backgroundType === 'color' ? (
          <div 
            className="w-full h-full"
            style={{ background: servicesData.backgroundColor || 'transparent' }}
          />
        ) : (
          <>
            {servicesData.videoUrl && !servicesData.videoUrl.match(/\.(mp4|webm|ogg)$/i) ? (
              <img 
                src={servicesData.videoUrl} 
                alt="Services Background" 
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                {servicesData.videoUrl && <source src={servicesData.videoUrl} type="video/mp4" />}
                <source src="/video.mp4" type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-white/90"></div>
          </>
        )}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block w-full mb-4 px-6 py-2 shadow-lg backdrop-blur-sm rounded-xl"
            style={{ background: servicesData.headerBgColor || 'hsl(345 60% 35%)' }}
          >
            <h2 
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={getTextStyle(servicesData.titleColor || '#1f2937')}
            >
              {servicesData.title}
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-medium drop-shadow-md"
            style={getTextStyle(servicesData.descriptionColor || '#4b5563')}
          >
            {servicesData.description}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
