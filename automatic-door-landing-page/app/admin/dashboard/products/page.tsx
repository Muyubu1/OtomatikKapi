"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Save, Loader2, Check, Plus, Trash2, Edit, X, Image as ImageIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Product {
    id?: number
    slug: string
    name: string
    shortDescription: string
    fullDescription: string
    mainImage: string
    gallery: string[]
    features: string[]
    category: string
}

function ImageUploader({
    currentImage,
    section,
    onUpload
}: {
    currentImage: string
    section: string
    onUpload: (url: string) => void
}) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        setError(null)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('section', section)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()
            if (data.success) {
                onUpload(data.url)
            } else {
                setError(data.error || 'Yükleme başarısız')
            }
        } catch (error) {
            console.error('Upload error:', error)
            setError('Yükleme hatası oluştu')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-2">
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                {currentImage && currentImage !== '/placeholder.svg' ? (
                    <img src={currentImage} alt="Önizleme" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <ImageIcon className="w-8 h-8 text-gray-300" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => inputRef.current?.click()}
                        disabled={uploading}
                    >
                        {uploading ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Upload className="w-4 h-4 mr-2" />
                        )}
                        {uploading ? 'Yükleniyor...' : 'Görsel Yükle'}
                    </Button>
                </div>
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
            />
        </div>
    )
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products")
            const data = await res.json()
            setProducts(data)
        } catch (error) {
            console.error("Veri yüklenemedi:", error)
            setError("Ürünler yüklenemedi")
        } finally {
            setLoading(false)
        }
    }

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/ı/g, "i")
            .replace(/ö/g, "o")
            .replace(/ü/g, "u")
            .replace(/ş/g, "s")
            .replace(/ğ/g, "g")
            .replace(/ç/g, "c")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "")
    }

    // Add new product via POST
    const addProduct = async () => {
        const newProduct: Product = {
            slug: `yeni-urun-${Date.now()}`,
            name: "Yeni Ürün",
            shortDescription: "Ürün açıklaması",
            fullDescription: "Detaylı ürün açıklaması buraya yazılacak.",
            mainImage: "",
            gallery: [],
            features: ["Özellik 1", "Özellik 2"],
            category: "Endüstriyel Kapılar"
        }

        setSaving(true)
        setError(null)
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct)
            })
            const data = await res.json()

            if (data.success && data.product) {
                setProducts([...products, data.product])
                setEditingIndex(products.length)
                setSaved(true)
                setTimeout(() => setSaved(false), 2000)
            } else {
                setError(data.error || "Ürün eklenemedi")
            }
        } catch (error) {
            console.error("Ürün ekleme hatası:", error)
            setError("Ürün eklenemedi")
        } finally {
            setSaving(false)
        }
    }

    // Update single product via PUT
    const saveProduct = async (index: number) => {
        const product = products[index]
        setSaving(true)
        setError(null)

        try {
            const res = await fetch("/api/products", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            })
            const data = await res.json()

            if (data.success) {
                setSaved(true)
                setTimeout(() => setSaved(false), 2000)
                setEditingIndex(null)
            } else {
                setError(data.error || "Kaydetme başarısız")
            }
        } catch (error) {
            console.error("Kaydetme hatası:", error)
            setError("Kaydetme başarısız")
        } finally {
            setSaving(false)
        }
    }

    // Delete single product via DELETE
    const removeProduct = async (index: number) => {
        const product = products[index]
        if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
            return
        }

        setSaving(true)
        setError(null)

        try {
            const params = product.id ? `id=${product.id}` : `slug=${product.slug}`
            const res = await fetch(`/api/products?${params}`, {
                method: "DELETE"
            })
            const data = await res.json()

            if (data.success) {
                setProducts(products.filter((_, i) => i !== index))
                if (editingIndex === index) setEditingIndex(null)
            } else {
                setError(data.error || "Silme başarısız")
            }
        } catch (error) {
            console.error("Silme hatası:", error)
            setError("Silme başarısız")
        } finally {
            setSaving(false)
        }
    }

    const updateProduct = (index: number, field: keyof Product, value: any) => {
        const newProducts = [...products]
        newProducts[index] = { ...newProducts[index], [field]: value }

        // Auto-generate slug when name changes
        if (field === "name") {
            newProducts[index].slug = generateSlug(value)
        }

        setProducts(newProducts)
    }

    const addGalleryImage = (index: number, url: string) => {
        const newProducts = [...products]
        newProducts[index].gallery = [...newProducts[index].gallery, url]
        setProducts(newProducts)
    }

    const removeGalleryImage = (productIndex: number, imageIndex: number) => {
        const newProducts = [...products]
        newProducts[productIndex].gallery = newProducts[productIndex].gallery.filter((_, i) => i !== imageIndex)
        setProducts(newProducts)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#ED1C24]" />
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#414042]">Ürün Yönetimi</h1>
                    <p className="text-gray-600">Ürünleri ekleyin, düzenleyin veya silin</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={addProduct} disabled={saving}>
                        {saving ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Plus className="w-4 h-4 mr-2" />
                        )}
                        Yeni Ürün
                    </Button>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id || product.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-xl shadow-sm overflow-hidden"
                    >
                        {editingIndex === index ? (
                            // Edit Mode
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-semibold text-[#414042] text-lg">Ürün Düzenle</h3>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => saveProduct(index)}
                                            disabled={saving}
                                            className="bg-[#ED1C24] hover:bg-[#c91920]"
                                        >
                                            {saving ? (
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            ) : saved ? (
                                                <Check className="w-4 h-4 mr-2" />
                                            ) : (
                                                <Save className="w-4 h-4 mr-2" />
                                            )}
                                            {saved ? "Kaydedildi!" : "Kaydet"}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setEditingIndex(null)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Left Column */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
                                            <Input
                                                value={product.name}
                                                onChange={(e) => updateProduct(index, "name", e.target.value)}
                                            />
                                            <p className="text-xs text-gray-500 mt-1">URL: /urunler/{product.slug}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Kısa Açıklama</label>
                                            <Input
                                                value={product.shortDescription}
                                                onChange={(e) => updateProduct(index, "shortDescription", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                            <Input
                                                value={product.category}
                                                onChange={(e) => updateProduct(index, "category", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Ana Görsel</label>
                                            <ImageUploader
                                                currentImage={product.mainImage}
                                                section={`product-${product.slug}`}
                                                onUpload={(url) => updateProduct(index, "mainImage", url)}
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Detaylı Açıklama</label>
                                            <Textarea
                                                value={product.fullDescription}
                                                onChange={(e) => updateProduct(index, "fullDescription", e.target.value)}
                                                rows={4}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Özellikler (her satıra bir özellik)
                                            </label>
                                            <Textarea
                                                value={product.features.join("\n")}
                                                onChange={(e) => updateProduct(index, "features", e.target.value.split("\n").filter(f => f.trim()))}
                                                rows={4}
                                            />
                                        </div>

                                        {/* Gallery */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Galeri Görselleri</label>
                                            <div className="grid grid-cols-3 gap-2 mb-2">
                                                {product.gallery.map((img, imgIdx) => (
                                                    <div key={imgIdx} className="relative aspect-square bg-gray-100 rounded overflow-hidden group">
                                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                                        <button
                                                            onClick={() => removeGalleryImage(index, imgIdx)}
                                                            className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <div className="aspect-square">
                                                    <ImageUploader
                                                        currentImage=""
                                                        section={`gallery-${product.slug}`}
                                                        onUpload={(url) => addGalleryImage(index, url)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // View Mode
                            <div className="flex items-center gap-4 p-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    {product.mainImage ? (
                                        <img
                                            src={product.mainImage}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon className="w-6 h-6 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-[#414042] truncate">{product.name}</h3>
                                    <p className="text-sm text-gray-500 truncate">{product.shortDescription}</p>
                                    <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                        {product.category}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setEditingIndex(index)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeProduct(index)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}

                {products.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl">
                        <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Henüz ürün eklenmemiş</p>
                        <Button variant="outline" onClick={addProduct} className="mt-4">
                            <Plus className="w-4 h-4 mr-2" />
                            İlk ürünü ekle
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
