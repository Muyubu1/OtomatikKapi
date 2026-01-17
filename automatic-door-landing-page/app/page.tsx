import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import ProductsSection from "@/components/products-section"
import AboutSection from "@/components/about-section"
import WhyUsSection from "@/components/why-us-section"
import ProjectSolutionsSection from "@/components/project-solutions-section"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { HangarDoorReveal } from "@/components/ui/hangar-door-reveal"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HangarDoorReveal>
        <Header />
        <HeroSection />
        <ProductsSection />
        <FeaturesSection />
        <AboutSection />
        <WhyUsSection />
        <ProjectSolutionsSection />
        <FAQSection />
        <Footer />
      </HangarDoorReveal>
      <WhatsAppButton />
    </main>
  )
}

