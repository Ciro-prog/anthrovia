import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useCMS } from "@/context/CMSContext"
import { ContactSectionContent } from "@/types/cms"
import { MessageCircle, Linkedin, Instagram, Link as LinkIcon } from "lucide-react"

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
    <section id="contacto" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/image.png" 
          alt="Contact Background" 
          className="w-full h-full object-cover -z-20"
        />
        <div className="absolute inset-0 bg-white/90 -z-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-6 py-2 rounded-full shadow-lg backdrop-blur-sm"
            style={{ backgroundColor: contactData.headerBgColor || 'linear-gradient(to right, hsl(172 44% 19%), hsl(345 80% 90%))' }}
          >
             <h2 
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{ color: contactData.titleColor || '#ffffff' }}
            >
              {contactData.title}
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-medium drop-shadow-md"
            style={{ color: contactData.descriptionColor || '#4b5563' }}
          >
            {contactData.description}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-xl border-t-4 border-t-primary backdrop-blur-sm bg-white/80">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre</label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium text-gray-700">Servicio de interés</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-white/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">Mensaje</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="¿Cómo podemos ayudarte?"
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[120px] bg-white/50"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 h-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="grid gap-6">
              {contactData.socialLinks.map((link, index) => {
                let Icon = LinkIcon;
                let colorClass = 'bg-gray-500';
                
                if (link.platform === 'whatsapp') {
                  Icon = MessageCircle;
                  colorClass = 'bg-green-500';
                } else if (link.platform === 'linkedin') {
                  Icon = Linkedin;
                  colorClass = 'bg-blue-600';
                } else if (link.platform === 'instagram') {
                  Icon = Instagram;
                  colorClass = 'bg-pink-600';
                }

                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary cursor-pointer" onClick={() => window.open(link.url, '_blank')}>
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 capitalize">{link.platform}</h4>
                        <p className="text-gray-600 font-medium">{link.label}</p>
                      </div>
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
