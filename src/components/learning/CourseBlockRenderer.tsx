import { Link } from "react-router-dom"
import { CourseBlock, CourseBlockButton } from "@/types/cms"
import { motion } from "framer-motion"
import {
  Briefcase,
  RefreshCw,
  TrendingUp,
  Rocket,
  Lightbulb,
  PenLine,
  BarChart3,
  Sparkles,
  Bot,
  FolderKanban,
  MessageSquare,
  Users,
  Zap,
  Target,
  LineChart,
  Building2,
  Presentation,
  Shield,
  Mic,
  Brain,
  BookOpen,
  AudioLines,
  PersonStanding,
  MessageCircle,
  LayoutDashboard,
  Palette,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  RefreshCw,
  TrendingUp,
  Rocket,
  Lightbulb,
  PenLine,
  BarChart3,
  Sparkles,
  Bot,
  FolderKanban,
  MessageSquare,
  Users,
  Zap,
  Target,
  LineChart,
  Building2,
  Presentation,
  Shield,
  Mic,
  Brain,
  BookOpen,
  AudioLines,
  PersonStanding,
  MessageCircle,
  Palette,
  Layout: LayoutDashboard,
}

const bgClass = {
  surface: "bg-surface",
  low: "bg-surface-container-low",
  container: "bg-surface-container",
  dark: "bg-inverse-surface text-inverse-on-surface",
}

function renderTitleWithItalic(title: string, italic?: string, italicClass = "italic text-primary") {
  if (!italic || !title.includes(italic)) return title
  const parts = title.split(italic)
  return (
    <>
      {parts[0]}
      <span className={italicClass}>{italic}</span>
      {parts.slice(1).join(italic)}
    </>
  )
}

