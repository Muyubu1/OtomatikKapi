"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

// Fallback static data in case API fails
const fallbackGalleryData: GalleryItem[] = [
    {
        common: 'ATEX Seksiyonel Kapı',
        binomial: 'Patlama Korumalı Kapı Sistemleri',
        photo: {
            url: '/assets/gallery/Atex-Seksiyonel-Kapi-4-773x1030.jpg',
            text: 'Patlama riski bulunan ortamlar için özel tasarlanmış ATEX sertifikalı seksiyonel kapı sistemi',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'Bariyer Kapı Sistemleri',
        binomial: 'Güvenlik Bariyer Sistemleri',
        photo: {
            url: '/assets/gallery/Bariyer-Kapi-Sistemleri-3-1030x685.jpg',
            text: 'Araç giriş-çıkış kontrolü için profesyonel bariyer kapı sistemleri',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'Endüstriyel Seksiyonel Kapı',
        binomial: 'Sanayi Tipi Kapı',
        photo: {
            url: '/assets/gallery/Endustriyel-Seksiyonel-Kapi.jpg',
            text: 'Fabrika ve depo alanları için dayanıklı endüstriyel seksiyonel kapı',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
];

const fallbackGalleryDataEn: GalleryItem[] = [
    {
        common: 'ATEX Sectional Door',
        binomial: 'Explosion-Proof Door Systems',
        photo: {
            url: '/assets/gallery/Atex-Seksiyonel-Kapi-4-773x1030.jpg',
            text: 'ATEX certified sectional door system specially designed for explosion risk environments',
            pos: '50% 50%',
            by: 'CKS Automatic Door'
        }
    },
    {
        common: 'Barrier Door Systems',
        binomial: 'Security Barrier Systems',
        photo: {
            url: '/assets/gallery/Bariyer-Kapi-Sistemleri-3-1030x685.jpg',
            text: 'Professional barrier door systems for vehicle entry-exit control',
            pos: '50% 50%',
            by: 'CKS Automatic Door'
        }
    },
    {
        common: 'Industrial Sectional Door',
        binomial: 'Industrial Type Door',
        photo: {
            url: '/assets/gallery/Endustriyel-Seksiyonel-Kapi.jpg',
            text: 'Durable industrial sectional door for factory and warehouse areas',
            pos: '50% 50%',
            by: 'CKS Automatic Door'
        }
    },
];

export default function GalleryPage() {
    const { t, language } = useLanguage();
    const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch('/api/gallery');
                if (!response.ok) throw new Error('Failed to fetch');

                const data = await response.json();

                // If API returns empty array, use fallback
                if (data && data.length > 0) {
                    setGalleryData(data);
                } else {
                    setGalleryData(language === 'en' ? fallbackGalleryDataEn : fallbackGalleryData);
                }
            } catch (error) {
                console.error('Gallery fetch error:', error);
                // Use fallback data on error
                setGalleryData(language === 'en' ? fallbackGalleryDataEn : fallbackGalleryData);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, [language]);

    if (loading) {
        return (
            <div className="w-full h-screen bg-[#414042] text-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-[#ED1C24] mx-auto mb-4" />
                    <p className="text-white/70">{t("gallery.loading")}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen bg-[#414042] text-white overflow-hidden">
            {/* Back button */}
            <Link
                href="/"
                className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/80 hover:text-[#ED1C24] transition-colors"
            >
                <ArrowLeft className="h-5 w-5" />
                <span>{t("gallery.back")}</span>
            </Link>

            <div className="text-center pt-16 pb-4 z-10 relative">
                <h1 className="text-4xl font-bold">{t("gallery.title")}</h1>
            </div>
            <div className="w-full h-[calc(100vh-120px)]">
                <CircularGallery items={galleryData} radius={850} />
            </div>
        </div>
    );
}
