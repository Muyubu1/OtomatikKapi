import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const section = formData.get('section') as string

        if (!file) {
            return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 })
        }

        // Generate unique filename
        const ext = file.name.split('.').pop()
        const filename = `${section}-${Date.now()}.${ext}`

        // Save to public/uploads folder
        const uploadDir = path.join(process.cwd(), 'public', 'uploads')

        // Create uploads directory if it doesn't exist
        try {
            await fs.access(uploadDir)
        } catch {
            await fs.mkdir(uploadDir, { recursive: true })
        }

        const filePath = path.join(uploadDir, filename)
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        await fs.writeFile(filePath, buffer)

        // Return the public URL
        const publicUrl = `/uploads/${filename}`

        return NextResponse.json({ success: true, url: publicUrl })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Yükleme başarısız' }, { status: 500 })
    }
}
