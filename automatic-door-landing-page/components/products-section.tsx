"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getAssetPath } from "@/lib/utils"
import { useEffect, useState } from "react"

interface Product {
  slug: string
  name: string
  mainImage: string
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        // Small delay for smooth animation start
        setTimeout(() => setIsLoaded(true), 100)
      })
      .catch(console.error)
  }, [])

  return (
    <section id="products" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header with fade-in */}
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#414042] mb-4">Ürünlerimiz</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Endüstriyel ve ticari ihtiyaçlarınız için geniş ürün yelpazemizi keşfedin.
          </p>
        </div>

        {/* Products Grid - Show max 5 on homepage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.slice(0, 5).map((product, index) => (
            <div
              key={product.slug}
              className={`transition-all duration-500 ease-out ${isLoaded
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-95'
                }`}
              style={{
                transitionDelay: isLoaded ? `${index * 100}ms` : '0ms'
              }}
            >
              <Link href={`/urunler/${product.slug}`}>
                <Card className="group cursor-pointer overflow-hidden bg-white border-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden relative">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#ED1C24]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      <img
                        src={getAssetPath(product.mainImage) || getAssetPath("/placeholder.svg")}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <div className="p-4 text-center relative overflow-hidden">
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#ED1C24] group-hover:w-3/4 transition-all duration-500" />
                      <h3 className="font-medium text-[#414042] group-hover:text-[#ED1C24] transition-colors duration-300">
                        {product.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        {products.length > 5 && (
          <div className={`text-center mt-10 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: isLoaded ? '600ms' : '0ms' }}
          >
            <Link
              href="/urunler"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#ED1C24] hover:bg-[#c91920] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              Tüm Ürünleri Görüntüle
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* CSS for additional animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  )
}
