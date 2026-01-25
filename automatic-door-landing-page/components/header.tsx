"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Linkedin, Instagram, Mail } from "lucide-react"
import logoCKS from "@/public/cksLogobr.png"

interface NavigationItem {
  id: number;
  parent_id: number | null;
  name: string;
  product_slug: string | null;
  sort_order: number;
  children?: NavigationItem[];
}

const navItems = [
  { name: "Anasayfa", href: "/" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "Ürünlerimiz", href: "#products", hasMegaMenu: true },
  { name: "Galeri", href: "/gallery" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [productCategories, setProductCategories] = useState<NavigationItem[]>([])
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch navigation items on mount
  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const res = await fetch('/api/navigation')
        if (res.ok) {
          const data = await res.json()
          setProductCategories(data)
        }
      } catch (error) {
        console.error('Error fetching navigation:', error)
      }
    }
    fetchNavigation()
  }, [])

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

  // Generate link for menu item
  const getItemHref = (item: NavigationItem) => {
    if (item.product_slug) {
      return `/urunler/${item.product_slug}`
    }
    return '#'
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-[#414042] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <a
            href="mailto:info@cksotomatikkapi.com"
            className="flex items-center gap-2 hover:text-[#ED1C24] transition-colors"
          >
            <Mail className="h-4 w-4" />
            info@cksotomatikkapi.com
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Hemen Teklif Al</span>
            <div className="flex items-center gap-2">
              <span className="text-xs">🇹🇷 TR</span>
              <a href="#" className="hover:text-[#ED1C24] transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-[#ED1C24] transition-colors">
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
                    <button className="flex items-center gap-1 text-[#414042] hover:text-[#ED1C24] transition-colors font-medium">
                      {item.name}
                      <ChevronDown className={`h-4 w-4 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-[#414042] hover:text-[#ED1C24] transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ),
              )}
              <Button
                className="bg-[#ED1C24] hover:bg-[#c91920] text-white"
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
        {megaMenuOpen && productCategories.length > 0 && (
          <div
            ref={megaMenuRef}
            className="absolute left-0 w-full bg-white shadow-xl border-t border-gray-100 z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-6 gap-8">
                {productCategories.map((category) => (
                  <div key={category.id} className="space-y-3">
                    <h3 className="font-bold text-[#414042] text-sm border-b border-gray-200 pb-2">
                      {category.name}
                    </h3>
                    {category.children && category.children.length > 0 && (
                      <ul className="space-y-2">
                        {category.children.map((item) => (
                          <li key={item.id}>
                            <Link
                              href={getItemHref(item)}
                              className="flex items-center gap-1 text-gray-600 hover:text-[#ED1C24] text-sm transition-colors group"
                            >
                              <ChevronRight className="h-3 w-3 text-[#ED1C24] opacity-0 group-hover:opacity-100 transition-opacity" />
                              <span>{item.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
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
                        className="w-full flex items-center justify-between py-2 text-[#414042] hover:text-[#ED1C24] transition-colors font-medium"
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      >
                        {item.name}
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileProductsOpen && productCategories.length > 0 && (
                        <div className="pl-4 pb-2 space-y-3">
                          {productCategories.map((category) => (
                            <div key={category.id}>
                              <h4 className="font-semibold text-[#414042] text-sm py-1">{category.name}</h4>
                              {category.children && category.children.length > 0 && (
                                <div className="pl-3 space-y-1">
                                  {category.children.map((subItem) => (
                                    <Link
                                      key={subItem.id}
                                      href={getItemHref(subItem)}
                                      className="block py-1 text-xs text-gray-600 hover:text-[#ED1C24]"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-2 text-[#414042] hover:text-[#ED1C24] transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Button
                className="mt-4 w-full bg-[#ED1C24] hover:bg-[#c91920] text-white"
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
