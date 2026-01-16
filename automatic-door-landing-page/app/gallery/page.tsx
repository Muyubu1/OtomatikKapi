"use client"

import React from 'react';
import Link from 'next/link';
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';
import { ArrowLeft } from 'lucide-react';

const galleryData: GalleryItem[] = [
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
        common: 'Dairesel Bahçe Kapısı',
        binomial: 'Dekoratif Metal Kapı',
        photo: {
            url: '/assets/gallery/Dairesel-Bahce-Kapisi-1-1030x1030.jpg',
            text: 'Estetik dairesel tasarıma sahip dekoratif bahçe giriş kapısı',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'Dairesel Bahçe Kapısı',
        binomial: 'Modern Bahçe Kapısı',
        photo: {
            url: '/assets/gallery/Dairesel-Bahce-Kapisi-4.jpg',
            text: 'Modern dairesel desenli özel tasarım bahçe kapısı',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'Endüstriyel Kepenk Kapı',
        binomial: 'Hızlı Kepenk Sistemi',
        photo: {
            url: '/assets/gallery/Endustriyel-Kepenk-kapi-1-773x1030.jpg',
            text: 'Endüstriyel tesisler için yüksek performanslı kepenk kapı sistemi',
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
    {
        common: 'Endüstriyel Şerit Perde',
        binomial: 'PVC Şerit Perde Sistemi',
        photo: {
            url: '/assets/gallery/Endustriyel-Serit-Perde-1.jpeg',
            text: 'Soğuk hava depolarına uygun endüstriyel PVC şerit perde sistemi',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'Yangın Kapısı',
        binomial: 'Personel Yangın Kapısı',
        photo: {
            url: '/assets/gallery/fire-door-gray-personnel-door.jpg',
            text: 'Yangın güvenliği için tasarlanmış personel geçiş kapısı',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'Katlanır Kapı',
        binomial: 'Endüstriyel Katlanır Kapı',
        photo: {
            url: '/assets/gallery/industrial-folding-door-white.jpg',
            text: 'Geniş açıklıklar için beyaz endüstriyel katlanır kapı sistemi',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'Metal Seksiyonel Kapı',
        binomial: 'Endüstriyel Panel Kapı',
        photo: {
            url: '/assets/gallery/industrial-sectional-door-gray-metal.jpg',
            text: 'Gri metal panelli endüstriyel seksiyonel kapı sistemi',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'Otomatik Cam Kapı',
        binomial: 'Fotoselli Cam Kapı',
        photo: {
            url: '/assets/gallery/Otomatik-Cam-Kapi-2.jpg',
            text: 'Modern fotoselli otomatik cam kapı sistemi',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'Otomatik Cam Kapı',
        binomial: 'Kayar Cam Kapı',
        photo: {
            url: '/assets/gallery/Otomatik-Cam-Kapi-3.jpg',
            text: 'Şık tasarımlı otomatik kayar cam kapı sistemi',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'Personel Yangın Kapısı',
        binomial: 'Güvenlik Yangın Kapısı',
        photo: {
            url: '/assets/gallery/Personel-Yangin-Kapisi-1-772x1030.jpg',
            text: 'Acil çıkış ve yangın güvenliği için personel kapısı',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'Personel Yangın Kapısı',
        binomial: 'Çelik Yangın Kapısı',
        photo: {
            url: '/assets/gallery/Personel-Yangin-Kapisi-4-773x1030.jpg',
            text: 'Yüksek dayanıklılıklı çelik personel yangın kapısı',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'PVC Katlanır Kapı',
        binomial: 'Esnek Katlanır Kapı',
        photo: {
            url: '/assets/gallery/PVC-Katlanir-Kapi-2-1.jpg',
            text: 'Esnek PVC malzemeden üretilmiş katlanır kapı sistemi',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'Seksiyonel Kapı',
        binomial: 'Panel Garaj Kapısı',
        photo: {
            url: '/assets/gallery/Seksiyonel-Kapi-2-773x1030.jpg',
            text: 'Modern tasarımlı panelli seksiyonel garaj kapısı',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'Spiral Yangın Kapısı',
        binomial: 'Sarmal Yangın Kapısı',
        photo: {
            url: '/assets/gallery/spiral-fire-door-silver.jpg',
            text: 'Gümüş renkli hızlı açılır spiral yangın kapısı',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'PVC Şerit Perde',
        binomial: 'Şeffaf Şerit Perde',
        photo: {
            url: '/assets/gallery/strip-curtain-door-transparent-pvc.jpg',
            text: 'Şeffaf PVC şerit perde kapı sistemi',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
    {
        common: 'Yangın Sarmal Kapı',
        binomial: 'Spiral Yangın Güvenlik Kapısı',
        photo: {
            url: '/assets/gallery/Yangin-Sarmal-Kapi-5.jpg',
            text: 'Yangın korumalı yüksek hızlı sarmal kapı sistemi',
            pos: '50% 50%',
            by: 'CKS Otomatik Kapı'
        }
    },
];

export default function GalleryPage() {
    return (
        // This outer container provides the scrollable height
        <div className="w-full bg-[#0a1628] text-white" style={{ height: '500vh' }}>
            {/* This inner container sticks to the top while scrolling */}
            <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
                {/* Back button */}
                <Link
                    href="/"
                    className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/80 hover:text-orange-400 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Ana Sayfa</span>
                </Link>

                <div className="text-center mb-8 absolute top-16 z-10">
                    <h1 className="text-4xl font-bold">Galeri</h1>
                    <p className="text-white/60">Galeriyi döndürmek için kaydırın</p>
                </div>
                <div className="w-full h-full">
                    <CircularGallery items={galleryData} radius={850} />
                </div>
            </div>
        </div>
    );
}
