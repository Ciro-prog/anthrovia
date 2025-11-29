import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  MessageCircle,
  Linkedin,
  Instagram
} from "lucide-react"

const WHATSAPP_NUMBER = "5492604085501"

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  })

  // Read service from URL parameter on mount and on hash change
  useEffect(() => {
    const readServiceFromUrl = () => {
      const hash = window.location.hash // e.g., "#contacto?service=..."
      if (hash.includes('?service=')) {
        const searchParams = new URLSearchParams(hash.split('?')[1])
        const serviceParam = searchParams.get('service')
        if (serviceParam) {
          const decodedService = decodeURIComponent(serviceParam)
          setFormData(prev => ({ ...prev, service: decodedService }))
        }
      }
    }

    // Read on mount
    readServiceFromUrl()

    // Listen for hash changes
    window.addEventListener('hashchange', readServiceFromUrl)
    return () => window.removeEventListener('hashchange', readServiceFromUrl)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Construir el mensaje para WhatsApp
    const message = `
*Nueva Consulta - Anthrovia HR*

*Nombre:* ${formData.name}
*Email:* ${formData.email}
*Teléfono:* ${formData.phone}
*Empresa:* ${formData.company || "No especificada"}
*Servicio de interés:* ${formData.service || "No especificado"}

*Mensaje:*
${formData.message}
    `.trim()

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message)

    // Abrir WhatsApp en nueva pestaña
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank')

    // Limpiar formulario
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: ""
    })
  }

  return (
    <section id="contacto" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Image Background */}
      <img
        src="/image.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover -z-20"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/90 -z-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 bg-gradient-to-r from-primary to-accent-rose py-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Conectemos
            </h2>
            <div className="h-1 w-24 bg-white/50 mx-auto mb-6"></div>
            <p className="text-lg text-gray-100 max-w-2xl mx-auto px-4">
              "El cambio comienza con una conversación". Queremos conocer tu historia, tus desafíos y acompañarte en la evolución del talento dentro de tu organización.
              Escribinos y descubramos juntos cómo potenciar tu equipo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary via-accent-teal to-accent-rose"></div>
                <CardContent className="p-8 bg-white">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-medium">Nombre completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Juan Pérez"
                        required
                        className="mt-2 border-gray-200 focus:border-primary focus:ring-primary transition-all duration-300"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-gray-700 font-medium">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="juan@empresa.com"
                          required
                          className="mt-2 border-gray-200 focus:border-primary focus:ring-primary transition-all duration-300"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-gray-700 font-medium">Teléfono *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+54 9 11 1234-5678"
                          required
                          className="mt-2 border-gray-200 focus:border-primary focus:ring-primary transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company" className="text-gray-700 font-medium">Empresa</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nombre de tu empresa"
                        className="mt-2 border-gray-200 focus:border-primary focus:ring-primary transition-all duration-300"
                      />
                    </div>

                    <div>
                      <Label htmlFor="service" className="text-gray-700 font-medium">Servicio de interés</Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="mt-2 flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300"
                      >
                        <option value="" disabled>Selecciona un servicio</option>
                        <option value="Asesorías iniciales">Asesorías iniciales</option>
                        <option value="Reclutamiento y Selección Estratégica por Competencias">Reclutamiento y Selección Estratégica por Competencias</option>
                        <option value="Diseño y Optimización de Procesos de RRHH">Diseño y Optimización de Procesos de RRHH</option>
                        <option value="Programas de Experiencia y Bienestar">Programas de Experiencia y Bienestar</option>
                        <option value="Career Coaching & Desarrollo Profesional">Career Coaching & Desarrollo Profesional</option>
                        <option value="Servicios complementarios">Servicios complementarios</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-700 font-medium">Mensaje *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Cuéntanos sobre tu proyecto o consulta..."
                        required
                        className="mt-2 min-h-[120px] border-gray-200 focus:border-primary focus:ring-primary transition-all duration-300"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-accent-teal hover:opacity-90 text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Enviar por WhatsApp
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Al enviar este formulario, serás redirigido a WhatsApp para completar tu consulta
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Información de Contacto
                </h3>
                <p className="text-gray-600 mb-8">
                  Nuestro equipo está listo para atenderte y brindarte las mejores soluciones de recursos humanos para tu organización.
                </p>
              </div>

              <div className="space-y-4">
                {/* Social Media Links */}
                <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0 shadow-md">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">WhatsApp</h4>
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          Chatea con nosotros
                        </a>
                        <p className="text-sm text-gray-500 mt-1">
                          Respuesta inmediata
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-[#0077b5] hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-[#0077b5] flex items-center justify-center flex-shrink-0 shadow-md">
                        <Linkedin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">LinkedIn</h4>
                        <a
                          href="https://www.linkedin.com/company/anthrovia-hr/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          Anthrovia HR
                        </a>
                        <p className="text-sm text-gray-500 mt-1">
                          Síguenos para novedades
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-[#E1306C] hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center flex-shrink-0 shadow-md">
                        <Instagram className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Instagram</h4>
                        <a
                          href="https://www.instagram.com/anthrovia.hr/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          @anthrovia.hr
                        </a>
                        <p className="text-sm text-gray-500 mt-1">
                          Nuestra cultura en imágenes
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
