import { Menu } from "lucide-react"
import { getAssetPath } from "@/lib/utils"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Menu className="h-6 w-6 text-[#414042]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#414042] mb-6">OTOMATİK KAPILAR</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Otomatik kapılar, teknolojinin hayatımızın her alanına nasıl sızdığını gösteren mükemmel bir örnektir.
                Bu kapılar, hem güvenlik hem de kolaylık sağlarlar ve bu nedenle birçok farklı alanda kullanılırlar.
              </p>
              <p>
                Otomatik kapılar, genellikle iş merkezleri, alışveriş merkezleri, havaalanları, hastaneler, fabrikalar,
                hangarlar ve oteller gibi yerlerde kullanılır. Ancak son yıllarda, daha fazla ev sahibi, otoparklarında
                ve evlerinde otomatik kapıları tercih etmeye başlamıştır.
              </p>
              <p>
                Otomatik kapılar, genellikle hareket sensörleri veya uzaktan kumandalar aracılığıyla çalışır. Hareket
                sensörleri, bir kişi veya araç kapıya yaklaştığında kapının otomatik olarak açılmasını sağlar. Uzaktan
                kumandalar ise, kullanıcıların kapıyı açmak için bir düğmeye basmasını sağlar.
              </p>
              <p>
                Sonuç olarak, otomatik kapılar, hem kullanım kolaylığı hem de enerji tasarrufu sağladığı için giderek
                daha popüler hale geliyor. Teknoloji ilerledikçe, otomatik kapıların daha da yaygınlaşacağını ve daha
                fazla özellik ve işlevsellik sunacağını bekleyebiliriz.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <img src={getAssetPath("/foto4.png")} alt="Endüstriyel otomatik kapı" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
