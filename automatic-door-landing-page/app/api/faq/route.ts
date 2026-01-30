import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
    try {
        const supabase = createServerClient()
        const { data, error } = await supabase
            .from('faq')
            .select('*')
            .order('sort_order', { ascending: true })

        if (error) throw error

        // Transform to include English fields
        const faqs = (data || []).map((faq: any) => ({
            question: faq.question,
            questionEn: faq.question_en || '',
            answer: faq.answer,
            answerEn: faq.answer_en || ''
        }))

        return NextResponse.json(faqs)
    } catch (error) {
        console.error('FAQ GET error:', error)
        return NextResponse.json([], { status: 200 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const supabase = createServerClient()
        const faqs = await request.json()

        // Delete all existing FAQs and insert new ones
        await supabase.from('faq').delete().neq('id', 0)

        // Insert with sort order and English fields
        const insertData = faqs.map((faq: any, index: number) => ({
            question: faq.question,
            question_en: faq.questionEn || '',
            answer: faq.answer,
            answer_en: faq.answerEn || '',
            sort_order: index
        }))

        const { error } = await supabase.from('faq').insert(insertData)

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('FAQ PUT error:', error)
        return NextResponse.json({ error: 'Veri kaydedilemedi' }, { status: 500 })
    }
}
