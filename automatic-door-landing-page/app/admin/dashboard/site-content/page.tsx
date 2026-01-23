"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Save, Loader2, Check, Upload, Image as ImageIcon, Plus, Trash2,
    ChevronDown, ChevronRight, Home, Sparkles, Users, FileText,
    HelpCircle, GripVertical, AlertCircle
} from "lucide-react"
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

interface FAQ {
    question: string
    answer: string
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
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-200">
                {currentImage ? (
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
        </div>
    )
}

interface SectionProps {
    title: string
    icon: React.ReactNode
    children: React.ReactNode
    defaultOpen?: boolean
}

function CollapsibleSection({ title, icon, children, defaultOpen = false }: SectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
            >
                <div className="w-10 h-10 rounded-xl bg-[#ED1C24]/10 flex items-center justify-center text-[#ED1C24]">
                    {icon}
                </div>
                <span className="flex-1 text-left font-semibold text-[#414042]">{title}</span>
                {isOpen ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-2 border-t border-gray-100">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function SiteContentPage() {
    const [content, setContent] = useState<SiteContent | null>(null)
    const [faqs, setFaqs] = useState<FAQ[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        Promise.all([fetchContent(), fetchFAQs()])
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

    const fetchFAQs = async () => {
        try {
            const res = await fetch("/api/faq")
            const data = await res.json()
            setFaqs(data)
        } catch (error) {
            console.error("FAQ yüklenemedi:", error)
        }
    }

    const saveAll = async () => {
        if (!content) return
        setSaving(true)
        try {
            await Promise.all([
                fetch("/api/content", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(content)
                }),
                fetch("/api/faq", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(faqs)
                })
            ])
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        } catch (error) {
            console.error("Kaydetme hatası:", error)
        } finally {
            setSaving(false)
        }
    }

    // Features items management
    const addFeatureItem = () => {
        if (!content) return
        setContent({
            ...content,
            features: {
                ...content.features,
                items: [...content.features.items, "Yeni özellik"]
            }
        })
    }

    const removeFeatureItem = (index: number) => {
        if (!content) return
        setContent({
            ...content,
            features: {
                ...content.features,
                items: content.features.items.filter((_, i) => i !== index)
            }
        })
    }

    // Why Us items management
    const addWhyUsItem = () => {
        if (!content) return
        setContent({
            ...content,
            whyUs: {
                ...content.whyUs,
                items: [...content.whyUs.items, { title: "Yeni Başlık", description: "Açıklama" }]
            }
        })
    }

    const removeWhyUsItem = (index: number) => {
        if (!content) return
        setContent({
            ...content,
            whyUs: {
                ...content.whyUs,
                items: content.whyUs.items.filter((_, i) => i !== index)
            }
        })
    }

    // Paragraphs management
    const addParagraph = () => {
        if (!content) return
        setContent({
            ...content,
            projectSolutions: {
                ...content.projectSolutions,
                paragraphs: [...content.projectSolutions.paragraphs, "Yeni paragraf..."]
            }
        })
    }

    const removeParagraph = (index: number) => {
        if (!content) return
        setContent({
            ...content,
            projectSolutions: {
                ...content.projectSolutions,
                paragraphs: content.projectSolutions.paragraphs.filter((_, i) => i !== index)
            }
        })
    }

    // FAQ management
    const addFAQ = () => {
        setFaqs([...faqs, { question: "", answer: "" }])
    }

    const removeFAQ = (index: number) => {
        setFaqs(faqs.filter((_, i) => i !== index))
    }

    const updateFAQ = (index: number, field: keyof FAQ, value: string) => {
        const newFaqs = [...faqs]
        newFaqs[index] = { ...newFaqs[index], [field]: value }
        setFaqs(newFaqs)
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
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#414042]">Site İçeriği</h1>
                    <p className="text-gray-500 mt-1">Tüm ana sayfa içeriklerini tek yerden yönetin</p>
                </div>
                <Button
                    onClick={saveAll}
                    disabled={saving}
                    className="bg-[#ED1C24] hover:bg-[#c91920] text-white"
                >
                    {saving ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : saved ? (
                        <Check className="w-4 h-4 mr-2" />
                    ) : (
                        <Save className="w-4 h-4 mr-2" />
                    )}
                    {saved ? "Kaydedildi!" : "Tümünü Kaydet"}
                </Button>
            </div>

            {/* Info Banner */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                    <p className="font-medium">Tüm içerikler burada</p>
                    <p className="mt-1 text-blue-600">
                        Bölüm başlıklarına tıklayarak açın/kapatın. Madde eklemek için + butonlarını kullanın.
                    </p>
                </div>
            </div>

            {/* Sections */}
            <div className="space-y-4">
                {/* Hero Section */}
                <CollapsibleSection
                    title="Hero Bölümü"
                    icon={<Home className="w-5 h-5" />}
                    defaultOpen={true}
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ana Başlık</label>
                            <Input
                                value={content.hero.title}
                                onChange={(e) => setContent({
                                    ...content,
                                    hero: { ...content.hero, title: e.target.value }
                                })}
                                className="text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
                            <Input
                                value={content.hero.subtitle}
                                onChange={(e) => setContent({
                                    ...content,
                                    hero: { ...content.hero, subtitle: e.target.value }
                                })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
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
                </CollapsibleSection>

                {/* Features Section */}
                <CollapsibleSection
                    title="Özellikler (Bizimle Daha Güvenli)"
                    icon={<Sparkles className="w-5 h-5" />}
                >
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
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-medium text-gray-700">Özellik Maddeleri</label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={addFeatureItem}
                                    className="text-green-600 border-green-300 hover:bg-green-50"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Ekle
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {content.features.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <div className="flex items-center text-gray-400">
                                            <GripVertical className="w-4 h-4" />
                                        </div>
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
                                            className="flex-1"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeFeatureItem(idx)}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* Why Us Section */}
                <CollapsibleSection
                    title="Neden Biz"
                    icon={<Users className="w-5 h-5" />}
                >
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
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-medium text-gray-700">Maddeler</label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={addWhyUsItem}
                                    className="text-green-600 border-green-300 hover:bg-green-50"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Ekle
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {content.whyUs.items.map((item, idx) => (
                                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium text-gray-500">Madde {idx + 1}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeWhyUsItem(idx)}
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50 h-6 px-2"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </Button>
                                        </div>
                                        <div className="space-y-2">
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
                                                className="text-sm font-medium"
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
                                                className="text-sm"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* Project Solutions Section */}
                <CollapsibleSection
                    title="Projeye Özel Çözümler"
                    icon={<FileText className="w-5 h-5" />}
                >
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
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-medium text-gray-700">Paragraflar</label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={addParagraph}
                                    className="text-green-600 border-green-300 hover:bg-green-50"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Ekle
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {content.projectSolutions.paragraphs.map((para, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <span className="text-xs text-gray-400 mt-2">{idx + 1}</span>
                                        <Textarea
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
                                            className="flex-1 text-sm"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeParagraph(idx)}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* FAQ Section */}
                <CollapsibleSection
                    title="Sık Sorulan Sorular (SSS)"
                    icon={<HelpCircle className="w-5 h-5" />}
                >
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
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
                        <div className="md:col-span-2">
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-medium text-gray-700">Sorular ve Cevaplar</label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={addFAQ}
                                    className="text-green-600 border-green-300 hover:bg-green-50"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Soru Ekle
                                </Button>
                            </div>
                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                                {faqs.map((faq, idx) => (
                                    <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-medium text-[#ED1C24]">Soru {idx + 1}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeFAQ(idx)}
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50 h-6 px-2"
                                            >
                                                <Trash2 className="w-3 h-3 mr-1" />
                                                Sil
                                            </Button>
                                        </div>
                                        <div className="space-y-2">
                                            <Input
                                                value={faq.question}
                                                placeholder="Soru..."
                                                onChange={(e) => updateFAQ(idx, "question", e.target.value)}
                                                className="font-medium"
                                            />
                                            <Textarea
                                                value={faq.answer}
                                                placeholder="Cevap..."
                                                onChange={(e) => updateFAQ(idx, "answer", e.target.value)}
                                                rows={2}
                                                className="text-sm"
                                            />
                                        </div>
                                    </div>
                                ))}
                                {faqs.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        Henüz soru eklenmemiş
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CollapsibleSection>
            </div>
        </div>
    )
}
