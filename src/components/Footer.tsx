import { Linkedin, Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-6">Anthrovia HR</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
Soluciones integrales de Recursos Humanos diseñadas para transformar tu organización y maximizar el potencial de tu equipo.
            Impulsamos culturas más humanas, procesos más eficientes y equipos que crecen con propósito.
            </p>
           
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-white/20 pb-2 inline-block">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#inicio" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#nosotros" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-white/20 pb-2 inline-block">Servicios</h4>
            <ul className="space-y-3">
              <li className="text-gray-300">Reclutamiento y Selección</li>
              <li className="text-gray-300">Consultoría de RRHH</li>
              <li className="text-gray-300">Desarrollo Organizacional</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-white/20 pb-2 inline-block">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-300 mt-1 flex-shrink-0" />
                <span className="text-gray-300">+54 9 2604 08-5501</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-300 mt-1 flex-shrink-0" />
                <span className="text-gray-300">anthroviahr@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-300 mt-1 flex-shrink-0" />
                <span className="text-gray-300">Argentina</span>
              </li>
            </ul>
          </div>
        </div>

         <div className="border-t border-white/10 pt-8 text-center flex justify-center items-center text-gray-400 text-sm">
          {/* <p>&copy; {currentYear} Anthrovia HR. Todos los derechos reservados.</p> */}
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
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-accent-rose transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/5492604085501"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-green-600 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
        </div> 
      </div>
    </footer>
  )
}
