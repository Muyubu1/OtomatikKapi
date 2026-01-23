import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import ProductsSection from "@/components/products-section"
import WhyUsSection from "@/components/why-us-section"
import ProjectSolutionsSection from "@/components/project-solutions-section"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import CallButton from "@/components/call-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
      <WhyUsSection />
      <ProjectSolutionsSection />
      <FAQSection />
      <Footer />
      <WhatsAppButton />
      <CallButton />
    </main>
  )
}

