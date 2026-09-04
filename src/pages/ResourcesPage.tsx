import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowDown,
  ArrowRight,
  Bot,
  ChartColumn,
  FileText,
  ListChecks,
  Presentation,
  UserRound,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useCMS } from '@/context/CMSContext'
import {
  defaultResourcesPage,
  RESOURCE_CATEGORIES,
  RESOURCE_CATEGORY_LABEL,
} from '@/data/resourcesDefaults'
import type { ResourceIcon, ResourceItem } from '@/types/cms'

const ICONS: Record<ResourceIcon, typeof FileText> = {
  description: FileText,
  fact_check: ListChecks,
  assignment_ind: UserRound,
  co_present: Presentation,
  smart_toy: Bot,
  analytics: ChartColumn,
}

const BADGE: Record<ResourceItem['category'], string> = {
  reclutamiento: 'bg-secondary-container text-on-secondary-container',
  empleabilidad: 'bg-surface-container-high text-on-surface-variant',
  formacion: 'bg-[#ffdad6]/50 text-[#93000a]',
  tecnologia: 'bg-primary-fixed text-on-primary-fixed-variant',
}

export function ResourcesPage() {
  const { resourcesPage, resources } = useCMS()
  const page = { ...defaultResourcesPage, ...resourcesPage }
  const [filter, setFilter] = useState<ResourceItem['category'] | 'all'>('all')
  const visible =
    filter === 'all' ? resources : resources.filter((r) => r.category === filter)

  const images = [
    page.introImage1 || defaultResourcesPage.introImage1,
    page.introImage2 || defaultResourcesPage.introImage2,
    page.introImage3 || defaultResourcesPage.introImage3,
  ]

  const scrollToGrid = () => {
    document.getElementById('recursos-grid')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar variant="home" />
      <main className="w-full pt-20 bg-surface">
        <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-surface overflow-hidden pt-20 pb-16 lg:py-section-gap">
          <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-primary-fixed-dim/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary-fixed/30 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />
          <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop relative z-10 w-full flex flex-col items-center text-center">
            <span
              data-cms-field="eyebrow"
              className="font-label-md text-primary tracking-[0.15em] uppercase mb-6 relative"
            >
              <span className="absolute top-1/2 -left-12 w-8 h-[1px] bg-primary hidden sm:block" />
              {page.eyebrow}
              <span className="absolute top-1/2 -right-12 w-8 h-[1px] bg-primary hidden sm:block" />
            </span>
            <h1
              data-cms-field="title"
              className="font-heading text-headline-lg-mobile md:text-headline-lg lg:text-display-lg text-primary-container max-w-4xl mb-6"
            >
              {page.title}
            </h1>
            <p
              data-cms-field="subtitle"
              className="font-body text-body-lg text-on-surface-variant max-w-2xl mb-12"
            >
              {page.subtitle}
            </p>
            <button
              type="button"
              onClick={scrollToGrid}
              data-cms-field="ctaLabel"
              className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-md py-4 px-8 rounded-sm transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 group inline-flex items-center gap-2"
            >
              {page.ctaLabel}
              <ArrowDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0.5" />
            </button>
          </div>
        </section>

        <section className="w-full bg-surface-container-low py-16 lg:py-24 border-y border-outline-variant/30">
          <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
              <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-6">
                <h2 data-cms-field="introTitle" className="font-heading text-headline-md text-on-surface">
                  {page.introTitle}
                </h2>
                <p data-cms-field="introText" className="font-body text-body-md text-on-surface-variant">
                  {page.introText}
                </p>
                <div className="bg-surface-variant/50 p-6 rounded-lg border-l-2 border-primary mt-4">
                  <p data-cms-field="introCallout" className="font-label-md text-primary-container italic">
                    {page.introCallout}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 grid grid-cols-2 gap-4">
                <img
                  data-cms-field="introImage1"
                  alt=""
                  className="w-full h-full object-cover aspect-[4/3] rounded-lg shadow-sm"
                  src={images[0]}
                />
                <div className="grid grid-rows-2 gap-4">
                  <img
                    data-cms-field="introImage2"
                    alt=""
                    className="w-full h-full object-cover aspect-square rounded-lg shadow-sm"
                    src={images[1]}
                  />
                  <img
                    data-cms-field="introImage3"
                    alt=""
                    className="w-full h-full object-cover aspect-[16/9] rounded-lg shadow-sm"
                    src={images[2]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-surface py-20 lg:py-section-gap" id="recursos-grid">
          <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
            <div className="flex flex-col items-center mb-16">
              <h3 data-cms-field="catalogTitle" className="font-heading text-headline-md text-primary-container mb-8">
                {page.catalogTitle}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {RESOURCE_CATEGORIES.map((cat) => {
                  const active = filter === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFilter(cat.id)}
                      className={`font-label-md py-2 px-6 rounded-full border transition-colors ${
                        active
                          ? 'bg-primary text-on-primary border-primary'
                          : 'bg-surface hover:bg-surface-variant text-on-surface-variant border-outline-variant'
                      }`}
                    >
                      {cat.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visible.map((item) => {
                const Icon = ICONS[item.icon || 'description'] || FileText
                return (
                  <article
                    key={item.id || item.slug}
                    className="bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-outline-variant/30 group flex flex-col h-full relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    <div className="flex justify-between items-start mb-6">
                      <span
                        className={`${BADGE[item.category]} font-label-md text-xs py-1 px-3 rounded-full uppercase tracking-wider`}
                      >
                        {RESOURCE_CATEGORY_LABEL[item.category]}
                      </span>
                      <Icon className="w-5 h-5 text-outline" />
                    </div>
                    <h4 className="font-heading text-xl text-on-surface mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="font-body text-body-md text-on-surface-variant mb-8 flex-grow">
                      {item.excerpt}
                    </p>
                    <Link
                      to={`/recursos/${item.slug}`}
                      className="text-primary font-label-md border-b border-primary pb-1 inline-flex items-center gap-2 w-max hover:text-on-primary-fixed-variant transition-colors"
                    >
                      SOLICITAR ACCESO
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="w-full bg-primary-container text-on-primary py-20 lg:py-24 relative overflow-hidden">
          <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop relative z-10">
            <h2 data-cms-field="howTitle" className="font-heading text-headline-lg text-center mb-16 text-on-primary">
              {page.howTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-gutter relative">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-outline-variant/30 z-0" />
              {(page.steps?.length ? page.steps : defaultResourcesPage.steps || []).map((step, i) => (
                <div
                  key={step.title + i}
                  data-cms-field={`steps.${i}.title`}
                  className="flex flex-col items-center text-center relative z-10 group"
                >
                  <div className="w-24 h-24 rounded-full bg-[#376666] border border-primary-fixed/30 flex items-center justify-center mb-6 shadow-lg group-hover:bg-primary transition-colors duration-300">
                    <span className="font-heading text-headline-md text-primary-fixed">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="font-label-md text-lg text-primary-fixed mb-3 tracking-widest">{step.title}</h4>
                  <p data-cms-field={`steps.${i}.text`} className="font-body text-body-md text-on-primary-container/80 max-w-[250px]">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-surface py-24 text-center">
          <div className="max-w-3xl mx-auto px-margin-mobile">
            <h2 data-cms-field="closingTitle" className="font-heading text-headline-lg text-on-surface mb-6">
              {page.closingTitle}
            </h2>
            <p data-cms-field="closingText" className="font-body text-body-lg text-on-surface-variant mb-10">
              {page.closingText}
            </p>
            <button
              type="button"
              onClick={scrollToGrid}
              data-cms-field="closingCta"
              className="bg-surface hover:bg-surface-variant text-primary border border-primary font-label-md py-4 px-8 rounded-sm transition-all duration-300 hover:shadow-md"
            >
              {page.closingCta}
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
