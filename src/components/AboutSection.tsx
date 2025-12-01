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
    <section id="sobre-nosotros" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
      >
        <source src={aboutData.videoUrl} type="video/mp4" />
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/90 -z-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-6 px-8 py-3 rounded-full shadow-lg backdrop-blur-sm"
            style={{ backgroundColor: aboutData.headerBgColor || 'hsl(172 44% 19%)' }}
          >
            <h2 
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{ color: aboutData.titleColor || '#ffffff' }}
            >
              {aboutData.title}
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed bg-white/80 p-8 rounded-2xl shadow-sm backdrop-blur-sm">
            {aboutData.introText.map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
        </div>

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
                  {(() => {
                    const Icon = getIcon('Compass');
                    return <Icon className="h-8 w-8 text-white" />
                  })()}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{aboutData.purpose.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {aboutData.purpose.description}
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
                  {(() => {
                    const Icon = getIcon('Target');
                    return <Icon className="h-8 w-8 text-white" />
                  })()}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{aboutData.mission.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {aboutData.mission.description}
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
            {aboutData.values.map((value, index) => {
              const Icon = getIcon(value.iconName);
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
