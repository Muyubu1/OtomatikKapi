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
import { getSiteContent, getFAQ, getSettings, getNavigation, getProductsWithI18n } from "@/lib/data"

export const revalidate = 60 // Cache for 60 seconds

export default async function Home() {
  // Fetch all data server-side in parallel
  const [siteContent, faqData, settings, navigation, products] = await Promise.all([
    getSiteContent(),
    getFAQ(),
    getSettings(),
    getNavigation(),
    getProductsWithI18n()
  ])

  return (
    <main className="min-h-screen">
      <Header navigation={navigation} settings={settings} />
      <HeroSection content={siteContent.hero} videoUrl={settings.heroVideoUrl} />
      <ProductsSection products={products} />
      <FeaturesSection content={siteContent.features} />
      <WhyUsSection content={siteContent.whyUs} />
      <ProjectSolutionsSection content={siteContent.projectSolutions} />
      <FAQSection
        faqs={faqData.faqs}
        faqs_en={faqData.faqsEn}
        image={siteContent.faq?.image}
      />
      <Footer settings={settings} />
      <WhatsAppButton />
      <CallButton />
    </main>
  )
}

