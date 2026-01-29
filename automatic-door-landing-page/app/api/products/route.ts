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

        // Transform snake_case to camelCase, including English fields
        const products = (data || []).map(p => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            name_en: p.name_en,
            shortDescription: p.short_description,
            shortDescription_en: p.short_description_en,
            fullDescription: p.full_description,
            fullDescription_en: p.full_description_en,
            mainImage: p.main_image,
            gallery: p.gallery || [],
            features: p.features || [],
            features_en: p.features_en || [],
            category: p.category,
            category_en: p.category_en
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
            name_en: product.nameEn || product.name_en || '',
            short_description: product.shortDescription || '',
            short_description_en: product.shortDescriptionEn || product.shortDescription_en || '',
            full_description: product.fullDescription || '',
            full_description_en: product.fullDescriptionEn || product.fullDescription_en || '',
            main_image: product.mainImage || '',
            gallery: product.gallery || [],
            features: product.features || [],
            features_en: product.featuresEn || product.features_en || [],
            category: product.category || 'Endüstriyel Kapılar',
            category_en: product.categoryEn || product.category_en || ''
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
            nameEn: data.name_en,
            shortDescription: data.short_description,
            shortDescriptionEn: data.short_description_en,
            fullDescription: data.full_description,
            fullDescriptionEn: data.full_description_en,
            mainImage: data.main_image,
            gallery: data.gallery || [],
            features: data.features || [],
            featuresEn: data.features_en || [],
            category: data.category,
            categoryEn: data.category_en
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
            name_en: product.nameEn || product.name_en || '',
            short_description: product.shortDescription || '',
            short_description_en: product.shortDescriptionEn || product.shortDescription_en || '',
            full_description: product.fullDescription || '',
            full_description_en: product.fullDescriptionEn || product.fullDescription_en || '',
            main_image: product.mainImage || '',
            gallery: product.gallery || [],
            features: product.features || [],
            features_en: product.featuresEn || product.features_en || [],
            category: product.category || '',
            category_en: product.categoryEn || product.category_en || ''
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
