import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useCMS } from "@/context/CMSContext"
import { AboutSectionContent } from "@/types/cms"
import { getIcon } from "@/lib/iconMap"

export const AboutSection = () => {
  const { content } = useCMS();
  const aboutData = content.sections.find(s => s.id === 'about') as AboutSectionContent;

  if (!aboutData || !aboutData.isVisible) return null;

  return (
    <section id="sobre-nosotros" className="py-24 bg-white relative overflow-hidden">
       {/* Background Elements - Wave & Geometry */}
       <div className="absolute top-0 left-0 w-full h-1/2 bg-[#FBF9F6] -z-10 transform -skew-y-2 origin-top-left scale-110"></div>
       
       {/* Floating Colored Squares */}
       <div className="absolute top-10 left-10 opacity-60 hidden lg:block">
          <div className="w-12 h-12 bg-accent-wine/10 rounded-lg transform -rotate-12 mb-4"></div>
          <div className="w-8 h-8 bg-accent-gold/20 rounded-md transform rotate-45 ml-8"></div>
       </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-8"
          >
             <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6 relative inline-block">
              {aboutData.title}
              {/* Organic Underline */}
              <svg className="absolute -bottom-3 left-0 w-full h-3 text-secondary opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl font-body text-neutral-gray leading-relaxed">
            {aboutData.introText.map((paragraph, index) => (
              <motion.p 
                key={index} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                dangerouslySetInnerHTML={{ __html: paragraph }} 
              />
            ))}
          </div>
        </div>

        {/* Purpose & Mission */}
        <div className="grid md:grid-cols-2 gap-12 mb-32 max-w-6xl mx-auto relative">
             {/* Center decorative element */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
             
          {/* Purpose */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-secondary to-accent-wine"></div>
              <CardContent className="p-10 relative overflow-hidden">
                 {/* Card Background Pattern */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                 
                <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300 relative z-10">
                  {(() => {
                    const Icon = getIcon('Compass');
                    return <Icon className="h-8 w-8 text-secondary-dark group-hover:text-white transition-colors" />
                  })()}
                </div>
                <h3 className="text-3xl font-heading font-semibold text-primary mb-4 relative z-10">{aboutData.purpose.title}</h3>
                <p className="font-body text-neutral-gray text-lg leading-relaxed group-hover:text-primary transition-colors relative z-10">
                  {aboutData.purpose.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl overflow-hidden group">
               <div className="h-2 bg-gradient-to-r from-primary to-primary-light"></div>
              <CardContent className="p-10 relative overflow-hidden">
                {/* Card Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>

                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 relative z-10">
                  {(() => {
                    const Icon = getIcon('Target');
                    return <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                  })()}
                </div>
                <h3 className="text-3xl font-heading font-semibold text-primary mb-4 relative z-10">{aboutData.mission.title}</h3>
                <p className="font-body text-neutral-gray text-lg leading-relaxed group-hover:text-primary transition-colors relative z-10">
                  {aboutData.mission.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Values - High Contrast Section */}
        <div className="relative -mx-6 md:-mx-20 px-6 md:px-20 py-24 bg-primary text-white overflow-hidden rounded-3xl">
           {/* Decorative Background for Values */}
           <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-secondary-light rounded-full blur-[100px]"></div>
              <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent-wine rounded-full blur-[100px]"></div>
           </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 relative z-10"
          >
            <div className="text-center mb-16">
              <span className="text-accent-gold font-cta font-bold tracking-widest uppercase text-sm mb-4 block">Nuestra Esencia</span>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Nuestros Valores
              </h3>
              <p className="max-w-2xl mx-auto text-white/80 font-body text-lg">
                  Los pilares que sostienen nuestra cultura y guían cada una de nuestras acciones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {aboutData.values.map((value, index) => {
                const Icon = getIcon(value.iconName);
                return (
                  <Card
                    key={index}
                    className="text-center group hover:bg-white/10 hover:backdrop-blur-md transition-all duration-300 cursor-default border border-white/10 shadow-lg bg-white/5 rounded-xl relative overflow-hidden"
                  >
                     {/* Hover corner decoration */}
                     <div className="absolute top-0 right-0 w-8 h-8 bg-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-xl"></div>

                    <CardContent className="p-8 flex flex-col items-center h-full relative z-10">
                      <div className="w-14 h-14 rounded-full bg-white/10 mb-6 flex items-center justify-center group-hover:bg-accent-gold group-hover:text-primary transition-all duration-300 text-white">
                        <Icon className="h-7 w-7 transition-colors" />
                      </div>
                      <h4 className="font-heading font-bold text-xl text-white mb-3">
                        {value.title}
                      </h4>
                      <p className="font-body text-sm text-white/70 leading-relaxed group-hover:text-white transition-colors">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
