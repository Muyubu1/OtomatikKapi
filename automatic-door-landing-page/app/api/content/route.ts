import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
    try {
        const supabase = createServerClient()
        const { data, error } = await supabase
            .from('site_content')
            .select('*')

        if (error) throw error

        // Convert array to object
        const content: Record<string, any> = {}
        data.forEach(item => {
            content[item.key] = item.value
        })

        // Return default structure if empty
        if (Object.keys(content).length === 0) {
            return NextResponse.json({
                hero: {
                    title: "Endüstriyel Otomatik Kapı",
                    subtitle: "ve Yükleme Sistemleri",
                    description: "Güvenli, hızlı ve kaliteli otomatik kapı çözümleri ile işletmenizi bir adım öne taşıyın."
                },
                features: {
                    title: "Bizimle Daha Güvenli Olursunuz",
                    image: "/foto3.png",
                    items: []
                },
                whyUs: {
                    title: "NEDEN BİZ",
                    image: "/foto5.png",
                    items: []
                },
                projectSolutions: {
                    title: "PROJEYE ÖZEL ÇÖZÜMLER",
                    image: "/foto1.png",
                    paragraphs: []
                },
                faq: {
                    image: "/foto6.png"
                }
            })
        }

        return NextResponse.json(content)
    } catch (error) {
        console.error('Content GET error:', error)
        return NextResponse.json({ error: 'Veri okunamadı' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const supabase = createServerClient()
        const body = await request.json()

        // Upsert each section
        const sections = ['hero', 'features', 'whyUs', 'projectSolutions', 'faq']

        for (const section of sections) {
            if (body[section]) {
                await supabase
                    .from('site_content')
                    .upsert({
                        key: section,
                        value: body[section],
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'key' })
            }
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Content PUT error:', error)
        return NextResponse.json({ error: 'Veri kaydedilemedi' }, { status: 500 })
    }
}
