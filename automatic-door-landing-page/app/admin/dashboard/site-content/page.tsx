"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Save, Loader2, Check, Upload, Image as ImageIcon, Plus, Trash2,
    ChevronDown, ChevronRight, Home, Sparkles, Users, FileText,
    HelpCircle, GripVertical, AlertCircle, Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface SiteContent {
    hero: {
        title: string
        titleEn: string
        subtitle: string
        subtitleEn: string
        description: string
        descriptionEn: string
    }
    features: {
        title: string
        titleEn: string
        image: string
        items: string[]
        itemsEn: string[]
    }
    whyUs: {
        title: string
        titleEn: string
        image: string
        items: { title: string; titleEn: string; description: string; descriptionEn: string }[]
    }
    projectSolutions: {
        title: string
        titleEn: string
        image: string
        paragraphs: string[]
        paragraphsEn: string[]
    }
    faq: {
        image: string
    }
}

interface FAQ {
    question: string
    questionEn: string
    answer: string
    answerEn: string
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
        <div className="flex gap-1">
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
                        {uploading ? 'Yükleniyor...' : 'Görsel Yükle'}
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
                <span className="text-[#ED1C24]">{icon}</span>
                <span className="font-medium text-[#414042] flex-1 text-left">{title}</span>
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
                        <div className="p-6 border-t border-gray-100">
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
    const [activeLang, setActiveLang] = useState<'tr' | 'en'>('tr')

    useEffect(() => {
        Promise.all([fetchContent(), fetchFAQs()])
    }, [])

