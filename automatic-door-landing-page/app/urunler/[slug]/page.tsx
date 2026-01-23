"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Check, MessageCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAssetPath } from "@/lib/utils"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import CallButton from "@/components/call-button"

interface Product {
    slug: string
    name: string
    shortDescription: string
    fullDescription: string
    mainImage: string
    gallery: string[]
    features: string[]
    category: string
}

interface ProductPageProps {
    params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
    const { slug } = require("react").use(params)
    const [product, setProduct] = useState<Product | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                const found = data.find((p: Product) => p.slug === slug)
                setProduct(found || null)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [slug])

    if (loading) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#ED1C24]" />
            </main>
        )
    }

    if (!product) {
        notFound()
    }

    const currentIndex = products.findIndex(p => p.slug === slug)
    const prev = currentIndex > 0 ? products[currentIndex - 1] : null
    const next = currentIndex < products.length - 1 ? products[currentIndex + 1] : null
    const otherProducts = products.filter(p => p.slug !== slug)

    const whatsappMessage = `Merhaba, ${product.name} hakkında bilgi almak istiyorum.`
    const whatsappUrl = `https://wa.me/905422408699?text=${encodeURIComponent(whatsappMessage)}`

    const galleryImages = product.gallery.length > 0 ? product.gallery : [product.mainImage]

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Breadcrumb & Back */}
            <div className="bg-gray-50 py-4 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Link href="/" className="hover:text-[#ED1C24]">Anasayfa</Link>
                            <span>/</span>
                            <Link href="/#products" className="hover:text-[#ED1C24]">Ürünler</Link>
                            <span>/</span>
                            <span className="text-[#414042] font-medium">{product.name}</span>
                        </div>
                        <Link
                            href="/#products"
                            className="flex items-center gap-2 text-gray-600 hover:text-[#ED1C24] transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Tüm Ürünler
                        </Link>
                    </div>
                </div>
            </div>

            {/* Product Content */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Gallery */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Main Image */}
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-4">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={selectedImage}
                                        src={getAssetPath(galleryImages[selectedImage])}
                                        alt={product.name}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-full object-cover"
                                    />
                                </AnimatePresence>

                                {/* Gallery Navigation */}
                                {galleryImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setSelectedImage(prev => prev === 0 ? galleryImages.length - 1 : prev - 1)}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                                        >
                                            <ChevronLeft className="h-5 w-5 text-[#414042]" />
                                        </button>
                                        <button
                                            onClick={() => setSelectedImage(prev => prev === galleryImages.length - 1 ? 0 : prev + 1)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                                        >
                                            <ChevronRight className="h-5 w-5 text-[#414042]" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {galleryImages.length > 1 && (
                                <div className="flex gap-3">
                                    {galleryImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all ${selectedImage === idx
                                                    ? 'ring-2 ring-[#ED1C24] ring-offset-2'
                                                    : 'opacity-70 hover:opacity-100'
                                                }`}
                                        >
                                            <img
                                                src={getAssetPath(img)}
                                                alt={`${product.name} ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <span className="inline-block px-3 py-1 bg-[#ED1C24]/10 text-[#ED1C24] text-sm font-medium rounded-full mb-4">
                                {product.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#414042] mb-4">
                                {product.name}
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                {product.fullDescription}
                            </p>

                            {/* Features */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-[#414042] mb-4">Özellikler</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {product.features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-[#ED1C24] flex items-center justify-center flex-shrink-0">
                                                <Check className="h-3 w-3 text-white" />
                                            </div>
                                            <span className="text-gray-700">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    className="bg-[#ED1C24] hover:bg-[#c91920] text-white"
                                    asChild
                                >
                                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="h-5 w-5 mr-2" />
                                        Teklif Al
                                    </a>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-[#414042] text-[#414042] hover:bg-[#414042] hover:text-white"
                                    asChild
                                >
                                    <a href="tel:905422408699">
                                        Hemen Ara
                                    </a>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Previous/Next Navigation */}
            <section className="py-8 border-t border-b bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {prev ? (
                            <Link
                                href={`/urunler/${prev.slug}`}
                                className="flex items-center gap-3 group"
                            >
                                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#ED1C24] group-hover:text-[#ED1C24] transition-colors">
                                    <ArrowLeft className="h-4 w-4" />
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm text-gray-500">Önceki Ürün</p>
                                    <p className="font-medium text-[#414042] group-hover:text-[#ED1C24] transition-colors">{prev.name}</p>
                                </div>
                            </Link>
                        ) : <div />}

                        {next ? (
                            <Link
                                href={`/urunler/${next.slug}`}
                                className="flex items-center gap-3 group text-right"
                            >
                                <div className="hidden sm:block">
                                    <p className="text-sm text-gray-500">Sonraki Ürün</p>
                                    <p className="font-medium text-[#414042] group-hover:text-[#ED1C24] transition-colors">{next.name}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#ED1C24] group-hover:text-[#ED1C24] transition-colors">
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </section>

            {/* Other Products */}
            {otherProducts.length > 0 && (
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-[#414042] mb-8 text-center">Diğer Ürünlerimiz</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {otherProducts.slice(0, 4).map((item, idx) => (
                                <motion.div
                                    key={item.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                >
                                    <Link href={`/urunler/${item.slug}`} className="group block">
                                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
                                            <img
                                                src={getAssetPath(item.mainImage)}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <h3 className="font-medium text-[#414042] group-hover:text-[#ED1C24] transition-colors text-center text-sm">
                                            {item.name}
                                        </h3>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
            <WhatsAppButton />
            <CallButton />
        </main>
    )
}
