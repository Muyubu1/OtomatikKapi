import { Button } from "@/components/ui/button"
import { MousePointer } from "lucide-react"
import { getAssetPath } from "@/lib/utils"

export default function ProjectSolutionsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-4">
              <MousePointer className="h-8 w-8 text-[#414042]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#414042] mb-6">PROJEYE ÖZEL ÇÖZÜMLER</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Otomatik kapılar, modern dünyanın vazgeçilmez bir parçasıdır. İster bir alışveriş merkezi, ister bir
                ofis binası, isterse bir konut kompleksi olsun, otomatik kapılar hem güvenlik hem de kolaylık sağlar.
                Ancak her proje farklıdır ve her projenin kendine özgü ihtiyaçları vardır.
              </p>
              <p>
                İşte burada otomatik kapı firmalarının lideri olan "FY Otomatik Kapı ve Yükleme Sistemleri" projeye
                uygun çözümler sunarak müşterilerimizin ihtiyaçlarına uygun çözümler üreterek uygulamaktadır.
              </p>
              <p>
                Projeye uygun çözümler sunan "FY Otomatik Kapı" her projenin kendine özgü ihtiyaçlarını ve zorluklarını
                anlar. Bu, projenin boyutunu, bütçesini, zaman çizelgesini ve hedeflerini dikkate almayı içerir.
                Ardından, bu ihtiyaçları karşılamak için en uygun otomatik kapı çözümünü tasarlar ve uygular.
              </p>
              <p>
                Sonuç olarak, projeye uygun çözümler sunan otomatik kapı firmamız, her projenin başarısını sağlamak için
                gereken esnekliği ve uzmanlığı sağlar. Bu, projenin her aşamasında mükemmel hizmet sunmayı ve müşteri
                memnuniyetini en üst düzeye çıkarmayı garanti eder.
              </p>
            </div>
            <Button className="mt-6 bg-[#414042] hover:bg-[#2d4a6f] text-white">Referanslarımız</Button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
              <img src={getAssetPath("/foto1.png")} alt="3D proje çözümü" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
