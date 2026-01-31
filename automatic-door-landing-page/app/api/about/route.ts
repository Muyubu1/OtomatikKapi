import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

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
        content: 'Biz, CKS Otomatik Kapı ve Yükleme Sistemleri, endüstriyel otomatik kapı sektöründe lider bir firmayız. Yılların verdiği tecrübe ve bilgi birikimi ile müşterilerimize en iyi hizmeti sunmayı hedefliyoruz.',
        contentEn: 'We, CKS Automatic Door and Loading Systems, are a leading company in the industrial automatic door sector. With years of experience and knowledge, we aim to provide the best service to our customers.'
    },
    vizyon: {
        title: 'VİZYONUMUZ',
        titleEn: 'OUR VISION',
        content: 'Vizyonumuz, endüstriyel otomatik kapı sektöründe dünya çapında bir marka olmaktır. Müşteri memnuniyetini en üst düzeyde tutarak, kaliteli ve yenilikçi ürünler sunmayı hedefliyoruz.',
        contentEn: 'Our vision is to become a worldwide brand in the industrial automatic door sector. We aim to offer quality and innovative products while maintaining customer satisfaction at the highest level.'
    },
    misyon: {
        title: 'MİSYONUMUZ',
        titleEn: 'OUR MISSION',
        content: 'Misyonumuz, müşterilerimize en yüksek kalitede ürün ve hizmetler sunmaktır. Güvenli, dayanıklı ve kullanıcı dostu endüstriyel otomatik kapılar tasarlayarak, müşterilerimizin işlerini kolaylaştırmayı amaçlıyoruz.',
        contentEn: 'Our mission is to provide our customers with the highest quality products and services. By designing safe, durable, and user-friendly industrial automatic doors, we aim to facilitate our customers\' operations.'
    }
}

// GET - Fetch about content
export async function GET() {
    try {
        const supabase = createServerClient()

        // Fetch from about_simple table
        const { data, error } = await supabase
            .from('about_simple')
            .select('*')
            .single()

        if (error) {
            // Return default content if no data found
            return NextResponse.json(defaultContent)
        }

        // Return data with English fields
        return NextResponse.json({
            hakkimizda: {
                title: data.hakkimizda_title || defaultContent.hakkimizda.title,
                titleEn: data.hakkimizda_title_en || defaultContent.hakkimizda.titleEn,
                content: data.hakkimizda_content || defaultContent.hakkimizda.content,
                contentEn: data.hakkimizda_content_en || defaultContent.hakkimizda.contentEn
            },
            vizyon: {
                title: data.vizyon_title || defaultContent.vizyon.title,
                titleEn: data.vizyon_title_en || defaultContent.vizyon.titleEn,
                content: data.vizyon_content || defaultContent.vizyon.content,
                contentEn: data.vizyon_content_en || defaultContent.vizyon.contentEn
            },
            misyon: {
                title: data.misyon_title || defaultContent.misyon.title,
                titleEn: data.misyon_title_en || defaultContent.misyon.titleEn,
                content: data.misyon_content || defaultContent.misyon.content,
                contentEn: data.misyon_content_en || defaultContent.misyon.contentEn
            },
            background_image: data.background_image
        })
    } catch (error) {
        console.error('About GET error:', error)
        return NextResponse.json(defaultContent)
    }
}

// PUT - Update about content
export async function PUT(request: NextRequest) {
    try {
        const supabase = createServerClient()
        const body = await request.json()

        // Upsert to about_simple table with English fields
        const { error } = await supabase
            .from('about_simple')
            .upsert({
                id: 1, // Single row for all content
                hakkimizda_title: body.hakkimizda?.title || defaultContent.hakkimizda.title,
                hakkimizda_title_en: body.hakkimizda?.titleEn || defaultContent.hakkimizda.titleEn,
                hakkimizda_content: body.hakkimizda?.content || defaultContent.hakkimizda.content,
                hakkimizda_content_en: body.hakkimizda?.contentEn || defaultContent.hakkimizda.contentEn,
                vizyon_title: body.vizyon?.title || defaultContent.vizyon.title,
                vizyon_title_en: body.vizyon?.titleEn || defaultContent.vizyon.titleEn,
                vizyon_content: body.vizyon?.content || defaultContent.vizyon.content,
                vizyon_content_en: body.vizyon?.contentEn || defaultContent.vizyon.contentEn,
                misyon_title: body.misyon?.title || defaultContent.misyon.title,
                misyon_title_en: body.misyon?.titleEn || defaultContent.misyon.titleEn,
                misyon_content: body.misyon?.content || defaultContent.misyon.content,
                misyon_content_en: body.misyon?.contentEn || defaultContent.misyon.contentEn,
                background_image: body.background_image || null,
                updated_at: new Date().toISOString()
            }, { onConflict: 'id' })

        if (error) {
            console.error('About PUT error:', error)
            return NextResponse.json({ error: 'Güncelleme başarısız: ' + error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('About PUT error:', error)
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 })
    }
}
