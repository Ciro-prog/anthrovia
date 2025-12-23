
import { motion, AnimatePresence } from "framer-motion"
import { useCMS } from "@/context/CMSContext"
import { AboutSectionContent } from "@/types/cms"
import { getIcon } from "@/lib/iconMap"
import { useState } from "react"

export const AboutSection = () => {
  const { content } = useCMS();
  const aboutData = content.sections.find(s => s.id === 'about') as AboutSectionContent;
  const [expandedValue, setExpandedValue] = useState<number | null>(null)

  if (!aboutData || !aboutData.isVisible) return null;

  return (
    <section id="sobre-nosotros" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row gap-16 md:gap-24">
        
        {/* Left Column: Image + Values */}
        <div className="flex-1 relative w-full flex flex-col gap-10 items-center md:items-start">
          {/* Founder Image */}
          <motion.div 
            className="relative z-10 w-3/4 md:w-2/3 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl group"
            initial={{ filter: 'grayscale(100%)' }}
            whileInView={{ filter: 'grayscale(0%)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <motion.img 
              src="/images/founder.jpg" 
              alt="Betsabé Sánchez - Fundadora Anthrovia HR" 
              className="w-full h-full object-cover transition-all duration-700"
              initial={{ filter: 'grayscale(100%)' }}
              whileInView={{ filter: 'grayscale(0%)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5 }}
            />
            
            {/* Name/Title Overlay */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary/95 to-transparent p-6 pt-12 flex flex-col items-center text-center"
            >
               <h3 className="font-heading text-white text-xl font-bold">Betsabé Sánchez</h3>
               <p className="font-body text-white/90 text-sm uppercase tracking-wider">Lic. RRHH • Founder</p>
            </motion.div>

             {/* Decorative blob behind */}
            <div className="absolute -bottom-10 -left-10 w-full h-48 bg-secondary/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Values Section (Moved below image) */}
          <div className="w-full mt-2">
             <h3 className="font-heading text-xl text-primary mb-4 border-b border-secondary/20 pb-2 inline-block">
               Nuestros Valores
             </h3>
             <div className="grid grid-cols-3 gap-3">
               {aboutData.values.map((value, index) => {
                 const Icon = getIcon(value.iconName);
                 const isHovered = expandedValue === index;
                 const isAnyHovered = expandedValue !== null;
                 
                 return (
                   <div 
                     key={index}
                     className={`
                       relative transition-all duration-300 ease-in-out cursor-pointer rounded-xl border flex flex-col items-center justify-center p-2 text-center group/card
                       ${isHovered 
                         ? 'bg-primary text-white border-primary shadow-xl z-50 scale-110' 
                         : 'bg-white border-neutral-gray/10 hover:border-accent-terracotta/30 z-0'
                       }
                       ${isAnyHovered && !isHovered ? 'opacity-40 blur-[1px]' : 'opacity-100'}
                       aspect-square
                     `}
                     onClick={() => setExpandedValue(expandedValue === index ? null : index)}
                   >
                     {/* Icon */}
                     <div className={`
                       transition-all duration-300
                       ${isHovered ? 'scale-75 mb-1' : 'mb-2'}
                     `}>
                        <Icon className={`w-6 h-6 transition-colors ${isHovered ? 'text-accent-gold' : 'text-accent-terracotta'}`} />
                     </div>

                     {/* Title (Hidden on Hover) */}
                     {!isHovered && (
                       <motion.h4 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="font-heading font-semibold text-[10px] md:text-xs text-primary leading-tight"
                        >
                          {value.title}
                        </motion.h4>
                     )}

                     {/* Description (Visible ONLY on Hover/Click) */}
                     <AnimatePresence>
                       {isHovered && (
                         <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.2 }}
                           className="absolute inset-0 p-3 md:p-4 flex items-center justify-center bg-primary rounded-xl"
                         >
                           <p className="text-[10px] md:text-xs font-body leading-tight text-white text-center">
                             {value.description}
                           </p>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 )
               })}
             </div>
          </div>
        </div>
        
        {/* Right Column: Content */}
        <div className="flex-1 w-full pt-0">
          <span className="font-cta text-accent-wine text-xs uppercase tracking-[0.4em] font-bold mb-6 block">Sobre Nosotros</span>
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-10 leading-tight">
            {aboutData.title}
          </h2>
          <div className="font-body text-lg text-neutral-gray mb-12 leading-relaxed italic border-l-4 border-secondary pl-8 py-2">
            {aboutData.introText.map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0" dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
          
          <div className="space-y-12">
            <div className="group">
              <h4 className="font-heading text-2xl text-primary mb-4 flex items-center gap-4">
                <motion.span 
                  initial={{ width: "2.5rem" }}
                  whileInView={{ width: "4rem" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-px bg-accent-terracotta transition-all" 
                />
                {aboutData.mission.title || "Misión"}
              </h4>
              <p className="font-body text-neutral-gray pl-14 text-base leading-relaxed">
                {aboutData.mission.description}
              </p>
            </div>
            
            <div className="group">
              <h4 className="font-heading text-2xl text-primary mb-4 flex items-center gap-4">
                <motion.span 
                  initial={{ width: "2.5rem" }}
                  whileInView={{ width: "4rem" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-px bg-accent-terracotta transition-all" 
                />
                {aboutData.purpose.title || "Nuestra Filosofía"}
              </h4>
              <p className="font-body text-neutral-gray pl-14 text-base leading-relaxed">
                {aboutData.purpose.description}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
