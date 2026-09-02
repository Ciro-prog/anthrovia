import { FormEvent, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useCMS } from "@/context/CMSContext"
import { defaultSiteSettings, isCmsConfigured, submitLead } from "@/lib/cmsApi"
import {
  ArrowRight,
  FolderOpen,
  MessagesSquare,
  ClipboardList,
  TrendingDown,
  UsersRound,
  Activity,
  Network,
  MessageCircle,
  LineChart,
  Smile,
  GitBranch,
  ListTodo,
  GraduationCap,
  HeartHandshake,
  BarChart3,
  Building2,
  Globe2,
  Users,
  Smartphone,
  CheckCircle2,
} from "lucide-react"

const trustLogos = ["TechCorp", "GlobalBank", "InnovateInc", "NexusGroup", "Synergy"]

const painPoints = [
  {
    icon: FolderOpen,
    title: "Información dispersa",
    body: "Datos fragmentados en múltiples plataformas que dificultan la trazabilidad.",
  },
  {
    icon: MessagesSquare,
    title: "Comunicación poco efectiva",
    body: "Mensajes importantes que se pierden en el ruido diario de la organización.",
  },
  {
    icon: ClipboardList,
    title: "Tareas administrativas",
    body: "Tiempo valioso invertido en procesos repetitivos de bajo impacto estratégico.",
  },
  {
    icon: TrendingDown,
    title: "Toma de decisiones lenta",
    body: "Ausencia de datos en tiempo real para respaldar acciones críticas.",
  },
  {
    icon: UsersRound,
    title: "Experiencia poco uniforme",
    body: "Procesos de onboarding y desarrollo inconsistentes entre equipos.",
  },
  {
    icon: Activity,
    title: "RRHH saturado",
    body: "Equipos operando reactivamente en lugar de impulsar la estrategia.",
  },
]

const pillars = [
  { icon: Network, title: "Procesos centralizados", body: "Un único lugar para cada interacción." },
  { icon: MessageCircle, title: "Comunicación ágil", body: "Mensajes claros y directos a toda la red." },
  { icon: LineChart, title: "Decisiones con datos", body: "Métricas que respaldan tu intuición." },
  { icon: Smile, title: "Mejor experiencia", body: "Interfaces humanas e intuitivas." },
]

const bentoFeatures = [
  {
    icon: GitBranch,
    title: "Organización conectada",
    body: "Estructuras claras, roles definidos y un directorio siempre actualizado para que todos sepan a quién contactar.",
    wide: true,
  },
  {
    icon: ListTodo,
    title: "Gestión administrativa",
    body: "Automatiza solicitudes, vacaciones y aprobaciones rutinarias.",
  },
  {
    icon: GraduationCap,
    title: "Desarrollo del talento",
    body: "Evaluaciones de desempeño y planes de carrera claros y medibles.",
  },
  {
    icon: HeartHandshake,
    title: "Cultura organizacional",
    body: "Muros de reconocimiento, encuestas de clima y comunicación interna.",
  },
  {
    icon: BarChart3,
    title: "Información para decisiones",
    body: "Dashboards en tiempo real sobre rotación, ausentismo y desempeño.",
  },
]

const stats = [
  { icon: Building2, value: "+2.000", label: "Empresas" },
  { icon: Globe2, value: "+40", label: "Países" },
  { icon: Users, value: "+2M", label: "Colaboradores" },
  { icon: Smartphone, value: "1", label: "Experiencia única" },
]

const whyItems = [
  {
    title: "Conocemos los desafíos",
    body: "Hemos estado del otro lado del escritorio, y comprendemos la realidad que hoy enfrentás.",
  },
  {
    title: "Tecnología con propósito",
    body: "Identificamos dónde puede aportar valor, simplificar la gestión y acompañar tus objetivos.",
  },
  {
    title: "Acompañamiento",
    body: "Estamos presentes antes, durante y después de la implementación para favorecer una adopción exitosa y sostenible.",
  },
]

const steps = [
  { n: "1", title: "Contacto", body: "Nos dejás tus datos en el formulario." },
  { n: "2", title: "Coordinamos", body: "Agendamos una breve llamada de exploración." },
  { n: "3", title: "Conocemos", body: "Entendemos tus procesos y desafíos actuales." },
  { n: "4", title: "Solución", body: "Presentamos cómo la plataforma resuelve tu caso específico." },
]

const moduleCategories = [
  { title: "Comunicación interna", count: "5 módulos" },
  { title: "Gestión de RR.HH.", count: "5 módulos" },
  { title: "Operaciones", count: "4 módulos" },
  { title: "Cultura", count: "4 módulos" },
  { title: "Talento", count: "4 módulos" },
]

