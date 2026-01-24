import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

// GitHub Pages için basePath
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: "CKS Otomatik Kapı - Endüstriyel Otomatik Kapı Sistemleri",
  description: "Endüstriyel otomatik kapı ve yükleme sistemleri. Güvenli, hızlı ve kaliteli otomatik kapı çözümleri ile işletmenizi bir adım öne taşıyın.",
  generator: 'v0.app',
  keywords: ['otomatik kapı', 'endüstriyel kapı', 'seksiyonel kapı', 'hızlı kapı', 'yangın kapısı', 'pvc şerit perde', 'CKS Otomatik Kapı'],
  authors: [{ name: 'CKS Otomatik Kapı' }],
  creator: 'CKS Otomatik Kapı',
  publisher: 'CKS Otomatik Kapı',
  metadataBase: new URL('https://www.cksotomatikkapi.com'),
  icons: {
    icon: [
      { url: `${basePath}/faviconCKS.png`, sizes: '32x32', type: 'image/png' },
      { url: `${basePath}/faviconCKS.png`, sizes: '16x16', type: 'image/png' },
    ],
    apple: `${basePath}/faviconCKS.png`,
    shortcut: `${basePath}/faviconCKS.png`,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.cksotomatikkapi.com',
    siteName: 'CKS Otomatik Kapı',
    title: 'CKS Otomatik Kapı - Endüstriyel Otomatik Kapı Sistemleri',
    description: 'Endüstriyel otomatik kapı ve yükleme sistemleri. Güvenli, hızlı ve kaliteli otomatik kapı çözümleri.',
    images: [
      {
        url: `${basePath}/cksLogo.png`,
        width: 1200,
        height: 630,
        alt: 'CKS Otomatik Kapı Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CKS Otomatik Kapı - Endüstriyel Otomatik Kapı Sistemleri',
    description: 'Endüstriyel otomatik kapı ve yükleme sistemleri. Güvenli, hızlı ve kaliteli çözümler.',
    images: [`${basePath}/cksLogo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
