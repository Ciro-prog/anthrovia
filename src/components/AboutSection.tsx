import { motion } from "framer-motion"
import { useCMS } from "@/context/CMSContext"
import { AboutSectionContent } from "@/types/cms"
import { getIcon } from "@/lib/iconMap"

interface AboutSectionProps {
  sectionId?: string
  variant?: "home" | "learning"
}

export const AboutSection = ({ sectionId = "about", variant = "home" }: AboutSectionProps) => {
  const { content } = useCMS()
  const aboutData = content.sections.find(s => s.id === sectionId) as AboutSectionContent

  if (!aboutData || !aboutData.isVisible) return null

  if (variant === "learning") {
    return <LearningAbout aboutData={aboutData} />
  }

  const pillars = aboutData.pillars || []

  return (
    <>
      {/* Pillars */}
      {pillars.length > 0 && (
        <section className="w-full px-margin-mobile lg:px-margin-desktop py-16 md:py-24 lg:py-section-gap bg-surface-container-high relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-outline-variant/30 opacity-50 pointer-events-none" />
          <div className="relative z-10 w-full max-w-container-max mx-auto flex flex-col items-center text-center gap-12 md:gap-16">
            {aboutData.pillarsTitle && (
              <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight max-w-3xl text-balance">
                {aboutData.pillarsTitle.split("humana").map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <span className="italic text-primary">humana</span>
                    </span>
                  ) : (
                    <span key={i}>
                      {part.split("estratégica").map((p2, j, a2) =>
                        j < a2.length - 1 ? (
                          <span key={j}>
                            {p2}
                            <span className="italic text-primary">estratégica</span>
                          </span>
                        ) : (
                          <span key={j}>{p2}</span>
                        )
                      )}
                    </span>
                  )
                )}
              </h2>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
              {pillars.map((pillar, index) => {
                const Icon = getIcon(pillar.iconName)
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center text-center gap-6 group"
                  >
                    <div className="w-24 h-24 rounded-full bg-surface-container-lowest shadow-soft flex items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-heading text-2xl text-on-surface">{pillar.title}</h4>
                      <p className="font-body text-body-md text-on-surface-variant max-w-xs mx-auto">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Why Anthrovia / Founder */}
      <section
        id="anthrovia"
        className="w-full px-margin-mobile lg:px-margin-desktop py-16 md:py-24 lg:py-section-gap"
      >
        <div className="w-full max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-12 -left-8 lg:-left-16 z-0 select-none hidden md:block pointer-events-none">
              <span className="font-heading text-[100px] lg:text-[140px] text-surface-variant/50 leading-none tracking-tighter">
                ANTHROVIA
              </span>
            </div>
            <div className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-[40px] overflow-hidden shadow-ethereal border-4 border-surface z-10 bg-surface-container">
              <img
                alt={aboutData.personName || "Founder Anthrovia HR"}
                className="w-full h-full object-cover object-top"
                src={aboutData.personImage || "/ethos/founder-betsabe.png"}
              />
            </div>
            <div className="absolute -bottom-6 right-4 md:right-8 bg-surface-container-lowest p-5 rounded-2xl shadow-soft z-20 flex flex-col gap-1 border border-surface-variant">
              <span className="font-label-md text-primary uppercase tracking-widest">
                {aboutData.personName}
              </span>
              <span className="font-body text-sm text-on-surface-variant">
                {aboutData.personRole}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8 lg:pl-12 mt-16 lg:mt-0 relative z-10">
            <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight">
              {aboutData.title}
            </h2>
            <div className="flex flex-col gap-5">
              {aboutData.introText.map((paragraph, i) => (
                <p
                  key={i}
                  className={`font-body text-body-md md:text-body-lg text-on-surface-variant leading-relaxed ${
                    i === 0 ? "italic" : ""
                  }`}
                >
                  {paragraph.includes("Anthropos") ? (
                    <>
                      Anthrovia nace de la unión entre{" "}
                      <strong className="text-on-surface">Anthropos</strong> (persona) y{" "}
                      <strong className="text-on-surface">Vía</strong> (camino).
                    </>
                  ) : paragraph.includes("personas, estrategia y tecnología") ? (
                    <>
                      Acompañamos ese proceso integrando{" "}
                      <strong className="text-on-surface">personas, estrategia y tecnología</strong>,
                      para transformar necesidades en soluciones y generar oportunidades de crecimiento.
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function LearningAbout({ aboutData }: { aboutData: AboutSectionContent }) {
  const name = aboutData.personName || aboutData.title
  const role = aboutData.personRole || ""
  const image = aboutData.personImage || "/ethos/mauricio.jpg"
  const specialties = aboutData.specialties || []

  return (
    <section
      id="sobre-nosotros"
      className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile lg:px-margin-desktop bg-surface-container-high relative"
    >
      <div className="max-w-container-max mx-auto">
        <motion.div
          className="flex flex-col gap-10 bg-surface p-8 md:p-12 lg:p-16 rounded-[40px] shadow-soft relative overflow-hidden max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-surface-container-low rounded-full opacity-50 z-0" />
          <div className="relative z-10 w-full">
            <span className="font-label-md text-primary uppercase tracking-widest">
              {aboutData.eyebrow}
            </span>
            <div className="mt-4">
              <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
                {name}
              </h2>
              {role && (
                <p className="font-body text-body-lg text-on-surface-variant italic">{role}</p>
              )}
            </div>
            <div className="h-px w-16 bg-outline-variant/50 my-6" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            <div className="w-full md:w-[220px] flex-shrink-0">
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-soft border border-surface-variant">
                <img alt={name} className="w-full h-full object-cover" src={image} />
              </div>
            </div>
            <div className="flex-grow flex flex-col gap-6">
              {aboutData.introText.map((paragraph, i) => (
                <p key={i} className="font-body text-body-md md:text-lg text-on-surface-variant leading-relaxed">
                  {paragraph}
                </p>
              ))}
              {specialties.length > 0 && (
                <div className="mt-2">
                  <p className="font-label-md text-on-surface uppercase mb-4">Áreas de Especialización:</p>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((tag, i) => (
                      <span
                        key={tag}
                        className={
                          i === specialties.length - 1
                            ? "bg-secondary-fixed/50 text-secondary px-4 py-2 rounded-full font-label-md text-xs border border-secondary-fixed"
                            : "bg-surface-variant text-on-surface-variant px-4 py-2 rounded-full font-label-md text-xs"
                        }
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
