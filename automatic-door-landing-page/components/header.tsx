"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Linkedin, Instagram, Mail } from "lucide-react"
import logoCKS from "@/public/logoCKS_br.png"

// Mega menü kategorileri ve alt öğeleri
const productCategories = [
  {
    name: "Endüstriyel Kapılar",
    href: "#",
    items: [
      { name: "Seksiyonel Kapı", href: "#" },
      { name: "Endüstriyel Kepenk", href: "#" },
      { name: "Şerit Perde", href: "#" },
      { name: "Personel Yangın Kapısı", href: "#" },
      { name: "Sarmal Yangın Kapısı", href: "#" },
    ],
  },
  {
    name: "Yüksek Hızlı Kapılar",
    href: "#",
    items: [
      { name: "PVC Sarmal Kapı", href: "#" },
      { name: "PVC Katlanır Kapı", href: "#" },
      { name: "Hibrit Kapı", href: "#" },
      { name: "Yüksek Hızlı Garaj Kapısı", href: "#" },
    ],
  },
  {
    name: "Yükleme Sistemleri",
    href: "#",
    items: [
      { name: "Menteşeli Rampa", href: "#" },
      { name: "Dik Rampa", href: "#" },
      { name: "Mini Rampa", href: "#" },
      { name: "Mobil Rampa", href: "#" },
      { name: "Teleskopik Rampa", href: "#" },
      { name: "Yükleme Körüğü", href: "#" },
    ],
  },
  {
    name: "Hangar Kapısı",
    href: "#",
    items: [
      { name: "Tersane Hangar Kapıları", href: "#" },
      { name: "Havacılık Hangar Kapıları", href: "#" },
    ],
  },
  {
    name: "ATEX Kapılar",
    href: "#",
    items: [
      { name: "Atex Sarmal Kapı", href: "#" },
      { name: "Atex Katlanır Kapı", href: "#" },
      { name: "Atex Seksiyonel Kapı", href: "#" },
    ],
  },
  {
    name: "Konut Kapıları",
    href: "#",
    items: [
      { name: "Yüksek Hızlı Garaj Kapısı", href: "#" },
      { name: "Panjur Garaj Kapısı", href: "#" },
      { name: "Kepenk Garaj Kapısı", href: "#" },
      { name: "Seksiyonel Garaj Kapısı", href: "#" },
      { name: "Otomatik Cam Kapı", href: "#" },
      { name: "Bariyer Kapı Sistemleri", href: "#" },
      { name: "Yana Kayar Bahçe Kapısı", href: "#" },
      { name: "Dairesel Bahçe Kapısı", href: "#" },
    ],
  },
]

const navItems = [
  { name: "Anasayfa", href: "#" },
  { name: "Hakkımızda", href: "#about" },
  { name: "Ürünlerimiz", href: "#products", hasMegaMenu: true },
  { name: "Galeri", href: "/gallery" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setMegaMenuOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false)
    }, 150)
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-[#1e3a5f] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <a
            href="mailto:info@cksotomatikkapi.com"
            className="flex items-center gap-2 hover:text-orange-400 transition-colors"
          >
            <Mail className="h-4 w-4" />
            info@cksotomatikkapi.com
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Hemen Teklif Al</span>
            <div className="flex items-center gap-2">
              <span className="text-xs">🇹🇷 TR</span>
              <a href="#" className="hover:text-orange-400 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-white px-3 py-2 rounded">
                <Image
                  src={logoCKS}
                  alt="CKS Otomatik Kapı Logo"
                  width={200}
                  height={60}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) =>
                item.hasMegaMenu ? (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className="flex items-center gap-1 text-[#1e3a5f] hover:text-orange-500 transition-colors font-medium">
                      {item.name}
                      <ChevronDown className={`h-4 w-4 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-[#1e3a5f] hover:text-orange-500 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ),
              )}
              <Button 
                className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white"
                asChild
              >
                <a
                  href={`https://wa.me/905422408699?text=${encodeURIComponent("Merhaba, otomatik kapılar hakkında fiyat bilgisi almak istiyorum.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  İletişim
                </a>
              </Button>
            </div>

          </div>
        </div>

        {/* Mega Menu - Desktop */}
        {megaMenuOpen && (
          <div
            ref={megaMenuRef}
            className="absolute left-0 w-full bg-white shadow-xl border-t border-gray-100 z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-6 gap-8">
                {productCategories.map((category) => (
                  <div key={category.name} className="space-y-3">
                    <h3 className="font-bold text-[#1e3a5f] text-sm border-b border-gray-200 pb-2">
                      {category.name}
                    </h3>
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="flex items-center gap-1 text-gray-600 hover:text-orange-500 text-sm transition-colors group"
                          >
                            <ChevronRight className="h-3 w-3 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t bg-white">
            <div className="container mx-auto px-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasMegaMenu ? (
                    <>
                      <button
                        className="w-full flex items-center justify-between py-2 text-[#1e3a5f] hover:text-orange-500 transition-colors font-medium"
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      >
                        {item.name}
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileProductsOpen && (
                        <div className="pl-4 pb-2 space-y-3">
                          {productCategories.map((category) => (
                            <div key={category.name}>
                              <h4 className="font-semibold text-[#1e3a5f] text-sm py-1">{category.name}</h4>
                              <div className="pl-3 space-y-1">
                                {category.items.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className="block py-1 text-xs text-gray-600 hover:text-orange-500"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-2 text-[#1e3a5f] hover:text-orange-500 transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Button 
                className="mt-4 w-full bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white"
                asChild
              >
                <a
                  href={`https://wa.me/905422408699?text=${encodeURIComponent("Merhaba, otomatik kapılar hakkında fiyat bilgisi almak istiyorum.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  İletişim
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
