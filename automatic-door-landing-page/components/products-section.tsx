import { Card, CardContent } from "@/components/ui/card"
import { getAssetPath } from "@/lib/utils"

const products = [
  {
    name: "Endüstriyel Seksiyonel Kapı",
    image: "/industrial-sectional-door-gray-metal.jpg",
  },
  {
    name: "Endüstriyel Katlanır Kapı",
    image: "/industrial-folding-door-white.jpg",
  },
  {
    name: "Şerit Perde Kapı",
    image: "/strip-curtain-door-transparent-pvc.jpg",
  },
  {
    name: "Personel Yangın Kapısı",
    image: "/fire-door-gray-personnel-door.jpg",
  },
  {
    name: "Sarmal Yangın Kapısı",
    image: "/spiral-fire-door-silver.jpg",
  },
]

export default function ProductsSection() {
  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">Ürünlerimiz</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Endüstriyel ve ticari ihtiyaçlarınız için geniş ürün yelpazemizi keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <Card key={index} className="group cursor-pointer overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={getAssetPath(product.image) || getAssetPath("/placeholder.svg")}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium text-[#1e3a5f] group-hover:text-orange-500 transition-colors">
                    {product.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
