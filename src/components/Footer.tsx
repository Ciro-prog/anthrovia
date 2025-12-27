import { Linkedin, Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react"
import { useCMS } from "@/context/CMSContext"
import { SettingsSectionContent } from "@/types/cms"

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { content } = useCMS()

  const settings = content.sections.find(s => s.type === 'settings') as SettingsSectionContent
  const cvUrl = settings?.cvUrl || "https://talento.anthroviahr.com/"
  const cvText = settings?.cvText || "Dejanos tu CV"

  return (
    <footer className="bg-primary text-white pt-32 pb-10 relative overflow-hidden">
        {/* Top Wave Border */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] text-[#FAF8F5]">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
            </svg>
        </div>

        {/* Decorative elements */}
        {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary-light"></div> */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>


      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <img src="/favicon.png" alt="Anthrovia Logo" className="h-10 w-10 mr-3 brightness-0 invert" />
              <h3 className="text-2xl font-heading font-bold tracking-tight">Anthrovia HR</h3>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed font-body text-sm lg:text-base">
              Soluciones integrales de Recursos Humanos diseñadas para transformar tu organización y maximizar el potencial de tu equipo.
            </p>
             <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/anthrovia-hr/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/anthrovia.hr/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#E1306C] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/5492604085501"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-green-500 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-heading tracking-wide text-secondary">Enlaces Rápidos</h4>
            <ul className="space-y-3 font-body">
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#sobre-nosotros" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Contacto
                </a>
              </li>
              <li>
                <a 
                  href={cvUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-secondary font-bold hover:text-white hover:translate-x-1 transition-all duration-300 inline-block mt-2"
                >
                  {cvText}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-heading tracking-wide text-secondary">Servicios</h4>
            <ul className="space-y-3 font-body text-sm lg:text-base">
              <li className="text-gray-300">Consultoría en RRHH</li>
              <li className="text-gray-300">Talent Acquisition</li>
              <li className="text-gray-300">Diseño y Optimización de Procesos</li>
              <li className="text-gray-300">Employee Experience</li>
              <li className="text-gray-300">Career Coaching</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-heading tracking-wide text-secondary">Contacto</h4>
            <ul className="space-y-4 font-body">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                <span className="text-gray-300">+54 9 2604 08-5501</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                <span className="text-gray-300">anthroviahr@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                <span className="text-gray-300">Argentina</span>
              </li>
            </ul>
          </div>
        </div>

         <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-400 text-sm font-body">
                &copy; {currentYear} Anthrovia HR. Todos los derechos reservados.
            </p>
        </div> 
      </div>
    </footer>
  )
}
