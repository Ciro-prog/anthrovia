import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { fetchActiveEventTypes, isCmsConfigured, submitBooking } from "@/lib/cmsApi"
import { useCMS } from "@/context/CMSContext"
import { ContactSectionContent } from "@/types/cms"

type EventType = {
  id: string | number
  title: string
  slug: string
  durationMinutes: number
}

function todayISODate() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, "0")
  const d = String(now.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export const BookingPage = () => {
  const { content, siteSettings } = useCMS()
  const contactData = content.sections.find((s) => s.id === "contact") as ContactSectionContent | undefined
  const bookingEnabled = siteSettings.bookingEnabled !== false
  const [eventTypes, setEventTypes] = useState<EventType[]>([])
  const [loadingTypes, setLoadingTypes] = useState(true)
  const [form, setForm] = useState({
    eventTypeId: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
    date: "",
    time: "10:00",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoadingTypes(true)
      const res = await fetchActiveEventTypes()
      if (!cancelled) {
        const docs = res?.docs || []
        setEventTypes(docs)
        const preferred =
          docs.find((d) => d.slug === siteSettings.defaultEventTypeSlug) || docs[0]
        if (preferred) {
          setForm((f) => ({ ...f, eventTypeId: String(preferred.id) }))
        }
        setLoadingTypes(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [siteSettings.defaultEventTypeSlug])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.eventTypeId || !form.date || !form.time) return
    setStatus("loading")
    setError("")
    const startsAt = new Date(`${form.date}T${form.time}:00`).toISOString()
    const result = await submitBooking({
      eventTypeId: form.eventTypeId,
      name: form.name,
      email: form.email,
      phone: form.phone,
      notes: form.notes,
      startsAt,
    })
    if (result.ok) {
      setStatus("success")
      setForm((f) => ({ ...f, name: "", email: "", phone: "", notes: "" }))
      return
    }

    const whatsapp = contactData?.whatsappNumber || siteSettings.whatsappNumber
    if (whatsapp) {
      const message = `Hola, quiero agendar una llamada. Mi nombre es ${form.name}. Email: ${form.email}. WhatsApp: ${form.phone}. Fecha: ${form.date} ${form.time}. ${form.notes}`
      window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, "_blank")
    }
    setStatus("error")
    setError(
      whatsapp
        ? `${result.error || "No se pudo enviar. Probá de nuevo."} Se abrió WhatsApp como alternativa.`
        : result.error || "No se pudo enviar. Probá de nuevo.",
    )
  }

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Navbar variant="learning" />
      <main className="pt-32 md:pt-36 pb-16 md:pb-24 px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto">
        <Link
          to="/capacitaciones"
          className="inline-flex items-center gap-2 text-primary font-label-md text-label-md hover:underline underline-offset-4 mb-8"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Volver
        </Link>

        <h1 className="font-heading text-headline-md md:text-headline-lg text-on-surface mb-4">
          Agendar una llamada
        </h1>
        <p className="font-body text-body-lg text-on-surface-variant mb-10">
          Elegí un horario para una conversación de orientación. La reserva llega al CMS del equipo Anthrovia.
        </p>

        {!isCmsConfigured() && (
          <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant mb-8">
            <p className="font-body text-body-md text-on-surface-variant">
              El CMS no está configurado todavía. Definí <code className="text-primary">CMS_URL</code> apuntando
              al servidor (puerto 60518) para habilitar la agenda.
            </p>
          </div>
        )}

        {!bookingEnabled && (
          <p className="font-body text-body-md text-on-surface-variant mb-8">
            La agenda de llamadas no está disponible por ahora. Escribinos desde Contacto.
          </p>
        )}

        {bookingEnabled && isCmsConfigured() && !loadingTypes && eventTypes.length === 0 && (
          <p className="font-body text-body-md text-on-surface-variant mb-8">
            No hay tipos de llamada activos. En el admin del CMS abrí Tipos de llamada y activá uno.
          </p>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-6 bg-surface-container-lowest p-6 md:p-10 rounded-2xl border border-outline-variant/40">
          <div className="flex flex-col gap-2">
            <label htmlFor="booking-event-type" className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
              Tipo de reunión
            </label>
            <select
              id="booking-event-type"
              required
              value={form.eventTypeId}
              onChange={(e) => setForm({ ...form, eventTypeId: e.target.value })}
              className="w-full border border-outline-variant rounded-xl px-4 py-3 bg-transparent"
              disabled={loadingTypes || eventTypes.length === 0}
            >
              {eventTypes.map((et) => (
                <option key={et.id} value={String(et.id)}>
                  {et.title} ({et.durationMinutes} min)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="booking-date" className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
                Fecha
              </label>
              <Input
                id="booking-date"
                type="date"
                required
                min={todayISODate()}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="rounded-xl h-12"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="booking-time" className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
                Hora
              </label>
              <Input
                id="booking-time"
                type="time"
                required
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="rounded-xl h-12"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="booking-name" className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
              Nombre
            </label>
            <Input
              id="booking-name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl h-12"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="booking-email" className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
              Email
            </label>
            <Input
              id="booking-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-xl h-12"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="booking-phone" className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
              WhatsApp
            </label>
            <Input
              id="booking-phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="rounded-xl h-12"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="booking-notes" className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
              Notas
            </label>
            <Textarea
              id="booking-notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="rounded-xl"
            />
          </div>

          {status === "success" && (
            <p className="text-primary font-body text-body-md">
              Reserva enviada. Te confirmamos por email o WhatsApp.
            </p>
          )}
          {status === "error" && (
            <p className="text-error font-body text-body-md">{error}</p>
          )}

          <Button
            type="submit"
            disabled={!bookingEnabled || !isCmsConfigured() || status === "loading" || eventTypes.length === 0}
            className="rounded-full px-10 py-4 h-auto uppercase tracking-widest"
          >
            {status === "loading" ? "Agendando…" : "Confirmar reserva"}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  )
}
