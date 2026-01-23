import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
    try {
        const supabase = createServerClient()
        const formData = await request.formData()
        const file = formData.get('file') as File
        const section = formData.get('section') as string

        if (!file) {
            return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 })
        }

        // Generate unique filename
        const ext = file.name.split('.').pop()
        const filename = `${section}-${Date.now()}.${ext}`

        // Convert file to buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('uploads')
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: true
            })

        if (error) {
            console.error('Upload error:', error)
            throw error
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('uploads')
            .getPublicUrl(filename)

        return NextResponse.json({ success: true, url: urlData.publicUrl })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Yükleme başarısız' }, { status: 500 })
    }
}
