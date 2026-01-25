"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
    LayoutDashboard,
    FileText,
    Package,
    HelpCircle,
    Image,
    LogOut,
    Menu,
    X,
    MenuSquare,
    Info
} from "lucide-react"

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: FileText, label: "Site İçeriği", href: "/admin/dashboard/site-content" },
    { icon: Package, label: "Ürünler", href: "/admin/dashboard/products" },
    { icon: MenuSquare, label: "Menü Yönetimi", href: "/admin/dashboard/menu" },
    { icon: Info, label: "Hakkımızda", href: "/admin/dashboard/about" },
    { icon: HelpCircle, label: "SSS", href: "/admin/dashboard/faq" },
    { icon: Image, label: "Galeri", href: "/admin/dashboard/gallery" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleLogout = async () => {
        await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "logout" })
        })
        router.push("/admin")
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex lg:flex-col w-64 bg-[#414042] text-white">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold">CKS Admin</h1>
                    <p className="text-white/60 text-sm">İçerik Yönetimi</p>
                </div>

                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                            ? "bg-[#ED1C24] text-white"
                                            : "text-white/70 hover:bg-white/10 hover:text-white"
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white w-full transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                    <motion.aside
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        className="absolute left-0 top-0 bottom-0 w-64 bg-[#414042] text-white"
                    >
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-bold">CKS Admin</h1>
                                <p className="text-white/60 text-sm">İçerik Yönetimi</p>
                            </div>
                            <button onClick={() => setSidebarOpen(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <nav className="flex-1 p-4">
                            <ul className="space-y-2">
                                {menuItems.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setSidebarOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                                    ? "bg-[#ED1C24] text-white"
                                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                                                    }`}
                                            >
                                                <item.icon className="w-5 h-5" />
                                                {item.label}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>

                        <div className="p-4 border-t border-white/10">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white w-full"
                            >
                                <LogOut className="w-5 h-5" />
                                Çıkış Yap
                            </button>
                        </div>
                    </motion.aside>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar - Mobile */}
                <header className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
                    <button onClick={() => setSidebarOpen(true)}>
                        <Menu className="w-6 h-6 text-[#414042]" />
                    </button>
                    <h1 className="font-bold text-[#414042]">CKS Admin</h1>
                    <div className="w-6" />
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
