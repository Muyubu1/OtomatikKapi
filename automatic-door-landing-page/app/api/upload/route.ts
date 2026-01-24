import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import sharp from 'sharp'

// Image optimization settings
const MAX_WIDTH = 1920
const QUALITY = 80
const OUTPUT_FORMAT = 'webp'

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

        const originalSize = file.size
        console.log(`Uploading file: ${file.name}, size: ${(originalSize / 1024).toFixed(2)}KB, type: ${file.type}`)

        // Convert file to buffer
        const bytes = await file.arrayBuffer()
        let buffer: Uint8Array = new Uint8Array(bytes)

        // Check if it's an image that can be optimized
        const isImage = file.type.startsWith('image/') &&
            !file.type.includes('svg') &&
            !file.type.includes('gif')

        let filename: string
        let contentType: string

        if (isImage) {
            try {
                // Optimize image with sharp
                const image = sharp(buffer)
                const metadata = await image.metadata()

                // Resize if too large, convert to WebP
                let processedImage = image

                if (metadata.width && metadata.width > MAX_WIDTH) {
                    processedImage = processedImage.resize(MAX_WIDTH, null, {
                        withoutEnlargement: true,
                        fit: 'inside'
                    })
                }

                // Convert to WebP with quality setting
                const optimizedBuffer = await processedImage
                    .webp({ quality: QUALITY })
                    .toBuffer()

                buffer = optimizedBuffer

                filename = `${section}-${Date.now()}.webp`
                contentType = 'image/webp'

                const optimizedSize = buffer.length
                const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1)
                console.log(`Image optimized: ${(originalSize / 1024).toFixed(2)}KB -> ${(optimizedSize / 1024).toFixed(2)}KB (${savings}% smaller)`)

            } catch (sharpError) {
                // If sharp fails, use original
                console.warn('Sharp optimization failed, using original:', sharpError)
                const ext = file.name.split('.').pop()
                filename = `${section}-${Date.now()}.${ext}`
                contentType = file.type
            }
        } else {
            // Non-image files, keep original
            const ext = file.name.split('.').pop()
            filename = `${section}-${Date.now()}.${ext}`
            contentType = file.type
        }

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('uploads')
            .upload(filename, buffer, {
                contentType,
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

        return NextResponse.json({
            success: true,
            url: urlData.publicUrl,
            optimized: isImage,
            originalSize,
            finalSize: buffer.length
        })
    } catch (error: any) {
        console.error('Upload error:', error)
        return NextResponse.json({
            error: 'Yükleme başarısız',
            details: error?.message || String(error)
        }, { status: 500 })
    }
}
