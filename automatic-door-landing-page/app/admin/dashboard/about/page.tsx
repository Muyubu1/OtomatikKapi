"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
    Save, Loader2, Check, Upload, Image as ImageIcon,
    Target, Eye, Users, Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface AboutSection {
    title: string
    titleEn: string
    content: string
    contentEn: string
}

interface AboutContent {
    hakkimizda: AboutSection
    vizyon: AboutSection
    misyon: AboutSection
    background_image?: string
}

const defaultContent: AboutContent = {
    hakkimizda: {
        title: 'HAKKIMIZDA',
        titleEn: 'ABOUT US',
        content: 'Biz, CKS Otomatik Kapı ve Yükleme Sistemleri, endüstriyel otomatik kapı sektöründe lider bir firmayız.',
        contentEn: 'We, CKS Automatic Door and Loading Systems, are a leading company in the industrial automatic door sector.'
    },
    vizyon: {
        title: 'VİZYONUMUZ',
        titleEn: 'OUR VISION',
        content: 'Vizyonumuz, endüstriyel otomatik kapı sektöründe dünya çapında bir marka olmaktır.',
        contentEn: 'Our vision is to become a worldwide brand in the industrial automatic door sector.'
    },
    misyon: {
        title: 'MİSYONUMUZ',
        titleEn: 'OUR MISSION',
        content: 'Misyonumuz, müşterilerimize en yüksek kalitede ürün ve hizmetler sunmaktır.',
        contentEn: 'Our mission is to provide our customers with the highest quality products and services.'
    }
}

const sectionIcons = {
    hakkimizda: Users,
    vizyon: Eye,
    misyon: Target
}

const sectionLabels = {
    hakkimizda: { tr: 'Hakkımızda', en: 'About Us' },
    vizyon: { tr: 'Vizyonumuz', en: 'Our Vision' },
    misyon: { tr: 'Misyonumuz', en: 'Our Mission' }
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

function BackgroundImageUploader({
    currentImage,
    onUpload
}: {
    currentImage?: string
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
        formData.append('section', 'about-background')

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
        <div
            className="relative h-48 bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer group"
            onClick={() => inputRef.current?.click()}
        >
            {currentImage ? (
                <img src={currentImage} alt="Arka Plan" className="w-full h-full object-cover" />
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <ImageIcon className="w-12 h-12 mb-2" />
                    <span className="text-sm">Arka plan görseli yükleyin</span>
                </div>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {uploading ? (
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                ) : (
                    <div className="text-center text-white">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <span className="text-sm">Görsel Yükle</span>
                    </div>
                )}
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

export default function AboutAdminPage() {
    const [content, setContent] = useState<AboutContent>(defaultContent)
    const [backgroundImage, setBackgroundImage] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [activeLang, setActiveLang] = useState<'tr' | 'en'>('tr')

    useEffect(() => {
        fetchContent()
    }, [])

    const fetchContent = async () => {
        try {
            const res = await fetch('/api/about')
            const data = await res.json()
            if (data.hakkimizda || data.vizyon || data.misyon) {
                setContent({
                    hakkimizda: {
                        title: data.hakkimizda?.title || defaultContent.hakkimizda.title,
                        titleEn: data.hakkimizda?.titleEn || defaultContent.hakkimizda.titleEn,
                        content: data.hakkimizda?.content || defaultContent.hakkimizda.content,
                        contentEn: data.hakkimizda?.contentEn || defaultContent.hakkimizda.contentEn
                    },
                    vizyon: {
                        title: data.vizyon?.title || defaultContent.vizyon.title,
                        titleEn: data.vizyon?.titleEn || defaultContent.vizyon.titleEn,
                        content: data.vizyon?.content || defaultContent.vizyon.content,
                        contentEn: data.vizyon?.contentEn || defaultContent.vizyon.contentEn
                    },
                    misyon: {
                        title: data.misyon?.title || defaultContent.misyon.title,
                        titleEn: data.misyon?.titleEn || defaultContent.misyon.titleEn,
                        content: data.misyon?.content || defaultContent.misyon.content,
                        contentEn: data.misyon?.contentEn || defaultContent.misyon.contentEn
                    }
                })
                if (data.background_image) {
                    setBackgroundImage(data.background_image)
                }
            }
        } catch (error) {
            console.error('Fetch error:', error)
        } finally {
            setLoading(false)
        }
    }

    const saveContent = async () => {
        setSaving(true)
        setError(null)

        try {
            const res = await fetch('/api/about', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...content,
                    background_image: backgroundImage
                })
            })
            const data = await res.json()

            if (data.success) {
                setSaved(true)
                setTimeout(() => setSaved(false), 3000)
            } else {
                setError(data.error || 'Kaydetme başarısız')
            }
        } catch (error) {
            console.error('Save error:', error)
            setError('Kaydetme başarısız')
        } finally {
            setSaving(false)
        }
    }

    const updateSection = (section: keyof Pick<AboutContent, 'hakkimizda' | 'vizyon' | 'misyon'>, field: string, value: string) => {
        setContent(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }))
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#ED1C24]" />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#414042]">Hakkımızda Sayfası</h1>
                    <p className="text-gray-500 mt-1">Basit ve sade hakkımızda sayfası içeriğini düzenleyin</p>
                </div>
                <div className="flex items-center gap-3">
                    <LanguageTabs activeTab={activeLang} onTabChange={setActiveLang} />
                    <Button
                        onClick={saveContent}
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
                        {saved ? "Kaydedildi!" : "Kaydet"}
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

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            {/* Background Image */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h3 className="font-semibold text-[#414042] mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#ED1C24]" />
                    Arka Plan Görseli
                </h3>
                <BackgroundImageUploader
                    currentImage={backgroundImage}
                    onUpload={setBackgroundImage}
                />
                <p className="text-sm text-gray-500 mt-2">
                    Önerilen boyut: 1920x1080 piksel. Görsel koyu overlay ile yarı saydam görünecektir.
                </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-4">
                {(['hakkimizda', 'vizyon', 'misyon'] as const).map((sectionKey) => {
                    const section = content[sectionKey]
                    const Icon = sectionIcons[sectionKey]
                    const labels = sectionLabels[sectionKey]

                    return (
                        <motion.div
                            key={sectionKey}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl border border-gray-200 p-6"
                        >
                            {/* Section Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-[#ED1C24]/10 rounded-lg flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-[#ED1C24]" />
                                </div>
                                <h3 className="font-semibold text-[#414042]">
                                    {activeLang === 'tr' ? `🇹🇷 ${labels.tr}` : `🇬🇧 ${labels.en}`}
                                </h3>
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {activeLang === 'tr' ? 'İçerik' : 'Content'}
                                </label>
                                <Textarea
                                    value={activeLang === 'tr' ? section.content : section.contentEn}
                                    onChange={(e) => updateSection(
                                        sectionKey,
                                        activeLang === 'tr' ? 'content' : 'contentEn',
                                        e.target.value
                                    )}
                                    placeholder={activeLang === 'tr' ? `${labels.tr} içeriği...` : `${labels.en} content...`}
                                    rows={5}
                                    className={`resize-none ${activeLang === 'en' ? 'border-blue-200' : ''}`}
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    {(activeLang === 'tr' ? section.content : section.contentEn).length} karakter
                                </p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Preview Hint */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                    Değişiklikleri kaydettiğinizde{' '}
                    <a href="/hakkimizda" target="_blank" className="text-[#ED1C24] hover:underline">
                        /hakkimizda
                    </a>
                    {' '}sayfasında görüntülenecektir.
                </p>
            </div>
        </div>
    )
}
