import JobApplicationForm from '../components/JobApplicationForm'
import { Footer } from '../components/Footer'
import { useCMS } from '../context/CMSContext'
import { defaultApplicationForm } from '../data/applicationFormDefaults'

const N8N_WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || ''

export function ApplicationPage() {
  const { applicationForm } = useCMS()
  const title = applicationForm.title || defaultApplicationForm.title
  const subtitle = applicationForm.subtitle || defaultApplicationForm.subtitle

  return (
    <div className="min-h-screen relative flex flex-col font-lora overflow-hidden">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover z-0">
        <source src="/footer.mp4" type="video/mp4" />
      </video>

      <div className="fixed inset-0 bg-crema/90 z-0 pointer-events-none" />

      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Anthrovia HR" className="h-48 w-auto" />
            </a>
          </div>
          <a
            href="/"
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-durazno/20 text-verde-profundo font-montserrat text-sm font-medium hover:bg-verde-profundo hover:text-blanco transition-all duration-300"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Volver al sitio
          </a>
        </div>
      </header>

      <section className="relative z-10 pt-20 pb-32 -mb-20">
        <div className="container mx-auto px-6 text-center">
          <h1
            data-cms-field="title"
            className="font-playfair text-3xl md:text-5xl font-bold text-verde-profundo mb-6 animate-fade-in"
          >
            {title}
          </h1>
          {subtitle && (
            <p
              data-cms-field="subtitle"
              className="max-w-2xl mx-auto font-lora text-verde-profundo/80 text-base md:text-lg"
            >
              {subtitle}
            </p>
          )}
        </div>
      </section>

      <main className="relative z-20 container mx-auto px-4 flex-grow mb-20">
        <div className="max-w-4xl mx-auto transform -translate-y-8">
          <JobApplicationForm webhookUrl={N8N_WEBHOOK_URL} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
