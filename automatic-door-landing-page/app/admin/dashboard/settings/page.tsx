"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
    Save, Loader2, Check, Upload, Video, ExternalLink, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Settings {
    instagramUrl: string
    linkedinUrl: string
    heroVideoUrl: string
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings>({
        instagramUrl: '',
        linkedinUrl: '',
        heroVideoUrl: '/videos/hero-bg.webm'
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [uploading, setUploading] = useState(false)
    const videoInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/settings")
            const data = await res.json()
            setSettings(data)
        } catch (error) {
            console.error("Ayarlar yüklenemedi:", error)
        } finally {
            setLoading(false)
        }
    }

    const saveSettings = async () => {
        setSaving(true)
        try {
            await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            })
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        } catch (error) {
            console.error("Kaydetme hatası:", error)
        } finally {
            setSaving(false)
        }
    }

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Check if file is webm
        if (!file.name.endsWith('.webm')) {
            alert('Sadece .webm formatında video yükleyebilirsiniz. MP4 dosyalarını önce WebM formatına çevirin.')
            return
        }

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('section', 'video')

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()
            if (data.success) {
                setSettings({ ...settings, heroVideoUrl: data.url })
            }
        } catch (error) {
            console.error('Video yükleme hatası:', error)
        } finally {
            setUploading(false)
        }
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
                    <h1 className="text-2xl font-bold text-[#414042]">Site Ayarları</h1>
                    <p className="text-gray-500 mt-1">Sosyal medya hesapları ve video ayarları</p>
                </div>
                <Button
                    onClick={saveSettings}
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

            <div className="space-y-6">
                {/* Social Media Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <h2 className="text-lg font-semibold text-[#414042] mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                            </svg>
                        </span>
                        Sosyal Medya Hesapları
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Instagram URL
                            </label>
                            <Input
                                value={settings.instagramUrl}
                                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                                placeholder="https://instagram.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                LinkedIn URL
                            </label>
                            <Input
                                value={settings.linkedinUrl}
                                onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                                placeholder="https://linkedin.com/company/..."
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Video Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <h2 className="text-lg font-semibold text-[#414042] mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-[#ED1C24] flex items-center justify-center">
                            <Video className="w-4 h-4 text-white" />
                        </span>
                        Hero Video
                    </h2>

                    {/* Info Box */}
                    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-700">
                            <p className="font-medium">Video Formatı: WebM</p>
                            <p className="mt-1 text-blue-600">
                                Sadece .webm formatında video yükleyebilirsiniz. MP4 dosyanızı WebM&apos;e çevirmek için:
                            </p>
                            <a
                                href="https://cloudconvert.com/mp4-to-webm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-800 font-medium"
                            >
                                <ExternalLink className="w-4 h-4" />
                                cloudconvert.com/mp4-to-webm
                            </a>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mevcut Video
                            </label>
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-200">
                                {settings.heroVideoUrl ? (
                                    <video
                                        src={settings.heroVideoUrl}
                                        className="w-full h-full object-cover"
                                        muted
                                        loop
                                        autoPlay
                                        playsInline
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <Video className="w-8 h-8 text-gray-300" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Yeni Video Yükle
                            </label>
                            <Button
                                variant="outline"
                                onClick={() => videoInputRef.current?.click()}
                                disabled={uploading}
                                className="w-full"
                            >
                                {uploading ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                    <Upload className="w-4 h-4 mr-2" />
                                )}
                                {uploading ? 'Yükleniyor...' : 'Video Seç (.webm)'}
                            </Button>
                            <input
                                ref={videoInputRef}
                                type="file"
                                accept=".webm,video/webm"
                                onChange={handleVideoUpload}
                                className="hidden"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Önerilen boyut: 1920x1080, Maksimum: 50MB
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
