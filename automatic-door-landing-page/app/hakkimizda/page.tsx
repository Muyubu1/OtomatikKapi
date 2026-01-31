"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, Eye, Target } from 'lucide-react'
import WhatsAppButton from '@/components/whatsapp-button'
import CallButton from '@/components/call-button'
import Footer from '@/components/footer'
import { useLanguage } from '@/lib/i18n'

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

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
}

export default function AboutPage() {
    const { language } = useLanguage()
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
                    },
                    background_image: data.background_image
                })
            }
        } catch (error) {
            console.error('About fetch error:', error)
        } finally {
            setLoading(false)
        }
    }

    // Helper function to get content based on language
    const getTitle = (section: AboutSection) => language === 'en' ? section.titleEn : section.title
    const getContent = (section: AboutSection) => language === 'en' ? section.contentEn : section.content

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
                <span>{language === 'en' ? 'Home' : 'Ana Sayfa'}</span>
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
                            {/* Hakkımızda / About Us */}
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
                                    {getTitle(content.hakkimizda)}
                                </h2>
                                <p className="text-white/80 leading-relaxed text-sm md:text-base">
                                    {getContent(content.hakkimizda)}
                                </p>
                            </motion.div>

                            {/* Vizyon / Vision */}
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
                                    {getTitle(content.vizyon)}
                                </h2>
                                <p className="text-white/80 leading-relaxed text-sm md:text-base">
                                    {getContent(content.vizyon)}
                                </p>
                            </motion.div>

                            {/* Misyon / Mission */}
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
                                    {getTitle(content.misyon)}
                                </h2>
                                <p className="text-white/80 leading-relaxed text-sm md:text-base">
                                    {getContent(content.misyon)}
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
