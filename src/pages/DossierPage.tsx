import { FormEvent, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useCMS } from "@/context/CMSContext"
import { defaultSiteSettings, isCmsConfigured, submitLead } from "@/lib/cmsApi"
import { mergeDossierPage } from "@/data/dossierPageDefaults"
import { siteLoadingMessage } from "@/lib/siteCopy"
import type { DossierIcon } from "@/types/cms"
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
  type LucideIcon,
} from "lucide-react"

const DOSSIER_ICONS: Record<DossierIcon, LucideIcon> = {
  folder: FolderOpen,
  messages: MessagesSquare,
  clipboard: ClipboardList,
  trending: TrendingDown,
  usersround: UsersRound,
  activity: Activity,
  network: Network,
  message: MessageCircle,
  linechart: LineChart,
  smile: Smile,
  git: GitBranch,
  todo: ListTodo,
  graduation: GraduationCap,
  heart: HeartHandshake,
  barchart: BarChart3,
  building: Building2,
  globe: Globe2,
  users: Users,
  smartphone: Smartphone,
}

function DossierGlyph({ name, className }: { name?: DossierIcon; className?: string }) {
  const Icon = (name && DOSSIER_ICONS[name]) || FolderOpen
  return <Icon className={className} strokeWidth={1.5} />
}

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

const ALL_DAYS = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"] as const
const OTHER_DAY = "otro"
const OTHER_SLOT = "otra"
const EXTRA_SLOTS = ["Mañana", "Tarde", "Noche"] as const

const selectClass =
  "w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-on-surface font-body appearance-none"

function slotText(slot: { label: string; start: string; end: string }) {
  return `${slot.label} (${slot.start} - ${slot.end})`
}

