"use client"

import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function WhatsAppButton() {
  const phoneNumber = "905422408699"
  const defaultMessage = "Merhaba, otomatik kapılar hakkında fiyat bilgisi almak istiyorum."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-colors"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
      >
        <MessageCircle className="h-5 w-5" />
      </motion.div>
      <span className="font-medium">WhatsApp Hattı</span>
    </motion.a>
  )
}
