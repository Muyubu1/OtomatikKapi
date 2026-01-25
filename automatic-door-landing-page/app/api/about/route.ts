import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'about.json')

interface AboutSection {
    title: string
    content: string
}

interface AboutContent {
    hakkimizda: AboutSection
    vizyon: AboutSection
    misyon: AboutSection
    background_image?: string
}

const defaultContent: AboutContent = {
    hakkimizda: {
        title: 'HAKKIMIZDA',
        content: 'Biz, CKS Otomatik Kapı ve Yükleme Sistemleri, endüstriyel otomatik kapı sektöründe lider bir firmayız. Yılların verdiği tecrübe ve bilgi birikimi ile müşterilerimize en iyi hizmeti sunmayı hedefliyoruz. Ürünlerimiz, en son teknoloji ve mükemmeliyetçilik anlayışı ile tasarlanmıştır. Güvenlik, dayanıklılık ve kullanım kolaylığı, ürünlerimizin temel özellikleridir.'
    },
    vizyon: {
        title: 'VİZYONUMUZ',
        content: 'Vizyonumuz, endüstriyel otomatik kapı sektöründe dünya çapında bir marka olmaktır. Müşteri memnuniyetini en üst düzeyde tutarak, kaliteli ve yenilikçi ürünler sunmayı hedefliyoruz. Sektördeki gelişmeleri yakından takip ederek, teknoloji ve tasarımda öncü olmayı sürdürmeyi planlıyoruz.'
    },
    misyon: {
        title: 'MİSYONUMUZ',
        content: 'Misyonumuz, müşterilerimize en yüksek kalitede ürün ve hizmetler sunmaktır. Güvenli, dayanıklı ve kullanıcı dostu endüstriyel otomatik kapılar tasarlayarak, müşterilerimizin işlerini kolaylaştırmayı amaçlıyoruz. Sürdürülebilir bir büyüme ile sektördeki liderliğimizi pekiştirmeyi hedefliyoruz.'
    }
}

async function ensureDataDir() {
    const dataDir = path.dirname(DATA_FILE)
    try {
        await fs.access(dataDir)
    } catch {
        await fs.mkdir(dataDir, { recursive: true })
    }
}

async function readData(): Promise<AboutContent> {
    try {
        await ensureDataDir()
        const data = await fs.readFile(DATA_FILE, 'utf-8')
        return JSON.parse(data)
    } catch {
        return defaultContent
    }
}

async function writeData(data: AboutContent): Promise<void> {
    await ensureDataDir()
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

// GET - Fetch about content
export async function GET() {
    try {
        const content = await readData()
        return NextResponse.json(content)
    } catch (error) {
        console.error('About GET error:', error)
        return NextResponse.json(defaultContent)
    }
}

// PUT - Update about content
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()

        const content: AboutContent = {
            hakkimizda: {
                title: body.hakkimizda?.title || defaultContent.hakkimizda.title,
                content: body.hakkimizda?.content || defaultContent.hakkimizda.content
            },
            vizyon: {
                title: body.vizyon?.title || defaultContent.vizyon.title,
                content: body.vizyon?.content || defaultContent.vizyon.content
            },
            misyon: {
                title: body.misyon?.title || defaultContent.misyon.title,
                content: body.misyon?.content || defaultContent.misyon.content
            },
            background_image: body.background_image || undefined
        }

        await writeData(content)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('About PUT error:', error)
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 })
    }
}
