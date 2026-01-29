"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'tr' | 'en'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const translations = {
    tr: {
        // Navigation
        "nav.home": "Anasayfa",
        "nav.about": "Hakkımızda",
        "nav.products": "Ürünlerimiz",
        "nav.gallery": "Galeri",
        "nav.contact": "İletişim",

        // Header
        "header.getQuote": "Hemen Teklif Al",

        // Footer
        "footer.quickLinks": "Hızlı Linkler",
        "footer.ourProducts": "Ürünlerimiz",
        "footer.viewAll": "Tüm Ürünleri Görüntüle",
        "footer.contact": "İletişim",
        "footer.rights": "Tüm hakları saklıdır",
        "footer.privacy": "Gizlilik Politikası",
        "footer.terms": "Kullanım Şartları",
        "footer.description": "Endüstriyel otomatik kapı ve yükleme sistemlerinde lider firma. Güvenli, hızlı ve kaliteli çözümler.",
        "footer.productsDesc": "Endüstriyel kapılar, yüksek hızlı kapılar, yükleme sistemleri ve daha fazlası için ürün kataloğumuzu inceleyin.",

        // Hero
        "hero.title": "Endüstriyel Otomatik Kapı",
        "hero.subtitle": "ve Yükleme Sistemleri",
        "hero.description": "Güvenli, hızlı ve kaliteli otomatik kapı çözümleri ile işletmenizi bir adım öne taşıyın.",

        // Products
        "products.title": "Ürünlerimiz",
        "products.description": "Endüstriyel ve ticari ihtiyaçlarınız için geniş ürün yelpazemizi keşfedin.",
        "products.viewAll": "Tüm Ürünleri Görüntüle",

        // Features
        "features.title": "Bizimle Daha Güvenli Olursunuz",

        // Why Us
        "whyUs.title": "NEDEN BİZ",

        // Project Solutions
        "projectSolutions.title": "PROJEYE ÖZEL ÇÖZÜMLER",
        "projectSolutions.button": "Referanslarımız",

        // Gallery
        "gallery.title": "Galeri",
        "gallery.back": "Ana Sayfa",
        "gallery.loading": "Galeri yükleniyor...",

        // FAQ
        "faq.title": "Endüstriyel Otomatik Kapı Sistemleri Nedir?",
        "faq.description": "Endüstriyel otomatik kapı sistemleri, genellikle fabrikalar, depolar ve diğer endüstriyel tesislerde kullanılan, genellikle uzaktan kumanda veya hareket sensörleri ile kontrol edilen kapılardır.",

        // Buttons
        "button.whatsapp": "WhatsApp Hattı",
        "button.callNow": "Hemen Ara",
        "button.whatsappMessage": "Merhaba, otomatik kapılar hakkında fiyat bilgisi almak istiyorum.",

        // About Page
        "about.backToHome": "Ana Sayfa",
        "about.aboutUs": "HAKKIMIZDA",
        "about.vision": "VİZYONUMUZ",
        "about.mission": "MİSYONUMUZ",

        // Products Page
        "products.noProducts": "Henüz ürün eklenmemiş.",
        "products.pageDescription": "Endüstriyel ve ticari ihtiyaçlarınız için geniş ürün yelpazemizi keşfedin. Kaliteli ve güvenilir otomatik kapı sistemleri.",
        "products.allProducts": "Tüm Ürünler",
        "products.features": "Özellikler",
        "products.getQuote": "Teklif Al",
        "products.callNow": "Hemen Ara",
        "products.prevProduct": "Önceki Ürün",
        "products.nextProduct": "Sonraki Ürün",
        "products.otherProducts": "Diğer Ürünlerimiz",
    },
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.about": "About Us",
        "nav.products": "Our Products",
        "nav.gallery": "Gallery",
        "nav.contact": "Contact",

        // Header
        "header.getQuote": "Get Quote",

        // Footer
        "footer.quickLinks": "Quick Links",
        "footer.ourProducts": "Our Products",
        "footer.viewAll": "View All Products",
        "footer.contact": "Contact",
        "footer.rights": "All rights reserved",
        "footer.privacy": "Privacy Policy",
        "footer.terms": "Terms of Use",
        "footer.description": "Leading company in industrial automatic doors and loading systems. Safe, fast and quality solutions.",
        "footer.productsDesc": "Explore our product catalog for industrial doors, high-speed doors, loading systems and more.",

        // Hero
        "hero.title": "Industrial Automatic Door",
        "hero.subtitle": "and Loading Systems",
        "hero.description": "Take your business one step ahead with safe, fast and quality automatic door solutions.",

        // Products
        "products.title": "Our Products",
        "products.description": "Discover our wide range of products for your industrial and commercial needs.",
        "products.viewAll": "View All Products",

        // Features
        "features.title": "You Are Safer With Us",

        // Why Us
        "whyUs.title": "WHY US",

        // Project Solutions
        "projectSolutions.title": "PROJECT-SPECIFIC SOLUTIONS",
        "projectSolutions.button": "Our References",

        // Gallery
        "gallery.title": "Gallery",
        "gallery.back": "Home",
        "gallery.loading": "Loading gallery...",

        // FAQ
        "faq.title": "What are Industrial Automatic Door Systems?",
        "faq.description": "Industrial automatic door systems are doors typically used in factories, warehouses, and other industrial facilities, usually controlled by remote control or motion sensors.",

        // Buttons
        "button.whatsapp": "WhatsApp Line",
        "button.callNow": "Call Now",
        "button.whatsappMessage": "Hello, I would like to get price information about automatic doors.",

        // About Page
        "about.backToHome": "Home",
        "about.aboutUs": "ABOUT US",
        "about.vision": "OUR VISION",
        "about.mission": "OUR MISSION",

        // Products Page
        "products.noProducts": "No products added yet.",
        "products.pageDescription": "Discover our wide range of products for your industrial and commercial needs. Quality and reliable automatic door systems.",
        "products.allProducts": "All Products",
        "products.features": "Features",
        "products.getQuote": "Get Quote",
        "products.callNow": "Call Now",
        "products.prevProduct": "Previous Product",
        "products.nextProduct": "Next Product",
        "products.otherProducts": "Our Other Products",
    }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('tr')

    useEffect(() => {
        const saved = localStorage.getItem('language') as Language
        if (saved && (saved === 'tr' || saved === 'en')) {
            setLanguageState(saved)
        }
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem('language', lang)
    }

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations['tr']] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
