import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle
} from "lucide-react"

const WHATSAPP_NUMBER = "5492625435328"

export const ContactSection = () => {
  const headerAnimation = useScrollAnimation()
  const formAnimation = useScrollAnimation()
  const infoAnimation = useScrollAnimation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  })

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
    <section id="contacto" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            ref={headerAnimation.ref}
            className={`text-center mb-16 transition-all duration-700 ${headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Conectemos
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-accent-rose to-accent-burgundy mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              "El cambio comienza con una conversación". Queremos conocer tu historia, tus desafíos y acompañarte en la evolución del talento dentro de tu organización.
              Escribinos y descubramos juntos cómo potenciar tu equipo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              ref={formAnimation.ref}
              className={`transition-all duration-700 ${formAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
            >
              <Card className="border-2">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Nombre completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Juan Pérez"
                        required
                        className="mt-2"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="juan@empresa.com"
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Teléfono *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+54 9 11 1234-5678"
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nombre de tu empresa"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="service">Servicio de interés</Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Selecciona un servicio</option>
                        <option value="Asesorías iniciales">Asesorías iniciales</option>
                        <option value="Reclutamiento y Selección Estratégica">Reclutamiento y Selección Estratégica</option>
                        <option value="Diseño y Optimización de Procesos">Diseño y Optimización de Procesos</option>
                        <option value="Programas de Experiencia y Bienestar">Programas de Experiencia y Bienestar</option>
                        {/* <option value="Capacitación y Entrenamiento"></option> */}
                        <option value="Servicios complementarios">Servicios complementarios</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message">Mensaje *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Cuéntanos sobre tu proyecto o consulta..."
                        required
                        className="mt-2 min-h-[120px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-accent-teal hover:opacity-90 text-lg py-6"
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
            </div>

            {/* Contact Info */}
            <div
              ref={infoAnimation.ref}
              className={`space-y-6 transition-all duration-700 ${infoAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
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
                <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent-teal flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Teléfono</h4>
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          +54 9 2625 43-5328
                        </a>
                        <p className="text-sm text-gray-500 mt-1">
                          También disponible en WhatsApp
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-accent-teal hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-teal to-primary-light flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                        <a
                          href="mailto:anthroviahr@gmail.com"
                          className="text-primary hover:underline"
                        >
                          anthroviahr@gmail.com
                        </a>
                        <p className="text-sm text-gray-500 mt-1">
                          Respuesta en 24 horas
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-accent-rose hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-rose to-accent-burgundy flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Ubicación</h4>
                        <p className="text-gray-600">
                          Mendoza, Argentina
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Servicios a nivel nacional
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-accent-burgundy hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-burgundy to-primary flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Horario</h4>
                        <p className="text-gray-600">
                          Lunes a Viernes: 9:00 - 18:00
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Consultas por WhatsApp 24/7
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
