'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Edit2, Trash2, ChevronDown, ChevronRight,
    Link as LinkIcon, Save, X, Loader2, FolderOpen, FileText,
    GripVertical, Check, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NavigationItem {
    id: number;
    parent_id: number | null;
    name: string;
    name_en?: string;
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
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        name_en: '',
        parent_id: null as number | null,
        product_slug: '',
        sort_order: 0
    });

    useEffect(() => {
        fetchMenuItems();
        fetchProducts();
    }, []);

    // Auto-expand all categories on load
    useEffect(() => {
        if (menuItems.length > 0) {
            const allIds = new Set(menuItems.map(item => item.id));
            setExpandedCategories(allIds);
        }
    }, [menuItems]);

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
            name_en: '',
            parent_id: parentId,
            product_slug: '',
            sort_order: menuItems.length
        });
        setShowModal(true);
    };

    const openEditModal = (item: NavigationItem) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            name_en: item.name_en || '',
            parent_id: item.parent_id,
            product_slug: item.product_slug || '',
            sort_order: item.sort_order
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.name.trim()) return;

        setSaving(true);
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
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number, name: string) => {
        if (!confirm(`"${name}" öğesini silmek istediğinizden emin misiniz?\n\nAlt öğeler de silinecektir.`)) {
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

    const getLinkedProduct = (slug: string | null) => {
        if (!slug) return null;
        return products.find(p => p.slug === slug);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#ED1C24]" />
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#414042]">Menü Yönetimi</h1>
                    <p className="text-gray-500 mt-1">
                        Navigasyon menüsündeki kategorileri ve ürün bağlantılarını yönetin
                    </p>
                </div>
                <Button
                    onClick={() => openAddModal(null)}
                    className="bg-[#ED1C24] hover:bg-[#c91920] text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Kategori
                </Button>
            </div>

            {/* Info Banner */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                    <p className="font-medium">Menü Yapısı</p>
                    <p className="mt-1 text-blue-600">
                        Sol taraftaki okları kullanarak kategorileri genişletin.
                        Alt menü öğelerini ürün sayfalarına bağlayabilirsiniz.
                    </p>
                </div>
            </div>

            {/* Menu Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {menuItems.length === 0 ? (
                    <div className="p-12 text-center">
                        <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz menü öğesi yok</h3>
                        <p className="text-gray-500 mb-4">İlk kategoriyi ekleyerek başlayın</p>
                        <Button
                            onClick={() => openAddModal(null)}
                            className="bg-[#ED1C24] hover:bg-[#c91920]"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Kategori Ekle
                        </Button>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {menuItems.map((category) => (
                            <div key={category.id}>
                                {/* Category Row */}
                                <div className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <button
                                        onClick={() => toggleCategory(category.id)}
                                        className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        {expandedCategories.has(category.id) ? (
                                            <ChevronDown className="w-5 h-5 text-gray-600" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-gray-600" />
                                        )}
                                    </button>

                                    <FolderOpen className="w-5 h-5 text-[#ED1C24]" />

                                    <span className="flex-1 font-semibold text-[#414042]">
                                        {category.name}
                                    </span>

                                    <span className="text-xs text-gray-400 mr-2">
                                        {category.children?.length || 0} alt öğe
                                    </span>

                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openAddModal(category.id)}
                                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openEditModal(category)}
                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(category.id, category.name)}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Sub Items */}
                                <AnimatePresence>
                                    {expandedCategories.has(category.id) && category.children && category.children.length > 0 && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            {category.children.map((item) => {
                                                const linkedProduct = getLinkedProduct(item.product_slug);
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center gap-3 p-4 pl-16 border-l-4 border-[#ED1C24]/20 bg-white hover:bg-gray-50 transition-colors"
                                                    >
                                                        <FileText className="w-4 h-4 text-gray-400" />

                                                        <span className="flex-1 text-gray-700">
                                                            {item.name}
                                                        </span>

                                                        {linkedProduct ? (
                                                            <span className="flex items-center gap-1.5 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                                                                <LinkIcon className="w-3 h-3" />
                                                                {linkedProduct.name}
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs text-gray-400">
                                                                Bağlantı yok
                                                            </span>
                                                        )}

                                                        <div className="flex items-center gap-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => openEditModal(item)}
                                                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleDelete(item.id, item.name)}
                                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-2xl w-full max-w-md shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-[#414042]">
                                        {editingItem ? 'Menü Öğesini Düzenle' : 'Yeni Menü Öğesi'}
                                    </h2>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        🇹🇷 İsim (Türkçe) *
                                    </label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Örn: Seksiyonel Kapı"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        🇬🇧 İsim (English)
                                    </label>
                                    <Input
                                        value={formData.name_en}
                                        onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                                        placeholder="Ex: Sectional Door"
                                        className="w-full border-blue-200 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Üst Kategori
                                    </label>
                                    <select
                                        value={formData.parent_id || ''}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            parent_id: e.target.value ? parseInt(e.target.value) : null
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 focus:border-[#ED1C24]"
                                    >
                                        <option value="">Ana Kategori (Üst Düzey)</option>
                                        {menuItems.map(item => (
                                            <option key={item.id} value={item.id}>
                                                📁 {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Bağlı Ürün
                                        <span className="text-gray-400 font-normal ml-1">(opsiyonel)</span>
                                    </label>
                                    <select
                                        value={formData.product_slug}
                                        onChange={(e) => setFormData({ ...formData, product_slug: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 focus:border-[#ED1C24]"
                                    >
                                        <option value="">Ürün bağlama</option>
                                        {products.map(product => (
                                            <option key={product.slug} value={product.slug}>
                                                🔗 {product.name}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1.5">
                                        Ürün seçerseniz, menü öğesine tıklandığında o ürünün sayfası açılır
                                    </p>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowModal(false)}
                                >
                                    İptal
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    disabled={!formData.name.trim() || saving}
                                    className="bg-[#ED1C24] hover:bg-[#c91920] text-white"
                                >
                                    {saving ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Check className="w-4 h-4 mr-2" />
                                    )}
                                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
