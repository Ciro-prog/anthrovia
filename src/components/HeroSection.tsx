import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const HeroSection = () => {
  return (
    <section className="relative min-h-[700px] md:min-h-[600px] flex items-end justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpeg"
          alt="Anthrovia HR Hero"
          className="w-full h-full object-fill sm:object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/10"></div>
        {/* Gradient fade to white at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 pb-20 md:pb-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-base md:text-lg mb-6 text-primary/80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
            Soluciones integrales de recursos humanos diseñadas para transformar
            tu organización y maximizar el potencial de tu equipo
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
            <Button
              asChild
              className=" bg-primary  text-white hover:bg-primary/90 text-sm px-6 py-2.5 h-auto"
            >
              <a href="#servicios" className="flex items-center">
                Conoce nuestros servicios
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/10 text-sm px-6 py-2.5 h-auto"
            >
              <a href="#contacto">Contáctanos</a>
            </Button>
          </div>
        </div>
      </div>

    </section>
  )
}
