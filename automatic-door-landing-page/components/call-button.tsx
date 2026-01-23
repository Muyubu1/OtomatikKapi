"use client"

import { Phone } from "lucide-react"

export default function CallButton() {
  const phoneNumber = "905422408699"

  return (
    <a
      href={`tel:${phoneNumber}`}
      className="fixed bottom-[88px] right-6 z-50 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105"
    >
      <Phone className="h-5 w-5" />
      <span className="font-medium">Hemen Ara</span>
    </a>
  )
}
