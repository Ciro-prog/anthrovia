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
  Layout: LayoutDashboard,
}

const bgClass = {
  surface: "bg-surface",
  low: "bg-surface-container-low",
  container: "bg-surface-container",
  dark: "bg-inverse-surface text-inverse-on-surface",
}

function CourseButtons({ buttons }: { buttons: CourseBlockButton[] }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
      {buttons.map((btn) => {
        const base =
          "px-8 py-4 rounded-full font-label-md text-label-md transition-colors duration-300 inline-flex items-center justify-center"
        const variants = {
          primary: `${base} bg-primary text-on-primary hover:bg-primary-container shadow-md`,
          secondary: `${base} bg-white text-primary hover:bg-surface-container-low shadow-lg`,
          outline: `${base} border border-current/40 bg-transparent hover:bg-white/10`,
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
            {block.title}
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
  return (
    <section className={`w-full py-16 md:py-24 lg:py-section-gap ${bgClass[block.background || "surface"]}`}>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop max-w-3xl">
        {block.eyebrow && (
          <span className="inline-block px-3 py-1 bg-surface-variant text-on-surface-variant font-label-md text-label-md uppercase tracking-wider rounded-full mb-4">
            {block.eyebrow}
          </span>
        )}
        <h2 className="font-heading text-headline-md text-on-surface mb-6">{block.title}</h2>
        <p className="font-body text-body-lg text-on-surface-variant">{block.body}</p>
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
          <p className={`font-body text-body-lg ${isDark ? "text-inverse-on-surface/80" : "text-on-surface-variant"}`}>
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
        <h2 className="font-heading text-headline-md text-on-surface mb-10 text-center">{block.title}</h2>
        <div className="space-y-4">
          {block.items.map((item) => (
            <details
              key={item.question}
              className="group bg-surface-container-low rounded-xl p-5 md:p-6 open:shadow-soft transition-shadow"
            >
              <summary className="font-label-md text-on-surface cursor-pointer list-none flex justify-between items-center gap-4">
                {item.question}
                <span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
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
        <div className="[&_a]:border-white/50 [&_a.bg-primary]:bg-white [&_a.bg-primary]:text-primary [&_a.bg-primary]:hover:bg-surface-container-low [&_a.border]:text-white">
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
          case "scheduleCta":
            return <CourseScheduleCta key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