    const fetchContent = async () => {
        try {
            const res = await fetch("/api/content")
            const data = await res.json()
            // Transform data to include English fields with defaults
            const transformedContent: SiteContent = {
                hero: {
                    title: data.hero?.title || '',
                    titleEn: data.hero?.titleEn || data.hero?.title_en || '',
                    subtitle: data.hero?.subtitle || '',
                    subtitleEn: data.hero?.subtitleEn || data.hero?.subtitle_en || '',
                    description: data.hero?.description || '',
                    descriptionEn: data.hero?.descriptionEn || data.hero?.description_en || ''
                },
                features: {
                    title: data.features?.title || '',
                    titleEn: data.features?.titleEn || data.features?.title_en || '',
                    image: data.features?.image || '',
                    items: data.features?.items || [],
                    itemsEn: data.features?.itemsEn || data.features?.items_en || []
                },
                whyUs: {
                    title: data.whyUs?.title || '',
                    titleEn: data.whyUs?.titleEn || data.whyUs?.title_en || '',
                    image: data.whyUs?.image || '',
                    items: (data.whyUs?.items || []).map((item: any) => ({
                        title: item.title || '',
                        titleEn: item.titleEn || item.title_en || '',
                        description: item.description || '',
                        descriptionEn: item.descriptionEn || item.description_en || ''
                    }))
                },
                projectSolutions: {
                    title: data.projectSolutions?.title || '',
                    titleEn: data.projectSolutions?.titleEn || data.projectSolutions?.title_en || '',
                    image: data.projectSolutions?.image || '',
                    paragraphs: data.projectSolutions?.paragraphs || [],
                    paragraphsEn: data.projectSolutions?.paragraphsEn || data.projectSolutions?.paragraphs_en || []
                },
                faq: {
                    image: data.faq?.image || '/foto6.png'
                }
            }
            setContent(transformedContent)
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
            // Transform to include English fields
            const transformedFaqs = data.map((faq: any) => ({
                question: faq.question || '',
                questionEn: faq.questionEn || faq.question_en || '',
                answer: faq.answer || '',
                answerEn: faq.answerEn || faq.answer_en || ''
            }))
            setFaqs(transformedFaqs)
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
                items: [...content.features.items, "Yeni özellik"],
                itemsEn: [...content.features.itemsEn, "New feature"]
            }
        })
    }

    const removeFeatureItem = (index: number) => {
        if (!content) return
        setContent({
            ...content,
            features: {
                ...content.features,
                items: content.features.items.filter((_, i) => i !== index),
                itemsEn: content.features.itemsEn.filter((_, i) => i !== index)
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
                items: [...content.whyUs.items, { title: "Yeni Başlık", titleEn: "New Title", description: "Açıklama", descriptionEn: "Description" }]
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
                paragraphs: [...content.projectSolutions.paragraphs, "Yeni paragraf..."],
                paragraphsEn: [...content.projectSolutions.paragraphsEn, "New paragraph..."]
            }
        })
    }

    const removeParagraph = (index: number) => {
        if (!content) return
        setContent({
            ...content,
            projectSolutions: {
                ...content.projectSolutions,
                paragraphs: content.projectSolutions.paragraphs.filter((_, i) => i !== index),
                paragraphsEn: content.projectSolutions.paragraphsEn.filter((_, i) => i !== index)
            }
        })
    }

    // FAQ management
    const addFAQ = () => {
        setFaqs([...faqs, { question: "", questionEn: "", answer: "", answerEn: "" }])
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
                <div className="flex items-center gap-3">
                    <LanguageTabs activeTab={activeLang} onTabChange={setActiveLang} />
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
            </div>

            {/* Info Banner */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
                <Globe className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                    <p className="font-medium">Çoklu Dil Desteği</p>
                    <p className="mt-1 text-blue-600">
                        Sağ üstteki 🇹🇷 TR / 🇬🇧 EN butonlarını kullanarak içerikleri her iki dilde düzenleyebilirsiniz.
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {activeLang === 'tr' ? '🇹🇷 Ana Başlık' : '🇬🇧 Main Title'}
                            </label>
                            <Input
                                value={activeLang === 'tr' ? content.hero.title : content.hero.titleEn}
                                onChange={(e) => setContent({
                                    ...content,
                                    hero: {
                                        ...content.hero,
                                        [activeLang === 'tr' ? 'title' : 'titleEn']: e.target.value
                                    }
                                })}
                                className={`text-lg ${activeLang === 'en' ? 'border-blue-200' : ''}`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {activeLang === 'tr' ? '🇹🇷 Alt Başlık' : '🇬🇧 Subtitle'}
                            </label>
                            <Input
                                value={activeLang === 'tr' ? content.hero.subtitle : content.hero.subtitleEn}
                                onChange={(e) => setContent({
                                    ...content,
                                    hero: {
                                        ...content.hero,
                                        [activeLang === 'tr' ? 'subtitle' : 'subtitleEn']: e.target.value
                                    }
                                })}
                                className={activeLang === 'en' ? 'border-blue-200' : ''}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {activeLang === 'tr' ? '🇹🇷 Açıklama' : '🇬🇧 Description'}
                            </label>
                            <Textarea
                                value={activeLang === 'tr' ? content.hero.description : content.hero.descriptionEn}
                                onChange={(e) => setContent({
                                    ...content,
                                    hero: {
                                        ...content.hero,
                                        [activeLang === 'tr' ? 'description' : 'descriptionEn']: e.target.value
                                    }
                                })}
                                rows={3}
                                className={activeLang === 'en' ? 'border-blue-200' : ''}
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
                                <label className="text-sm font-medium text-gray-700">
                                    {activeLang === 'tr' ? '🇹🇷 Özellik Maddeleri' : '🇬🇧 Feature Items'}
                                </label>
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
                                {(activeLang === 'tr' ? content.features.items : content.features.itemsEn).map((item, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <div className="flex items-center text-gray-400">
                                            <GripVertical className="w-4 h-4" />
                                        </div>
                                        <Input
                                            value={item}
                                            onChange={(e) => {
                                                const field = activeLang === 'tr' ? 'items' : 'itemsEn'
                                                const newItems = [...content.features[field]]
                                                newItems[idx] = e.target.value
                                                setContent({
                                                    ...content,
                                                    features: { ...content.features, [field]: newItems }
                                                })
                                            }}
                                            className={`flex-1 ${activeLang === 'en' ? 'border-blue-200' : ''}`}
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
                                <label className="text-sm font-medium text-gray-700">
                                    {activeLang === 'tr' ? '🇹🇷 Maddeler' : '🇬🇧 Items'}
                                </label>
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
                                                value={activeLang === 'tr' ? item.title : item.titleEn}
                                                placeholder={activeLang === 'tr' ? "Başlık" : "Title"}
                                                onChange={(e) => {
                                                    const newItems = [...content.whyUs.items]
                                                    newItems[idx] = {
                                                        ...newItems[idx],
                                                        [activeLang === 'tr' ? 'title' : 'titleEn']: e.target.value
                                                    }
                                                    setContent({
                                                        ...content,
                                                        whyUs: { ...content.whyUs, items: newItems }
                                                    })
                                                }}
                                                className={`text-sm font-medium ${activeLang === 'en' ? 'border-blue-200' : ''}`}
                                            />
                                            <Input
                                                value={activeLang === 'tr' ? item.description : item.descriptionEn}
                                                placeholder={activeLang === 'tr' ? "Açıklama" : "Description"}
                                                onChange={(e) => {
                                                    const newItems = [...content.whyUs.items]
                                                    newItems[idx] = {
                                                        ...newItems[idx],
                                                        [activeLang === 'tr' ? 'description' : 'descriptionEn']: e.target.value
                                                    }
                                                    setContent({
                                                        ...content,
                                                        whyUs: { ...content.whyUs, items: newItems }
                                                    })
                                                }}
                                                className={`text-sm ${activeLang === 'en' ? 'border-blue-200' : ''}`}
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
                                <label className="text-sm font-medium text-gray-700">
                                    {activeLang === 'tr' ? '🇹🇷 Paragraflar' : '🇬🇧 Paragraphs'}
                                </label>
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
                                {(activeLang === 'tr' ? content.projectSolutions.paragraphs : content.projectSolutions.paragraphsEn).map((para, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <span className="text-xs text-gray-400 mt-2">{idx + 1}</span>
                                        <Textarea
                                            value={para}
                                            rows={2}
                                            onChange={(e) => {
                                                const field = activeLang === 'tr' ? 'paragraphs' : 'paragraphsEn'
                                                const newParagraphs = [...content.projectSolutions[field]]
                                                newParagraphs[idx] = e.target.value
                                                setContent({
                                                    ...content,
                                                    projectSolutions: { ...content.projectSolutions, [field]: newParagraphs }
                                                })
                                            }}
                                            className={`flex-1 text-sm ${activeLang === 'en' ? 'border-blue-200' : ''}`}
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
                                <label className="text-sm font-medium text-gray-700">
                                    {activeLang === 'tr' ? '🇹🇷 Sorular ve Cevaplar' : '🇬🇧 Questions and Answers'}
                                </label>
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
                                                value={activeLang === 'tr' ? faq.question : faq.questionEn}
                                                placeholder={activeLang === 'tr' ? "Soru..." : "Question..."}
                                                onChange={(e) => updateFAQ(idx, activeLang === 'tr' ? "question" : "questionEn", e.target.value)}
                                                className={`font-medium ${activeLang === 'en' ? 'border-blue-200' : ''}`}
                                            />
                                            <Textarea
                                                value={activeLang === 'tr' ? faq.answer : faq.answerEn}
                                                placeholder={activeLang === 'tr' ? "Cevap..." : "Answer..."}
                                                onChange={(e) => updateFAQ(idx, activeLang === 'tr' ? "answer" : "answerEn", e.target.value)}
                                                rows={2}
                                                className={`text-sm ${activeLang === 'en' ? 'border-blue-200' : ''}`}
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
