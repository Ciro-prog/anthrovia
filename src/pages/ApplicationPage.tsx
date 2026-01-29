import { useState } from 'react';
import JobApplicationForm from '../components/JobApplicationForm';
import { Mail, MapPin, Globe, Linkedin, Phone } from 'lucide-react';
import LegalModal from '../components/LegalModal';

// Configura aquí la URL del webhook de n8n
const N8N_WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || '';

export function ApplicationPage() {
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'privacy' | 'terms' }>({
    isOpen: false,
    type: 'privacy'
  });

  const openLegalModal = (type: 'privacy' | 'terms') => {
    setLegalModal({ isOpen: true, type });
  };

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
          <div className="font-lora text-lg text-gris-neutro max-w-3xl mx-auto leading-relaxed animate-fade-in space-y-4">
            <p>Gracias por tu interés en esta oportunidad.</p>
            <p>
              A través de este formulario buscamos conocer tu perfil, tu experiencia comercial y validar si estás alineado/a con la modalidad de trabajo y contratación.
            </p>
            <p className="text-sm italic opacity-80">
              La información será utilizada únicamente con fines de evaluación para procesos de selección.
              <br/>
              Completá todos los campos con datos reales y actualizados.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-20 container mx-auto px-4 flex-grow mb-20">
        <div className="max-w-4xl mx-auto transform -translate-y-8">
           <JobApplicationForm webhookUrl={N8N_WEBHOOK_URL} />
        </div>
      </main>

      {/* Professional Footer */}
      <footer className="relative z-10 bg-verde-profundo text-blanco pt-16 pb-8 border-t-4 border-durazno">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* Column 1: Brand */}
            <div className="space-y-6">
              <img
                src="/logo.png" 
                alt="Anthrovia HR"
                className="h-12 w-auto brightness-0 invert opacity-90"
              />
              <p className="font-lora text-blanco/80 leading-relaxed text-sm">
                Somos especialistas en Gestión del Talento. Acompañamos a las organizaciones en la construcción de equipos sólidos y las personas a encontrar su propósito profesional.
              </p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/company/anthrovia-hr/" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-blanco/10 hover:bg-durazno hover:text-verde-profundo transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://anthroviahr.com" className="p-2 rounded-full bg-blanco/10 hover:bg-durazno hover:text-verde-profundo transition-all">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:pl-12">
              <h3 className="font-playfair text-xl text-durazno mb-6">Enlaces Rápidos</h3>
              <ul className="space-y-3 font-montserrat text-sm">
                <li>
                  <a href="/" className="text-blanco/80 hover:text-durazno transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-durazno"></span> Inicio
                  </a>
                </li>
                <li>
                  <a href="/#servicios" className="text-blanco/80 hover:text-durazno transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-durazno"></span> Servicios
                  </a>
                </li>
                <li>
                  <a href="/#sobre-nosotros" className="text-blanco/80 hover:text-durazno transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-durazno"></span> Nosotros
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h3 className="font-playfair text-xl text-durazno mb-6">Contacto</h3>
              <ul className="space-y-4 font-lora text-sm text-blanco/80">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-durazno mt-0.5 shrink-0" />
                  <span>Argentina<br/>Latinoamérica</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-durazno shrink-0" />
                  <a href="mailto:anthroviahr@gmail.com" className="hover:text-blanco transition-colors">
                    anthroviahr@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-durazno shrink-0" />
                   <span>+54 9 2604 08-5501</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-blanco/10 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="font-lora text-xs text-blanco/60">
                © {new Date().getFullYear()} Anthrovia HR. Todos los derechos reservados.
             </p>
             <div className="flex gap-6 text-xs text-blanco/60 font-montserrat">
               <button onClick={() => openLegalModal('privacy')} className="hover:text-durazno transition-colors cursor-pointer">Políticas de Privacidad</button>
               <button onClick={() => openLegalModal('terms')} className="hover:text-durazno transition-colors cursor-pointer">Términos y Condiciones</button>
             </div>
          </div>
        </div>
      </footer>

      <LegalModal 
        isOpen={legalModal.isOpen} 
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })} 
        type={legalModal.type} 
      />
    </div>
  );
}
