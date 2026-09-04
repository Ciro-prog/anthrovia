import { Linkedin, Instagram, MessageCircle, Mail, Phone } from "lucide-react"
import { Link } from "react-router-dom"
import { useCMS } from "@/context/CMSContext"
import { ContactSectionContent, SettingsSectionContent } from "@/types/cms"
import { useState } from "react"
import LegalModal from "./LegalModal"

const FALLBACK_EMAIL = "anthroviahr@gmail.com"
const FALLBACK_WA = "5492604085501"
const FALLBACK_WA_DISPLAY = "+54 9 260 4085501"
const FALLBACK_LINKEDIN = "https://www.linkedin.com/company/anthrovia-hr/"
const FALLBACK_IG = "https://www.instagram.com/anthrovia.hr/"

function waHref(number: string) {
  const digits = number.replace(/\D/g, "")
  return `https://wa.me/${digits || FALLBACK_WA}`
}

function waLabel(number: string) {
  const digits = number.replace(/\D/g, "")
  if (!digits || digits === FALLBACK_WA) return FALLBACK_WA_DISPLAY
  if (digits.startsWith("549") && digits.length >= 12) {
    return `+54 9 ${digits.slice(3, 6)} ${digits.slice(6)}`
  }
  return number
}

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { content, siteSettings } = useCMS()

  const settings = content.sections.find((s) => s.type === "settings") as SettingsSectionContent
  const contact = content.sections.find((s) => s.type === "contact") as ContactSectionContent | undefined
  const tagline =
    settings?.footerTagline ||
    "Personas, estrategia y tecnología para transformar la gestión de Recursos Humanos."

  const email = contact?.email || siteSettings.contactEmail || FALLBACK_EMAIL
  const whatsapp = contact?.whatsappNumber || siteSettings.whatsappNumber || FALLBACK_WA
  const social = contact?.socialLinks || []
  const linkedin = social.find((s) => s.platform === "linkedin")?.url || FALLBACK_LINKEDIN
  const instagram = social.find((s) => s.platform === "instagram")?.url || FALLBACK_IG

  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: "privacy" | "terms" }>({
    isOpen: false,
    type: "privacy",
  })

  return (
    <footer className="w-full bg-surface-container relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: "url(/ethos/bg-network.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-10 md:py-12 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="sm:col-span-2 lg:col-span-5 flex flex-col gap-2 md:gap-3">
            <Link
              to="/"
              className="inline-flex self-start leading-none -mt-8 md:-mt-10 lg:-mt-12 -mb-6 md:-mb-8 lg:-mb-10"
            >
              <img
                src="/logo.png"
                alt="Anthrovia HR"
                className="h-[6rem] md:h-[10rem] w-auto object-contain object-center mix-blend-multiply"
              />
            </Link>
            <p
              className="font-body text-on-surface-variant text-body-md max-w-md leading-relaxed relative z-10"
              data-cms-field="footerTagline"
            >
              {tagline}
            </p>
            <div className="flex items-center gap-3 mt-1 relative z-10">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 shrink-0 aspect-square rounded-full bg-surface-container-lowest border border-surface-variant items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all"
                aria-label="LinkedIn"
                data-cms-field="socialLinks.0.url"
              >
                <Linkedin className="size-5 shrink-0" />
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 shrink-0 aspect-square rounded-full bg-surface-container-lowest border border-surface-variant items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all"
                aria-label="Instagram"
                data-cms-field="socialLinks.1.url"
              >
                <Instagram className="size-5 shrink-0" />
              </a>
              <a
                href={waHref(whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 shrink-0 aspect-square rounded-full bg-surface-container-lowest border border-surface-variant items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all"
                aria-label="WhatsApp"
                data-cms-field="whatsappNumber"
              >
                <MessageCircle className="size-5 shrink-0" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-label-md text-primary uppercase mb-2">Navegación</h4>
            <Link className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors" to="/">Inicio</Link>
            <a className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/#servicios">Servicios</a>
            <Link className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors" to="/capacitaciones">Capacitaciones</Link>
            <Link className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors" to="/recursos">Recursos</Link>
            <a className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/#contacto">Contacto</a>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="font-label-md text-primary uppercase mb-2">Contacto</h4>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 font-body text-body-md text-on-surface-variant hover:text-primary transition-colors"
              data-cms-field="email"
            >
              <Mail className="h-4 w-4 text-primary shrink-0" />
              {email}
            </a>
            <a
              href={waHref(whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-body text-body-md text-on-surface-variant hover:text-primary transition-colors"
              data-cms-field="whatsappNumber"
            >
              <Phone className="h-4 w-4 text-primary shrink-0" />
              {waLabel(whatsapp)}
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-body text-body-md text-on-surface-variant hover:text-primary transition-colors"
              data-cms-field="socialLinks.0.url"
            >
              <Linkedin className="h-4 w-4 text-primary shrink-0" />
              LinkedIn · Anthrovia HR
            </a>
          </div>
        </div>

        <div className="border-t border-outline-variant/30 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label-md text-on-surface-variant text-center md:text-left">
            © {currentYear} Anthrovia HR. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => setLegalModal({ isOpen: true, type: "privacy" })}
              className="font-label-md text-on-surface-variant hover:text-primary transition-colors text-xs"
            >
              Políticas de Privacidad
            </button>
            <button
              onClick={() => setLegalModal({ isOpen: true, type: "terms" })}
              className="font-label-md text-on-surface-variant hover:text-primary transition-colors text-xs"
            >
              Términos y Condiciones
            </button>
          </div>
        </div>
      </div>

      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
        type={legalModal.type}
      />
    </footer>
  )
}
