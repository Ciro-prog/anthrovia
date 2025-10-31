import { Navbar } from "./components/Navbar"
import { HeroSection } from "./components/HeroSection"
import { ServicesSection } from "./components/ServicesSection"
import { AboutSection } from "./components/AboutSection"
import { NewsSection } from "./components/NewsSection"
import { ContactSection } from "./components/ContactSection"

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <NewsSection />
      <ContactSection />
    </div>
  )
}

export default App
