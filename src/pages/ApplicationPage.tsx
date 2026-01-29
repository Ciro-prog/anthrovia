import JobApplicationForm from '../components/JobApplicationForm';
import { Footer } from '../components/Footer';

// Configura aquí la URL del webhook de n8n
const N8N_WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || '';

export function ApplicationPage() {
  return (
    <div className="min-h-screen relative flex flex-col font-lora overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src="/footer.mp4" type="video/mp4" />
      </video>

      {/* Overlay to ensure readability */}
      <div className="fixed inset-0 bg-crema/90 z-0 pointer-events-none" />

      {/* Header */}
      <header className="relative z-50 bg-blanco/90 backdrop-blur-md border-b border-durazno/10 sticky top-0 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center gap-2 group"
          >
             {/* Placeholder for logo if image fails loading */}
             <div className="h-10 w-auto">
                <img
                  src="/logo.png"
                  alt="Anthrovia HR"
                  className="h-full w-auto object-contain transition-transform group-hover:scale-105 duration-300"
                />
             </div>
          </a>

          {/* Back link */}
          <a 
            href="/"
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-durazno/20 text-verde-profundo font-montserrat text-sm font-medium hover:bg-verde-profundo hover:text-blanco transition-all duration-300"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> 
            Volver al sitio
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 -mb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-verde-profundo mb-6 animate-fade-in">
            Postulación – <span className="text-terracota italic">Asesor Comercial</span> | Planes de Salud
          </h1>

        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-20 container mx-auto px-4 flex-grow mb-20">
        <div className="max-w-4xl mx-auto transform -translate-y-8">
           <JobApplicationForm webhookUrl={N8N_WEBHOOK_URL} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

