import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
    try {
        const supabase = createServerClient()
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: true })

        if (error) throw error

        // Transform snake_case to camelCase
        const products = data.map(p => ({
            slug: p.slug,
            name: p.name,
            shortDescription: p.short_description,
            fullDescription: p.full_description,
            mainImage: p.main_image,
            gallery: p.gallery || [],
            features: p.features || [],
            category: p.category
        }))

        return NextResponse.json(products)
    } catch (error) {
        console.error('Products GET error:', error)
        return NextResponse.json([], { status: 200 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const supabase = createServerClient()
        const products = await request.json()

        // Delete all existing products and insert new ones
        await supabase.from('products').delete().neq('id', 0)

        // Transform camelCase to snake_case and insert
        const insertData = products.map((p: any) => ({
            slug: p.slug,
            name: p.name,
            short_description: p.shortDescription,
            full_description: p.fullDescription,
            main_image: p.mainImage,
            gallery: p.gallery || [],
            features: p.features || [],
            category: p.category
        }))

        const { error } = await supabase.from('products').insert(insertData)

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Products PUT error:', error)
        return NextResponse.json({ error: 'Veri kaydedilemedi' }, { status: 500 })
    }
}
