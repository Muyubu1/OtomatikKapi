"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Loader2, Check, Plus, Trash2, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface FAQ {
    question: string
    answer: string
}

export default function FAQPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        fetchFAQ()
    }, [])

    const fetchFAQ = async () => {
        try {
            const res = await fetch("/api/faq")
            const data = await res.json()
            setFaqs(data)
        } catch (error) {
            console.error("Veri yüklenemedi:", error)
        } finally {
            setLoading(false)
        }
    }

    const saveFAQ = async () => {
        setSaving(true)
        try {
            await fetch("/api/faq", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(faqs)
            })
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        } catch (error) {
            console.error("Kaydetme hatası:", error)
        } finally {
            setSaving(false)
        }
    }

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

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#414042]">Sık Sorulan Sorular</h1>
                    <p className="text-gray-600">SSS bölümünü düzenleyin</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={addFAQ}>
                        <Plus className="w-4 h-4 mr-2" />
                        Yeni Ekle
                    </Button>
                    <Button
                        onClick={saveFAQ}
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

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-xl p-6 shadow-sm"
                    >
                        <div className="flex items-start gap-4">
                            <div className="text-gray-400 cursor-move">
                                <GripVertical className="w-5 h-5" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Soru {index + 1}
                                    </label>
                                    <Input
                                        value={faq.question}
                                        onChange={(e) => updateFAQ(index, "question", e.target.value)}
                                        placeholder="Soruyu girin..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Cevap
                                    </label>
                                    <Textarea
                                        value={faq.answer}
                                        onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                                        placeholder="Cevabı girin..."
                                        rows={3}
                                    />
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFAQ(index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                ))}

                {faqs.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl">
                        <p className="text-gray-500">Henüz SSS eklenmemiş</p>
                        <Button variant="outline" onClick={addFAQ} className="mt-4">
                            <Plus className="w-4 h-4 mr-2" />
                            İlk soruyu ekle
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
