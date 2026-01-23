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
import { getSiteContent, getFAQ } from "@/lib/data"

export const revalidate = 0 // Always fetch fresh data

export default async function Home() {
  const siteContent = await getSiteContent()
  const faqData = await getFAQ()

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection content={siteContent.hero} />
      <ProductsSection />
      <FeaturesSection content={siteContent.features} />
      <WhyUsSection content={siteContent.whyUs} />
      <ProjectSolutionsSection content={siteContent.projectSolutions} />
      <FAQSection faqs={faqData} image={siteContent.faq?.image} />
      <Footer />
      <WhatsAppButton />
      <CallButton />
    </main>
  )
}
