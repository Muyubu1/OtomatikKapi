"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Loader2, Check } from "lucide-react"
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
        items: string[]
    }
    whyUs: {
        title: string
        items: { title: string; description: string }[]
    }
    projectSolutions: {
        title: string
        paragraphs: string[]
    }
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
                    <p className="text-gray-600">Ana sayfa yazılarını düzenleyin</p>
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
                    <h2 className="text-lg font-semibold text-[#414042] mb-4">Özellikler</h2>
                    <div className="space-y-3">
                        {content.features.items.map((item, idx) => (
                            <div key={idx} className="flex gap-2">
                                <Input
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
                            </div>
                        ))}
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
                    <div className="space-y-4">
                        {content.whyUs.items.map((item, idx) => (
                            <div key={idx} className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                                    <Input
                                        value={item.title}
                                        onChange={(e) => {
                                            const newItems = [...content.whyUs.items]
                                            newItems[idx] = { ...newItems[idx], title: e.target.value }
                                            setContent({
                                                ...content,
                                                whyUs: { ...content.whyUs, items: newItems }
                                            })
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                                    <Input
                                        value={item.description}
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
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
