import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export interface NavigationItem {
    id: number;
    parent_id: number | null;
    name: string;
    name_en?: string;
    product_slug: string | null;
    sort_order: number;
    children?: NavigationItem[];
}

// GET - Fetch all navigation items
export async function GET() {
    try {
        const supabase = createServerClient();
        const { data, error } = await supabase
            .from('navigation_items')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) throw error;

        // Build tree structure
        const items = data as NavigationItem[];
        const rootItems = items.filter(item => item.parent_id === null);

        const buildTree = (parentId: number): NavigationItem[] => {
            return items
                .filter(item => item.parent_id === parentId)
                .map(item => ({
                    ...item,
                    children: buildTree(item.id)
                }));
        };

        const tree = rootItems.map(item => ({
            ...item,
            children: buildTree(item.id)
        }));

        return NextResponse.json(tree);
    } catch (error) {
        console.error('Error fetching navigation:', error);
        return NextResponse.json({ error: 'Failed to fetch navigation' }, { status: 500 });
    }
}

// POST - Create new navigation item
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, name_en, parent_id, product_slug, sort_order } = body;

        const supabase = createServerClient();
        const { data, error } = await supabase
            .from('navigation_items')
            .insert({
                name,
                name_en: name_en || '',
                parent_id: parent_id || null,
                product_slug: product_slug || null,
                sort_order: sort_order || 0
            })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error creating navigation item:', error);
        return NextResponse.json({ error: 'Failed to create navigation item' }, { status: 500 });
    }
}

// PUT - Update navigation item
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, name, name_en, parent_id, product_slug, sort_order } = body;

        const supabase = createServerClient();
        const { data, error } = await supabase
            .from('navigation_items')
            .update({
                name,
                name_en: name_en || '',
                parent_id: parent_id || null,
                product_slug: product_slug || null,
                sort_order: sort_order || 0
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error updating navigation item:', error);
        return NextResponse.json({ error: 'Failed to update navigation item' }, { status: 500 });
    }
}

// DELETE - Delete navigation item
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const supabase = createServerClient();
        const { error } = await supabase
            .from('navigation_items')
            .delete()
            .eq('id', parseInt(id));

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting navigation item:', error);
        return NextResponse.json({ error: 'Failed to delete navigation item' }, { status: 500 });
    }
}
