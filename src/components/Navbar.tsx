import { useState } from "react"
import {
  Menu,
  X,
  ChevronDown,
  Users,
  Settings,
  Heart,
  GraduationCap,
  Layers,
  FileSearch
} from "lucide-react"

const services = [
  { name: "Asesorías iniciales", icon: FileSearch },
  { name: "Reclutamiento y Selección Estratégica", icon: Users },
  { name: "Diseño y Optimización de Procesos", icon: Settings },
  { name: "Programas de Experiencia y Bienestar", icon: Heart },
  // { name: "Capacitación y Entrenamiento", icon: GraduationCap },
  { name: "Servicios complementarios", icon: Layers },
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Anthrovia HR"
                className="h-48 w-auto"
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <a
              href="#inicio"
              className="text-gray-700 hover:text-primary hover:bg-primary/5 transition-all font-medium px-3 py-2 rounded-md"
            >
              Inicio
            </a>

            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-primary hover:bg-primary/5 transition-all font-medium px-3 py-2 rounded-md">
                <span>Servicios</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Dropdown Menu */}
              {servicesOpen && (
                <div className="absolute left-0 mt-0 pt-2 w-72">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                    {services.map((service, index) => {
                      const Icon = service.icon
                      return (
                        <a
                          key={index}
                          href={`#servicio-${index}`}
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent-teal/10 transition-colors group/item"
                        >
                          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-accent-teal flex items-center justify-center flex-shrink-0">
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm text-gray-700 group-hover/item:text-primary">
                            {service.name}
                          </span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <a
              href="#sobre-nosotros"
              className="text-gray-700 hover:text-primary hover:bg-primary/5 transition-all font-medium px-3 py-2 rounded-md"
            >
              Sobre Nosotros
            </a>

            <a
              href="#noticias"
              className="text-gray-700 hover:text-primary hover:bg-primary/5 transition-all font-medium px-3 py-2 rounded-md"
            >
              Noticias
            </a>

            <a
              href="#contacto"
              className="text-gray-700 hover:text-primary hover:bg-primary/5 transition-all font-medium px-3 py-2 rounded-md"
            >
              Contacto
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-2">
            <a
              href="#inicio"
              className="block text-gray-700 hover:text-primary hover:bg-primary/5 transition-all font-medium py-2 px-3 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </a>

            {/* Mobile Services */}
            <div>
              <button
                className="flex items-center justify-between w-full text-gray-700 hover:text-primary hover:bg-primary/5 transition-all font-medium py-2 px-3 rounded-md"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>Servicios</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {servicesOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {services.map((service, index) => {
                    const Icon = service.icon
                    return (
                      <a
                        key={index}
                        href={`#servicio-${index}`}
                        className="flex items-center space-x-3 py-2 px-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-md transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{service.name}</span>
                      </a>
                    )
                  })}
                </div>
              )}
            </div>

            <a
              href="#sobre-nosotros"
              className="block text-gray-700 hover:text-primary hover:bg-primary/5 transition-all font-medium py-2 px-3 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Sobre Nosotros
            </a>

            <a
              href="#noticias"
              className="block text-gray-700 hover:text-primary hover:bg-primary/5 transition-all font-medium py-2 px-3 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Noticias
            </a>

            <a
              href="#contacto"
              className="block text-gray-700 hover:text-primary hover:bg-primary/5 transition-all font-medium py-2 px-3 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
