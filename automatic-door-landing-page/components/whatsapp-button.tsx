"use client"

import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const phoneNumber = "905422408699"
  const defaultMessage = "Merhaba, otomatik kapılar hakkında fiyat bilgisi almak istiyorum."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="font-medium">WhatsApp Hattı</span>
    </a>
  )
}
