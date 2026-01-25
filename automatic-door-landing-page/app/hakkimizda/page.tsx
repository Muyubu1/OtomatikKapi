"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Target, Eye, Heart, Users, Award, Clock, Shield, Zap } from 'lucide-react'

interface AboutContent {
    [key: string]: {
        title: string
        content: string
        image_url?: string
    }
}

const valueIcons = [
    { icon: Award, label: 'Kalite', desc: 'En yüksek standartlarda üretim' },
    { icon: Shield, label: 'Güvenilirlik', desc: 'Müşteri memnuniyeti önceliğimiz' },
    { icon: Zap, label: 'Yenilikçilik', desc: 'Teknolojik gelişmeleri takip' },
    { icon: Clock, label: 'Zamanında Teslimat', desc: 'Projelerinizi zamanında tamamlıyoruz' },
]

const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
}

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

export default function AboutPage() {
    const [content, setContent] = useState<AboutContent>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchContent()
    }, [])

    const fetchContent = async () => {
        try {
            const res = await fetch('/api/about')
            const data = await res.json()
            setContent(data)
        } catch (error) {
            console.error('About fetch error:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#414042] to-gray-900 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#ED1C24] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#414042] to-gray-900 text-white overflow-hidden">
            {/* Back Button */}
            <Link
                href="/"
                className="fixed top-6 left-6 z-50 flex items-center gap-2 text-white/70 hover:text-[#ED1C24] transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
            >
                <ArrowLeft className="h-5 w-5" />
                <span>Ana Sayfa</span>
            </Link>

            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="relative pt-32 pb-20 px-6"
            >
                {/* Hero Background Image */}
                {content.hero?.image_url && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={content.hero.image_url}
                            alt="Hero"
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#414042] via-[#414042]/80 to-gray-900" />
                    </div>
                )}

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.div variants={fadeInUp}>
                        <span className="inline-block px-4 py-2 bg-[#ED1C24]/20 text-[#ED1C24] rounded-full text-sm font-medium mb-6">
                            2010'dan Beri Hizmetinizde
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        {content.hero?.title || 'Hakkımızda'}
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
                    >
                        {content.hero?.content || 'CKS Otomatik Kapı olarak, endüstriyel kapı sistemlerinde Türkiye\'nin önde gelen firmalarından biriyiz. Kalite, güvenilirlik ve müşteri memnuniyeti odaklı hizmet anlayışımızla sektörde fark yaratıyoruz.'}
                    </motion.p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#ED1C24]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ED1C24]/5 rounded-full blur-3xl" />
            </motion.section>

            {/* Mission & Vision */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
                className="py-20 px-6"
            >
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    {/* Mission Card */}
                    <motion.div
                        variants={fadeInUp}
                        className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-[#ED1C24]/50 transition-all duration-500"
                    >
                        {content.mission?.image_url && (
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={content.mission.image_url}
                                    alt="Misyon"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ED1C24]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                        <div className="relative p-8">
                            <div className="w-16 h-16 bg-[#ED1C24]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Target className="w-8 h-8 text-[#ED1C24]" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">
                                {content.mission?.title || 'Misyonumuz'}
                            </h2>
                            <p className="text-white/70 leading-relaxed">
                                {content.mission?.content || 'Müşterilerimize en kaliteli, güvenilir ve yenilikçi otomatik kapı çözümleri sunarak, işletmelerinin verimliliğini artırmak ve güvenliğini sağlamak.'}
                            </p>
                        </div>
                    </motion.div>

                    {/* Vision Card */}
                    <motion.div
                        variants={fadeInUp}
                        className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-[#ED1C24]/50 transition-all duration-500"
                    >
                        {content.vision?.image_url && (
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={content.vision.image_url}
                                    alt="Vizyon"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ED1C24]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                        <div className="relative p-8">
                            <div className="w-16 h-16 bg-[#ED1C24]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Eye className="w-8 h-8 text-[#ED1C24]" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">
                                {content.vision?.title || 'Vizyonumuz'}
                            </h2>
                            <p className="text-white/70 leading-relaxed">
                                {content.vision?.content || 'Türkiye ve dünyada endüstriyel kapı sistemleri sektöründe lider firma olmak, teknolojik yeniliklerle sektöre yön vermek.'}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Values Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
                className="py-20 px-6 bg-gradient-to-b from-transparent via-white/5 to-transparent"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {content.values?.title || 'Değerlerimiz'}
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            {content.values?.content || 'Başarımızın temelini oluşturan değerlerimiz'}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {valueIcons.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={scaleIn}
                                className="group text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ED1C24]/30 transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-[#ED1C24]/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#ED1C24] transition-colors">
                                    <item.icon className="w-7 h-7 text-[#ED1C24] group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{item.label}</h3>
                                <p className="text-sm text-white/60">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Team Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
                className="py-20 px-6"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        {content.team?.image_url ? (
                            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#ED1C24]/30">
                                <img
                                    src={content.team.image_url}
                                    alt="Ekip"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-20 h-20 bg-[#ED1C24]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="w-10 h-10 text-[#ED1C24]" />
                            </div>
                        )}
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {content.team?.title || 'Ekibimiz'}
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 md:p-12 border border-white/10"
                    >
                        <p className="text-lg text-white/80 leading-relaxed text-center max-w-4xl mx-auto">
                            {content.team?.content || 'Deneyimli mühendisler, uzman teknisyenler ve profesyonel satış ekibimizle, projelerinizi en iyi şekilde gerçekleştiriyoruz. Sürekli eğitim ve gelişim anlayışımızla, sektördeki en son teknolojileri takip ediyoruz.'}
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="py-20 px-6"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Projeleriniz İçin Bize Ulaşın</h2>
                    <p className="text-white/60 mb-8">
                        Otomatik kapı ihtiyaçlarınız için ücretsiz keşif ve fiyat teklifi alın.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#ED1C24] hover:bg-[#c91920] text-white font-semibold rounded-full transition-colors"
                    >
                        İletişime Geçin
                    </Link>
                </div>
            </motion.section>
        </div>
    )
}
