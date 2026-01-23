export interface Product {
    slug: string
    name: string
    shortDescription: string
    fullDescription: string
    mainImage: string
    gallery: string[]
    features: string[]
    category: string
}

export const products: Product[] = [
    {
        slug: "endustriyel-seksiyonel-kapi",
        name: "Endüstriyel Seksiyonel Kapı",
        shortDescription: "Sanayi tipi dayanıklı panel kapı sistemi",
        fullDescription: "Endüstriyel seksiyonel kapılar, fabrikalar, depolar ve üretim tesisleri için özel olarak tasarlanmış yüksek performanslı kapı sistemleridir. Çelik veya alüminyum panellerden oluşan bu kapılar, mükemmel ısı yalıtımı ve dayanıklılık sunar. Motorlu veya manuel kullanım seçenekleriyle, yoğun trafiğe uygun çözümler sağlar.",
        mainImage: "/industrial-sectional-door-gray-metal.jpg",
        gallery: [
            "/industrial-sectional-door-gray-metal.jpg",
            "/assets/gallery/Endustriyel-Seksiyonel-Kapi.jpg",
            "/assets/gallery/Seksiyonel-Kapi-2-773x1030.jpg"
        ],
        features: [
            "Yüksek ısı yalıtımı",
            "Galvanizli çelik panel",
            "Motorlu/manuel kullanım",
            "Uzun ömürlü dayanıklılık",
            "Kolay bakım",
            "Güvenlik sensörleri"
        ],
        category: "Endüstriyel Kapılar"
    },
    {
        slug: "endustriyel-katlanir-kapi",
        name: "Endüstriyel Katlanır Kapı",
        shortDescription: "Geniş açıklıklar için esnek katlanır sistem",
        fullDescription: "Endüstriyel katlanır kapılar, büyük açıklıklar için ideal çözümler sunar. Hangar, depo ve üretim alanlarında kullanılan bu kapılar, hızlı açılıp kapanma özelliğiyle zaman tasarrufu sağlar. Alüminyum veya çelik konstrüksiyon seçenekleriyle farklı ihtiyaçlara uyum sağlar.",
        mainImage: "/industrial-folding-door-white.jpg",
        gallery: [
            "/industrial-folding-door-white.jpg",
            "/assets/gallery/PVC-Katlanir-Kapi-2-1.jpg"
        ],
        features: [
            "Geniş açıklıklara uygun",
            "Hızlı açılma/kapanma",
            "Hafif konstrüksiyon",
            "Az yer kaplama",
            "Dayanıklı malzeme",
            "Özel ölçü üretim"
        ],
        category: "Endüstriyel Kapılar"
    },
    {
        slug: "serit-perde-kapi",
        name: "Şerit Perde Kapı",
        shortDescription: "PVC şerit perde sistemleri",
        fullDescription: "Şerit perde kapılar, soğuk hava depoları, gıda tesisleri ve endüstriyel alanlarda yaygın olarak kullanılır. Şeffaf PVC şeritler sayesinde görüş alanı korunurken, ısı ve toz izolasyonu sağlanır. Forklift ve personel geçişine uygun pratik çözümler sunar.",
        mainImage: "/strip-curtain-door-transparent-pvc.jpg",
        gallery: [
            "/strip-curtain-door-transparent-pvc.jpg",
            "/assets/gallery/Endustriyel-Serit-Perde-1.jpeg"
        ],
        features: [
            "Isı izolasyonu",
            "Toz ve böcek bariyeri",
            "Şeffaf görünüm",
            "Kolay geçiş",
            "Ekonomik çözüm",
            "Kolay montaj"
        ],
        category: "Yüksek Hızlı Kapılar"
    },
    {
        slug: "personel-yangin-kapisi",
        name: "Personel Yangın Kapısı",
        shortDescription: "Yangın güvenliği için çelik kapı sistemleri",
        fullDescription: "Personel yangın kapıları, yangın durumlarında güvenli tahliye ve yangın yayılımını önleme amacıyla kullanılır. Yangın dayanıklılık sınıfına göre 60-120 dakika koruma sağlar. Panik bar, otomatik kapanma ve duman sızdırmazlık özellikleriyle donatılabilir.",
        mainImage: "/fire-door-gray-personnel-door.jpg",
        gallery: [
            "/fire-door-gray-personnel-door.jpg",
            "/assets/gallery/Personel-Yangin-Kapisi-1-772x1030.jpg",
            "/assets/gallery/Personel-Yangin-Kapisi-4-773x1030.jpg"
        ],
        features: [
            "60-120 dakika yangın dayanımı",
            "Panik bar sistemi",
            "Otomatik kapanma",
            "Duman sızdırmazlık",
            "CE sertifikalı",
            "Çelik konstrüksiyon"
        ],
        category: "Yangın Kapıları"
    },
    {
        slug: "sarmal-yangin-kapisi",
        name: "Sarmal Yangın Kapısı",
        shortDescription: "Yüksek hızlı spiral yangın kapı sistemi",
        fullDescription: "Sarmal yangın kapıları, yangın durumlarında otomatik olarak kapanan ve yüksek hızlı açılıp kapanabilen modern kapı sistemleridir. Özellikle yoğun trafikli alanlarda hem yangın güvenliği hem de verimlilik sağlar. Kompakt tasarımıyla az yer kaplar.",
        mainImage: "/spiral-fire-door-silver.jpg",
        gallery: [
            "/spiral-fire-door-silver.jpg",
            "/assets/gallery/Yangin-Sarmal-Kapi-5.jpg"
        ],
        features: [
            "Yüksek hızlı çalışma",
            "Otomatik yangın kapanması",
            "Kompakt tasarım",
            "Az yer kaplama",
            "Uzaktan kontrol",
            "Sensörlü güvenlik"
        ],
        category: "Yangın Kapıları"
    }
]

export function getProductBySlug(slug: string): Product | undefined {
    return products.find(p => p.slug === slug)
}

export function getOtherProducts(currentSlug: string): Product[] {
    return products.filter(p => p.slug !== currentSlug)
}

export function getAdjacentProducts(currentSlug: string): { prev: Product | null; next: Product | null } {
    const currentIndex = products.findIndex(p => p.slug === currentSlug)
    return {
        prev: currentIndex > 0 ? products[currentIndex - 1] : null,
        next: currentIndex < products.length - 1 ? products[currentIndex + 1] : null
    }
}
