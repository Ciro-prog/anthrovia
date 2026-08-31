import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Hourglass } from "lucide-react"
import { Link } from "react-router-dom"
import { useCMS } from "@/context/CMSContext"
import { ServicesSectionContent } from "@/types/cms"
import { getIcon } from "@/lib/iconMap"

interface ServicesSectionProps {
  sectionId?: string
  variant?: "home" | "learning"
}

export const ServicesSection = ({
  sectionId = "services",
  variant = "home",
}: ServicesSectionProps) => {
  const { content } = useCMS()
  const data = content.sections.find(s => s.id === sectionId) as ServicesSectionContent

  if (!data || !data.isVisible) return null

  if (variant === "learning") {
    return <LearningServices data={data} />
  }

  return (
    <section
      id="servicios"
      className="w-full px-margin-mobile lg:px-margin-desktop py-16 md:py-24 lg:py-section-gap"
    >
      <div className="w-full max-w-container-max mx-auto flex flex-col gap-12 md:gap-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            {data.eyebrow && (
              <div className="inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">category</span>
                <span className="font-label-md text-primary uppercase tracking-widest">
                  {data.eyebrow}
                </span>
              </div>
            )}
            <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight">
              {data.title}
            </h2>
          </div>
          <p className="font-body text-body-md text-on-surface-variant max-w-md md:text-right">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {data.services.map((service, index) => {
            const Icon = getIcon(service.iconName)
            const iconBg =
              service.color === "secondary"
                ? "bg-secondary-fixed/40 text-secondary"
                : service.color === "tertiary"
                  ? "bg-surface-variant text-tertiary"
                  : service.color === "neutral"
                    ? "bg-surface-dim/40 text-on-surface"
                    : "bg-primary-fixed/30 text-primary"

            const cta = service.ctaLink || "#contacto"
            const isRoute = cta.startsWith("/") && !cta.includes("#")

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-soft hover:shadow-ethereal transition-all duration-500 overflow-hidden flex flex-col h-full border border-surface-container"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110 duration-700" />
                <div className="relative z-10 flex-grow flex flex-col">
                  {service.imageUrl ? (
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-8 -mt-2">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center mb-8 transform transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                  )}
                  <h3 className="font-heading text-headline-md text-on-surface mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-body text-body-md text-on-surface-variant mb-6">
                    {service.description}
                  </p>

                  {service.includes && service.includes.length > 0 && (
                    <div className="flex flex-col gap-3 mb-10 flex-grow">
                      {service.includesLabel && (
                        <p className="font-label-md text-primary uppercase tracking-widest mb-1">
                          {service.includesLabel}
                        </p>
                      )}
                      <ul className="flex flex-col gap-3">
                        {service.includes.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <span className="font-body text-body-md text-on-surface-variant">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.ctaText && (
                    isRoute ? (
                      <Link
                        to={cta}
                        className="inline-flex items-center font-label-md text-primary uppercase tracking-widest mt-auto hover:gap-3 transition-all group/link"
                      >
                        <span className="border-b border-primary pb-1">{service.ctaText}</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <a
                        href={cta}
                        className="inline-flex items-center font-label-md text-primary uppercase tracking-widest mt-auto hover:gap-3 transition-all group/link"
                      >
                        <span className="border-b border-primary pb-1">{service.ctaText}</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    )
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function LearningServices({ data }: { data: ServicesSectionContent }) {
  const modalidades = data.modalidades || []
  const formaciones = data.formaciones || []
  const inCompany = data.inCompany

  return (
    <>
      <section id="servicios" className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile lg:px-margin-desktop bg-surface relative">
        <div className="max-w-container-max mx-auto">
          <motion.div
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface text-balance">
              {data.modalidadesTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modalidades.map((item, index) => {
              const Icon = getIcon(item.iconName)
              const featured = item.featured
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={
                    featured
                      ? "bg-primary p-8 md:p-10 rounded-2xl shadow-soft flex flex-col gap-6 relative overflow-hidden group md:-translate-y-4"
                      : "bg-surface-container-lowest p-8 md:p-10 rounded-2xl shadow-soft border border-surface-variant hover:shadow-ethereal transition-shadow flex flex-col gap-6 relative overflow-hidden group"
                  }
                >
                  <div
                    className={
                      featured
                        ? "w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center z-10"
                        : "w-14 h-14 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center"
                    }
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className={featured ? "font-label-md text-on-primary uppercase tracking-wider z-10" : "font-label-md text-primary uppercase tracking-wider"}>
                    {item.title}
                  </h3>
                  <p className={featured ? "font-body text-body-md text-on-primary/90 flex-grow z-10" : "font-body text-body-md text-on-surface-variant flex-grow"}>
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="formaciones" className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile lg:px-margin-desktop bg-surface-container-low">
        <div className="max-w-container-max mx-auto flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-16">
            <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface lg:w-1/2">
              {data.formacionesTitle || data.title}
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant lg:w-1/2">
              {data.formacionesDescription || data.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formaciones.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-surface flex flex-col rounded-2xl overflow-hidden shadow-soft hover:shadow-ethereal transition-all duration-300"
              >
                <div className="h-48 bg-surface-variant relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.imageUrl} alt={item.title} />
                  <div className="absolute top-4 left-4 bg-surface px-3 py-1 rounded-full z-20">
                    <span className="font-label-md text-primary text-xs uppercase">{item.category}</span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="font-heading text-xl md:text-headline-md text-on-surface mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="font-body text-body-md text-on-surface-variant mb-8 flex-grow">{item.description}</p>
                  {(item.link || "#contacto").startsWith("/") ? (
                    <Link to={item.link!} className="font-label-md text-primary inline-flex items-center gap-1 self-start group/link">
                      Conocer más <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <a href={item.link || "#contacto"} className="font-label-md text-primary inline-flex items-center gap-1 self-start group/link">
                      Conocer más <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {data.formacionesComingSoon && (
            <div className="bg-surface border border-dashed border-outline-variant p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto flex flex-col items-center gap-4">
              <Hourglass className="text-outline h-10 w-10" />
              <h4 className="font-heading text-headline-md text-on-surface">{data.formacionesComingSoon.title}</h4>
              <p className="font-body text-body-md text-on-surface-variant max-w-2xl">{data.formacionesComingSoon.description}</p>
            </div>
          )}
        </div>
      </section>

      {inCompany && (
        <section id="in-company" className="w-full py-16 md:py-24 lg:py-section-gap px-margin-mobile lg:px-margin-desktop bg-surface relative overflow-hidden">
          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
            <div className="relative z-10 lg:order-2">
              <div className="relative w-full aspect-[3/4] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-ethereal">
                <img alt="Formación in company" className="w-full h-full object-cover" src={inCompany.imageUrl} />
              </div>
            </div>
            <div className="flex flex-col gap-8 z-10 lg:order-1 lg:pr-8">
              <h2 className="font-heading text-headline-lg-mobile lg:text-[2.5rem] text-on-surface leading-tight">
                {inCompany.title} <br />
                <span className="italic text-secondary">{inCompany.highlight}</span>
              </h2>
              <p className="font-body text-body-md md:text-body-lg text-on-surface-variant">{inCompany.description}</p>
              <ul className="flex flex-col gap-3">
                {inCompany.areas.map((area) => (
                  <li key={area} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-body text-body-md text-on-surface">{area}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-surface-container p-6 md:p-8 rounded-2xl border-l-4 border-primary">
                <h4 className="font-label-md text-primary uppercase mb-4">{inCompany.modalitiesTitle}</h4>
                <div className="flex flex-col gap-4">
                  {inCompany.modalities.map((m) => {
                    const Icon = getIcon(m.iconName)
                    return (
                      <div key={m.title} className="flex gap-4 items-start">
                        <Icon className="h-5 w-5 text-on-surface-variant mt-1 shrink-0" />
                        <div>
                          <strong className="font-label-md text-on-surface block">{m.title}</strong>
                          <span className="font-body text-body-md text-on-surface-variant">{m.description}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <a href={inCompany.ctaLink} className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md hover:bg-primary-container transition-all inline-flex items-center justify-center gap-2 group w-fit">
                {inCompany.ctaText}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
