"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, Loader2, Check, Plus, Trash2, Edit, X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface GalleryItem {
    id: string
    common: string
    binomial: string
    photo: {
        url: string
        text: string
        by: string
    }
}

// Sample gallery data
const initialGallery: GalleryItem[] = [
    {
        id: "1",
        common: "ATEX Seksiyonel Kapı",
        binomial: "Patlama Korumalı Kapı Sistemleri",
        photo: {
            url: "/assets/gallery/Atex-Seksiyonel-Kapi-4-773x1030.jpg",
            text: "Patlama riski bulunan ortamlar için özel tasarlanmış ATEX sertifikalı seksiyonel kapı sistemi",
            by: "CKS Otomatik Kapı"
        }
    },
    {
        id: "2",
        common: "Bariyer Kapı Sistemleri",
        binomial: "Güvenlik Bariyer Sistemleri",
        photo: {
            url: "/assets/gallery/Bariyer-Kapi-Sistemleri-3-1030x685.jpg",
            text: "Araç giriş-çıkış kontrolü için profesyonel bariyer kapı sistemleri",
            by: "CKS Otomatik Kapı"
        }
    }
]

export default function GalleryPage() {
    const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    const saveGallery = async () => {
        setSaving(true)
        try {
            // In a full implementation, this would save to an API/database
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        } catch (error) {
            console.error("Kaydetme hatası:", error)
        } finally {
            setSaving(false)
        }
    }

    const addItem = () => {
        const newItem: GalleryItem = {
            id: Date.now().toString(),
            common: "Yeni Görsel",
            binomial: "Açıklama",
            photo: {
                url: "",
                text: "Görsel açıklaması",
                by: "CKS Otomatik Kapı"
            }
        }
        setGallery([...gallery, newItem])
        setEditingId(newItem.id)
    }

    const removeItem = (id: string) => {
        setGallery(gallery.filter((item) => item.id !== id))
        if (editingId === id) setEditingId(null)
    }

    const updateItem = (id: string, updates: Partial<GalleryItem>) => {
        setGallery(gallery.map((item) =>
            item.id === id ? { ...item, ...updates } : item
        ))
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#414042]">Galeri Yönetimi</h1>
                    <p className="text-gray-600">Galeri görsellerini yönetin</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={addItem}>
                        <Plus className="w-4 h-4 mr-2" />
                        Yeni Ekle
                    </Button>
                    <Button
                        onClick={saveGallery}
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
            </div>

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
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setEditingId(null)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                                <Input
                                    value={item.common}
                                    onChange={(e) => updateItem(item.id, { common: e.target.value })}
                                    placeholder="Başlık"
                                />
                                <Input
                                    value={item.binomial}
                                    onChange={(e) => updateItem(item.id, { binomial: e.target.value })}
                                    placeholder="Alt başlık"
                                />
                                <Input
                                    value={item.photo.url}
                                    onChange={(e) => updateItem(item.id, {
                                        photo: { ...item.photo, url: e.target.value }
                                    })}
                                    placeholder="Görsel URL"
                                />
                                <Input
                                    value={item.photo.text}
                                    onChange={(e) => updateItem(item.id, {
                                        photo: { ...item.photo, text: e.target.value }
                                    })}
                                    placeholder="Açıklama"
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
                                            onClick={() => setEditingId(item.id)}
                                        >
                                            <Edit className="w-3 h-3" />
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="w-8 h-8 bg-white/90 text-red-500 hover:text-red-700"
                                            onClick={() => removeItem(item.id)}
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
