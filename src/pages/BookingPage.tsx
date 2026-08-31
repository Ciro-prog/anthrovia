import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { fetchActiveEventTypes, isCmsConfigured, submitBooking } from "@/lib/cmsApi"

type EventType = {
  id: string | number
  title: string
  slug: string
  durationMinutes: number
}

export const BookingPage = () => {
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
        if (docs[0]) {
          setForm((f) => ({ ...f, eventTypeId: String(docs[0].id) }))
        }
        setLoadingTypes(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

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
    } else {
      setStatus("error")
      setError(result.error || "No se pudo agendar")
    }
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
              El CMS no está configurado todavía. Definí <code className="text-primary">VITE_CMS_URL</code> apuntando
              al servidor (puerto 60518) para habilitar la agenda.
            </p>
          </div>
        )}

        {isCmsConfigured() && !loadingTypes && eventTypes.length === 0 && (
          <p className="font-body text-body-md text-on-surface-variant mb-8">
            No hay tipos de reunión activos. Creá uno en el admin del CMS (event-types).
          </p>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-6 bg-surface-container-lowest p-6 md:p-10 rounded-2xl border border-outline-variant/40">
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
              Tipo de reunión
            </label>
            <select
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
              <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
                Fecha
              </label>
              <Input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="rounded-xl h-12"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
                Hora
              </label>
              <Input
                type="time"
                required
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="rounded-xl h-12"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
              Nombre
            </label>
            <Input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl h-12"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
              Email
            </label>
            <Input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-xl h-12"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
              WhatsApp
            </label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="rounded-xl h-12"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
              Notas
            </label>
            <Textarea
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
            disabled={!isCmsConfigured() || status === "loading" || eventTypes.length === 0}
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
