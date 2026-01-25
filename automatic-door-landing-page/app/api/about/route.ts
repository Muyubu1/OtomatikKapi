import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// GET - Fetch all about content
export async function GET() {
    try {
        const supabase = createServerClient()
        const { data, error } = await supabase
            .from('about_content')
            .select('*')
            .order('id', { ascending: true })

        if (error) {
            console.error('About GET error:', error)
            throw error
        }

        // Transform to key-value format for easier access
        const content: Record<string, any> = {}
        for (const item of data || []) {
            content[item.section] = {
                id: item.id,
                title: item.title,
                content: item.content,
                image_url: item.image_url
            }
        }

        return NextResponse.json(content)
    } catch (error) {
        console.error('About GET error:', error)
        return NextResponse.json({}, { status: 200 })
    }
}

// PUT - Update about content
export async function PUT(request: NextRequest) {
    try {
        const supabase = createServerClient()
        const body = await request.json()

        // body is { section: { title, content, image_url } }
        const updates = []
        for (const [section, data] of Object.entries(body)) {
            const updateData = data as any
            updates.push(
                supabase
                    .from('about_content')
                    .upsert({
                        section,
                        title: updateData.title,
                        content: updateData.content,
                        image_url: updateData.image_url,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'section' })
            )
        }

        await Promise.all(updates)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('About PUT error:', error)
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 })
    }
}
