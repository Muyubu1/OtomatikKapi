"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, Eye, Target } from 'lucide-react'
import WhatsAppButton from '@/components/whatsapp-button'
import CallButton from '@/components/call-button'
import Footer from '@/components/footer'

interface AboutContent {
    hakkimizda: {
        title: string
        content: string
    }
    vizyon: {
        title: string
        content: string
    }
    misyon: {
        title: string
        content: string
    }
    background_image?: string
}

const defaultContent: AboutContent = {
    hakkimizda: {
        title: 'HAKKIMIZDA',
        content: 'Biz, CKS Otomatik Kapı ve Yükleme Sistemleri, endüstriyel otomatik kapı sektöründe lider bir firmayız. Yılların verdiği tecrübe ve bilgi birikimi ile müşterilerimize en iyi hizmeti sunmayı hedefliyoruz. Ürünlerimiz, en son teknoloji ve mükemmeliyetçilik anlayışı ile tasarlanmıştır. Güvenlik, dayanıklılık ve kullanım kolaylığı, ürünlerimizin temel özellikleridir.'
    },
    vizyon: {
        title: 'VİZYONUMUZ',
        content: 'Vizyonumuz, endüstriyel otomatik kapı sektöründe dünya çapında bir marka olmaktır. Müşteri memnuniyetini en üst düzeyde tutarak, kaliteli ve yenilikçi ürünler sunmayı hedefliyoruz. Sektördeki gelişmeleri yakından takip ederek, teknoloji ve tasarımda öncü olmayı sürdürmeyi planlıyoruz.'
    },
    misyon: {
        title: 'MİSYONUMUZ',
        content: 'Misyonumuz, müşterilerimize en yüksek kalitede ürün ve hizmetler sunmaktır. Güvenli, dayanıklı ve kullanıcı dostu endüstriyel otomatik kapılar tasarlayarak, müşterilerimizin işlerini kolaylaştırmayı amaçlıyoruz. Sürdürülebilir bir büyüme ile sektördeki liderliğimizi pekiştirmeyi hedefliyoruz.'
    }
}

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
}

export default function AboutPage() {
    const [content, setContent] = useState<AboutContent>(defaultContent)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchContent()
    }, [])

    const fetchContent = async () => {
        try {
            const res = await fetch('/api/about')
            const data = await res.json()
            if (data.hakkimizda || data.vizyon || data.misyon) {
                setContent({
                    hakkimizda: data.hakkimizda || defaultContent.hakkimizda,
                    vizyon: data.vizyon || defaultContent.vizyon,
                    misyon: data.misyon || defaultContent.misyon,
                    background_image: data.background_image
                })
            }
        } catch (error) {
            console.error('About fetch error:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#414042] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#ED1C24] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#414042] text-white overflow-hidden">
            {/* Back Button */}
            <Link
                href="/"
                className="fixed top-6 left-6 z-50 flex items-center gap-2 text-white/70 hover:text-[#ED1C24] transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
            >
                <ArrowLeft className="h-5 w-5" />
                <span>Ana Sayfa</span>
            </Link>

            {/* Call & WhatsApp Buttons */}
            <CallButton />
            <WhatsAppButton />

            {/* Main Section with Background */}
            <div className="relative min-h-screen flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={content.background_image || "/foto4.png"}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                {/* Content */}
                <motion.div
                    className="relative z-10 w-full py-20"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                            {/* Hakkımızda */}
                            <motion.div
                                variants={fadeInUp}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center">
                                        <Users className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold tracking-wider mb-6">
                                    {content.hakkimizda.title}
                                </h2>
                                <p className="text-white/80 leading-relaxed text-sm md:text-base">
                                    {content.hakkimizda.content}
                                </p>
                            </motion.div>

                            {/* Vizyon */}
                            <motion.div
                                variants={fadeInUp}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center">
                                        <Eye className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold tracking-wider mb-6">
                                    {content.vizyon.title}
                                </h2>
                                <p className="text-white/80 leading-relaxed text-sm md:text-base">
                                    {content.vizyon.content}
                                </p>
                            </motion.div>

                            {/* Misyon */}
                            <motion.div
                                variants={fadeInUp}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center">
                                        <Target className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold tracking-wider mb-6">
                                    {content.misyon.title}
                                </h2>
                                <p className="text-white/80 leading-relaxed text-sm md:text-base">
                                    {content.misyon.content}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}
