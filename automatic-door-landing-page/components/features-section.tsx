"use client"

import { Check } from "lucide-react"
import Image from "next/image"
import { getAssetPath } from "@/lib/utils"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n"

interface FeaturesSectionProps {
  content?: {
    title: string
    title_en?: string
    image?: string
    items: string[]
    items_en?: string[]
  }
}

export default function FeaturesSection({ content }: FeaturesSectionProps) {
  const { language, t } = useLanguage()

  const defaultItemsTr = [
    "Kapınızı Otomatikleştirin, Hayatınızı Kolaylaştırın!",
    "Otomatik Kapılar, Otomatik Çözümler!",
    "Güvenli ve Rahat Geçiş İçin Otomatik Kapılar!",
    "Tek Bir Dokunuşla Açılan Kapılar!",
    "Otomatik Kapılar, Akıllı Yaşam Tarzı!",
  ]

  const defaultItemsEn = [
    "Automate Your Door, Simplify Your Life!",
    "Automatic Doors, Automatic Solutions!",
    "Automatic Doors for Safe and Comfortable Access!",
    "Doors That Open with a Single Touch!",
    "Automatic Doors, Smart Lifestyle!",
  ]

  const items = language === 'en'
    ? (content?.items_en && content.items_en.length > 0 ? content.items_en : defaultItemsEn)
    : (content?.items || defaultItemsTr)

  const image = content?.image || "/foto3.png"

  const titleParts = language === 'en'
    ? { before: "You Are ", highlight: "Safer", after: " With Us" }
    : { before: "Bizimle Daha ", highlight: "Güvenli", after: " Olursunuz" }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl relative">
              <Image
                src={getAssetPath(image)}
                alt={language === 'en' ? 'Automatic door system' : 'Otomatik kapı sistemi'}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#414042] mb-8">
              {titleParts.before}<span className="text-[#ED1C24]">{titleParts.highlight}</span>{titleParts.after}
            </h2>
            <div className="space-y-4">
              {items.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#ED1C24] rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