export default function DossierPage() {
  const { siteSettings, content, dossierPage, cmsError, isLoading } = useCMS()
  const page = mergeDossierPage(dossierPage)
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    day: "",
    otherDay: "",
    slot: "",
    otherSlot: "",
  })

  const resolvedDay = form.day === OTHER_DAY ? form.otherDay : form.day
  const resolvedSlot = form.slot === OTHER_SLOT ? form.otherSlot : form.slot

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!form.name.trim()) nextErrors.name = "Completá tu nombre"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Email inválido"
    if (form.phone.trim() && form.phone.replace(/\D/g, "").length < 8) {
      nextErrors.phone = "Ingresá un WhatsApp válido"
    }
    if (!resolvedDay) nextErrors.day = "Elegí un día"
    if (!resolvedSlot) nextErrors.slot = "Elegí una franja"
    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setSubmitState("loading")
    const dayLabel = DAY_LABEL[resolvedDay] || resolvedDay
    const result = isCmsConfigured()
      ? await submitLead({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          preferredDay: dayLabel,
          preferredSlot: resolvedSlot,
          source: "dossier",
          service: "Dossier HR Tech",
          message: `Disponibilidad: ${dayLabel}, ${resolvedSlot}`,
        })
      : { ok: false as const }

    if (result.ok) {
      setSubmitted(true)
      setSubmitState("idle")
      return
    }

    const text = `Hola, soy ${form.name} (${form.company || "sin empresa"}). Email: ${form.email}. WhatsApp: ${form.phone}. Quiero conversar sobre la plataforma. Disponibilidad: ${dayLabel}, ${resolvedSlot}.`
    if (whatsapp) {
      window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank")
    }
    setSubmitState("error")
  }

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-primary min-h-screen">
      <Navbar />

      <main>
        {cmsError && (
          <p className="mx-margin-mobile md:mx-margin-desktop mt-28 font-body text-body-md text-on-surface-variant">
            No pudimos actualizar el contenido desde el CMS. Estás viendo la versión guardada en el sitio.
          </p>
        )}
        {isLoading && !page.heroTitle && (
          <p className="mx-margin-mobile md:mx-margin-desktop mt-28 font-body text-body-md text-on-surface-variant">
            {siteLoadingMessage(siteSettings, "Cargando…")}
          </p>
        )}
        {/* Hero */}
        <section className="w-full pt-28 md:pt-32 pb-16 md:pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="flex flex-col gap-8">
              <h1 className="font-heading text-headline-lg-mobile md:text-display-lg text-on-surface leading-[1.1]">
                {page.heroTitle}{" "}
                <span className="text-primary italic">{page.heroHighlight}</span>
              </h1>
              <p className="font-body text-body-lg text-on-surface-variant max-w-[600px]">
                {page.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <a
                  href="#contacto"
                  className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:bg-primary/90 transition-colors shadow-xl shadow-primary/20 text-center"
                >
                  {page.heroCtaPrimary}
                </a>
                <a
                  href="#features"
                  className="border border-outline text-on-surface px-8 py-4 rounded-full font-label-md text-label-md hover:bg-surface-variant transition-colors text-center"
                >
                  {page.heroCtaSecondary}
                </a>
              </div>
            </div>
            <div className="relative w-full h-[320px] md:h-[400px] lg:h-[560px] rounded-2xl overflow-hidden shadow-ethereal">
              <img
                alt="Plataforma Anthrovia"
                className="w-full h-full object-cover"
                src={page.heroImage}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-surface/30 to-transparent" />
            </div>
          </div>

          <div className="mt-16 md:mt-24 pt-10 md:pt-12 border-t border-outline-variant/20 flex flex-col items-center">
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-8">
              {page.trustLabel}
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-60">
              {(page.trustLogos || []).map((logo) => (
                <span key={logo.name} className="font-heading text-lg md:text-xl text-on-surface">
                  {logo.name}
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
                  {(page.challengeChips || []).map((chip) => (
                    <div key={chip.label} className="bg-surface-container p-4 rounded-xl text-center">
                      <p className="text-xs text-on-surface-variant">{chip.label}</p>
                    </div>
                  ))}
                  <div className="bg-primary/10 p-4 rounded-xl text-center border border-primary/20">
                    <p className="text-xs text-primary font-bold">Anthrovia</p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 flex flex-col gap-6">
                <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface">
                  {page.challengeTitle}
                </h2>
                <p className="font-body text-body-md text-on-surface-variant">
                  {page.challengeText}
                </p>
                <blockquote className="border-l-4 border-primary pl-6 py-2 my-2">
                  <p className="font-heading text-xl md:text-2xl text-primary-container italic">
                    &ldquo;{page.challengeQuote}&rdquo;
                  </p>
                </blockquote>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 text-primary font-label-md text-label-md hover:underline underline-offset-4"
                >
                  {page.challengeCta}
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
              {page.familiarTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 md:mb-16">
            {(page.painPoints || []).map((item) => (
              <div
                key={item.title}
                className="bg-surface border border-outline-variant/30 rounded-xl p-8 hover:shadow-ethereal hover:-translate-y-1 transition-all duration-300"
              >
                <DossierGlyph name={item.icon} className="text-primary h-9 w-9 mb-6" />
                <h3 className="font-label-md text-label-md text-on-surface uppercase mb-3">{item.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="bg-secondary-container/50 rounded-2xl p-10 md:p-16 text-center max-w-4xl mx-auto flex flex-col items-center gap-8">
            <h3 className="font-heading text-headline-md text-on-secondary-container">
              &ldquo;{page.familiarQuote}&rdquo;
            </h3>
            <a
              href="#contacto"
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:bg-primary/90 transition-colors"
            >
              {page.familiarCta}
            </a>
          </div>
        </section>

        {/* La transformación */}
        <section className="w-full py-16 md:py-24 lg:py-section-gap bg-surface-container-high relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface max-w-3xl mx-auto">
                {page.transformTitle}
              </h2>
            </div>
            <div className="w-full h-[280px] md:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden shadow-ethereal mb-12 md:mb-20 relative group">
              <img
                alt="Vista de la plataforma"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                src={page.transformImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(page.pillars || []).map((p) => (
                <div key={p.title} className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-bright flex items-center justify-center text-primary shadow-soft">
                    <DossierGlyph name={p.icon} className="h-5 w-5" />
                  </div>
                  <h4 className="font-label-md text-label-md text-on-surface uppercase">{p.title}</h4>
                  <p className="font-body text-body-md text-on-surface-variant text-sm">{p.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 md:mt-24 text-center">
              <p className="font-heading text-xl md:text-2xl text-primary italic mb-8">
                &ldquo;{page.transformQuote}&rdquo;
              </p>
              <a
                href="#features"
                className="inline-flex border-2 border-primary text-primary px-10 py-4 rounded-full font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors"
              >
                {page.transformCta}
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
              {page.featuresTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(240px,auto)]">
            {(page.features || []).map((f) => (
              <div
                key={f.title}
                className={`bg-surface-container-low rounded-2xl p-8 md:p-10 flex flex-col relative overflow-hidden group ${
                  f.wide ? "md:col-span-2" : ""
                }`}
              >
                <div className="z-10 relative">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary mb-6 shadow-soft">
                    <DossierGlyph name={f.icon} className="h-5 w-5" />
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
              &ldquo;{page.featuresQuote}&rdquo;
            </p>
            <a
              href="#contacto"
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md whitespace-nowrap hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              {page.featuresCta}
            </a>
          </div>
        </section>

        {/* Stats */}
        <section className="w-full py-16 md:py-24 lg:py-section-gap bg-surface-container-highest">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface mb-12 md:mb-16 max-w-2xl">
              {page.statsTitle}
            </h2>
            <div className="flex flex-col md:flex-row flex-wrap justify-between items-start gap-10 md:gap-12 border-b border-outline-variant/20 pb-12 md:pb-16 mb-12 md:mb-16">
              {(page.stats || []).map((s) => (
                <div key={s.label} className="flex items-center gap-4">
                  <DossierGlyph name={s.icon} className="text-primary h-8 w-8" />
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
                {page.statsCta}
              </a>
            </div>
          </div>
        </section>

        {/* Por qué Anthrovia */}
        <section className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6">
                {page.whyTitle}
              </h2>
              <p className="font-body text-body-lg text-on-surface-variant mb-10 md:mb-12">
                {page.whyText}
              </p>
              <div className="flex flex-col gap-8">
                {(page.whyItems || []).map((item) => (
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
                  {page.whyCta}
                </a>
              </div>
            </div>
            <div className="relative w-full h-[400px] md:h-[520px] rounded-2xl overflow-hidden shadow-ethereal">
              <img
                alt="Consultoría Anthrovia"
                className="w-full h-full object-cover"
                src={page.whyImage}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-surface/90 to-transparent">
                <p className="font-heading text-xl text-on-surface italic">
                  &ldquo;{page.whyQuote}&rdquo;
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
                {page.pathTitle}
              </h2>
              <div className="relative border-l border-outline-variant/30 ml-4 pb-8 space-y-10">
                {(page.steps || []).map((step, i) => (
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
                  &ldquo;{page.pathQuote}&rdquo;
                </p>
                <a
                  href={`mailto:${email}`}
                  className="text-primary font-label-md text-label-md border-b border-primary pb-1 hover:text-primary-container transition-colors"
                >
                  {page.pathMailtoLabel}
                </a>
              </div>
            </div>

            <div className="bg-surface rounded-3xl p-8 md:p-12 lg:p-14 shadow-ethereal border border-outline-variant/10">
              <h3 className="font-heading text-2xl md:text-3xl text-on-surface mb-8">{page.formTitle}</h3>
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
                  <p className="font-heading text-xl text-on-surface">{page.formSuccessTitle}</p>
                  <p className="font-body text-body-md text-on-surface-variant">
                    {page.formSuccessText}
                  </p>
                  <p className="text-sm text-on-surface-variant pt-4">
                    O escribinos a{" "}
                    <a className="text-primary underline" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </p>
                </div>
              ) : (
                <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
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
                    {fieldErrors.name && <p className="text-sm text-error">{fieldErrors.name}</p>}
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
                      {fieldErrors.email && <p className="text-sm text-error">{fieldErrors.email}</p>}
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
                      {fieldErrors.phone && <p className="text-sm text-error">{fieldErrors.phone}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="dossier-day" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                          Día preferido
                        </label>
                        <select
                          id="dossier-day"
                          required
                          value={form.day}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              day: e.target.value,
                              otherDay: e.target.value === OTHER_DAY ? form.otherDay : "",
                            })
                          }
                          className={selectClass}
                        >
                          <option value="" disabled>
                            Seleccioná un día
                          </option>
                          {days.map((d) => (
                            <option key={d} value={d}>
                              {DAY_LABEL[d] || d}
                            </option>
                          ))}
                          <option value={OTHER_DAY}>Ninguno de estos me queda</option>
                        </select>
                        {fieldErrors.day && <p className="text-sm text-error">{fieldErrors.day}</p>}
                      </div>
                      {form.day === OTHER_DAY && (
                        <div className="flex flex-col gap-2">
                          <label htmlFor="dossier-other-day" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                            ¿Qué día te queda cómodo?
                          </label>
                          <select
                            id="dossier-other-day"
                            required
                            value={form.otherDay}
                            onChange={(e) => setForm({ ...form, otherDay: e.target.value })}
                            className={selectClass}
                          >
                            <option value="" disabled>
                              Seleccioná un día
                            </option>
                            {ALL_DAYS.map((d) => (
                              <option key={d} value={d}>
                                {DAY_LABEL[d]}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="dossier-slot" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                          Franja horaria
                        </label>
                        <select
                          id="dossier-slot"
                          required
                          value={form.slot}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              slot: e.target.value,
                              otherSlot: e.target.value === OTHER_SLOT ? form.otherSlot : "",
                            })
                          }
                          className={selectClass}
                        >
                          <option disabled value="">
                            Seleccioná un rango horario
                          </option>
                          {slotOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                          <option value={OTHER_SLOT}>Otra</option>
                        </select>
                        {fieldErrors.slot && <p className="text-sm text-error">{fieldErrors.slot}</p>}
                      </div>
                      {form.slot === OTHER_SLOT && (
                        <div className="flex flex-col gap-2">
                          <label htmlFor="dossier-other-slot" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                            ¿Qué franja te queda cómoda?
                          </label>
                          <select
                            id="dossier-other-slot"
                            required
                            value={form.otherSlot}
                            onChange={(e) => setForm({ ...form, otherSlot: e.target.value })}
                            className={selectClass}
                          >
                            <option value="" disabled>
                              Seleccioná una franja
                            </option>
                            {EXTRA_SLOTS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
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
