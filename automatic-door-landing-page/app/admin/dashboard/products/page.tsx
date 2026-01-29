"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Save, Loader2, Check, Plus, Trash2, Edit, X, Image as ImageIcon, Upload, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Product {
    id?: number
    slug: string
    name: string
    nameEn: string
    shortDescription: string
    shortDescriptionEn: string
    fullDescription: string
    fullDescriptionEn: string
    mainImage: string
    gallery: string[]
    features: string[]
    featuresEn: string[]
    category: string
    categoryEn: string
}

// Language Tab Switcher Component
function LanguageTabs({
    activeTab,
    onTabChange
}: {
    activeTab: 'tr' | 'en'
    onTabChange: (tab: 'tr' | 'en') => void
}) {
    return (
        <div className="flex gap-1 mb-2">
            <button
                onClick={() => onTabChange('tr')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${activeTab === 'tr'
                        ? 'bg-[#ED1C24] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
            >
                🇹🇷 TR
            </button>
            <button
                onClick={() => onTabChange('en')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${activeTab === 'en'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
            >
                🇬🇧 EN
            </button>
        </div>
    )
}

// Bilingual Input Component
function BilingualInput({
    label,
    valueTr,
    valueEn,
    onChangeTr,
    onChangeEn,
    placeholder
}: {
    label: string
    valueTr: string
    valueEn: string
    onChangeTr: (value: string) => void
    onChangeEn: (value: string) => void
    placeholder?: string
}) {
    const [activeTab, setActiveTab] = useState<'tr' | 'en'>('tr')

    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <LanguageTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            {activeTab === 'tr' ? (
                <Input
                    value={valueTr}
                    onChange={(e) => onChangeTr(e.target.value)}
                    placeholder={placeholder || `${label} (Türkçe)`}
                />
            ) : (
                <Input
                    value={valueEn}
                    onChange={(e) => onChangeEn(e.target.value)}
                    placeholder={placeholder || `${label} (English)`}
                    className="border-blue-200 focus:border-blue-500"
                />
            )}
        </div>
    )
}

// Bilingual Textarea Component
function BilingualTextarea({
    label,
    valueTr,
    valueEn,
    onChangeTr,
    onChangeEn,
    rows = 4,
    placeholder
}: {
    label: string
    valueTr: string
    valueEn: string
    onChangeTr: (value: string) => void
    onChangeEn: (value: string) => void
    rows?: number
    placeholder?: string
}) {
    const [activeTab, setActiveTab] = useState<'tr' | 'en'>('tr')

    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <LanguageTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            {activeTab === 'tr' ? (
                <Textarea
                    value={valueTr}
                    onChange={(e) => onChangeTr(e.target.value)}
                    rows={rows}
                    placeholder={placeholder || `${label} (Türkçe)`}
                />
            ) : (
                <Textarea
                    value={valueEn}
                    onChange={(e) => onChangeEn(e.target.value)}
                    rows={rows}
                    placeholder={placeholder || `${label} (English)`}
                    className="border-blue-200 focus:border-blue-500"
                />
            )}
        </div>
    )
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
            // Transform API response to match our interface
            const transformedProducts = data.map((p: any) => ({
                id: p.id,
                slug: p.slug,
                name: p.name || '',
                nameEn: p.nameEn || p.name_en || '',
                shortDescription: p.shortDescription || '',
                shortDescriptionEn: p.shortDescriptionEn || p.shortDescription_en || '',
                fullDescription: p.fullDescription || '',
                fullDescriptionEn: p.fullDescriptionEn || p.fullDescription_en || '',
                mainImage: p.mainImage || '',
                gallery: p.gallery || [],
                features: p.features || [],
                featuresEn: p.featuresEn || p.features_en || [],
                category: p.category || '',
                categoryEn: p.categoryEn || p.category_en || ''
            }))
            setProducts(transformedProducts)
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

    const addProduct = async () => {
        const newProduct: Product = {
            slug: `yeni-urun-${Date.now()}`,
            name: "Yeni Ürün",
            nameEn: "New Product",
            shortDescription: "Ürün açıklaması",
            shortDescriptionEn: "Product description",
            fullDescription: "Detaylı ürün açıklaması buraya yazılacak.",
            fullDescriptionEn: "Detailed product description goes here.",
            mainImage: "",
            gallery: [],
            features: ["Özellik 1", "Özellik 2"],
            featuresEn: ["Feature 1", "Feature 2"],
            category: "Endüstriyel Kapılar",
            categoryEn: "Industrial Doors"
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
                await fetchProducts()
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

            {/* Info Banner */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
                <Globe className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                    <p className="font-medium">Çoklu Dil Desteği</p>
                    <p className="mt-1 text-blue-600">
                        Her alan için 🇹🇷 TR ve 🇬🇧 EN sekmelerini kullanarak içerikleri her iki dilde düzenleyebilirsiniz.
                    </p>
                </div>
            </div>

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
                                        <BilingualInput
                                            label="Ürün Adı"
                                            valueTr={product.name}
                                            valueEn={product.nameEn}
                                            onChangeTr={(v) => updateProduct(index, "name", v)}
                                            onChangeEn={(v) => updateProduct(index, "nameEn", v)}
                                        />
                                        <p className="text-xs text-gray-500 -mt-2">URL: /urunler/{product.slug}</p>

                                        <BilingualInput
                                            label="Kısa Açıklama"
                                            valueTr={product.shortDescription}
                                            valueEn={product.shortDescriptionEn}
                                            onChangeTr={(v) => updateProduct(index, "shortDescription", v)}
                                            onChangeEn={(v) => updateProduct(index, "shortDescriptionEn", v)}
                                        />

                                        <BilingualInput
                                            label="Kategori"
                                            valueTr={product.category}
                                            valueEn={product.categoryEn}
                                            onChangeTr={(v) => updateProduct(index, "category", v)}
                                            onChangeEn={(v) => updateProduct(index, "categoryEn", v)}
                                        />

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
                                        <BilingualTextarea
                                            label="Detaylı Açıklama"
                                            valueTr={product.fullDescription}
                                            valueEn={product.fullDescriptionEn}
                                            onChangeTr={(v) => updateProduct(index, "fullDescription", v)}
                                            onChangeEn={(v) => updateProduct(index, "fullDescriptionEn", v)}
                                            rows={4}
                                        />

                                        <BilingualTextarea
                                            label="Özellikler (her satıra bir özellik)"
                                            valueTr={product.features.join("\n")}
                                            valueEn={product.featuresEn.join("\n")}
                                            onChangeTr={(v) => updateProduct(index, "features", v.split("\n").filter(f => f.trim()))}
                                            onChangeEn={(v) => updateProduct(index, "featuresEn", v.split("\n").filter(f => f.trim()))}
                                            rows={4}
                                        />

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
                                    {product.nameEn && (
                                        <p className="text-xs text-blue-600 truncate">🇬🇧 {product.nameEn}</p>
                                    )}
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
