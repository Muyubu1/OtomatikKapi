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
        image: string
        items: string[]
    }
    whyUs: {
        title: string
        image: string
        items: { title: string; description: string }[]
    }
    projectSolutions: {
        title: string
        image: string
        paragraphs: string[]
    }
    faq: {
        image: string
    }
}

export interface FAQ {
    question: string
    answer: string
}

export interface Product {
    slug: string
    name: string
    shortDescription: string
    fullDescription: string
    mainImage: string
    gallery: string[]
    features: string[]
    category: string
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

export async function getProducts(): Promise<Product[]> {
    const filePath = path.join(process.cwd(), 'data', 'products.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
}

export function getProductBySlug(products: Product[], slug: string): Product | undefined {
    return products.find(p => p.slug === slug)
}

export function getOtherProducts(products: Product[], currentSlug: string): Product[] {
    return products.filter(p => p.slug !== currentSlug)
}

export function getAdjacentProducts(products: Product[], currentSlug: string): { prev: Product | null; next: Product | null } {
    const currentIndex = products.findIndex(p => p.slug === currentSlug)
    return {
        prev: currentIndex > 0 ? products[currentIndex - 1] : null,
        next: currentIndex < products.length - 1 ? products[currentIndex + 1] : null
    }
}
