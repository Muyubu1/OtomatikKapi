"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { getAssetPath } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n"

interface Product {
  slug: string
  name: string
  name_en?: string
  mainImage: string
}

interface ProductsSectionProps {
  products?: Product[]
}

export default function ProductsSection({ products = [] }: ProductsSectionProps) {
  const { t, language } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Small delay for smooth animation start
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const getProductName = (product: Product) => {
    if (language === 'en' && product.name_en) {
      return product.name_en
    }
    return product.name
  }

  return (
    <section id="products" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header with fade-in */}
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#414042] mb-4">{t("products.title")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("products.description")}
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
                      <Image
                        src={getAssetPath(product.mainImage) || getAssetPath("/placeholder.svg")}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 text-center relative overflow-hidden">
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#ED1C24] group-hover:w-3/4 transition-all duration-500" />
                      <h3 className="font-medium text-[#414042] group-hover:text-[#ED1C24] transition-colors duration-300">
                        {getProductName(product)}
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
              {t("products.viewAll")}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

