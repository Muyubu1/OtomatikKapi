"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Save, Loader2, Check, Upload, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface SiteContent {
    hero: {
        title: string
        subtitle: string
        description: string
    }
    features: {
        title: string
        image: string
        items: string[]
    }
    whyUs: {
        title: string
        image: string
        items: { title: string; description: string }[]
    }
    projectSolutions: {
        title: string
        image: string
        paragraphs: string[]
    }
    faq: {
        image: string
    }
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
    const inputRef = useRef<HTMLInputElement>(null)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
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
            }
        } catch (error) {
            console.error('Upload error:', error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-2">
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                {currentImage ? (
                    <img src={currentImage} alt="Önizleme" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <ImageIcon className="w-12 h-12 text-gray-300" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                        variant="secondary"
                        onClick={() => inputRef.current?.click()}
                        disabled={uploading}
                    >
                        {uploading ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Upload className="w-4 h-4 mr-2" />
                        )}
                        {uploading ? 'Yükleniyor...' : 'Görsel Değiştir'}
                    </Button>
                </div>
            </div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
            />
            <p className="text-xs text-gray-500 text-center">Mevcut: {currentImage || 'Yok'}</p>
        </div>
    )
}

export default function SiteContentPage() {
    const [content, setContent] = useState<SiteContent | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        fetchContent()
    }, [])

    const fetchContent = async () => {
        try {
            const res = await fetch("/api/content")
            const data = await res.json()
            setContent(data)
        } catch (error) {
            console.error("Veri yüklenemedi:", error)
        } finally {
            setLoading(false)
        }
    }

    const saveContent = async () => {
        if (!content) return
        setSaving(true)
        try {
            await fetch("/api/content", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content)
            })
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        } catch (error) {
            console.error("Kaydetme hatası:", error)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#ED1C24]" />
            </div>
        )
    }

    if (!content) return null

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#414042]">Site İçeriği</h1>
                    <p className="text-gray-600">Ana sayfa yazılarını ve görsellerini düzenleyin</p>
                </div>
                <Button
                    onClick={saveContent}
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
            </div>

            <div className="space-y-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <h2 className="text-lg font-semibold text-[#414042] mb-4">Hero Bölümü</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                            <Input
                                value={content.hero.title}
                                onChange={(e) => setContent({
                                    ...content,
                                    hero: { ...content.hero, title: e.target.value }
                                })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık</label>
                            <Input
                                value={content.hero.subtitle}
                                onChange={(e) => setContent({
                                    ...content,
                                    hero: { ...content.hero, subtitle: e.target.value }
                                })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                            <Textarea
                                value={content.hero.description}
                                onChange={(e) => setContent({
                                    ...content,
                                    hero: { ...content.hero, description: e.target.value }
                                })}
                                rows={3}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <h2 className="text-lg font-semibold text-[#414042] mb-4">Özellikler (Bizimle Daha Güvenli)</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bölüm Görseli</label>
                            <ImageUploader
                                currentImage={content.features.image}
                                section="features"
                                onUpload={(url) => setContent({
                                    ...content,
                                    features: { ...content.features, image: url }
                                })}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">Özellik Maddeleri</label>
                            {content.features.items.map((item, idx) => (
                                <Input
                                    key={idx}
                                    value={item}
                                    onChange={(e) => {
                                        const newItems = [...content.features.items]
                                        newItems[idx] = e.target.value
                                        setContent({
                                            ...content,
                                            features: { ...content.features, items: newItems }
                                        })
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Why Us Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <h2 className="text-lg font-semibold text-[#414042] mb-4">Neden Biz</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bölüm Görseli</label>
                            <ImageUploader
                                currentImage={content.whyUs.image}
                                section="whyus"
                                onUpload={(url) => setContent({
                                    ...content,
                                    whyUs: { ...content.whyUs, image: url }
                                })}
                            />
                        </div>
                        <div className="space-y-4">
                            {content.whyUs.items.map((item, idx) => (
                                <div key={idx} className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg">
                                    <Input
                                        value={item.title}
                                        placeholder="Başlık"
                                        onChange={(e) => {
                                            const newItems = [...content.whyUs.items]
                                            newItems[idx] = { ...newItems[idx], title: e.target.value }
                                            setContent({
                                                ...content,
                                                whyUs: { ...content.whyUs, items: newItems }
                                            })
                                        }}
                                    />
                                    <Input
                                        value={item.description}
                                        placeholder="Açıklama"
                                        onChange={(e) => {
                                            const newItems = [...content.whyUs.items]
                                            newItems[idx] = { ...newItems[idx], description: e.target.value }
                                            setContent({
                                                ...content,
                                                whyUs: { ...content.whyUs, items: newItems }
                                            })
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Project Solutions Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <h2 className="text-lg font-semibold text-[#414042] mb-4">Projeye Özel Çözümler</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bölüm Görseli</label>
                            <ImageUploader
                                currentImage={content.projectSolutions.image}
                                section="project"
                                onUpload={(url) => setContent({
                                    ...content,
                                    projectSolutions: { ...content.projectSolutions, image: url }
                                })}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">Paragraflar</label>
                            {content.projectSolutions.paragraphs.map((para, idx) => (
                                <Textarea
                                    key={idx}
                                    value={para}
                                    rows={2}
                                    onChange={(e) => {
                                        const newParagraphs = [...content.projectSolutions.paragraphs]
                                        newParagraphs[idx] = e.target.value
                                        setContent({
                                            ...content,
                                            projectSolutions: { ...content.projectSolutions, paragraphs: newParagraphs }
                                        })
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* FAQ Section Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <h2 className="text-lg font-semibold text-[#414042] mb-4">SSS Bölümü</h2>
                    <div className="max-w-md">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bölüm Görseli</label>
                        <ImageUploader
                            currentImage={content.faq?.image || '/foto6.png'}
                            section="faq"
                            onUpload={(url) => setContent({
                                ...content,
                                faq: { image: url }
                            })}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
