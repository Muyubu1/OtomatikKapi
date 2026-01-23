import { Check } from "lucide-react"
import { getAssetPath } from "@/lib/utils"

const features = [
  "Kapınızı Otomatikleştirin, Hayatınızı Kolaylaştırın!",
  "Otomatik Kapılar, Otomatik Çözümler!",
  "Güvenli ve Rahat Geçiş İçin Otomatik Kapılar!",
  "Tek Bir Dokunuşla Açılan Kapılar!",
  "Otomatik Kapılar, Akıllı Yaşam Tarzı!",
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
              <img src={getAssetPath("/foto3.png")} alt="Otomatik kapı sistemi" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#414042] mb-8">
              Bizimle Daha <span className="text-[#ED1C24]">Güvenli</span> Olursunuz
            </h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#414042] rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
