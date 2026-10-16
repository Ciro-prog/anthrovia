import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  fetchActiveEventTypes,
  fetchAvailability,
  isCmsConfigured,
  submitBooking,
  type AvailabilityDay,
} from "@/lib/cmsApi"
import { useCMS } from "@/context/CMSContext"
import { ContactSectionContent } from "@/types/cms"
import { siteLoadingMessage } from "@/lib/siteCopy"

type EventType = {
  id: string | number
  title: string
  slug: string
  durationMinutes: number
}

function formatDayLabel(date: string) {
  const [y, m, d] = date.split("-").map(Number)
  const utc = new Date(Date.UTC(y, m - 1, d, 15, 0, 0))
  return utc.toLocaleDateString("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  })
}

export const BookingPage = () => {
  const { content, siteSettings } = useCMS()
  const contactData = content.sections.find((s) => s.id === "contact") as ContactSectionContent | undefined
  const bookingEnabled = siteSettings.bookingEnabled !== false
  const [eventTypes, setEventTypes] = useState<EventType[]>([])
  const [loadingTypes, setLoadingTypes] = useState(true)
  const [durationMinutes, setDurationMinutes] = useState(siteSettings.bookingDurationMinutes || 30)
  const [days, setDays] = useState<AvailabilityDay[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [slotsError, setSlotsError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    eventTypeId: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
    date: "",
    time: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState("")

  const selectedDay = useMemo(
    () => days.find((d) => d.date === form.date) || days[0],
    [days, form.date],
  )
  const slots = selectedDay?.slots || []

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

  useEffect(() => {
    if (!isCmsConfigured() || !bookingEnabled) return
    let cancelled = false
    ;(async () => {
      setLoadingSlots(true)
      setSlotsError("")
      const res = await fetchAvailability()
      if (cancelled) return
      if (!res) {
        setDays([])
        setSlotsError("No pudimos cargar los horarios. Probá de nuevo en unos minutos.")
        setLoadingSlots(false)
        return
      }
      const nextDays = res.days || []
      setDays(nextDays)
      setDurationMinutes(res?.durationMinutes || siteSettings.bookingDurationMinutes || 30)
      setForm((f) => {
        const still = nextDays.find((d) => d.date === f.date)
        const nextDate = still?.date || nextDays[0]?.date || ""
        const nextSlots = (still || nextDays[0])?.slots || []
        const nextTime = nextSlots.includes(f.time) ? f.time : ""
        return { ...f, date: nextDate, time: nextTime }
      })
      setLoadingSlots(false)
    })()
    return () => {
      cancelled = true
    }
  }, [bookingEnabled, siteSettings.bookingDurationMinutes])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!form.name.trim()) nextErrors.name = "Completá tu nombre"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Email inválido"
    if (form.phone.replace(/\D/g, "").length < 8) nextErrors.phone = "Ingresá un WhatsApp válido"
    if (!form.date || !form.time) nextErrors.slot = "Elegí un día y un horario"
    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    if (!form.eventTypeId) return
    setStatus("loading")
    setError("")
    const startsAt = `${form.date}T${form.time}:00-03:00`
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
      setForm((f) => ({ ...f, name: "", email: "", phone: "", notes: "", time: "" }))
      const refreshed = await fetchAvailability()
      if (refreshed?.days) setDays(refreshed.days)
      return
    }

    if (result.conflict) {
      setStatus("error")
      setError(result.error || "Ese horario ya no está disponible. Elegí otro turno.")
      const refreshed = await fetchAvailability()
      if (refreshed?.days) {
        setDays(refreshed.days)
        setForm((f) => ({ ...f, time: "" }))
      }
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
          Elegí un día y un turno de {durationMinutes} minutos. Si alguien ya lo tomó, no aparece.
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

        {bookingEnabled && isCmsConfigured() && loadingTypes && (
          <p className="font-body text-body-md text-on-surface-variant mb-8">
            {siteLoadingMessage(siteSettings, "Cargando la agenda…")}
          </p>
        )}

        {bookingEnabled && isCmsConfigured() && !loadingTypes && eventTypes.length === 0 && (
          <p className="font-body text-body-md text-on-surface-variant mb-8">
            La agenda todavía no tiene un tipo de reunión activo. Escribinos desde Contacto.
          </p>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-6 bg-surface-container-lowest p-6 md:p-10 rounded-2xl border border-outline-variant/40">
          <div className="flex flex-col gap-3">
            <p className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
              Día
            </p>
            {loadingSlots && (
              <p className="font-body text-body-md text-on-surface-variant">
                {siteLoadingMessage(siteSettings, "Cargando horarios…")}
              </p>
            )}
            {!loadingSlots && slotsError && (
              <p className="font-body text-body-md text-error">{slotsError}</p>
            )}
            {!loadingSlots && !slotsError && days.length === 0 && isCmsConfigured() && bookingEnabled && (
              <p className="font-body text-body-md text-on-surface-variant">
                No hay turnos libres en las próximas semanas. Probá más tarde o escribinos.
              </p>
            )}
            {fieldErrors.slot && <p className="font-body text-body-md text-error">{fieldErrors.slot}</p>}
            <div className="flex flex-wrap gap-2">
              {days.map((day) => {
                const active = selectedDay?.date === day.date
                return (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        date: day.date,
                        time: day.slots.includes(f.time) ? f.time : "",
                      }))
                    }
                    className={`rounded-full px-4 py-2 font-label-md text-sm border transition-colors ${
                      active
                        ? "bg-primary text-on-primary border-primary"
                        : "bg-surface border-outline-variant text-on-surface-variant hover:border-primary/40"
                    }`}
                  >
                    {formatDayLabel(day.date)}
                  </button>
                )
              })}
            </div>
          </div>

          {selectedDay && (
            <div className="flex flex-col gap-3">
              <p className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
                Horario
              </p>
              <div className="flex flex-wrap gap-2">
                {slots.map((slot) => {
                  const active = form.time === slot
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, time: slot }))}
                      className={`rounded-full px-4 py-2 font-label-md text-sm border transition-colors ${
                        active
                          ? "bg-primary text-on-primary border-primary"
                          : "bg-surface border-outline-variant text-on-surface-variant hover:border-primary/40"
                      }`}
                    >
                      {slot}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

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
            {fieldErrors.name && <p className="font-body text-sm text-error">{fieldErrors.name}</p>}
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
            {fieldErrors.email && <p className="font-body text-sm text-error">{fieldErrors.email}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="booking-phone" className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
              WhatsApp
            </label>
            <Input
              id="booking-phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="rounded-xl h-12"
            />
            {fieldErrors.phone && <p className="font-body text-sm text-error">{fieldErrors.phone}</p>}
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
            disabled={
              !bookingEnabled ||
              !isCmsConfigured() ||
              status === "loading" ||
              eventTypes.length === 0 ||
              !form.date ||
              !form.time
            }
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
