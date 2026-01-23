import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// Debug endpoint to test Supabase connection
export async function GET() {
    const results: any = {
        timestamp: new Date().toISOString(),
        env: {
            NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING',
            NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'MISSING',
            SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'MISSING',
        },
        tests: {}
    }

    try {
        const supabase = createServerClient()

        // Test 1: Products table
        try {
            const { data, error, count } = await supabase
                .from('products')
                .select('id, name', { count: 'exact' })
                .limit(3)

            results.tests.products = {
                success: !error,
                count: count,
                sample: data?.map(p => p.name),
                error: error?.message
            }
        } catch (e: any) {
            results.tests.products = { success: false, error: e.message }
        }

        // Test 2: Site content table
        try {
            const { data, error } = await supabase
                .from('site_content')
                .select('key')

            results.tests.site_content = {
                success: !error,
                keys: data?.map(d => d.key),
                error: error?.message
            }
        } catch (e: any) {
            results.tests.site_content = { success: false, error: e.message }
        }

        // Test 3: Navigation items table
        try {
            const { data, error, count } = await supabase
                .from('navigation_items')
                .select('id, name', { count: 'exact' })
                .limit(3)

            results.tests.navigation = {
                success: !error,
                count: count,
                sample: data?.map(n => n.name),
                error: error?.message
            }
        } catch (e: any) {
            results.tests.navigation = { success: false, error: e.message }
        }

        // Test 4: Storage bucket
        try {
            const { data, error } = await supabase.storage
                .from('uploads')
                .list('', { limit: 3 })

            results.tests.storage = {
                success: !error,
                files: data?.map(f => f.name),
                error: error?.message
            }
        } catch (e: any) {
            results.tests.storage = { success: false, error: e.message }
        }

        // Test 5: Insert test (then delete)
        try {
            // Try to insert a test product
            const testSlug = `test-${Date.now()}`
            const { data: insertData, error: insertError } = await supabase
                .from('products')
                .insert({
                    slug: testSlug,
                    name: 'DEBUG TEST',
                    short_description: 'test',
                    full_description: 'test',
                    main_image: '',
                    gallery: [],
                    features: [],
                    category: 'test'
                })
                .select()
                .single()

            if (insertError) {
                results.tests.write = { success: false, error: insertError.message }
            } else {
                // Delete the test product
                await supabase.from('products').delete().eq('slug', testSlug)
                results.tests.write = { success: true, message: 'Write/Delete successful' }
            }
        } catch (e: any) {
            results.tests.write = { success: false, error: e.message }
        }

    } catch (e: any) {
        results.connection_error = e.message
    }

    return NextResponse.json(results, {
        headers: {
            'Cache-Control': 'no-store, max-age=0'
        }
    })
}
