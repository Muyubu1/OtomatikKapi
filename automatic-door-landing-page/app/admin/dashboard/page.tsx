"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FileText, Package, HelpCircle, Image, ArrowRight } from "lucide-react"

const quickLinks = [
    { icon: FileText, label: "Site İçeriği", description: "Ana sayfa yazılarını düzenle", href: "/admin/dashboard/site-content", color: "bg-blue-500" },
    { icon: Package, label: "Ürünler", description: "Ürün ekle, düzenle veya sil", href: "/admin/dashboard/products", color: "bg-green-500" },
    { icon: HelpCircle, label: "SSS", description: "Sık sorulan soruları yönet", href: "/admin/dashboard/faq", color: "bg-purple-500" },
    { icon: Image, label: "Galeri", description: "Galeri görsellerini yönet", href: "/admin/dashboard/gallery", color: "bg-orange-500" },
]

export default function DashboardPage() {
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-[#414042] mb-2">Hoş Geldiniz!</h1>
                <p className="text-gray-600 mb-8">CKS Otomatik Kapı admin paneline hoş geldiniz. Aşağıdan hızlıca içerik yönetimine erişebilirsiniz.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
                {quickLinks.map((item, index) => (
                    <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <Link href={item.href} className="block group">
                            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
                                <div className="flex items-start gap-4">
                                    <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-[#414042] group-hover:text-[#ED1C24] transition-colors">
                                            {item.label}
                                        </h3>
                                        <p className="text-gray-500 text-sm">{item.description}</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#ED1C24] group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 bg-[#ED1C24]/10 rounded-xl p-6 border border-[#ED1C24]/20"
            >
                <h3 className="font-semibold text-[#414042] mb-2">💡 İpucu</h3>
                <p className="text-gray-600 text-sm">
                    Değişiklikler otomatik olarak kaydedilir. Sol menüden farklı bölümlere hızlıca erişebilirsiniz.
                </p>
            </motion.div>
        </div>
    )
}
