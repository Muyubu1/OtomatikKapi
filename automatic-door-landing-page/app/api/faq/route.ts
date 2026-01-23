import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'faq.json')

export async function GET() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8')
        return NextResponse.json(JSON.parse(data))
    } catch {
        return NextResponse.json([], { status: 200 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const newItem = await request.json()
        const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'))
        data.push(newItem)
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
        return NextResponse.json({ success: true, data })
    } catch {
        return NextResponse.json({ error: 'Veri kaydedilemedi' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()
        await fs.writeFile(DATA_FILE, JSON.stringify(body, null, 2), 'utf-8')
        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: 'Veri kaydedilemedi' }, { status: 500 })
    }
}
