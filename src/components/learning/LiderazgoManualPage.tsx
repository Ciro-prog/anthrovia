import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { useCMS } from "@/context/CMSContext"
import { isCmsConfigured, submitLead } from "@/lib/cmsApi"
import { siteLoadingMessage } from "@/lib/siteCopy"
import type { ContactSectionContent, CoursePageContent, ServicesSectionContent } from "@/types/cms"

const FALLBACK = {
  title: "Liderazgo Emocional",
  description:
    "Herramientas prácticas para liderar personas, gestionar tensiones y fortalecer la comunicación y el vínculo dentro de los equipos.",
  category: "Habilidades Blandas",
  imageUrl: "/ethos/formacion-5.jpg",
}

export function LiderazgoManualPage({ course }: { course?: CoursePageContent }) {
  const { content, siteSettings, isLoading, cmsError } = useCMS()
  const services = content.sections.find((s) => s.id === "learning-services") as
    | ServicesSectionContent
    | undefined
  const contact = content.sections.find((s) => s.id === "contact") as ContactSectionContent | undefined
  const formacion = services?.formaciones?.find((item) => {
    if (course?.slug) return Boolean(item.link?.includes(course.slug) || item.id === course.id)
    return item.id === "liderazgo-emocional" || Boolean(item.link?.includes("liderazgo-emocional"))
  })

  const title = formacion?.title || course?.title || FALLBACK.title
  const description = formacion?.description || FALLBACK.description
  const category = formacion?.category || FALLBACK.category
  const imageUrl = formacion?.imageUrl || FALLBACK.imageUrl

  const [form, setForm] = useState({ name: "", email: "", phone: "" })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!form.name.trim()) nextErrors.name = "Completá tu nombre"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Email inválido"
    if (form.phone.replace(/\D/g, "").length < 8) nextErrors.phone = "Ingresá un teléfono válido"
    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitState("loading")
    setSubmitError("")

    if (isCmsConfigured()) {
      const result = await submitLead({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: title,
        message: `Solicitud del documento ${title}`,
        source: "liderazgo-manual",
      })
      if (result.ok) {
        setSubmitState("success")
        setForm({ name: "", email: "", phone: "" })
        return
      }
      setSubmitError(result.error || "No se pudo enviar. Probá de nuevo.")
      setSubmitState("error")
    }

    const wa = (contact?.whatsappNumber || siteSettings.whatsappNumber || "").replace(/\D/g, "")
    const text = `Hola, soy ${form.name}. Email: ${form.email}. Teléfono: ${form.phone}. Quiero solicitar el documento ${title}.`
    if (wa) {
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, "_blank")
    }
    if (!isCmsConfigured()) setSubmitState("idle")
  }

  if (isLoading && !formacion && !course) {
    return (
      <div className="min-h-screen bg-background text-on-surface">
        <Navbar variant="learning" />
        <main className="pt-40 px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto pb-24">
          <p className="font-body text-body-lg text-on-surface-variant">
            {siteLoadingMessage(siteSettings, "Cargando la capacitación…")}
          </p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Navbar variant="learning" />
      <main>
        {cmsError && (
          <p className="mx-margin-mobile md:mx-margin-desktop mt-28 max-w-container-max font-body text-body-md text-on-surface-variant">
            No pudimos actualizar el contenido desde el CMS. Estás viendo la versión guardada en el sitio.
          </p>
        )}

        <section className="pt-32 md:pt-36 lg:pt-40 pb-16 md:pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <Link
            to="/capacitaciones"
            className="inline-flex items-center gap-2 text-primary font-label-md text-label-md hover:underline underline-offset-4 mb-10"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Volver a capacitaciones
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="font-label-md text-primary uppercase tracking-widest mb-4">{category}</p>
              <h1 className="font-heading text-headline-lg-mobile md:text-display-lg text-on-surface leading-[1.1] mb-6">
                {title}
              </h1>
              <p className="font-body text-body-lg text-on-surface-variant max-w-xl mb-8">{description}</p>
              <a
                href="#solicitar"
                className="inline-flex bg-primary text-on-primary px-8 py-4 rounded-full font-label-md uppercase tracking-widest hover:bg-primary-container transition-colors"
              >
                Solicitar el documento
              </a>
            </div>
            <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-ethereal">
              <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <section
          id="solicitar"
          className="bg-surface-container-low py-16 md:py-24 px-margin-mobile md:px-margin-desktop"
        >
          <div className="max-w-xl mx-auto bg-surface rounded-3xl p-8 md:p-12 shadow-ethereal border border-outline-variant/10">
            {submitState === "success" ? (
              <div className="text-center space-y-3 py-8">
                <h2 className="font-heading text-headline-md text-on-surface">Recibimos tu solicitud</h2>
                <p className="font-body text-body-md text-on-surface-variant">
                  Te vamos a contactar a la brevedad para coordinar la compra del documento.
                </p>
              </div>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
                <div>
                  <h2 className="font-heading text-headline-md text-on-surface mb-3">Solicitá el documento</h2>
                  <p className="font-body text-body-md text-on-surface-variant">
                    Dejanos tu correo y teléfono. Te contactamos para gestionar la compra.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="liderazgo-name" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                    Nombre y apellido
                  </label>
                  <input
                    id="liderazgo-name"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary text-on-surface font-body"
                    placeholder="Ej. Ana García"
                  />
                  {fieldErrors.name && <p className="text-sm text-error">{fieldErrors.name}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="liderazgo-email" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                    Correo electrónico
                  </label>
                  <input
                    id="liderazgo-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary text-on-surface font-body"
                    placeholder="ana@empresa.com"
                  />
                  {fieldErrors.email && <p className="text-sm text-error">{fieldErrors.email}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="liderazgo-phone" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                    Teléfono
                  </label>
                  <input
                    id="liderazgo-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary text-on-surface font-body"
                    placeholder="+54 9 11..."
                  />
                  {fieldErrors.phone && <p className="text-sm text-error">{fieldErrors.phone}</p>}
                </div>
                {submitState === "error" && (
                  <p className="text-sm text-error">
                    {submitError || "No se pudo enviar. Se abrió WhatsApp como alternativa."}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-md uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {submitState === "loading" ? "Enviando…" : "Solicitar documento"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
