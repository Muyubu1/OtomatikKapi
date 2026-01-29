"use client"

import { Phone } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n"

export default function CallButton() {
  const { t } = useLanguage()
  const phoneNumber = "905422408699"

  return (
    <motion.a
      href={`tel:${phoneNumber}`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-[88px] right-6 z-50 flex items-center gap-2 bg-[#ED1C24] hover:bg-[#c91920] text-white px-4 py-3 rounded-full transition-colors border border-white"
      style={{ boxShadow: '0 8px 25px -5px rgba(237, 28, 36, 0.5), 0 4px 15px -3px rgba(0, 0, 0, 0.3)' }}
    >
      <motion.div
        animate={{ rotate: [0, 15, -15, 15, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
      >
        <Phone className="h-5 w-5" />
      </motion.div>
      <span className="font-medium">{t("button.callNow")}</span>
    </motion.a>
  )
}

