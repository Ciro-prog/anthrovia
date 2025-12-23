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
  // Determine style based on index (0=Cream, 1=Green, 2=Wine)
  const isCream = index % 3 === 0;
  const isGreen = index % 3 === 1;
  const isWine = index % 3 === 2;

  const baseClasses = "relative p-6 md:p-8 transition-all duration-1000 group h-full";
  
  // Mosaic shapes and colors
  let styleClasses = "";
  if (isCream) {
    styleClasses = "bg-neutral-cream text-primary rounded-tr-[40px] md:rounded-tr-[80px] rounded-bl-[40px] md:rounded-bl-[80px]";
  } else if (isGreen) {
    styleClasses = "bg-primary text-white rounded-tl-[40px] md:rounded-tl-[80px] rounded-br-[40px] md:rounded-br-[80px]";
  } else if (isWine) {
    styleClasses = "bg-accent-wine text-white rounded-tr-[40px] md:rounded-tr-[80px] rounded-bl-[40px] md:rounded-bl-[80px]";
  }

  const handleCardClick = () => {
    const serviceParam = encodeURIComponent(service.title)
    window.location.hash = `#contacto?service=${serviceParam}`
    setTimeout(() => {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  };

  return (
    <motion.div 
      initial={{ 
        opacity: 0, 
        y: 30,
        borderRadius: isCream 
          ? "0px 40px 0px 40px" 
          : isGreen 
            ? "40px 0px 40px 0px" 
            : "0px 40px 0px 40px"
      }}
      whileInView={{ 
        opacity: 1, 
        y: isGreen && typeof window !== 'undefined' && window.innerWidth >= 768 ? 24 : isWine && typeof window !== 'undefined' && window.innerWidth >= 1024 ? 48 : 0,
        borderRadius: isCream 
          ? "0px 20px 0px 20px" 
          : isGreen 
            ? "20px 0px 20px 0px" 
            : "0px 20px 0px 20px"
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`${baseClasses} ${styleClasses} cursor-pointer hover:shadow-xl`}
      onClick={handleCardClick}
    >
      <div className={`
        mb-4 md:mb-6 transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-105
        ${isCream ? 'text-primary' : 'text-secondary'}
      `}>
        <Icon className="w-8 h-8 md:w-10 md:h-10" />
      </div>

      <h3 className="font-heading text-xl md:text-2xl mb-3 md:mb-4 leading-snug font-bold">
        {service.title}
      </h3>

      <p className={`
        font-body text-xs md:text-sm leading-relaxed opacity-90
        ${isCream ? 'text-neutral-gray' : 'text-white/80'}
      `}>
        {service.description}
      </p>

      {/* Decorative Watermark Number */}
      <span className={`
        absolute bottom-4 right-6 font-heading text-4xl md:text-5xl opacity-5 transition-opacity group-hover:opacity-10 pointer-events-none select-none
        ${isCream ? 'text-primary' : 'text-white'}
      `}>
        0{index + 1}
      </span>
    </motion.div>
  )
}

export const ServicesSection = () => {
  const { content } = useCMS();
  const servicesData = content.sections.find(s => s.id === 'services') as ServicesSectionContent;

  if (!servicesData || !servicesData.isVisible) return null;

  return (
    <section id="servicios" className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-cta text-accent-terracotta text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-3 block"
            >
              Nuestra Experiencia
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-5xl text-primary leading-tight font-bold"
            >
              {servicesData.title}
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-neutral-gray text-sm md:text-base max-w-xs md:text-right border-l-4 md:border-l-0 md:border-r-4 border-secondary/30 pl-4 md:pl-0 md:pr-4"
          >
            {servicesData.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 pb-12 md:pb-0">
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

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-cream/30 -z-10 skew-x-12 transform origin-top pointer-events-none" />
    </section>
  )
}
