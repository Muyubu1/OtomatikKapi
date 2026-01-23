import { Award, CircleDollarSign, Cpu, Wrench, Shield } from "lucide-react"
import { getAssetPath } from "@/lib/utils"

const reasons = [
  {
    icon: Award,
    title: "DENEYİM",
    description: "Deneyimli ve Profesyonel Bir Ekibimiz Var",
  },
  {
    icon: CircleDollarSign,
    title: "FİYAT",
    description: "Uygun Fiyatlarla Üstün Hizmet Sunuyoruz",
  },
  {
    icon: Cpu,
    title: "TEKNOLOJİ",
    description: "Sektördeki En Son Teknolojileri Kullanıyoruz",
  },
  {
    icon: Wrench,
    title: "ÖZEL ÇÖZÜMLER",
    description: "Projeye Özel Çözümler Sunuyoruz",
  },
  {
    icon: Shield,
    title: "GÜVENİLİR VE SAYGIN",
    description: "Güvenilir ve Saygın Bir Firma Olmanın Gururunu Yaşıyoruz",
  },
]

export default function WhyUsSection() {
  return (
    <section className="py-20 bg-[#ED1C24]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
              <img src={getAssetPath("/foto5.png")} alt="Neden biz" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <div className="text-center md:text-left mb-8">
              <span className="text-6xl font-bold text-white/30">?</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">NEDEN BİZ</h2>
            </div>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <reason.icon className="h-6 w-6 text-[#ED1C24]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{reason.title}</h3>
                    <p className="text-white/90 text-sm">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
