import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const HeroSection = () => {
  return (
    <section className="relative min-h-[700px] md:min-h-[600px] flex items-end justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Mobile image */}
        <img
          src="/hero2.webp"
          alt="Anthrovia HR Hero"
          className="w-full h-full object-cover object-center md:hidden"
          />

        {/* Desktop image */}
        <img
          src="/hero.webp"
          alt="Anthrovia HR Hero"
          className="hidden md:block w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/10"></div>
        {/* Gradient fade to white at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 pb-12 md:pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.2s', opacity: 0 }}>
            Anthrovia HR
          </h1>
          <h2 className="text-2xl md:text-3xl text-white mb-6 animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.3s', opacity: 0 }}>
            Evolucionando el talento.
          </h2>

          <p className="text-base md:text-lg mb-6 text-white max-w-2xl mx-auto leading-relaxed animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.4s', opacity: 0 }}>
            Soluciones integrales de Recursos Humanos diseñadas para transformar
            tu organización y maximizar el potencial de tu equipo. Impulsamos culturas más humanas, procesos más eficientes y equipos que crecen con propósito.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
            <Button
              asChild
              className="bg-white text-primary hover:bg-white/90 text-sm px-6 py-2.5 h-auto"
            >
              <a href="#servicios" className="flex items-center">
                Conoce nuestros servicios
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              className="bg-primary text-white hover:bg-accent-rose hover:border-accent-burgundy border-2 border-primary text-sm px-6 py-2.5 h-auto"
            >
              <a href="#contacto">Contáctanos</a>
            </Button>
          </div>
        </div>
      </div>

    </section>
  )
}
