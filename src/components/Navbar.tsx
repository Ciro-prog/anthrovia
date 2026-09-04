import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useCMS } from "@/context/CMSContext"
import { SettingsSectionContent } from "@/types/cms"
import { Menu, X } from "lucide-react"

type NavVariant = "home" | "learning"

const homeLinks = [
  { label: "Inicio", href: "/#inicio", to: "/" },
  { label: "Servicios", href: "/#servicios", to: "/#servicios" },
  { label: "Anthrovia", href: "/#anthrovia", to: "/#anthrovia" },
  { label: "recursos gratuitos", href: "/recursos", to: "/recursos" },
  { label: "Contacto", href: "/#contacto", to: "/#contacto" },
]

const learningLinks = [
  { label: "Inicio", href: "/", to: "/" },
  { label: "Capacitaciones", href: "/capacitaciones", to: "/capacitaciones" },
  { label: "Formaciones", href: "/capacitaciones#formaciones", to: "/capacitaciones#formaciones" },
  { label: "In Company", href: "/capacitaciones#in-company", to: "/capacitaciones#in-company" },
  { label: "Contacto", href: "/capacitaciones#contacto", to: "/capacitaciones#contacto" },
]

export const Navbar = ({ variant }: { variant?: NavVariant }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { content } = useCMS()
  const location = useLocation()

  const resolvedVariant: NavVariant =
    variant || (location.pathname.startsWith("/capacitaciones") ? "learning" : "home")

  const settings = content.sections.find(s => s.type === 'settings') as SettingsSectionContent
  const cvUrl = settings?.cvUrl || "https://talento.anthroviahr.com/"
  const cvText = settings?.cvText || "Dejanos tu CV"
  const links = resolvedVariant === "learning" ? learningLinks : homeLinks

  const renderLink = (link: typeof homeLinks[0], mobile = false) => {
    const className = mobile
      ? "block font-label-md text-on-surface-variant hover:text-primary py-3 uppercase tracking-wider"
      : "font-label-md text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider"

    if (link.href.startsWith("/") && !link.href.includes("#")) {
      return (
        <Link key={link.href} to={link.to} className={className} onClick={() => setIsOpen(false)}>
          {link.label}
        </Link>
      )
    }

    if (link.href.startsWith("/#") || (link.href.startsWith("/") && link.href.includes("#"))) {
      return (
        <a key={link.href} href={link.href} className={className} onClick={() => setIsOpen(false)}>
          {link.label}
        </a>
      )
    }

    return (
      <a key={link.href} href={link.href} className={className} onClick={() => setIsOpen(false)}>
        {link.label}
      </a>
    )
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] overflow-visible">
      <div className="h-16 md:h-24 lg:h-28 w-full px-6 sm:px-10 lg:px-16 xl:px-24 flex items-center justify-between overflow-visible">
        <Link
          to="/"
          className="relative z-10 flex items-center shrink-0 leading-none -my-6 md:-my-10 lg:-my-12"
        >
          <img
            src="/logo.png"
            alt="Anthrovia HR"
            className="h-[6rem] md:h-[9rem] w-auto object-contain mix-blend-multiply"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => renderLink(link))}
        </nav>

        <div className="flex items-center gap-4">
          {resolvedVariant === "home" ? (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md uppercase tracking-widest hover:bg-primary-container transition-all"
            >
              {cvText}
            </a>
          ) : (
            <Link
              to="/#contacto"
              className="hidden sm:inline-flex bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-label-md hover:bg-primary hover:text-on-primary transition-all"
            >
              Contáctanos
            </Link>
          )}

          <button
            className="lg:hidden text-on-surface p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-outline-variant/30 bg-surface px-margin-mobile pb-6 pt-4 space-y-1">
          {links.map((link) => renderLink(link, true))}
        </div>
      )}
    </header>
  )
}
