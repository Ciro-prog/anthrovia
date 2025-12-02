import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useCMS } from "@/context/CMSContext"
import { HeroSectionContent } from "@/types/cms"
import { motion } from "framer-motion"
import { getTextStyle } from "@/lib/utils"

export const HeroSection = () => {
  const { content } = useCMS();
  const heroData = content.sections.find(s => s.id === 'hero') as HeroSectionContent;

  if (!heroData || !heroData.isVisible) return null;

  return (
    <section className="relative min-h-[700px] md:min-h-[600px] flex items-end justify-center overflow-hidden">
      {/* Background Media */}
      {/* Background Media */}
      <div className="absolute inset-0">
        {heroData.backgroundType === 'color' ? (
          <div 
            className="w-full h-full"
            style={{ background: heroData.backgroundColor || 'transparent' }}
          />
        ) : (
          <>
            {heroData.videoUrl && !heroData.videoUrl.match(/\.(mp4|webm|ogg)$/i) ? (
              <img 
                src={heroData.videoUrl} 
                alt="Hero Background" 
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-fill object-center md:object-cover md:scale-[0.97] scale-95 transition-transform duration-700 rounded-2xl"
              >
                {heroData.videoUrl && <source src={heroData.videoUrl} type="video/mp4" />}
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            
            {/* Gradient fade to white at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
          </>
        )}
      </div>

      <div className="container mx-auto px-4 pb-12 md:pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            style={getTextStyle(heroData.titleColor || '#ffffff')}
          >
            {heroData.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light"
            style={getTextStyle(heroData.subtitleColor || '#e2e8f0')}
          >
            {heroData.subtitle}
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
            style={getTextStyle(heroData.descriptionColor || '#cbd5e1')}
          >
            {heroData.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            {heroData.buttons.map((button, index) => (
              <Button
                key={index}
                asChild
                className={
                  button.variant === 'secondary' 
                    ? "bg-white text-primary hover:bg-white/90 text-sm px-6 py-2.5 h-auto"
                    : "bg-primary text-white hover:bg-accent-rose hover:border-accent-burgundy border-2 border-primary text-sm px-6 py-2.5 h-auto"
                }
              >
                <a href={button.link} className={button.variant === 'secondary' ? "flex items-center" : ""}>
                  {button.text}
                  {button.variant === 'secondary' && <ArrowRight className="ml-2 h-4 w-4" />}
                </a>
              </Button>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  )
}
