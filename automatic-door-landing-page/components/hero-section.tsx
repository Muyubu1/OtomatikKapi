import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import HeroVideoBackground from "@/components/hero-video-background"

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <HeroVideoBackground />

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
          Endüstriyel Otomatik Kapı <br />
          <span className="text-[#ED1C24]">ve Yükleme Sistemleri</span>
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mb-8">
          Güvenli, hızlı ve kaliteli otomatik kapı çözümleri ile işletmenizi bir adım öne taşıyın.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
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
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white" />
      </div>
    </section>
  )
}