const DAY_LABEL: Record<string, string> = {
  lun: "Lunes",
  mar: "Martes",
  mie: "Miércoles",
  jue: "Jueves",
  vie: "Viernes",
  sab: "Sábado",
  dom: "Domingo",
}

function slotText(slot: { label: string; start: string; end: string }) {
  return `${slot.label} (${slot.start} - ${slot.end})`
}

export default function DossierPage() {
  const { siteSettings, content } = useCMS()
  const contact = content.sections.find((s) => s.type === "contact") as
    | { email?: string; whatsappNumber?: string }
    | undefined
  const email = siteSettings.contactEmail || contact?.email || "anthroviahr@gmail.com"
  const whatsapp = (siteSettings.whatsappNumber || contact?.whatsappNumber || "5492604085501").replace(
    /\D/g,
    "",
  )

  const days = siteSettings.dossierDays?.length
    ? siteSettings.dossierDays
    : defaultSiteSettings.dossierDays || []
  const slots = siteSettings.dossierSlots?.length
    ? siteSettings.dossierSlots
    : defaultSiteSettings.dossierSlots || []

  const slotOptions = useMemo(() => slots.map((s) => slotText(s)), [slots])

  const [submitted, setSubmitted] = useState(false)
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "error">("idle")
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    day: "",
    slot: "",
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.day || !form.slot) return
    setSubmitState("loading")
    const dayLabel = DAY_LABEL[form.day] || form.day
    const result = isCmsConfigured()
      ? await submitLead({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          preferredDay: dayLabel,
          preferredSlot: form.slot,
          source: "dossier",
          service: "Dossier HR Tech",
          message: `Disponibilidad: ${dayLabel}, ${form.slot}`,
        })
      : { ok: false as const }

    if (result.ok) {
      setSubmitted(true)
      setSubmitState("idle")
      return
    }

    const text = `Hola, soy ${form.name} (${form.company || "sin empresa"}). Email: ${form.email}. WhatsApp: ${form.phone}. Quiero conversar sobre la plataforma. Disponibilidad: ${dayLabel}, ${form.slot}.`
    if (whatsapp) {
      window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank")
    }
    setSubmitState("error")
  }

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-primary min-h-screen">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="w-full pt-28 md:pt-32 pb-16 md:pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="flex flex-col gap-8">
              <h1 className="font-heading text-headline-lg-mobile md:text-display-lg text-on-surface leading-[1.1]">
                Cuando Recursos Humanos deja de correr detrás de lo urgente,{" "}
                <span className="text-primary italic">empieza a enfocarse en lo que realmente transforma.</span>
              </h1>
              <p className="font-body text-body-lg text-on-surface-variant max-w-[600px]">
                Después de trabajar en Recursos Humanos, sabemos que gran parte del día no debería estar dedicado a
                buscar información, perseguir aprobaciones o resolver tareas repetitivas…
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <a
                  href="#contacto"
                  className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:bg-primary/90 transition-colors shadow-xl shadow-primary/20 text-center"
                >
                  Coordinar una reunión
                </a>
                <a
                  href="#features"
                  className="border border-outline text-on-surface px-8 py-4 rounded-full font-label-md text-label-md hover:bg-surface-variant transition-colors text-center"
                >
                  Conocer la plataforma
                </a>
              </div>
            </div>
            <div className="relative w-full h-[320px] md:h-[400px] lg:h-[560px] rounded-2xl overflow-hidden shadow-ethereal">
              <img
                alt="Plataforma Anthrovia"
                className="w-full h-full object-cover"
                src="/ethos/hero-card.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-surface/30 to-transparent" />
            </div>
          </div>

          <div className="mt-16 md:mt-24 pt-10 md:pt-12 border-t border-outline-variant/20 flex flex-col items-center">
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-8">
              Empresas que confían en nosotros
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-60">
              {trustLogos.map((name) => (
                <span key={name} className="font-heading text-lg md:text-xl text-on-surface">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* El desafío */}
        <section className="w-full py-16 md:py-24 lg:py-section-gap bg-surface-container-low">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden bg-surface shadow-soft p-8 flex items-center justify-center min-h-[280px] md:min-h-[360px]">
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                  {["WhatsApp", "Emails", "Carpetas"].map((label) => (
                    <div key={label} className="bg-surface-container p-4 rounded-xl text-center">
                      <p className="text-xs text-on-surface-variant">{label}</p>
                    </div>
                  ))}
                  <div className="bg-primary/10 p-4 rounded-xl text-center border border-primary/20">
                    <p className="text-xs text-primary font-bold">Anthrovia</p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 flex flex-col gap-6">
                <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface">
                  El desafío no es gestionar más procesos. Es lograr que todos trabajen conectados.
                </h2>
                <p className="font-body text-body-md text-on-surface-variant">
                  Solicitudes de vacaciones por WhatsApp que se pierden, cadenas interminables de correos para aprobar
                  una búsqueda, documentos dispersos en diferentes carpetas.
                </p>
                <blockquote className="border-l-4 border-primary pl-6 py-2 my-2">
                  <p className="font-heading text-xl md:text-2xl text-primary-container italic">
                    &ldquo;El problema no es la cantidad de trabajo. Es que la información y los procesos están en
                    demasiados lugares al mismo tiempo.&rdquo;
                  </p>
                </blockquote>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 text-primary font-label-md text-label-md hover:underline underline-offset-4"
                >
                  Descubrí una forma más simple de gestionar Recursos Humanos
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ¿Te resulta familiar? */}
        <section className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6">
              La mayoría de los desafíos no aparecen de un día para el otro…
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 md:mb-16">
            {painPoints.map((item) => (
              <div
                key={item.title}
                className="bg-surface border border-outline-variant/30 rounded-xl p-8 hover:shadow-ethereal hover:-translate-y-1 transition-all duration-300"
              >
                <item.icon className="text-primary h-9 w-9 mb-6" strokeWidth={1.5} />
                <h3 className="font-label-md text-label-md text-on-surface uppercase mb-3">{item.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="bg-secondary-container/50 rounded-2xl p-10 md:p-16 text-center max-w-4xl mx-auto flex flex-col items-center gap-8">
            <h3 className="font-heading text-headline-md text-on-secondary-container">
              &ldquo;Cuando estos desafíos empiezan a formar parte del día a día, el problema ya no está en las
              personas, sino en las herramientas.&rdquo;
            </h3>
            <a
              href="#contacto"
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:bg-primary/90 transition-colors"
            >
              Quiero descubrir cómo simplificar esta gestión
            </a>
          </div>
        </section>

        {/* La transformación */}
        <section className="w-full py-16 md:py-24 lg:py-section-gap bg-surface-container-high relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface max-w-3xl mx-auto">
                Imaginá una gestión donde la información esté siempre disponible…
              </h2>
            </div>
            <div className="w-full h-[280px] md:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden shadow-ethereal mb-12 md:mb-20 relative group">
              <img
                alt="Vista de la plataforma"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                src="/ethos/hero.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map((p) => (
                <div key={p.title} className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-bright flex items-center justify-center text-primary shadow-soft">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-label-md text-label-md text-on-surface uppercase">{p.title}</h4>
                  <p className="font-body text-body-md text-on-surface-variant text-sm">{p.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 md:mt-24 text-center">
              <p className="font-heading text-xl md:text-2xl text-primary italic mb-8">
                &ldquo;La tecnología tiene sentido cuando ayuda a las personas a trabajar mejor.&rdquo;
              </p>
              <a
                href="#features"
                className="inline-flex border-2 border-primary text-primary px-10 py-4 rounded-full font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors"
              >
                Conocer la solución
              </a>
            </div>
          </div>
        </section>

        {/* Features bento */}
        <section
          id="features"
          className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
        >
          <div className="mb-12 md:mb-16">
            <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface max-w-2xl">
              Una gestión más simple empieza cuando todo trabaja conectado.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(240px,auto)]">
            {bentoFeatures.map((f) => (
              <div
                key={f.title}
                className={`bg-surface-container-low rounded-2xl p-8 md:p-10 flex flex-col relative overflow-hidden group ${
                  f.wide ? "md:col-span-2" : ""
                }`}
              >
                <div className="z-10 relative">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary mb-6 shadow-soft">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl text-on-surface mb-2">{f.title}</h3>
                  <p className={`font-body text-body-md text-on-surface-variant ${f.wide ? "max-w-sm" : ""}`}>
                    {f.body}
                  </p>
                </div>
                {f.wide && (
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-16 md:mt-20 border-t border-outline-variant/30 pt-12 md:pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="font-heading text-xl text-on-surface max-w-xl">
              &ldquo;Más que incorporar una nueva herramienta, se trata de construir una forma más simple de
              trabajar.&rdquo;
            </p>
            <Link
              to="/dossier/modulos"
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md whitespace-nowrap hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Quiero conocer cómo funciona
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="w-full py-16 md:py-24 lg:py-section-gap bg-surface-container-highest">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface mb-12 md:mb-16 max-w-2xl">
              Una app pensada para acompañar la evolución de Recursos Humanos.
            </h2>
            <div className="flex flex-col md:flex-row flex-wrap justify-between items-start gap-10 md:gap-12 border-b border-outline-variant/20 pb-12 md:pb-16 mb-12 md:mb-16">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-4">
                  <s.icon className="text-primary h-8 w-8" strokeWidth={1.5} />
                  <div>
                    <p className="font-heading text-4xl text-on-surface">{s.value}</p>
                    <p className="font-label-md text-label-md text-on-surface-variant uppercase">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <a
                href="#contacto"
                className="border border-outline text-on-surface px-8 py-4 rounded-full font-label-md text-label-md hover:bg-surface-variant transition-colors"
              >
                Quiero conversar con un especialista
              </a>
            </div>
          </div>
        </section>

        {/* Por qué Anthrovia */}
        <section className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6">
                La tecnología es importante. Saber cómo aplicarla a tu organización, todavía más.
              </h2>
              <p className="font-body text-body-lg text-on-surface-variant mb-10 md:mb-12">
                En Anthrovia no somos solo un puente hacia una herramienta. Somos consultores de Recursos Humanos que
                entendemos el negocio y los desafíos de gestión antes de acercar una solución.
              </p>
              <div className="flex flex-col gap-8">
                {whyItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <CheckCircle2 className="text-primary mt-1 h-5 w-5 shrink-0" />
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface uppercase mb-1">{item.title}</h4>
                      <p className="font-body text-body-md text-on-surface-variant">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 md:mt-12">
                <a
                  href="#contacto"
                  className="inline-flex bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  Coordinar una conversación
                </a>
              </div>
            </div>
            <div className="relative w-full h-[400px] md:h-[520px] rounded-2xl overflow-hidden shadow-ethereal">
              <img
                alt="Consultoría Anthrovia"
                className="w-full h-full object-cover"
                src="/ethos/in-company.jpg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-surface/90 to-transparent">
                <p className="font-heading text-xl text-on-surface italic">
                  &ldquo;Creemos en soluciones con impacto.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Explorar módulos */}
        <section
          id="explorar-modulos"
          className="w-full py-16 md:py-24 lg:py-section-gap bg-primary text-on-primary"
        >
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex flex-col gap-6">
              <p className="font-label-md text-label-md text-primary-fixed uppercase tracking-widest">
                Experiencia interactiva
              </p>
              <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-white">
                Explorá los módulos en vivo
              </h2>
              <p className="font-body text-body-lg text-primary-fixed-dim/90">
                22 módulos organizados en 5 categorías. Entrá a la simulación, tocá cada módulo y mirá cómo se ve la
                app en el celular — en desktop y mobile.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {moduleCategories.map((c) => (
                  <li
                    key={c.title}
                    className="flex items-center justify-between gap-2 bg-primary-container/60 rounded-xl px-4 py-3 border border-primary-fixed/20"
                  >
                    <span className="font-label-md text-sm text-white">{c.title}</span>
                    <span className="text-xs text-primary-fixed">{c.count}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link
                  to="/dossier/modulos"
                  className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-label-md text-label-md hover:bg-surface-container-low transition-colors shadow-lg"
                >
                  Explorar módulos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end gap-4 md:gap-6">
              <div className="w-40 md:w-48 border-[5px] border-[#1b1c1c] rounded-[1.75rem] bg-[#1b1c1c] aspect-[9/19] shadow-ethereal overflow-hidden relative -rotate-3">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-[#1b1c1c] rounded-b-lg z-10" />
                <div className="h-full bg-surface-container-low flex flex-col p-3 pt-8">
                  <div className="h-6 bg-primary rounded mb-2" />
                  <div className="space-y-2 flex-1">
                    <div className="h-16 bg-surface rounded-lg shadow-soft" />
                    <div className="h-16 bg-surface rounded-lg shadow-soft" />
                    <div className="h-10 bg-surface rounded-lg shadow-soft" />
                  </div>
                </div>
              </div>
              <div className="w-40 md:w-48 border-[5px] border-[#1b1c1c] rounded-[1.75rem] bg-[#1b1c1c] aspect-[9/19] shadow-ethereal overflow-hidden relative rotate-3 mt-8 hidden sm:block">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-[#1b1c1c] rounded-b-lg z-10" />
                <div className="h-full bg-surface flex flex-col p-3 pt-8">
                  <div className="h-6 bg-secondary rounded mb-2" />
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <div className="bg-surface-container rounded-lg" />
                    <div className="bg-surface-container rounded-lg" />
                    <div className="bg-surface-container rounded-lg col-span-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Camino + formulario */}
        <section id="contacto" className="w-full py-16 md:py-24 lg:py-section-gap bg-surface-container-low">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface mb-10 md:mb-12">
                Dar el primer paso lleva menos tiempo del que imaginás.
              </h2>
              <div className="relative border-l border-outline-variant/30 ml-4 pb-8 space-y-10">
                {steps.map((step, i) => (
                  <div key={step.n} className="relative pl-10">
                    <div
                      className={`absolute w-8 h-8 rounded-full bg-surface -left-[17px] top-0 flex items-center justify-center font-label-md text-sm ${
                        i === 0
                          ? "border-2 border-primary text-primary"
                          : "border-2 border-outline-variant text-on-surface-variant"
                      }`}
                    >
                      {step.n}
                    </div>
                    <h4 className="font-label-md text-label-md text-on-surface uppercase mb-2">{step.title}</h4>
                    <p className="font-body text-body-md text-on-surface-variant">{step.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 bg-surface rounded-xl border border-outline-variant/20">
                <p className="font-heading text-lg text-primary italic mb-4">
                  &ldquo;Hoy puede ser el primer paso hacia una gestión más simple.&rdquo;
                </p>
                <a
                  href={`mailto:${email}`}
                  className="text-primary font-label-md text-label-md border-b border-primary pb-1 hover:text-primary-container transition-colors"
                >
                  Quiero coordinar una reunión
                </a>
              </div>
            </div>

            <div className="bg-surface rounded-3xl p-8 md:p-12 lg:p-14 shadow-ethereal border border-outline-variant/10">
              <h3 className="font-heading text-2xl md:text-3xl text-on-surface mb-8">Conversemos</h3>
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
                  <p className="font-heading text-xl text-on-surface">¡Gracias por escribirnos!</p>
                  <p className="font-body text-body-md text-on-surface-variant">
                    Te contactaremos a la brevedad para coordinar una conversación.
                  </p>
                  <p className="text-sm text-on-surface-variant pt-4">
                    O escribinos a{" "}
                    <a className="text-primary underline" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </p>
                </div>
              ) : (
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="dossier-name" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                      Nombre y apellido
                    </label>
                    <input
                      id="dossier-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface font-body"
                      placeholder="Ej. Ana García"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="dossier-company" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                      Empresa
                    </label>
                    <input
                      id="dossier-company"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface font-body"
                      placeholder="Tu organización"
                      type="text"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="dossier-email" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                        Email corporativo
                      </label>
                      <input
                        id="dossier-email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface font-body"
                        placeholder="ana@empresa.com"
                        type="email"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="dossier-phone" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                        WhatsApp
                      </label>
                      <input
                        id="dossier-phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface font-body"
                        placeholder="+54 9 11..."
                        type="tel"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="dossier-day" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                        Día preferido
                      </label>
                      <select
                        id="dossier-day"
                        required
                        value={form.day}
                        onChange={(e) => setForm({ ...form, day: e.target.value })}
                        className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface font-body appearance-none"
                      >
                        <option value="" disabled>
                          Seleccioná un día
                        </option>
                        {days.map((d) => (
                          <option key={d} value={d}>
                            {DAY_LABEL[d] || d}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="dossier-slot" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                        Franja horaria
                      </label>
                      <select
                        id="dossier-slot"
                        required
                        value={form.slot}
                        onChange={(e) => setForm({ ...form, slot: e.target.value })}
                        className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface font-body appearance-none"
                      >
                        <option disabled value="">
                          Seleccioná un rango horario
                        </option>
                        {slotOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {submitState === "error" && (
                    <p className="text-sm text-error">
                      No se pudo enviar. Probá de nuevo. Se abrió WhatsApp como alternativa.
                    </p>
                  )}
                  <button
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-md text-label-md hover:bg-primary/90 transition-colors mt-2 disabled:opacity-60"
                    type="submit"
                    disabled={submitState === "loading"}
                  >
                    {submitState === "loading" ? "Enviando…" : "Solicitar reunión"}
                  </button>
                  <p className="text-xs text-on-surface-variant text-center">
                    Al enviar este formulario aceptás nuestra política de privacidad. También podés escribir a{" "}
                    <a href={`mailto:${email}`} className="text-primary underline">
                      {email}
                    </a>{" "}
                    o por{" "}
                    <a
                      href={`https://wa.me/${whatsapp}`}
                      className="text-primary underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