function CourseButtons({
  buttons,
  align = "center",
}: {
  buttons: CourseBlockButton[]
  align?: "center" | "start"
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row gap-4 flex-wrap ${
        align === "start" ? "justify-start" : "justify-center"
      }`}
    >
      {buttons.map((btn) => {
        const base =
          "px-10 py-4 rounded font-label-md text-label-md uppercase tracking-widest transition-all duration-300 inline-flex items-center justify-center hover:-translate-y-0.5"
        const variants = {
          primary: `${base} bg-primary text-on-primary hover:bg-primary-container shadow-md`,
          secondary: `${base} bg-white text-primary hover:bg-surface-container-low shadow-lg`,
          outline: `${base} border border-outline text-on-surface bg-transparent hover:bg-surface-container hover:border-primary`,
        }
        const className = variants[btn.variant || "primary"]
        if (btn.link.startsWith("/")) {
          return (
            <Link key={btn.text} to={btn.link} className={className}>
              {btn.text}
            </Link>
          )
        }
        return (
          <a key={btn.text} href={btn.link} className={className}>
            {btn.text}
          </a>
        )
      })}
    </div>
  )
}

export function CourseHero({ block }: { block: Extract<CourseBlock, { type: "hero" }> }) {
  const editorial = block.layout === "editorial"

  if (editorial) {
    return (
      <section className="relative w-full min-h-[90vh] flex items-center bg-surface pb-section-gap pt-8 md:pt-12 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-surface/80 via-surface/95 to-surface" />
        <div className="relative z-10 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
            <h1 className="font-heading text-headline-lg-mobile md:text-headline-lg lg:text-[4rem] lg:leading-[1.05] tracking-[-0.03em] text-on-surface text-balance">
              {renderTitleWithItalic(block.title, block.titleItalic, "italic text-primary")}
            </h1>
            {block.paragraphs?.map((p, i) => (
              <p
                key={p.slice(0, 40)}
                className={`font-body max-w-2xl text-balance ${
                  i === 0 ? "text-body-lg text-on-surface" : "text-body-md text-on-surface-variant"
                }`}
              >
                {p}
              </p>
            ))}
            {block.highlight && (
              <div className="p-6 md:p-8 bg-surface-container-low rounded border-l-4 border-primary text-left w-full max-w-2xl">
                <p className="font-body text-body-lg text-on-surface font-semibold">{block.highlight}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mt-2">
              {block.buttons && <CourseButtons buttons={block.buttons} align="start" />}
              {block.checks && block.checks.length > 0 && (
                <div className="flex flex-col gap-3">
                  {block.checks.map((check) => (
                    <div key={check} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                      <span className="font-body text-body-md text-on-surface-variant">{check}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center justify-center pt-8 md:pt-12 pb-20 overflow-hidden bg-surface">
      {block.imageUrl && (
        <div className="absolute inset-0 z-0">
          <img
            src={block.imageUrl}
            alt=""
            className="w-full h-full object-cover opacity-15 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/90 to-surface" />
        </div>
      )}
      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8"
        >
          <h1 className="font-heading text-headline-lg-mobile md:text-headline-md lg:text-[2.75rem] text-primary tracking-tight leading-tight">
            {renderTitleWithItalic(block.title, block.titleItalic)}
          </h1>
          {block.paragraphs?.map((p) => (
            <p key={p.slice(0, 40)} className="font-body text-body-lg text-on-surface-variant max-w-2xl">
              {p}
            </p>
          ))}
          {block.highlight && (
            <div className="p-6 md:p-8 bg-surface-container-low rounded-xl border-l-4 border-primary text-left w-full max-w-2xl">
              <p className="font-body text-body-lg text-on-surface font-semibold">{block.highlight}</p>
            </div>
          )}
          {block.buttons && <CourseButtons buttons={block.buttons} />}
        </motion.div>
      </div>
    </section>
  )
}

export function CourseRichText({ block }: { block: Extract<CourseBlock, { type: "richText" }> }) {
  const center = block.align === "center"
  return (
    <section className={`w-full py-16 md:py-24 lg:py-section-gap ${bgClass[block.background || "surface"]}`}>
      <div
        className={`max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop max-w-3xl ${
          center ? "text-center" : ""
        }`}
      >
        {block.eyebrow && (
          <span className="inline-block px-3 py-1 bg-surface-variant text-on-surface-variant font-label-md text-label-md uppercase tracking-wider rounded-full mb-4">
            {block.eyebrow}
          </span>
        )}
        <h2 className="font-heading text-headline-md text-on-surface mb-6">
          {renderTitleWithItalic(block.title, block.titleItalic)}
        </h2>
        {block.paragraphs?.map((p) => (
          <p key={p.slice(0, 40)} className="font-body text-body-lg text-on-surface-variant mb-4">
            {p}
          </p>
        ))}
        {block.body && <p className="font-body text-body-lg text-on-surface-variant">{block.body}</p>}
      </div>
    </section>
  )
}

export function CourseContextSplit({ block }: { block: Extract<CourseBlock, { type: "contextSplit" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-[1.75rem] md:text-[1.875rem] text-on-surface">
              {renderTitleWithItalic(block.title, block.titleItalic, "italic")}
            </h2>
            {block.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="font-body text-body-md text-on-surface-variant">
                {p}
              </p>
            ))}
            {block.formulaLabel && block.formulaItems && (
              <>
                <div className="flex items-center gap-4 py-6">
                  <div className="h-px flex-1 bg-outline-variant" />
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                    {block.formulaLabel}
                  </span>
                  <div className="h-px flex-1 bg-outline-variant" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  {block.formulaItems.map((item) => {
                    const Icon = iconMap[item.iconName] || Sparkles
                    return (
                      <div
                        key={item.label}
                        className="p-6 bg-surface rounded shadow-sm border border-outline-variant/30 flex flex-col items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                      >
                        <Icon className="h-8 w-8 text-primary" />
                        <span className="font-label-md text-label-md text-on-surface uppercase">{item.label}</span>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
            {block.closing && (
              <p className="font-body text-body-md text-on-surface-variant mt-4">{block.closing}</p>
            )}
          </div>
          <div className="relative h-full min-h-[400px] md:min-h-[500px] w-full rounded overflow-hidden shadow-xl">
            <img src={block.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function CourseDesireFear({ block }: { block: Extract<CourseBlock, { type: "desireFear" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile md:px-margin-desktop bg-primary text-on-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-container rounded-full blur-[120px] opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="max-w-container-max mx-auto relative z-10 flex flex-col items-center text-center gap-12 md:gap-16">
        <h2 className="font-heading text-headline-md md:text-[1.875rem] text-on-primary max-w-4xl mx-auto text-balance">
          {block.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter w-full">
          {[
            { side: block.desire, icon: "arrow_forward" as const },
            { side: block.fear, icon: "close" as const },
          ].map(({ side, icon }) => (
            <div
              key={side.title}
              className="bg-primary-container/40 p-8 md:p-10 backdrop-blur-sm rounded border border-on-primary/10 flex flex-col gap-8 text-left hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="font-heading text-headline-md italic border-b border-on-primary/20 pb-4">
                {side.title}
              </h3>
              <ul className="flex flex-col gap-6">
                {side.items.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-on-primary-container">{icon}</span>
                    <span className="font-body text-body-md text-on-primary/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CourseBeforeAfter({ block }: { block: Extract<CourseBlock, { type: "beforeAfter" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile md:px-margin-desktop bg-surface">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="font-heading text-headline-md text-on-surface mb-6">{block.title}</h2>
          {block.body && <p className="font-body text-body-lg text-on-surface-variant">{block.body}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-container p-8 md:p-10 rounded-2xl flex flex-col gap-6 relative overflow-hidden">
            <div className="flex items-center gap-4 text-on-surface-variant mb-2">
              <span className="material-symbols-outlined text-2xl">cancel</span>
              <h3 className="font-label-md text-label-md uppercase tracking-widest">{block.before.title}</h3>
            </div>
            <ul className="flex flex-col gap-4 font-body text-body-md text-on-surface-variant">
              {block.before.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-outline mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-primary-container p-8 md:p-10 rounded-2xl flex flex-col gap-6 relative overflow-hidden shadow-xl md:-translate-y-4">
            <div className="flex items-center gap-4 text-on-primary-container mb-2 relative z-10">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
              <h3 className="font-label-md text-label-md uppercase tracking-widest">{block.after.title}</h3>
            </div>
            <ul className="flex flex-col gap-4 font-body text-body-md text-on-primary-container relative z-10">
              {block.after.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-primary-fixed/60 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CourseTriad({ block }: { block: Extract<CourseBlock, { type: "triad" }> }) {
  return (
    <section className="py-16 md:py-24 lg:py-section-gap w-full bg-primary text-on-primary">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-center mb-12 md:mb-20 uppercase tracking-wide">
          {block.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {block.items.map((item) =>
            item.featured ? (
              <div
                key={item.title}
                className="border-t-4 border-secondary pt-8 md:-translate-y-4 bg-primary-container p-8 rounded-b-lg shadow-xl relative"
              >
                <h3 className="font-heading text-headline-md mb-4 text-secondary-fixed">{item.title}</h3>
                <p className="font-body text-body-lg text-on-primary font-medium leading-relaxed">{item.body}</p>
              </div>
            ) : (
              <div key={item.title} className="border-t border-primary-fixed-dim/30 pt-8">
                <h3 className="font-heading text-headline-md mb-4 text-primary-fixed">{item.title}</h3>
                <p className="font-body text-body-md text-inverse-on-surface/80">{item.body}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}

export function CoursePathway({ block }: { block: Extract<CourseBlock, { type: "pathway" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile md:px-margin-desktop bg-surface relative">
      <div className="max-w-container-max mx-auto flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-outline-variant pb-8">
          <div className="max-w-2xl flex flex-col gap-4">
            <h2 className="font-heading text-headline-md md:text-headline-lg text-primary uppercase tracking-widest">
              {block.eyebrow}
            </h2>
            <div className="font-body text-body-lg text-on-surface-variant mt-4 flex flex-col gap-4">
              {block.intro.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            {block.forYouLabel && block.forYou && (
              <div className="mt-6 flex flex-col gap-4">
                <p className="font-label-md text-label-md text-primary uppercase tracking-widest">
                  {block.forYouLabel}
                </p>
                <ul className="flex flex-col gap-3">
                  {block.forYou.map((item) => (
                    <li key={item} className="flex items-center gap-3 font-body text-body-md text-on-surface-variant">
                      <span className="text-primary font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {block.note && (
              <p className="font-body text-body-md text-on-surface-variant mt-6 italic">{block.note}</p>
            )}
            <h2 className="font-heading text-headline-md md:text-headline-lg text-on-surface mt-6">
              {renderTitleWithItalic(block.stepsTitle, block.stepsTitleItalic, "italic text-on-surface-variant")}
            </h2>
          </div>
          {block.aside && (
            <p className="font-body text-body-md max-w-sm font-bold text-primary">{block.aside}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-12 md:gap-16 relative">
          <div className="hidden lg:block absolute left-[50px] top-10 bottom-10 w-px bg-outline-variant/50" />
          {block.steps.map((step, i) => {
            const n = i + 1
            const circleClass = step.highlight
              ? "bg-primary text-on-primary"
              : "bg-surface-container text-primary"
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10"
              >
                <div className="lg:w-[100px] shrink-0">
                  <div
                    className={`w-16 h-16 lg:w-[100px] lg:h-[100px] ${circleClass} rounded-full flex items-center justify-center font-heading text-headline-md border-4 border-surface shadow-sm`}
                  >
                    {n}
                  </div>
                </div>
                <div
                  className={`flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-surface-container-lowest p-8 md:p-10 shadow-sm border rounded hover:shadow-lg transition-shadow duration-300 ${
                    step.highlight ? "border-primary/20" : "border-outline-variant/20"
                  }`}
                >
                  <div className={`flex flex-col gap-6 ${step.imageFirst ? "lg:order-2" : ""}`}>
                    <h3 className="font-heading text-headline-md text-on-surface font-bold">{step.title}</h3>
                    <div className="font-body text-body-md text-on-surface-variant flex flex-col gap-4">
                      {step.paragraphs.map((p) => (
                        <p key={p.slice(0, 50)}>{p}</p>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <span className="font-label-md text-label-md text-on-surface uppercase opacity-60 block mb-2">
                        Resultado esperado
                      </span>
                      <span className="font-body text-body-md font-bold text-primary-container">{step.result}</span>
                    </div>
                  </div>
                  <div
                    className={`relative h-56 lg:h-auto min-h-[220px] rounded overflow-hidden ${
                      step.imageFirst ? "lg:order-1" : ""
                    }`}
                  >
                    <img src={step.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function CourseToolsSplit({ block }: { block: Extract<CourseBlock, { type: "toolsSplit" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low">
      <div className="max-w-container-max mx-auto flex flex-col gap-12 md:gap-16">
        <div className="text-center">
          <h2 className="font-heading text-headline-md text-on-surface">{block.title}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div className="flex flex-col gap-8">
            {block.categories.map((cat) => (
              <div key={cat.title} className="flex flex-col gap-2">
                <h3 className="font-heading text-headline-md text-primary">{cat.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant">{cat.tools}</p>
              </div>
            ))}
            <div className="font-body text-body-md text-on-surface-variant flex flex-col gap-4 mt-2">
              {block.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative w-full rounded overflow-hidden shadow-md">
            <img src={block.imageUrl} alt="" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function CoursePhilosophy({ block }: { block: Extract<CourseBlock, { type: "philosophy" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile md:px-margin-desktop bg-surface text-center">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <h2 className="font-heading text-headline-md md:text-[2.5rem] lg:text-[3.75rem] text-primary italic leading-tight">
          {block.title}
        </h2>
        <div className="font-body text-body-lg text-on-surface-variant flex flex-col gap-4">
          {block.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          {block.emphasis && <p className="font-bold text-on-surface">{block.emphasis}</p>}
          {block.paragraphsAfter?.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CourseTestimonials({ block }: { block: Extract<CourseBlock, { type: "testimonials" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div className="text-center md:col-span-2 mb-8 md:mb-12">
          <h2 className="font-heading text-headline-md md:text-[2.5rem] text-on-surface uppercase tracking-widest">
            {block.title}
          </h2>
        </div>
        {block.items.map((item) => (
          <div
            key={item.author}
            className="p-8 bg-surface-container rounded border border-outline-variant/30 flex flex-col gap-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <span className="material-symbols-outlined text-primary text-[32px]">format_quote</span>
            <p className="font-body text-body-lg text-on-surface-variant italic">{item.quote}</p>
            <div className="mt-auto pt-6 border-t border-outline-variant/50">
              <p className="font-label-md text-label-md text-on-surface uppercase">{item.author}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function CourseTeacherBand({ block }: { block: Extract<CourseBlock, { type: "teacherBand" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile md:px-margin-desktop bg-primary text-on-primary">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="font-heading text-headline-md md:text-[1.875rem]">{block.title}</h2>
          {block.lead && <p className="font-body text-body-lg text-primary-fixed/90">{block.lead}</p>}
          <div className="flex flex-col gap-2 mt-2">
            <h3 className="font-heading text-headline-md text-primary-fixed">{block.name}</h3>
            <p className="font-body text-body-md text-on-primary/80 italic">{block.role}</p>
            {block.experienceLabel && (
              <p className="font-label-md text-label-md text-primary-fixed uppercase tracking-widest mt-4">
                {block.experienceLabel}
              </p>
            )}
            {block.experience && (
              <ul className="flex flex-col gap-3 mt-2">
                {block.experience.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary-fixed">check</span>
                    <span className="font-body text-body-md">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {block.paragraphs && (
            <div className="mt-4 flex flex-col gap-4">
              {block.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="font-body text-body-md text-on-primary/90">
                  {p}
                </p>
              ))}
              {block.emphasis && (
                <p className="font-body text-body-md font-bold text-primary-fixed">{block.emphasis}</p>
              )}
            </div>
          )}
        </div>
        <div className="w-full md:w-1/3 relative">
          <div className="bg-primary-container overflow-hidden border-4 border-primary-fixed/20 shadow-xl aspect-[3/4] rounded-2xl max-w-[80%] mx-auto p-4">
            <img src={block.imageUrl} alt={block.name} className="w-full h-full object-cover rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function CourseInvestmentCard({ block }: { block: Extract<CourseBlock, { type: "investmentCard" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile md:px-margin-desktop bg-surface">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <div className="text-center">
          <h2 className="font-heading text-headline-md text-on-surface">{block.title}</h2>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded p-8 md:p-12 shadow-sm relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
          {block.badge && (
            <div className="absolute top-0 right-0 bg-error text-on-error font-label-md text-label-md py-2 px-6 uppercase tracking-wider">
              {block.badge}
            </div>
          )}
          <div className="flex flex-col gap-8 mt-6">
            <ul className="flex flex-col gap-4">
              {block.inclusions.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">done_all</span>
                  <span className="font-body text-body-lg text-on-surface-variant">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-outline-variant/50">
              <div className="flex flex-col items-center md:items-start">
                {block.priceOld && (
                  <span className="font-body text-on-surface-variant line-through text-2xl md:text-[2.2rem]">
                    {block.priceOld}
                  </span>
                )}
                <span className="font-heading text-headline-md md:text-[2.2rem] text-primary">
                  {block.priceNew}
                  {block.discountBadge && (
                    <span className="font-label-md text-label-md text-error align-top ml-2">
                      {block.discountBadge}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CourseBonuses({ block }: { block: Extract<CourseBlock, { type: "bonuses" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low">
      <div className="max-w-container-max mx-auto flex flex-col gap-12">
        <h2 className="font-heading text-headline-md md:text-[2.5rem] text-on-surface text-center">{block.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {block.items.map((item) =>
            item.featured ? (
              <div
                key={item.title}
                className="bg-primary p-6 rounded shadow-lg flex flex-col gap-4 relative overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative z-10 flex flex-col h-full gap-4">
                  <h4 className="font-label-md text-label-md text-primary-fixed uppercase">{item.label}</h4>
                  <h3 className="font-heading text-headline-md text-on-primary">{item.title}</h3>
                  <p className="font-body text-sm text-on-primary/90 flex-grow">{item.description}</p>
                  <span className="font-label-md text-label-md text-primary-fixed mt-auto pt-4 border-t border-on-primary/20">
                    {item.valueLabel}
                  </span>
                </div>
              </div>
            ) : (
              <div
                key={item.title}
                className="bg-surface p-6 rounded border border-outline-variant/30 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <h4 className="font-label-md text-label-md text-primary uppercase">{item.label}</h4>
                <h3 className="font-heading text-headline-md font-bold text-on-surface">{item.title}</h3>
                <p className="font-body text-sm text-on-surface-variant flex-grow">{item.description}</p>
                <span className="font-label-md text-label-md text-on-surface mt-auto pt-4 border-t border-outline-variant/20">
                  {item.valueLabel}
                </span>
              </div>
            )
          )}
        </div>
        <p className="font-heading text-headline-md text-on-surface text-center mt-4 max-w-2xl mx-auto text-balance">
          {block.footer.includes("us$ 167") ? (
            <>
              Todos los bonos por un total de <span className="text-primary font-bold">us$ 167</span>, incluídos en
              tu único pago de <span className="text-primary font-bold">$ar 28.500</span>
            </>
          ) : (
            block.footer
          )}
        </p>
      </div>
    </section>
  )
}

export function CourseClosingCta({ block }: { block: Extract<CourseBlock, { type: "closingCta" }> }) {
  return (
    <section className="w-full pb-16 md:pb-24 lg:pb-section-gap pt-8 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto flex flex-col items-center text-center gap-10">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[32px]">workspace_premium</span>
        </div>
        <h2 className="font-heading text-headline-md md:text-[2.5rem] lg:text-[2.8rem] text-on-surface max-w-4xl text-balance">
          {renderTitleWithItalic(block.title, block.titleItalic)}
        </h2>
        <div className="flex flex-col items-center text-center gap-10 mt-4 w-full max-w-2xl mx-auto">
          <CourseButtons buttons={[block.primary]} />
          {(block.doubtTitle || block.doubtBody) && (
            <div className="flex flex-col gap-4">
              {block.doubtTitle && (
                <h3 className="font-heading text-headline-md text-primary">{block.doubtTitle}</h3>
              )}
              {block.doubtBody && (
                <p className="font-body text-body-md text-on-surface-variant">{block.doubtBody}</p>
              )}
            </div>
          )}
          {block.secondary && <CourseButtons buttons={[block.secondary]} />}
        </div>
      </div>
    </section>
  )
}

export function CourseTwoColumn({ block }: { block: Extract<CourseBlock, { type: "twoColumn" }> }) {
  return (
    <section className={`w-full py-16 md:py-24 lg:py-section-gap ${bgClass[block.background || "low"]}`}>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter lg:gap-24">
        {[block.left, block.right].map((col) => (
          <div key={col.title} className="flex flex-col gap-6">
            {col.eyebrow && (
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-label-md text-label-md uppercase tracking-wider rounded-full self-start">
                {col.eyebrow}
              </span>
            )}
            <h2 className="font-heading text-headline-md text-on-surface">{col.title}</h2>
            <p className="font-body text-body-md text-on-surface-variant">{col.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function CourseIconGrid({ block }: { block: Extract<CourseBlock, { type: "iconGrid" }> }) {
  return (
    <section className={`w-full py-16 md:py-24 lg:py-section-gap ${bgClass[block.background || "container"]}`}>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-12 md:gap-16">
        <div className="max-w-2xl">
          <h2 className="font-heading text-headline-md text-on-surface mb-4">{block.title}</h2>
          {block.description && (
            <p className="font-body text-body-md text-on-surface-variant">{block.description}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {block.items.map((item, i) => {
            const Icon = iconMap[item.iconName] || Lightbulb
            const tone =
              item.tone === "primary"
                ? "bg-primary-container text-on-primary-container"
                : "bg-secondary-container text-on-secondary-container"
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-surface p-8 md:p-10 rounded-2xl shadow-soft flex flex-col gap-4"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="font-body text-body-md text-on-surface-variant">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function CourseSplitMedia({ block }: { block: Extract<CourseBlock, { type: "splitMedia" }> }) {
  const imageFirst = block.imagePosition !== "right"
  const isDark = block.background === "dark"
  return (
    <section
      className={`w-full py-16 md:py-24 lg:py-section-gap ${
        isDark ? bgClass.dark : bgClass[block.background || "surface"]
      }`}
    >
      <div
        className={`max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center gap-12 md:gap-16 ${
          imageFirst ? "" : "md:flex-row-reverse"
        }`}
      >
        <div className="w-full md:w-1/2 relative">
          <div className="absolute inset-0 bg-primary/5 rounded-2xl transform translate-x-4 translate-y-4" />
          <img
            src={block.imageUrl}
            alt=""
            className="relative z-10 w-full h-[320px] md:h-[480px] object-cover rounded-2xl shadow-ethereal"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className={`font-heading text-headline-md ${isDark ? "text-primary-fixed" : "text-primary"}`}>
            {block.title}
          </h2>
          <p
            className={`font-body text-body-lg ${isDark ? "text-inverse-on-surface/80" : "text-on-surface-variant"}`}
          >
            {block.body}
          </p>
        </div>
      </div>
    </section>
  )
}

export function CourseDarkBand({ block }: { block: Extract<CourseBlock, { type: "darkBand" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap bg-inverse-surface text-inverse-on-surface overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="flex flex-col gap-6 relative z-10">
          <h2 className="font-heading text-headline-md text-primary-fixed">{block.title}</h2>
          <p className="font-body text-body-lg text-inverse-on-surface/80">{block.body}</p>
        </div>
        {block.imageUrl && (
          <div className="relative w-full h-[280px] md:h-[400px]">
            <div className="absolute inset-0 bg-primary/20 rounded-3xl transform rotate-3" />
            <img
              src={block.imageUrl}
              alt=""
              className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl opacity-90 mix-blend-luminosity"
            />
          </div>
        )}
      </div>
    </section>
  )
}

export function CourseTags({ block }: { block: Extract<CourseBlock, { type: "tags" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row gap-12 md:gap-16 items-start">
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="font-heading text-headline-md text-on-surface">{block.title}</h2>
          {block.body && <p className="font-body text-body-md text-on-surface-variant">{block.body}</p>}
          <div className="flex flex-wrap gap-3 mt-2">
            {block.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-secondary/10 text-secondary font-label-md text-label-md tracking-wider rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {(block.asideTitle || block.asideBody) && (
          <div className="w-full md:w-1/2 bg-secondary-container/30 p-8 rounded-2xl flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <Brain className="h-7 w-7 text-on-secondary" />
            </div>
            <div>
              {block.asideTitle && (
                <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-2">
                  {block.asideTitle}
                </h4>
              )}
              {block.asideBody && (
                <p className="font-body text-body-md text-on-surface-variant">{block.asideBody}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export function CourseInstructors({ block }: { block: Extract<CourseBlock, { type: "instructors" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap bg-surface-container-highest">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-12 md:gap-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-headline-md text-on-surface">{block.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter lg:gap-24">
          {block.people.map((person, i) => (
            <div key={person.name} className={`flex flex-col gap-6 ${i === 1 ? "md:mt-16" : ""}`}>
              <div className="relative w-full aspect-square md:aspect-[3/4] overflow-hidden rounded-2xl shadow-ethereal group">
                <img
                  src={person.imageUrl}
                  alt={person.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="font-heading text-headline-md text-white mb-1">{person.name}</h3>
                  <p className="font-label-md text-label-md text-primary-fixed uppercase tracking-wider">
                    {person.role}
                  </p>
                </div>
              </div>
              <p className="font-body text-body-md text-on-surface-variant">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CourseFaq({ block }: { block: Extract<CourseBlock, { type: "faq" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop max-w-3xl">
        <h2 className="font-heading text-headline-md text-on-surface mb-10 text-center uppercase tracking-widest">
          {block.title}
        </h2>
        <div className="space-y-4">
          {block.items.map((item) => (
            <details
              key={item.question}
              className="group bg-surface-container-low rounded-xl p-5 md:p-6 open:shadow-soft transition-shadow"
            >
              <summary className="font-label-md text-on-surface cursor-pointer list-none flex justify-between items-center gap-4">
                {item.question}
                <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <p className="font-body text-body-md text-on-surface-variant mt-4">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CourseScheduleCta({ block }: { block: Extract<CourseBlock, { type: "scheduleCta" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap bg-primary text-on-primary">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center gap-10 md:gap-12">
        <div className="max-w-4xl flex flex-col gap-6">
          <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-white">{block.title}</h2>
          <p className="font-body text-body-lg text-primary-fixed-dim/90">{block.body}</p>
        </div>
        {(block.metaTitle || block.chips) && (
          <div className="w-full max-w-3xl bg-primary-container p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 border border-primary-fixed/20">
            <div className="flex flex-col items-center md:items-start text-left gap-2">
              {block.metaTitle && (
                <span className="font-label-md text-label-md text-primary-fixed uppercase tracking-widest">
                  {block.metaTitle}
                </span>
              )}
              {block.metaBody && (
                <span className="font-body text-body-md text-on-primary-container">{block.metaBody}</span>
              )}
            </div>
            {block.chips && (
              <div className="flex flex-wrap justify-center md:justify-end gap-2 max-w-xs">
                {block.chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1 bg-primary text-on-primary text-xs font-label-md rounded-full border border-primary-fixed/30"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="[&_a]:border-white/50 [&_a.bg-primary]:bg-white [&_a.bg-primary]:text-primary [&_a.bg-primary]:hover:bg-surface-container-low [&_a.border]:text-white [&_a.border]:border-white/50">
          <CourseButtons
            buttons={block.buttons.map((b) =>
              b.variant === "primary" ? { ...b, variant: "secondary" as const } : b
            )}
          />
        </div>
      </div>
    </section>
  )
}

export function CoursePricing({ block }: { block: Extract<CourseBlock, { type: "pricing" }> }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-section-gap bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-12">
        <div className="max-w-3xl">
          <h2 className="font-heading text-headline-md text-on-surface mb-4">{block.title}</h2>
          {block.body && <p className="font-body text-body-lg text-on-surface-variant">{block.body}</p>}
        </div>

        {block.items && block.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {block.items.map((item) => (
              <div
                key={item.title}
                className="bg-surface p-6 md:p-8 rounded-2xl shadow-soft border border-outline-variant/20 flex flex-col gap-3"
              >
                <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider">{item.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant flex-grow">{item.description}</p>
                {item.valueLabel && (
                  <p className="font-label-md text-sm text-on-surface mt-auto pt-4 border-t border-outline-variant/20">
                    {item.valueLabel}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="bg-primary text-on-primary rounded-3xl p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
          {block.badge && (
            <span className="absolute top-4 right-4 md:top-6 md:right-6 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-md text-xs uppercase tracking-wider">
              {block.badge}
            </span>
          )}
          <div className="flex flex-col gap-2 max-w-xl">
            <p className="font-label-md text-label-md text-primary-fixed uppercase tracking-widest">{block.priceLabel}</p>
            <p className="font-heading text-headline-lg-mobile md:text-headline-lg text-white">{block.priceAmount}</p>
            {block.strikethrough && (
              <p className="font-body text-body-md text-primary-fixed-dim/80 line-through">{block.strikethrough}</p>
            )}
          </div>
          {block.buttons && <CourseButtons buttons={block.buttons} />}
        </div>
      </div>
    </section>
  )
}

export function CourseBlockRenderer({ blocks }: { blocks: CourseBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`
        switch (block.type) {
          case "hero":
            return <CourseHero key={key} block={block} />
          case "richText":
            return <CourseRichText key={key} block={block} />
          case "contextSplit":
            return <CourseContextSplit key={key} block={block} />
          case "desireFear":
            return <CourseDesireFear key={key} block={block} />
          case "beforeAfter":
            return <CourseBeforeAfter key={key} block={block} />
          case "triad":
            return <CourseTriad key={key} block={block} />
          case "pathway":
            return <CoursePathway key={key} block={block} />
          case "toolsSplit":
            return <CourseToolsSplit key={key} block={block} />
          case "philosophy":
            return <CoursePhilosophy key={key} block={block} />
          case "testimonials":
            return <CourseTestimonials key={key} block={block} />
          case "teacherBand":
            return <CourseTeacherBand key={key} block={block} />
          case "investmentCard":
            return <CourseInvestmentCard key={key} block={block} />
          case "bonuses":
            return <CourseBonuses key={key} block={block} />
          case "closingCta":
            return <CourseClosingCta key={key} block={block} />
          case "twoColumn":
            return <CourseTwoColumn key={key} block={block} />
          case "iconGrid":
            return <CourseIconGrid key={key} block={block} />
          case "splitMedia":
            return <CourseSplitMedia key={key} block={block} />
          case "darkBand":
            return <CourseDarkBand key={key} block={block} />
          case "tags":
            return <CourseTags key={key} block={block} />
          case "instructors":
            return <CourseInstructors key={key} block={block} />
          case "faq":
            return <CourseFaq key={key} block={block} />
          case "pricing":
            return <CoursePricing key={key} block={block} />
          case "scheduleCta":
            return <CourseScheduleCta key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
