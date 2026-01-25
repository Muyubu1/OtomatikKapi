"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getAssetPath } from "@/lib/utils"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"

interface Product {
    slug: string
    name: string
    mainImage: string
    shortDescription?: string
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setTimeout(() => setIsLoaded(true), 100)
            })
            .catch(console.error)
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-[#414042] text-white py-16">
                <div className="container mx-auto px-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-[#ED1C24] transition-colors mb-6"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Ana Sayfa</span>
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Ürünlerimiz</h1>
                    <p className="text-white/70 max-w-2xl text-lg">
                        Endüstriyel ve ticari ihtiyaçlarınız için geniş ürün yelpazemizi keşfedin.
                        Kaliteli ve güvenilir otomatik kapı sistemleri.
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={product.slug}
                            className={`transition-all duration-500 ease-out ${isLoaded
                                ? 'opacity-100 translate-y-0 scale-100'
                                : 'opacity-0 translate-y-12 scale-95'
                                }`}
                            style={{
                                transitionDelay: isLoaded ? `${index * 80}ms` : '0ms'
                            }}
                        >
                            <Link href={`/urunler/${product.slug}`}>
                                <Card className="group cursor-pointer overflow-hidden bg-white border-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                                    <CardContent className="p-0">
                                        <div className="aspect-square overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#ED1C24]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                            <img
                                                src={getAssetPath(product.mainImage) || getAssetPath("/placeholder.svg")}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                        </div>
                                        <div className="p-4 text-center relative overflow-hidden">
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#ED1C24] group-hover:w-3/4 transition-all duration-500" />
                                            <h3 className="font-semibold text-[#414042] group-hover:text-[#ED1C24] transition-colors duration-300 text-lg">
                                                {product.name}
                                            </h3>
                                            {product.shortDescription && (
                                                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                                                    {product.shortDescription}
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {isLoaded && products.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">Henüz ürün eklenmemiş.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
