"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import HeroVideoBackground from "@/components/hero-video-background"
import { motion } from "framer-motion"

interface HeroSectionProps {
  content?: {
    title: string
    subtitle: string
    description: string
  }
}

export default function HeroSection({ content }: HeroSectionProps) {
  const title = content?.title || "Endüstriyel Otomatik Kapı"
  const subtitle = content?.subtitle || "ve Yükleme Sistemleri"
  const description = content?.description || "Güvenli, hızlı ve kaliteli otomatik kapı çözümleri ile işletmenizi bir adım öne taşıyın."

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <HeroVideoBackground />

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance"
        >
          {title} <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#ED1C24]"
          >
            {subtitle}
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-white/90 max-w-2xl mb-8"
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button size="lg" className="bg-[#ED1C24] hover:bg-[#c91920] text-white">
            Ürünlerimizi İnceleyin
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#ED1C24] text-white hover:bg-[#ED1C24]/20 bg-transparent"
            asChild
          >
            <a
              href={`https://wa.me/905422408699?text=${encodeURIComponent("Merhaba, otomatik kapılar hakkında fiyat bilgisi almak istiyorum.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Teklif Alın
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="h-8 w-8 text-white" />
      </motion.div>
    </section>
  )
}
