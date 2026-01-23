import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// GET - Fetch all gallery items
export async function GET() {
    try {
        const supabase = createServerClient()
        const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('sort_order', { ascending: true })

        if (error) {
            console.error('Gallery GET error:', error)
            throw error
        }

        // Transform to frontend format
        const items = (data || []).map(item => ({
            id: item.id,
            common: item.title,
            binomial: item.subtitle || '',
            photo: {
                url: item.image_url,
                text: item.description || '',
                pos: '50% 50%',
                by: item.photographer || 'CKS Otomatik Kapı'
            },
            sort_order: item.sort_order
        }))

        return NextResponse.json(items)
    } catch (error) {
        console.error('Gallery GET error:', error)
        return NextResponse.json([], { status: 200 })
    }
}

// POST - Create a new gallery item
export async function POST(request: NextRequest) {
    try {
        const supabase = createServerClient()
        const body = await request.json()

        const insertData = {
            title: body.common || body.title || 'Yeni Görsel',
            subtitle: body.binomial || body.subtitle || '',
            image_url: body.photo?.url || body.image_url || '',
            description: body.photo?.text || body.description || '',
            photographer: body.photo?.by || body.photographer || 'CKS Otomatik Kapı',
            sort_order: body.sort_order || 0
        }

        const { data, error } = await supabase
            .from('gallery')
            .insert(insertData)
            .select()
            .single()

        if (error) {
            console.error('Gallery POST error:', error)
            throw error
        }

        // Transform back to frontend format
        const result = {
            id: data.id,
            common: data.title,
            binomial: data.subtitle,
            photo: {
                url: data.image_url,
                text: data.description,
                pos: '50% 50%',
                by: data.photographer
            },
            sort_order: data.sort_order
        }

        return NextResponse.json({ success: true, item: result })
    } catch (error) {
        console.error('Gallery POST error:', error)
        return NextResponse.json({ error: 'Öğe eklenemedi' }, { status: 500 })
    }
}

// PUT - Update a gallery item
export async function PUT(request: NextRequest) {
    try {
        const supabase = createServerClient()
        const body = await request.json()

        if (!body.id) {
            return NextResponse.json({ error: 'ID gerekli' }, { status: 400 })
        }

        const updateData = {
            title: body.common || body.title,
            subtitle: body.binomial || body.subtitle || '',
            image_url: body.photo?.url || body.image_url || '',
            description: body.photo?.text || body.description || '',
            photographer: body.photo?.by || body.photographer || 'CKS Otomatik Kapı',
            sort_order: body.sort_order || 0
        }

        const { data, error } = await supabase
            .from('gallery')
            .update(updateData)
            .eq('id', body.id)
            .select()
            .single()

        if (error) {
            console.error('Gallery PUT error:', error)
            throw error
        }

        return NextResponse.json({ success: true, item: data })
    } catch (error) {
        console.error('Gallery PUT error:', error)
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 })
    }
}

// DELETE - Delete a gallery item
export async function DELETE(request: NextRequest) {
    try {
        const supabase = createServerClient()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'ID gerekli' }, { status: 400 })
        }

        const { error } = await supabase
            .from('gallery')
            .delete()
            .eq('id', parseInt(id))

        if (error) {
            console.error('Gallery DELETE error:', error)
            throw error
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Gallery DELETE error:', error)
        return NextResponse.json({ error: 'Silme başarısız' }, { status: 500 })
    }
}
