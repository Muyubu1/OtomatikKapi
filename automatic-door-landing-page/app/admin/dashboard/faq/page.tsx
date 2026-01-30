"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Loader2, Check, Plus, Trash2, GripVertical, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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

export default function FAQPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [activeLang, setActiveLang] = useState<'tr' | 'en'>('tr')

    useEffect(() => {
        fetchFAQ()
    }, [])

    const fetchFAQ = async () => {
        try {
            const res = await fetch("/api/faq")
            const data = await res.json()
            // Transform to include English fields with defaults
            const transformedFaqs = data.map((faq: any) => ({
                question: faq.question || '',
                questionEn: faq.questionEn || faq.question_en || '',
                answer: faq.answer || '',
                answerEn: faq.answerEn || faq.answer_en || ''
            }))
            setFaqs(transformedFaqs)
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

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#414042]">Sık Sorulan Sorular</h1>
                    <p className="text-gray-600">SSS bölümünü düzenleyin</p>
                </div>
                <div className="flex items-center gap-3">
                    <LanguageTabs activeTab={activeLang} onTabChange={setActiveLang} />
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

            {/* Info Banner */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
                <Globe className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                    <p className="font-medium">Çoklu Dil Desteği</p>
                    <p className="mt-1 text-blue-600">
                        Sağ üstteki 🇹🇷 TR / 🇬🇧 EN butonlarını kullanarak SSS'leri her iki dilde düzenleyebilirsiniz.
                    </p>
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
                                        {activeLang === 'tr' ? `🇹🇷 Soru ${index + 1}` : `🇬🇧 Question ${index + 1}`}
                                    </label>
                                    <Input
                                        value={activeLang === 'tr' ? faq.question : faq.questionEn}
                                        onChange={(e) => updateFAQ(index, activeLang === 'tr' ? "question" : "questionEn", e.target.value)}
                                        placeholder={activeLang === 'tr' ? "Soruyu girin..." : "Enter question..."}
                                        className={activeLang === 'en' ? 'border-blue-200' : ''}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {activeLang === 'tr' ? '🇹🇷 Cevap' : '🇬🇧 Answer'}
                                    </label>
                                    <Textarea
                                        value={activeLang === 'tr' ? faq.answer : faq.answerEn}
                                        onChange={(e) => updateFAQ(index, activeLang === 'tr' ? "answer" : "answerEn", e.target.value)}
                                        placeholder={activeLang === 'tr' ? "Cevabı girin..." : "Enter answer..."}
                                        rows={3}
                                        className={activeLang === 'en' ? 'border-blue-200' : ''}
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
