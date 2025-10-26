import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-accent-teal to-primary-light">
      {/* Decorative background elements inspired by the brand */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-rose rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Logo placeholder - you can add the Anthrovia logo here */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Anthrovia<span className="text-sm align-super ml-2">HR</span>
            </h1>
            <div className="h-1 w-32 bg-accent-rose mx-auto mb-8"></div>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Potenciando el talento
          </h2>

          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Soluciones integrales de recursos humanos diseñadas para transformar
            tu organización y maximizar el potencial de tu equipo
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto"
            >
              Conoce nuestros servicios
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
            >
              Contáctanos
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative dots pattern inspired by the brand logo */}
      <div className="absolute bottom-10 left-10 opacity-20">
        <div className="grid grid-cols-8 gap-2">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-white rounded-full"
              style={{
                opacity: 1 - (i / 32),
                transform: `scale(${1 - (i / 64)})`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  )
}
