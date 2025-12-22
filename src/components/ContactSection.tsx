import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useCMS } from "@/context/CMSContext"
import { ContactSectionContent } from "@/types/cms"
import { MessageCircle, Linkedin, Instagram, Link as LinkIcon, Send, ChevronRight } from "lucide-react"

export const ContactSection = () => {
  const { content } = useCMS();
  const contactData = content.sections.find(s => s.id === 'contact') as ContactSectionContent;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#contacto')) {
        const params = new URLSearchParams(hash.split('?')[1]);
        const serviceParam = params.get('service');
        if (serviceParam) {
          setFormData(prev => ({ ...prev, service: decodeURIComponent(serviceParam) }));
        }
      }
    };

    // Initial check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Hola, mi nombre es ${formData.name}. Me interesa el servicio de ${formData.service}. ${formData.message}`
    const whatsappUrl = `https://wa.me/${contactData.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (!contactData || !contactData.isVisible) return null;

  return (
    <section id="contacto" className="py-16 md:py-24 bg-[#FAF8F5] relative overflow-hidden">
        {/* Top Wave Transition */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[60px] text-white">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
            </svg>
        </div>

      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 hidden md:block"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 hidden md:block"></div>
      
       {/* Geometric Overlay - Colored Squares */}
       <div className="absolute top-40 right-10 hidden lg:block opacity-60">
            <div className="w-20 h-20 border-2 border-accent-wine/30 rotate-12 rounded-xl mb-4"></div>
            <div className="w-12 h-12 bg-accent-gold/10 -rotate-12 rounded-lg ml-10"></div>
       </div>

        {/* Decorative Tape */}
        <div className="absolute bottom-20 left-10 w-48 h-6 bg-primary/10 rotate-[-10deg] hidden md:block"></div>


      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-20 mt-6 md:mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
             <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4 md:mb-6">
              {contactData.title}
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-body text-neutral-gray max-w-2xl mx-auto"
          >
            {contactData.description}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 max-w-7xl mx-auto items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-2xl border-none bg-white rounded-2xl md:rounded-3xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent-wine to-secondary" />
              <CardContent className="p-6 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-8">
                  {/* Mobile: Stack, Desktop: Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                    <div className="space-y-2 md:space-y-3">
                      <label htmlFor="name" className="text-xs md:text-sm font-cta font-bold text-primary uppercase tracking-wider">Nombre</label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Tu nombre completo"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-neutral-cream border-transparent focus:border-secondary focus:ring-0 rounded-xl h-12 font-body text-neutral-gray text-base"
                      />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <label htmlFor="email" className="text-xs md:text-sm font-cta font-bold text-primary uppercase tracking-wider">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-neutral-cream border-transparent focus:border-secondary focus:ring-0 rounded-xl h-12 font-body text-neutral-gray text-base"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="service" className="text-xs md:text-sm font-cta font-bold text-primary uppercase tracking-wider">Servicio de interés</label>
                    <div className="relative">
                        <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="flex h-12 w-full items-center justify-between rounded-xl border border-transparent bg-neutral-cream px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-body text-neutral-gray appearance-none"
                        required
                        >
                        <option value="">Selecciona un servicio</option>
                        <option value="Consultoría de RRHH">Consultoría de RRHH</option>
                        <option value="Reclutamiento y Selección">Reclutamiento y Selección</option>
                        <option value="Desarrollo Organizacional">Desarrollo Organizacional</option>
                        <option value="Capacitación y Formación">Capacitación y Formación</option>
                        <option value="Clima Laboral">Clima Laboral</option>
                        <option value="Evaluación de Desempeño">Evaluación de Desempeño</option>
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                             <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                        </div>
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="message" className="text-xs md:text-sm font-cta font-bold text-primary uppercase tracking-wider">Mensaje</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Cuéntanos más sobre tus necesidades..."
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[120px] md:min-h-[150px] bg-neutral-cream border-transparent focus:border-secondary focus:ring-0 rounded-xl font-body text-neutral-gray resize-none p-4 text-base"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-dark text-white font-cta font-bold py-4 h-auto shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl text-base md:text-lg flex items-center justify-center gap-2"
                  >
                    Enviar Mensaje <Send className="w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 md:space-y-8 lg:pt-10"
          >
             <div className="prose prose-lg">
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-4 md:mb-6">Conectemos</h3>
                <p className="font-body text-neutral-gray text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                    Estamos listos para potenciar el talento de tu organización. Escríbenos o encuéntranos en nuestras redes sociales.
                </p>
             </div>

            <div className="grid gap-4 md:gap-6">
              {contactData.socialLinks.map((link, index) => {
                let Icon = LinkIcon;
                let bgClass = 'bg-white hover:bg-neutral-cream text-primary';
                
                if (link.platform === 'whatsapp') Icon = MessageCircle;
                else if (link.platform === 'linkedin') Icon = Linkedin;
                else if (link.platform === 'instagram') Icon = Instagram;

                return (
                  <Card key={index} className={`group cursor-pointer border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-xl md:rounded-2xl ${bgClass}`} onClick={() => window.open(link.url, '_blank')}>
                    <CardContent className="p-4 md:p-6 flex items-center gap-4 md:gap-6">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300`}>
                        <Icon className="w-6 h-6 md:w-7 md:h-7" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-cta font-bold text-lg md:text-xl text-primary capitalize mb-0.5 md:mb-1">{link.platform}</h4>
                        <p className="font-body text-sm md:text-base text-neutral-gray group-hover:text-primary transition-colors">{link.label}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-primary/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
