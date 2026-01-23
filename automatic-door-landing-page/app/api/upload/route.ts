import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
    try {
        const supabase = createServerClient()
        const formData = await request.formData()
        const file = formData.get('file') as File
        const section = formData.get('section') as string

        if (!file) {
            console.error('Upload error: No file provided')
            return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 })
        }

        console.log(`Uploading file: ${file.name}, size: ${file.size}, type: ${file.type}`)

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
            console.error('Supabase upload error:', error)
            return NextResponse.json({
                error: `Yükleme hatası: ${error.message}`,
                details: error
            }, { status: 500 })
        }

        console.log('Upload successful:', data)

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('uploads')
            .getPublicUrl(filename)

        console.log('Public URL:', urlData.publicUrl)

        return NextResponse.json({ success: true, url: urlData.publicUrl })
    } catch (error: any) {
        console.error('Upload error:', error)
        return NextResponse.json({
            error: 'Yükleme başarısız',
            details: error?.message || String(error)
        }, { status: 500 })
    }
}
