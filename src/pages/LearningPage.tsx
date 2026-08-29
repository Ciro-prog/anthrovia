import { Navbar } from "../components/Navbar"
import { HeroSection } from "../components/HeroSection"
import { ServicesSection } from "../components/ServicesSection"
import { AboutSection } from "../components/AboutSection"
import { ContactSection } from "../components/ContactSection"
import { Footer } from "../components/Footer"

export const LearningPage = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface relative">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] md:opacity-[0.07]"
        style={{
          backgroundImage: "url(/ethos/bg-growth.png)",
          backgroundSize: "min(850px, 68vw)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right -8% top 20%",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04] md:opacity-[0.06]"
        style={{
          backgroundImage: "url(/ethos/bg-network.png)",
          backgroundSize: "min(750px, 60vw)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left -12% bottom 15%",
        }}
      />

      <div className="relative z-10">
        <Navbar variant="learning" />
        <HeroSection sectionId="learning-hero" variant="learning" />
        <ServicesSection sectionId="learning-services" variant="learning" />
        <AboutSection sectionId="learning-about" variant="learning" />
        <ContactSection showCustomTraining />
        <Footer />
      </div>
    </div>
  )
}
