import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// Settings structure
interface Settings {
    instagramUrl: string
    linkedinUrl: string
    heroVideoUrl: string
}

const defaultSettings: Settings = {
    instagramUrl: '',
    linkedinUrl: '',
    heroVideoUrl: '/videos/hero-bg.webm'
}

export async function GET() {
    try {
        const supabase = createServerClient()
        const { data, error } = await supabase
            .from('site_content')
            .select('*')
            .eq('key', 'settings')
            .single()

        if (error && error.code !== 'PGRST116') {
            throw error
        }

        const settings = data?.value || defaultSettings

        return NextResponse.json(settings)
    } catch (error) {
        console.error('Settings GET error:', error)
        return NextResponse.json(defaultSettings)
    }
}

export async function PUT(request: NextRequest) {
    try {
        const supabase = createServerClient()
        const body = await request.json()

        await supabase
            .from('site_content')
            .upsert({
                key: 'settings',
                value: body,
                updated_at: new Date().toISOString()
            }, { onConflict: 'key' })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Settings PUT error:', error)
        return NextResponse.json({ error: 'Ayarlar kaydedilemedi' }, { status: 500 })
    }
}
