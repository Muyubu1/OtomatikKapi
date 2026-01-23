'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ChevronDown, ChevronRight, GripVertical, Link as LinkIcon } from 'lucide-react';

interface NavigationItem {
    id: number;
    parent_id: number | null;
    name: string;
    product_slug: string | null;
    sort_order: number;
    children?: NavigationItem[];
}

interface Product {
    id: number;
    name: string;
    slug: string;
}

export default function MenuPage() {
    const [menuItems, setMenuItems] = useState<NavigationItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        parent_id: null as number | null,
        product_slug: '',
        sort_order: 0
    });

    useEffect(() => {
        fetchMenuItems();
        fetchProducts();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const res = await fetch('/api/navigation');
            const data = await res.json();
            setMenuItems(data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const toggleCategory = (id: number) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedCategories(newExpanded);
    };

    const openAddModal = (parentId: number | null = null) => {
        setEditingItem(null);
        setFormData({
            name: '',
            parent_id: parentId,
            product_slug: '',
            sort_order: 0
        });
        setShowModal(true);
    };

    const openEditModal = (item: NavigationItem) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            parent_id: item.parent_id,
            product_slug: item.product_slug || '',
            sort_order: item.sort_order
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            const method = editingItem ? 'PUT' : 'POST';
            const body = editingItem
                ? { ...formData, id: editingItem.id }
                : formData;

            const res = await fetch('/api/navigation', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!res.ok) throw new Error('Failed to save');

            setShowModal(false);
            fetchMenuItems();
        } catch (error) {
            console.error('Error saving menu item:', error);
            alert('Kaydetme başarısız oldu');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bu menü öğesini silmek istediğinizden emin misiniz? Alt öğeler de silinecektir.')) {
            return;
        }

        try {
            const res = await fetch(`/api/navigation?id=${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error('Failed to delete');

            fetchMenuItems();
        } catch (error) {
            console.error('Error deleting menu item:', error);
            alert('Silme başarısız oldu');
        }
    };

    const renderMenuItem = (item: NavigationItem, level: number = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedCategories.has(item.id);
        const linkedProduct = products.find(p => p.slug === item.product_slug);

        return (
            <div key={item.id} className="border-b border-gray-700 last:border-b-0">
                <div
                    className="flex items-center gap-3 p-4 hover:bg-gray-700/50 transition-colors"
                    style={{ paddingLeft: `${level * 24 + 16}px` }}
                >
                    <GripVertical className="w-4 h-4 text-gray-500 cursor-grab" />

                    {hasChildren ? (
                        <button
                            onClick={() => toggleCategory(item.id)}
                            className="p-1 hover:bg-gray-600 rounded"
                        >
                            {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            )}
                        </button>
                    ) : (
                        <div className="w-6" />
                    )}

                    <span className={`flex-1 ${level === 0 ? 'font-semibold text-white' : 'text-gray-300'}`}>
                        {item.name}
                    </span>

                    {linkedProduct && (
                        <span className="flex items-center gap-1 text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
                            <LinkIcon className="w-3 h-3" />
                            {linkedProduct.name}
                        </span>
                    )}

                    <div className="flex items-center gap-2">
                        {level === 0 && (
                            <button
                                onClick={() => openAddModal(item.id)}
                                className="p-2 text-green-400 hover:bg-green-900/30 rounded-lg transition-colors"
                                title="Alt öğe ekle"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        )}
                        <button
                            onClick={() => openEditModal(item)}
                            className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                            title="Düzenle"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                            title="Sil"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {hasChildren && isExpanded && (
                    <div className="bg-gray-800/50">
                        {item.children!.map(child => renderMenuItem(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Menü Yönetimi</h1>
                    <p className="text-gray-400 mt-1">Navigasyon menüsünü ve ürün bağlantılarını yönetin</p>
                </div>
                <button
                    onClick={() => openAddModal(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Kategori Ekle
                </button>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                {menuItems.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        <p className="mb-4">Henüz menü öğesi bulunmuyor.</p>
                        <button
                            onClick={() => openAddModal(null)}
                            className="text-blue-400 hover:text-blue-300"
                        >
                            İlk kategoriyi ekleyin →
                        </button>
                    </div>
                ) : (
                    menuItems.map(item => renderMenuItem(item))
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-xl w-full max-w-md border border-gray-700">
                        <div className="p-6 border-b border-gray-700">
                            <h2 className="text-xl font-semibold text-white">
                                {editingItem ? 'Menü Öğesini Düzenle' : 'Yeni Menü Öğesi'}
                            </h2>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    İsim
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="Menü öğesi adı"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Üst Kategori
                                </label>
                                <select
                                    value={formData.parent_id || ''}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        parent_id: e.target.value ? parseInt(e.target.value) : null
                                    })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Ana Kategori (Üst Düzey)</option>
                                    {menuItems.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Bağlı Ürün (Opsiyonel)
                                </label>
                                <select
                                    value={formData.product_slug}
                                    onChange={(e) => setFormData({ ...formData, product_slug: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Ürün Bağlama</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.slug}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-xs text-gray-500 mt-1">
                                    Bir ürün seçerseniz, menü öğesi o ürünün sayfasına yönlendirir
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Sıralama
                                </label>
                                <input
                                    type="number"
                                    value={formData.sort_order}
                                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-700 flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!formData.name.trim()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
