"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import logoCKS from "@/public/cksLogobr.png"

interface Settings {
  instagramUrl: string;
  linkedinUrl: string;
  heroVideoUrl?: string;
}

interface FooterProps {
  settings?: Settings;
}

export default function Footer({ settings = { instagramUrl: '', linkedinUrl: '' } }: FooterProps) {
  const { t, language } = useLanguage()

  return (
    <footer className="bg-[#414042] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-white px-3 py-2 rounded">
                <Image
                  src={logoCKS}
                  alt="CKS Otomatik Kapı Logo"
                  width={200}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              {settings.instagramUrl ? (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ED1C24] transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              ) : (
                <a href="#" className="hover:text-[#ED1C24] transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {settings.linkedinUrl ? (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ED1C24] transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              ) : (
                <a href="#" className="hover:text-[#ED1C24] transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#ED1C24] transition-colors text-sm">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-300 hover:text-[#ED1C24] transition-colors text-sm">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/#products" className="text-gray-300 hover:text-[#ED1C24] transition-colors text-sm">
                  {t("nav.products")}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-[#ED1C24] transition-colors text-sm">
                  {t("nav.gallery")}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-300 hover:text-[#ED1C24] transition-colors text-sm">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Products - Simplified */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t("footer.ourProducts")}</h3>
            <p className="text-gray-300 text-sm mb-4">
              {t("footer.productsDesc")}
            </p>
            <Link
              href="/urunler"
              className="inline-flex items-center gap-2 text-[#ED1C24] hover:text-white transition-colors text-sm font-medium group"
            >
              {t("footer.viewAll")}
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t("footer.contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-[#ED1C24]" />
                <span className="text-gray-300 text-sm">{language === 'en' ? 'Istanbul, Turkey' : 'İstanbul, Türkiye'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-[#ED1C24]" />
                <a href="tel:+905422408699" className="text-gray-300 hover:text-[#ED1C24] transition-colors text-sm">
                  +90 542 240 86 99
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-[#ED1C24]" />
                <a
                  href="mailto:info@cksotomatikkapi.com"
                  className="text-gray-300 hover:text-[#ED1C24] transition-colors text-sm"
                >
                  info@cksotomatikkapi.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2026 CKS Otomatik Kapı. {t("footer.rights")}.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link href="#" className="hover:text-[#ED1C24] transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link href="#" className="hover:text-[#ED1C24] transition-colors">
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
