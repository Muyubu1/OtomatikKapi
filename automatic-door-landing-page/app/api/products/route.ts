import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// GET - Fetch all products
export async function GET() {
    try {
        const supabase = createServerClient()
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: true })

        if (error) {
            console.error('Products GET error:', error)
            throw error
        }

        // Transform snake_case to camelCase
        const products = (data || []).map(p => ({
            id: p.id,
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

// POST - Create a single new product
export async function POST(request: NextRequest) {
    try {
        const supabase = createServerClient()
        const product = await request.json()

        const insertData = {
            slug: product.slug,
            name: product.name,
            short_description: product.shortDescription || '',
            full_description: product.fullDescription || '',
            main_image: product.mainImage || '',
            gallery: product.gallery || [],
            features: product.features || [],
            category: product.category || 'Endüstriyel Kapılar'
        }

        const { data, error } = await supabase
            .from('products')
            .insert(insertData)
            .select()
            .single()

        if (error) {
            console.error('Products POST error:', error)
            throw error
        }

        // Transform back to camelCase
        const result = {
            id: data.id,
            slug: data.slug,
            name: data.name,
            shortDescription: data.short_description,
            fullDescription: data.full_description,
            mainImage: data.main_image,
            gallery: data.gallery || [],
            features: data.features || [],
            category: data.category
        }

        return NextResponse.json({ success: true, product: result })
    } catch (error) {
        console.error('Products POST error:', error)
        return NextResponse.json({ error: 'Ürün eklenemedi' }, { status: 500 })
    }
}

// PUT - Update a single product
export async function PUT(request: NextRequest) {
    try {
        const supabase = createServerClient()
        const product = await request.json()

        if (!product.id && !product.slug) {
            return NextResponse.json({ error: 'ID veya slug gerekli' }, { status: 400 })
        }

        const updateData = {
            slug: product.slug,
            name: product.name,
            short_description: product.shortDescription || '',
            full_description: product.fullDescription || '',
            main_image: product.mainImage || '',
            gallery: product.gallery || [],
            features: product.features || [],
            category: product.category || ''
        }

        let query = supabase.from('products').update(updateData)

        if (product.id) {
            query = query.eq('id', product.id)
        } else {
            query = query.eq('slug', product.slug)
        }

        const { data, error } = await query.select().single()

        if (error) {
            console.error('Products PUT error:', error)
            throw error
        }

        return NextResponse.json({ success: true, product: data })
    } catch (error) {
        console.error('Products PUT error:', error)
        return NextResponse.json({ error: 'Ürün güncellenemedi' }, { status: 500 })
    }
}

// DELETE - Delete a single product
export async function DELETE(request: NextRequest) {
    try {
        const supabase = createServerClient()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        const slug = searchParams.get('slug')

        if (!id && !slug) {
            return NextResponse.json({ error: 'ID veya slug gerekli' }, { status: 400 })
        }

        let query = supabase.from('products').delete()

        if (id) {
            query = query.eq('id', parseInt(id))
        } else if (slug) {
            query = query.eq('slug', slug)
        }

        const { error } = await query

        if (error) {
            console.error('Products DELETE error:', error)
            throw error
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Products DELETE error:', error)
        return NextResponse.json({ error: 'Ürün silinemedi' }, { status: 500 })
    }
}
