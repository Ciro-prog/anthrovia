import { Navbar } from "../components/Navbar"
import { HeroSection } from "../components/HeroSection"
import { ServicesSection } from "../components/ServicesSection"
import { AboutSection } from "../components/AboutSection"
import { NewsSection } from "../components/NewsSection"
import { PostsSection } from "../components/PostsSection"
import { ContactSection } from "../components/ContactSection"
import { Footer } from "../components/Footer"
import { SectionDivider } from "../components/ui/SectionDivider"

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <SectionDivider />
      <AboutSection />
      <NewsSection /> 
      <PostsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
