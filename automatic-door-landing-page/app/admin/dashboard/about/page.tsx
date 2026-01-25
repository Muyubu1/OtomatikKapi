"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
    Save, Loader2, Check, Upload, Image as ImageIcon,
    Target, Eye, Heart, Users, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface AboutSection {
    title: string
    content: string
    image_url?: string
}

interface AboutContent {
    hero: AboutSection
    mission: AboutSection
    vision: AboutSection
    values: AboutSection
    team: AboutSection
}

const defaultContent: AboutContent = {
    hero: { title: 'Hakkımızda', content: 'CKS Otomatik Kapı olarak, endüstriyel kapı sistemlerinde Türkiye\'nin önde gelen firmalarından biriyiz.' },
    mission: { title: 'Misyonumuz', content: 'Müşterilerimize en kaliteli, güvenilir ve yenilikçi otomatik kapı çözümleri sunmak.' },
    vision: { title: 'Vizyonumuz', content: 'Türkiye ve dünyada endüstriyel kapı sistemleri sektöründe lider firma olmak.' },
    values: { title: 'Değerlerimiz', content: 'Kalite, Güvenilirlik, Yenilikçilik ve Müşteri Memnuniyeti' },
    team: { title: 'Ekibimiz', content: 'Deneyimli mühendisler, uzman teknisyenler ve profesyonel satış ekibimizle hizmetinizdeyiz.' }
}

const sectionIcons = {
    hero: Target,
    mission: Target,
    vision: Eye,
    values: Heart,
    team: Users
}

const sectionLabels = {
    hero: 'Ana Başlık',
    mission: 'Misyon',
    vision: 'Vizyon',
    values: 'Değerler',
    team: 'Ekip'
}

function ImageUploader({
    currentImage,
    onUpload,
    onDelete,
    section
}: {
    currentImage?: string
    onUpload: (url: string) => void
    onDelete: () => void
    section: string
}) {
    const [uploading, setUploading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('section', `about-${section}`)

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

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        onDelete()
    }

    return (
        <div className="relative">
            <div
                className="relative h-24 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-200 cursor-pointer group"
                onClick={() => inputRef.current?.click()}
            >
                {currentImage ? (
                    <img src={currentImage} alt="Önizleme" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <ImageIcon className="w-8 h-8" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {uploading ? (
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : (
                        <Upload className="w-6 h-6 text-white" />
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
            {currentImage && (
                <button
                    onClick={handleDelete}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
                    title="Görseli Sil"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    )
}


export default function AboutAdminPage() {
    const [content, setContent] = useState<AboutContent>(defaultContent)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [expandedSection, setExpandedSection] = useState<string | null>('hero')

    useEffect(() => {
        fetchContent()
    }, [])

    const fetchContent = async () => {
        try {
            const res = await fetch('/api/about')
            const data = await res.json()
            if (Object.keys(data).length > 0) {
                setContent({
                    hero: data.hero || defaultContent.hero,
                    mission: data.mission || defaultContent.mission,
                    vision: data.vision || defaultContent.vision,
                    values: data.values || defaultContent.values,
                    team: data.team || defaultContent.team
                })
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
                body: JSON.stringify(content)
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

    const updateSection = (section: keyof AboutContent, field: string, value: string) => {
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
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#414042]">Hakkımızda Sayfası</h1>
                    <p className="text-gray-500 mt-1">Hakkımızda sayfası içeriğini düzenleyin</p>
                </div>
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
                    {saved ? "Kaydedildi!" : "Tümünü Kaydet"}
                </Button>
            </div>

            {/* Info Banner */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                    <p className="font-medium">Sayfa Düzenleme</p>
                    <p className="mt-1 text-blue-600">
                        Her bölümü genişleterek düzenleyebilir, görsel ekleyebilirsiniz.
                        Değişikliklerinizi kaydetmek için "Tümünü Kaydet" butonuna basın.
                    </p>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            {/* Sections */}
            <div className="space-y-4">
                {(Object.keys(content) as Array<keyof AboutContent>).map((sectionKey) => {
                    const section = content[sectionKey]
                    const Icon = sectionIcons[sectionKey]
                    const label = sectionLabels[sectionKey]
                    const isExpanded = expandedSection === sectionKey

                    return (
                        <motion.div
                            key={sectionKey}
                            initial={false}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                            {/* Section Header */}
                            <button
                                onClick={() => setExpandedSection(isExpanded ? null : sectionKey)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#ED1C24]/10 rounded-lg flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-[#ED1C24]" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-[#414042]">{label}</h3>
                                        <p className="text-sm text-gray-500 truncate max-w-md">
                                            {section.title}
                                        </p>
                                    </div>
                                </div>
                                <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </motion.div>
                            </button>

                            {/* Section Content */}
                            <motion.div
                                initial={false}
                                animate={{
                                    height: isExpanded ? 'auto' : 0,
                                    opacity: isExpanded ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 pt-0 space-y-4 border-t border-gray-100">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Başlık
                                        </label>
                                        <Input
                                            value={section.title}
                                            onChange={(e) => updateSection(sectionKey, 'title', e.target.value)}
                                            placeholder="Bölüm başlığı"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            İçerik
                                        </label>
                                        <Textarea
                                            value={section.content}
                                            onChange={(e) => updateSection(sectionKey, 'content', e.target.value)}
                                            placeholder="Bölüm içeriği"
                                            rows={4}
                                        />
                                    </div>

                                    {/* Image (optional) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Görsel (Opsiyonel)
                                        </label>
                                        <ImageUploader
                                            currentImage={section.image_url}
                                            onUpload={(url) => updateSection(sectionKey, 'image_url', url)}
                                            onDelete={() => updateSection(sectionKey, 'image_url', '')}
                                            section={sectionKey}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
