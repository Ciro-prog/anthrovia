import { Navbar } from "./components/Navbar"
import { HeroSection } from "./components/HeroSection"
import { ServicesSection } from "./components/ServicesSection"
import { ContactSection } from "./components/ContactSection"

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ContactSection />
    </div>
  )
}

export default App
