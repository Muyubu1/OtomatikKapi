import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

interface AboutSection {
    title: string
    content: string
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
        content: 'Biz, CKS Otomatik Kapı ve Yükleme Sistemleri, endüstriyel otomatik kapı sektöründe lider bir firmayız. Yılların verdiği tecrübe ve bilgi birikimi ile müşterilerimize en iyi hizmeti sunmayı hedefliyoruz.'
    },
    vizyon: {
        title: 'VİZYONUMUZ',
        content: 'Vizyonumuz, endüstriyel otomatik kapı sektöründe dünya çapında bir marka olmaktır. Müşteri memnuniyetini en üst düzeyde tutarak, kaliteli ve yenilikçi ürünler sunmayı hedefliyoruz.'
    },
    misyon: {
        title: 'MİSYONUMUZ',
        content: 'Misyonumuz, müşterilerimize en yüksek kalitede ürün ve hizmetler sunmaktır. Güvenli, dayanıklı ve kullanıcı dostu endüstriyel otomatik kapılar tasarlayarak, müşterilerimizin işlerini kolaylaştırmayı amaçlıyoruz.'
    }
}

// GET - Fetch about content
export async function GET() {
    try {
        const supabase = createServerClient()

        // Fetch from about_simple table (new simplified structure)
        const { data, error } = await supabase
            .from('about_simple')
            .select('*')
            .single()

        if (error) {
            // If table doesn't exist or no data, try old structure
            const { data: oldData, error: oldError } = await supabase
                .from('about_content')
                .select('*')
                .order('id', { ascending: true })

            if (oldError || !oldData || oldData.length === 0) {
                // Return default content if no data found
                return NextResponse.json(defaultContent)
            }

            // Transform old format to new format
            const content: AboutContent = { ...defaultContent }
            for (const item of oldData) {
                if (item.section === 'hero' || item.section === 'hakkimizda') {
                    content.hakkimizda = { title: item.title || 'HAKKIMIZDA', content: item.content }
                } else if (item.section === 'vision' || item.section === 'vizyon') {
                    content.vizyon = { title: item.title || 'VİZYONUMUZ', content: item.content }
                } else if (item.section === 'mission' || item.section === 'misyon') {
                    content.misyon = { title: item.title || 'MİSYONUMUZ', content: item.content }
                }
            }
            return NextResponse.json(content)
        }

        // Return data from about_simple table
        return NextResponse.json({
            hakkimizda: {
                title: data.hakkimizda_title || defaultContent.hakkimizda.title,
                content: data.hakkimizda_content || defaultContent.hakkimizda.content
            },
            vizyon: {
                title: data.vizyon_title || defaultContent.vizyon.title,
                content: data.vizyon_content || defaultContent.vizyon.content
            },
            misyon: {
                title: data.misyon_title || defaultContent.misyon.title,
                content: data.misyon_content || defaultContent.misyon.content
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

        // Upsert to about_simple table
        const { error } = await supabase
            .from('about_simple')
            .upsert({
                id: 1, // Single row for all content
                hakkimizda_title: body.hakkimizda?.title || defaultContent.hakkimizda.title,
                hakkimizda_content: body.hakkimizda?.content || defaultContent.hakkimizda.content,
                vizyon_title: body.vizyon?.title || defaultContent.vizyon.title,
                vizyon_content: body.vizyon?.content || defaultContent.vizyon.content,
                misyon_title: body.misyon?.title || defaultContent.misyon.title,
                misyon_content: body.misyon?.content || defaultContent.misyon.content,
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
