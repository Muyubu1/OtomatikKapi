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
  description: "Endüstriyel otomatik kapı ve yükleme sistemleri. Güvenli, hızlı ve kaliteli çözümler.",
  generator: 'v0.app',
  icons: {
    icon: `${basePath}/logoCKS_br.png`,
    apple: `${basePath}/logoCKS_br.png`,
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
