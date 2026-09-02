import { ArrowRight } from "lucide-react"
import { useCMS } from "@/context/CMSContext"
import { HeroSectionContent } from "@/types/cms"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

interface HeroSectionProps {
  sectionId?: string
  variant?: "home" | "learning"
}

export const HeroSection = ({ sectionId = "hero", variant = "home" }: HeroSectionProps) => {
  const { content } = useCMS()
  const heroData = content.sections.find(s => s.id === sectionId) as HeroSectionContent

  if (!heroData || !heroData.isVisible) return null

  if (variant === "learning") {
    const imageSrc = heroData.imageUrl || heroData.videoUrl || "/ethos/hero-card.jpg"

    return (
      <section
        id="inicio"
        className="relative w-full pt-20 md:pt-32 lg:pt-36 pb-16 md:pb-24 lg:pb-section-gap px-margin-mobile lg:px-margin-desktop overflow-hidden bg-background/80"
      >
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `url(${heroData.videoUrl || "/ethos/hero.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "linear-gradient(black 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(black 50%, transparent 100%)",
          }}
        />
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-primary-fixed/20 to-transparent pointer-events-none rounded-bl-[120px] mix-blend-multiply" />

        <div className="relative max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <motion.div
            className="lg:col-span-6 flex flex-col gap-8 z-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-col gap-4">
              {heroData.badge && (
                <span
                  className="font-label-md text-primary uppercase tracking-widest bg-primary-fixed/30 self-start px-4 py-1.5 rounded-full"
                  data-cms-field="badge"
                >
                  {heroData.badge}
                </span>
              )}
              <h1
                className="font-heading text-headline-lg-mobile lg:text-display-lg text-on-surface text-balance"
                data-cms-field="title"
              >
                <span className="text-primary italic">{heroData.title}</span>
              </h1>
              <h2
                className="font-heading text-xl md:text-headline-md text-on-surface-variant max-w-lg text-balance"
                data-cms-field="subtitle"
              >
                {heroData.subtitle}
              </h2>
            </div>
            <p
              className="font-body text-body-md md:text-body-lg text-on-surface-variant max-w-xl leading-relaxed"
              data-cms-field="description"
            >
              {heroData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              {heroData.buttons.map((button, index) => (
                <a
                  key={index}
                  href={button.link}
                  className={
                    button.variant === "primary"
                      ? "bg-primary text-on-primary px-8 py-4 rounded-full font-label-md hover:bg-primary-container hover:text-on-primary-container transition-all text-center inline-flex items-center justify-center gap-2 group shadow-soft"
                      : "bg-surface border border-outline-variant text-on-surface px-8 py-4 rounded-full font-label-md hover:bg-surface-variant transition-all text-center"
                  }
                >
                  {button.text}
                  {button.variant === "primary" && (
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-6 relative mt-12 lg:mt-0 z-10"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-ethereal group"
              data-cms-field="image"
            >
              <img
                alt="Formación Anthrovia"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={imageSrc}
              />
            </div>
            <div className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 bg-surface p-5 md:p-6 rounded-xl shadow-soft border border-surface-variant max-w-[180px] hidden md:flex flex-col gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
              <span className="font-heading text-headline-md text-on-surface leading-none">
                {heroData.statsValue || "100%"}
              </span>
              <span className="font-label-md text-on-surface-variant">
                {heroData.statsLabel || "Enfoque Práctico"}
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  // Home consultoría hero
  return (
    <section
      id="inicio"
      className="relative min-h-[85vh] w-full flex items-center justify-center px-margin-mobile lg:px-margin-desktop py-16 md:py-24 lg:py-section-gap overflow-hidden bg-surface-container-low/80 pt-20 md:pt-32 lg:pt-36"
    >
      <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-primary-fixed/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary-fixed/40 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 w-full max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        <motion.div
          className="lg:col-span-7 flex flex-col gap-8 text-left z-20 lg:pr-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col gap-4">
            {heroData.badge && (
              <div className="inline-flex items-center gap-2" data-cms-field="badge">
                <span className="w-8 h-px bg-primary block" />
                <span className="font-label-md text-primary uppercase tracking-widest">
                  {heroData.badge}
                </span>
              </div>
            )}
            <h1
              className="font-heading text-headline-lg-mobile md:text-display-lg text-on-surface leading-tight text-balance"
              data-cms-field="title"
            >
              {heroData.title}{" "}
              {heroData.titleHighlight && (
                <span className="text-primary italic" data-cms-field="titleHighlight">
                  {heroData.titleHighlight}
                </span>
              )}{" "}
              <span data-cms-field="subtitle">{heroData.subtitle}</span>
            </h1>
          </div>
          <p
            className="font-body text-body-lg text-on-surface-variant max-w-2xl text-balance"
            data-cms-field="description"
          >
            {heroData.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {heroData.buttons.map((button, index) => {
              const isExternal = button.link.startsWith("http")
              const isRoute = button.link.startsWith("/") && !button.link.includes("#")
              const className =
                button.variant === "primary"
                  ? "inline-flex items-center justify-center bg-primary text-on-primary px-8 py-4 rounded-full font-label-md uppercase tracking-widest hover:bg-primary-container hover:shadow-lg transition-all duration-300 group"
                  : "inline-flex items-center justify-center bg-transparent border border-outline text-on-surface px-8 py-4 rounded-full font-label-md uppercase tracking-widest hover:bg-surface-variant transition-all"

              if (isRoute) {
                return (
                  <Link key={index} to={button.link} className={className}>
                    {button.text}
                    {button.variant === "primary" && (
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Link>
                )
              }

              return (
                <a
                  key={index}
                  href={button.link}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={className}
                >
                  {button.text}
                  {button.variant === "primary" && (
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </a>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-5 relative mt-16 lg:mt-0 hidden md:block"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="relative w-full aspect-[4/5] rounded-t-[120px] rounded-b-xl overflow-hidden shadow-2xl z-10 border-4 border-surface">
            <img
              className="w-full h-full object-cover"
              alt="Anthrovia — potencial humano"
              src={heroData.imageUrl || "/ethos/hero-pomelli-1.png"}
            />
          </div>

          <div className="absolute top-16 -right-4 lg:-right-8 bg-surface/90 backdrop-blur-md p-5 rounded-2xl shadow-xl z-20 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                psychology
              </span>
            </div>
            <div>
              <p className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs mb-1">
                {heroData.floatingCardTitle || "Enfoque Humano"}
              </p>
              <p className="font-body text-body-md font-semibold text-on-surface">
                {heroData.floatingCardSubtitle || "Potencial Estratégico"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
