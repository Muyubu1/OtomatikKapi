"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Loader2, Check, Plus, Trash2, Edit, X, Image as ImageIcon, RefreshCw, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface GalleryItem {
    id?: number | string
    common: string
    binomial: string
    photo: {
        url: string
        text: string
        by: string
    }
    sort_order?: number
}

export default function GalleryPage() {
    const [gallery, setGallery] = useState<GalleryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [editingId, setEditingId] = useState<string | number | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)

    // Fetch gallery items on mount
    useEffect(() => {
        fetchGallery()
    }, [])

    const fetchGallery = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/gallery')
            if (!response.ok) throw new Error('Galeri yüklenemedi')
            const data = await response.json()
            setGallery(data)
        } catch (error) {
            console.error("Galeri yükleme hatası:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleImageUpload = async (file: File, itemId: string | number) => {
        setUploading(true)
        setUploadError(null)

        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('folder', 'gallery')

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Yükleme başarısız')
            }

            const data = await response.json()

            // Update the item with the new image URL
            updateItem(itemId, {
                photo: {
                    ...gallery.find(item => item.id === itemId)?.photo!,
                    url: data.url
                }
            })
        } catch (error) {
            console.error("Yükleme hatası:", error)
            setUploadError(error instanceof Error ? error.message : 'Yükleme hatası')
        } finally {
            setUploading(false)
        }
    }

    const saveItem = async (item: GalleryItem) => {
        setSaving(true)
        try {
            const isNew = !item.id || typeof item.id === 'string'
            const method = isNew ? 'POST' : 'PUT'

            const response = await fetch('/api/gallery', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            })

            if (!response.ok) throw new Error('Kaydetme başarısız')

            const result = await response.json()

            if (isNew && result.item) {
                // Replace temp ID with real ID
                setGallery(prev => prev.map(g =>
                    g.id === item.id ? { ...result.item, id: result.item.id } : g
                ))
            }

            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
            setEditingId(null)
        } catch (error) {
            console.error("Kaydetme hatası:", error)
        } finally {
            setSaving(false)
        }
    }

    const addItem = () => {
        const tempId = `temp-${Date.now()}`
        const newItem: GalleryItem = {
            id: tempId,
            common: "Yeni Görsel",
            binomial: "Açıklama",
            photo: {
                url: "",
                text: "Görsel açıklaması",
                by: "CKS Otomatik Kapı"
            },
            sort_order: gallery.length
        }
        setGallery([...gallery, newItem])
        setEditingId(tempId)
    }

    const removeItem = async (id: string | number) => {
        if (!confirm('Bu görseli silmek istediğinize emin misiniz?')) return

        // If it's a temp item (not saved yet), just remove from state
        if (typeof id === 'string' && id.startsWith('temp-')) {
            setGallery(gallery.filter((item) => item.id !== id))
            if (editingId === id) setEditingId(null)
            return
        }

        try {
            const response = await fetch(`/api/gallery?id=${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) throw new Error('Silme başarısız')

            setGallery(gallery.filter((item) => item.id !== id))
            if (editingId === id) setEditingId(null)
        } catch (error) {
            console.error("Silme hatası:", error)
        }
    }

    const updateItem = (id: string | number, updates: Partial<GalleryItem>) => {
        setGallery(gallery.map((item) =>
            item.id === id ? { ...item, ...updates } : item
        ))
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
                    <h1 className="text-2xl font-bold text-[#414042]">Galeri Yönetimi</h1>
                    <p className="text-gray-600">Galeri görsellerini yönetin</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={fetchGallery}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Yenile
                    </Button>
                    <Button variant="outline" onClick={addItem}>
                        <Plus className="w-4 h-4 mr-2" />
                        Yeni Ekle
                    </Button>
                </div>
            </div>

            {uploadError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {uploadError}
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-xl shadow-sm overflow-hidden"
                    >
                        {editingId === item.id ? (
                            // Edit Mode
                            <div className="p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">Düzenle</span>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => saveItem(item)}
                                            disabled={saving}
                                        >
                                            {saving ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : saved ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <Save className="w-4 h-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setEditingId(null)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Image Preview & Upload */}
                                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                                    {item.photo.url ? (
                                        <img
                                            src={item.photo.url}
                                            alt={item.common}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon className="w-12 h-12 text-gray-300" />
                                        </div>
                                    )}
                                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                        <div className="text-white text-center">
                                            <Upload className="w-6 h-6 mx-auto mb-1" />
                                            <span className="text-sm">Yükle</span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file && item.id) {
                                                    handleImageUpload(file, item.id)
                                                }
                                            }}
                                            disabled={uploading}
                                        />
                                    </label>
                                </div>

                                <Input
                                    value={item.common}
                                    onChange={(e) => updateItem(item.id!, { common: e.target.value })}
                                    placeholder="Başlık"
                                />
                                <Input
                                    value={item.binomial}
                                    onChange={(e) => updateItem(item.id!, { binomial: e.target.value })}
                                    placeholder="Alt başlık"
                                />
                                <Input
                                    value={item.photo.url}
                                    onChange={(e) => updateItem(item.id!, {
                                        photo: { ...item.photo, url: e.target.value }
                                    })}
                                    placeholder="Görsel URL (veya yukarıdan yükleyin)"
                                />
                                <Textarea
                                    value={item.photo.text}
                                    onChange={(e) => updateItem(item.id!, {
                                        photo: { ...item.photo, text: e.target.value }
                                    })}
                                    placeholder="Açıklama"
                                    rows={2}
                                />
                                <Input
                                    value={item.photo.by}
                                    onChange={(e) => updateItem(item.id!, {
                                        photo: { ...item.photo, by: e.target.value }
                                    })}
                                    placeholder="Fotoğrafçı"
                                />
                            </div>
                        ) : (
                            // View Mode
                            <>
                                <div className="aspect-[4/3] bg-gray-100 relative">
                                    {item.photo.url ? (
                                        <img
                                            src={item.photo.url}
                                            alt={item.common}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon className="w-12 h-12 text-gray-300" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="w-8 h-8 bg-white/90"
                                            onClick={() => setEditingId(item.id!)}
                                        >
                                            <Edit className="w-3 h-3" />
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="w-8 h-8 bg-white/90 text-red-500 hover:text-red-700"
                                            onClick={() => removeItem(item.id!)}
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold text-[#414042] text-sm truncate">{item.common}</h3>
                                    <p className="text-xs text-gray-500 truncate">{item.binomial}</p>
                                </div>
                            </>
                        )}
                    </motion.div>
                ))}

                {gallery.length === 0 && (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl">
                        <p className="text-gray-500">Henüz görsel eklenmemiş</p>
                        <Button variant="outline" onClick={addItem} className="mt-4">
                            <Plus className="w-4 h-4 mr-2" />
                            İlk görseli ekle
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
