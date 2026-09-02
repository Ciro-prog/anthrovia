import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { useCMS } from "@/context/CMSContext"
import { ContactSectionContent, ServicesSectionContent } from "@/types/cms"
import { MessageCircle, Linkedin, Send, ArrowRight, Mail } from "lucide-react"
import { isCmsConfigured, submitLead } from "@/lib/cmsApi"
import { Link } from "react-router-dom"

interface ContactSectionProps {
  showCustomTraining?: boolean
  serviceOptions?: string[]
}

export const ContactSection = ({
  showCustomTraining = false,
  serviceOptions,
}: ContactSectionProps) => {
  const { content, siteSettings } = useCMS()
  const contactData = content.sections.find(s => s.id === 'contact') as ContactSectionContent
  const learningServices = content.sections.find(s => s.id === 'learning-services') as ServicesSectionContent

  const defaultOptions = showCustomTraining
    ? [
        ...(learningServices?.formaciones?.map(f => f.title) || []),
        "Formación In Company",
        "Capacitación a medida",
      ]
    : serviceOptions || [
        "Talent Acquisition",
        "Growth Profesional",
        "Capacitaciones / Learning",
        "HR Tech",
        "Otro motivo",
      ]

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  })
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [submitError, setSubmitError] = useState("")

  useEffect(() => {
    const applyServiceFromUrl = () => {
      const searchParams = new URLSearchParams(window.location.search)
      let serviceParam = searchParams.get("service")

      const hash = window.location.hash
      if (!serviceParam && hash.startsWith("#contacto")) {
        const hashQuery = hash.includes("?") ? hash.split("?")[1] : ""
        serviceParam = new URLSearchParams(hashQuery).get("service")
      }

      if (serviceParam) {
        setFormData((prev) => ({ ...prev, service: decodeURIComponent(serviceParam!) }))
      }

      if (hash.startsWith("#contacto") || serviceParam) {
        requestAnimationFrame(() => {
          document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" })
        })
      }
    }

    applyServiceFromUrl()
    window.addEventListener("hashchange", applyServiceFromUrl)
    window.addEventListener("popstate", applyServiceFromUrl)
    return () => {
      window.removeEventListener("hashchange", applyServiceFromUrl)
      window.removeEventListener("popstate", applyServiceFromUrl)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitState("loading")
    setSubmitError("")

    if (isCmsConfigured()) {
      const result = await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        source: showCustomTraining ? "learning-contact" : "home-contact",
      })
      if (result.ok) {
        setSubmitState("success")
        setFormData({ name: "", email: "", phone: "", service: "", message: "" })
        return
      }
      setSubmitError(result.error || "No se pudo enviar. Probá de nuevo.")
      setSubmitState("error")
    }

    // Fallback: WhatsApp si no hay CMS o falló el POST
    const message = `Hola, mi nombre es ${formData.name}. Email: ${formData.email}. WhatsApp: ${formData.phone}. Me interesa: ${formData.service}. ${formData.message}`
    const wa = (contactData.whatsappNumber || siteSettings.whatsappNumber || "").replace(/\D/g, "")
    const whatsappUrl = `https://wa.me/${wa}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    if (!isCmsConfigured()) setSubmitState("idle")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (!contactData || !contactData.isVisible) return null

  const custom = contactData.customTraining

  return (
    <>
      {showCustomTraining && custom && (
        <section className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile lg:px-margin-desktop bg-primary text-on-primary relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="max-w-container-max mx-auto flex flex-col items-center text-center gap-10 relative z-10">
            <h2 className="max-w-4xl text-balance font-heading text-headline-lg-mobile md:text-[1.875rem] text-on-primary-container">
              {custom.title}
            </h2>
            <p className="font-body text-body-lg text-on-primary/80 max-w-2xl">{custom.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl relative mt-4">
              <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-on-primary/20 -z-10" />
              {custom.steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center gap-4 group">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary-container border-4 border-primary flex items-center justify-center text-3xl font-heading text-on-primary-container group-hover:bg-on-primary group-hover:text-primary transition-colors">
                    {step.number}
                  </div>
                  <h4 className="font-label-md uppercase tracking-wider text-on-primary">{step.title}</h4>
                  <p className="font-body text-body-md text-on-primary/80">{step.description}</p>
                </div>
              ))}
            </div>
            <a
              href="#contacto"
              className="mt-4 bg-primary-container text-on-primary-container px-10 py-4 rounded-full font-label-md hover:bg-on-primary hover:text-primary transition-all inline-flex items-center justify-center gap-2 group shadow-ethereal"
            >
              {custom.ctaText}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>
      )}

      <section
        id="contacto"
        className="w-full px-margin-mobile lg:px-margin-desktop py-16 md:py-24 lg:py-section-gap bg-surface-container-lowest border-t border-outline-variant/20 relative"
      >
        <div className="w-full max-w-container-max mx-auto">
          <div className="mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-xl">forum</span>
              <span className="font-label-md text-primary uppercase tracking-widest">Hablemos</span>
            </div>
            <h2
              className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight"
              data-cms-field="title"
            >
              {contactData.title || (
                <>
                  ¿En qué podemos <span className="italic text-primary">ayudarte?</span>
                </>
              )}
            </h2>
            {contactData.description && (
              <p
                className="font-body text-body-lg text-on-surface-variant mt-4 max-w-2xl"
                data-cms-field="description"
              >
                {contactData.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2 relative">
                    <label className="font-label-md text-[12px] text-on-surface-variant uppercase tracking-widest absolute -top-2 left-4 bg-surface-container-lowest px-1 z-10" htmlFor="name">
                      Nombre y Apellido
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ej. Juan Pérez"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-outline-variant rounded-xl px-4 py-4 h-auto font-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-2 relative">
                    <label className="font-label-md text-[12px] text-on-surface-variant uppercase tracking-widest absolute -top-2 left-4 bg-surface-container-lowest px-1 z-10" htmlFor="email">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="ejemplo@empresa.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-outline-variant rounded-xl px-4 py-4 h-auto font-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2 relative">
                    <label className="font-label-md text-[12px] text-on-surface-variant uppercase tracking-widest absolute -top-2 left-4 bg-surface-container-lowest px-1 z-10" htmlFor="phone">
                      WhatsApp
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+54 9 11 1234 5678"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-outline-variant rounded-xl px-4 py-4 h-auto font-body text-on-surface focus:border-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-2 relative">
                    <label className="font-label-md text-[12px] text-on-surface-variant uppercase tracking-widest absolute -top-2 left-4 bg-surface-container-lowest px-1 z-10" htmlFor="service">
                      Servicio de interés
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-outline-variant rounded-xl px-4 py-4 font-body text-on-surface focus:outline-none focus:border-primary appearance-none"
                    >
                      <option value="">Selecciona un servicio</option>
                      {defaultOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label className="font-label-md text-[12px] text-on-surface-variant uppercase tracking-widest absolute -top-2 left-4 bg-surface-container-lowest px-1 z-10" htmlFor="message">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Contanos brevemente qué necesitas..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-transparent border border-outline-variant rounded-xl px-4 py-4 font-body text-on-surface focus:border-primary resize-none min-h-[120px]"
                  />
                </div>

                <div className="mt-2 flex flex-col gap-3">
                  {submitState === "success" && (
                    <p className="font-body text-body-md text-primary">
                      ¡Gracias! Recibimos tu consulta. Te contactamos pronto.
                    </p>
                  )}
                  {submitState === "error" && (
                    <p className="font-body text-body-md text-error">
                      No pudimos guardar en el CMS ({submitError}). Se abrió WhatsApp como alternativa.
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    <Button
                      type="submit"
                      disabled={submitState === "loading"}
                      className="w-full md:w-auto inline-flex items-center justify-center bg-primary text-on-primary px-10 py-4 h-auto rounded-full font-label-md uppercase tracking-widest hover:bg-primary-container disabled:opacity-60"
                    >
                      {submitState === "loading" ? "Enviando…" : "Enviar mensaje"}
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                    {siteSettings.bookingEnabled !== false && (
                      <Link
                        to="/agendar"
                        className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-outline font-label-md text-label-md uppercase tracking-widest text-on-surface hover:border-primary hover:text-primary transition-colors"
                      >
                        Agendar llamada
                      </Link>
                    )}
                  </div>
                </div>
              </form>
            </motion.div>

            <motion.div
              className="lg:col-span-5 flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {contactData.socialLinks.map((link) => {
                let Icon = Mail
                let hoverClass = "hover:bg-primary-fixed/10 hover:border-primary-fixed"
                let iconColor = "text-primary"
                let labelHover = "group-hover:text-primary"
                let title = "Escribinos"

                if (link.platform === "whatsapp") {
                  Icon = MessageCircle
                  hoverClass = "hover:bg-[#25D366]/10 hover:border-[#25D366]/30"
                  iconColor = "text-[#25D366]"
                  labelHover = "group-hover:text-[#25D366]"
                  title = "WhatsApp"
                } else if (link.platform === "linkedin") {
                  Icon = Linkedin
                  hoverClass = "hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30"
                  iconColor = "text-[#0A66C2]"
                  labelHover = "group-hover:text-[#0A66C2]"
                  title = "LinkedIn"
                } else if (link.platform === "email") {
                  title = "Escribinos"
                }

                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target={link.platform === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className={`bg-surface-container-low p-6 md:p-8 rounded-3xl flex items-center gap-5 md:gap-6 group transition-colors border border-transparent cursor-pointer ${hoverClass}`}
                  >
                    <div className={`size-14 shrink-0 aspect-square bg-surface-container-lowest rounded-full shadow-soft inline-flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="size-7 shrink-0" />
                    </div>
                    <div>
                      <h5 className="font-label-md text-[12px] text-on-surface-variant uppercase tracking-widest mb-1">
                        {title}
                      </h5>
                      <p className={`font-body text-body-lg text-on-surface transition-colors ${labelHover}`}>
                        {link.label}
                      </p>
                    </div>
                  </a>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
