import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'cks2024admin'
const SESSION_COOKIE = 'admin_session'
const SESSION_SECRET = process.env.SESSION_SECRET || 'cks-secret-key-2024'

function generateSessionToken(): string {
    return Buffer.from(`${SESSION_SECRET}-${Date.now()}`).toString('base64')
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { password, action } = body

        if (action === 'logout') {
            const response = NextResponse.json({ success: true })
            response.cookies.delete(SESSION_COOKIE)
            return response
        }

        if (password === ADMIN_PASSWORD) {
            const token = generateSessionToken()
            const response = NextResponse.json({ success: true })
            response.cookies.set(SESSION_COOKIE, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 24 hours
            })
            return response
        }

        return NextResponse.json({ success: false, error: 'Geçersiz şifre' }, { status: 401 })
    } catch {
        return NextResponse.json({ success: false, error: 'Sunucu hatası' }, { status: 500 })
    }
}

export async function GET() {
    const cookieStore = await cookies()
    const session = cookieStore.get(SESSION_COOKIE)

    if (session?.value) {
        return NextResponse.json({ authenticated: true })
    }

    return NextResponse.json({ authenticated: false }, { status: 401 })
}
