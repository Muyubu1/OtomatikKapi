import { createServerClient } from './supabase'

export interface SiteContent {
    hero: {
        title: string
        subtitle: string
        description: string
    }
    features: {
        title: string
        image: string
        items: string[]
    }
    whyUs: {
        title: string
        image: string
        items: { title: string; description: string }[]
    }
    projectSolutions: {
        title: string
        image: string
        paragraphs: string[]
    }
    faq: {
        image: string
    }
}

export interface FAQ {
    question: string
    answer: string
}

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

const defaultContent: SiteContent = {
    hero: {
        title: "Endüstriyel Otomatik Kapı",
        subtitle: "ve Yükleme Sistemleri",
        description: "Güvenli, hızlı ve kaliteli otomatik kapı çözümleri ile işletmenizi bir adım öne taşıyın."
    },
    features: {
        title: "Bizimle Daha Güvenli Olursunuz",
        image: "/foto3.png",
        items: [
            "Kapınızı Otomatikleştirin, Hayatınızı Kolaylaştırın!",
            "Otomatik Kapılar, Otomatik Çözümler!",
            "Güvenli ve Rahat Geçiş İçin Otomatik Kapılar!",
            "Tek Bir Dokunuşla Açılan Kapılar!",
            "Otomatik Kapılar, Akıllı Yaşam Tarzı!"
        ]
    },
    whyUs: {
        title: "NEDEN BİZ",
        image: "/foto5.png",
        items: [
            { title: "DENEYİM", description: "Deneyimli ve Profesyonel Bir Ekibimiz Var" },
            { title: "FİYAT", description: "Uygun Fiyatlarla Üstün Hizmet Sunuyoruz" },
            { title: "TEKNOLOJİ", description: "Sektördeki En Son Teknolojileri Kullanıyoruz" },
            { title: "ÖZEL ÇÖZÜMLER", description: "Projeye Özel Çözümler Sunuyoruz" },
            { title: "GÜVENİLİR VE SAYGIN", description: "Güvenilir ve Saygın Bir Firma Olmanın Gururunu Yaşıyoruz" }
        ]
    },
    projectSolutions: {
        title: "PROJEYE ÖZEL ÇÖZÜMLER",
        image: "/foto1.png",
        paragraphs: [
            "Otomatik kapılar, modern dünyanın vazgeçilmez bir parçasıdır.",
            "İşte burada otomatik kapı firmalarının lideri olan \"FY Otomatik Kapı ve Yükleme Sistemleri\" projeye uygun çözümler sunarak müşterilerimizin ihtiyaçlarına uygun çözümler üreterek uygulamaktadır.",
            "Projeye uygun çözümler sunan \"FY Otomatik Kapı\" her projenin kendine özgü ihtiyaçlarını ve zorluklarını anlar.",
            "Sonuç olarak, projeye uygun çözümler sunan otomatik kapı firmamız, her projenin başarısını sağlamak için gereken esnekliği ve uzmanlığı sağlar."
        ]
    },
    faq: {
        image: "/foto6.png"
    }
}

export async function getSiteContent(): Promise<SiteContent> {
    try {
        const supabase = createServerClient()
        const { data, error } = await supabase
            .from('site_content')
            .select('*')

        if (error || !data || data.length === 0) {
            return defaultContent
        }

        const content: Record<string, any> = {}
        data.forEach(item => {
            content[item.key] = item.value
        })

        return {
            hero: content.hero || defaultContent.hero,
            features: content.features || defaultContent.features,
            whyUs: content.whyUs || defaultContent.whyUs,
            projectSolutions: content.projectSolutions || defaultContent.projectSolutions,
            faq: content.faq || defaultContent.faq
        }
    } catch {
        return defaultContent
    }
}

export async function getFAQ(): Promise<FAQ[]> {
    try {
        const supabase = createServerClient()
        const { data, error } = await supabase
            .from('faq')
            .select('question, answer')
            .order('sort_order', { ascending: true })

        if (error || !data) {
            return []
        }

        return data
    } catch {
        return []
    }
}

export async function getProducts(): Promise<Product[]> {
    try {
        const supabase = createServerClient()
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: true })

        if (error || !data) {
            return []
        }

        return data.map(p => ({
            slug: p.slug,
            name: p.name,
            shortDescription: p.short_description,
            fullDescription: p.full_description,
            mainImage: p.main_image,
            gallery: p.gallery || [],
            features: p.features || [],
            category: p.category
        }))
    } catch {
        return []
    }
}

export function getProductBySlug(products: Product[], slug: string): Product | undefined {
    return products.find(p => p.slug === slug)
}

export function getOtherProducts(products: Product[], currentSlug: string): Product[] {
    return products.filter(p => p.slug !== currentSlug)
}

export function getAdjacentProducts(products: Product[], currentSlug: string): { prev: Product | null; next: Product | null } {
    const currentIndex = products.findIndex(p => p.slug === currentSlug)
    return {
        prev: currentIndex > 0 ? products[currentIndex - 1] : null,
        next: currentIndex < products.length - 1 ? products[currentIndex + 1] : null
    }
}
