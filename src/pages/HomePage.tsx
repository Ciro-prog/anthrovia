import { Navbar } from "../components/Navbar"
import { HeroSection } from "../components/HeroSection"
import { ServicesSection } from "../components/ServicesSection"
import { AboutSection } from "../components/AboutSection"
import { ContactSection } from "../components/ContactSection"
import { Footer } from "../components/Footer"

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface relative">
      {/* Organic decorative background (servicios / anthrovia) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.09] md:opacity-[0.12]"
        style={{
          backgroundImage: "url(/ethos/bg-organic.png)",
          backgroundSize: "min(1100px, 85vw)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right -5% center",
        }}
      />

      <div className="relative z-10">
        <Navbar variant="home" />
        <HeroSection sectionId="hero" variant="home" />
        <ServicesSection sectionId="services" variant="home" />
        <AboutSection sectionId="about" variant="home" />
        <ContactSection showCustomTraining={false} />
        <Footer />
      </div>
    </div>
  )
}
