import fs from 'fs/promises'
import path from 'path'

export interface SiteContent {
    hero: {
        title: string
        subtitle: string
        description: string
    }
    features: {
        title: string
        items: string[]
    }
    whyUs: {
        title: string
        items: { title: string; description: string }[]
    }
    projectSolutions: {
        title: string
        paragraphs: string[]
    }
}

export interface FAQ {
    question: string
    answer: string
}

export async function getSiteContent(): Promise<SiteContent> {
    const filePath = path.join(process.cwd(), 'data', 'site-content.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
}

export async function getFAQ(): Promise<FAQ[]> {
    const filePath = path.join(process.cwd(), 'data', 'faq.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
}
