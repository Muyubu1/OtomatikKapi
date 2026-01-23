"use client"

import { Check } from "lucide-react"
import { getAssetPath } from "@/lib/utils"
import { motion } from "framer-motion"

interface FeaturesSectionProps {
  content?: {
    title: string
    image?: string
    items: string[]
  }
}

export default function FeaturesSection({ content }: FeaturesSectionProps) {
  const items = content?.items || [
    "Kapınızı Otomatikleştirin, Hayatınızı Kolaylaştırın!",
    "Otomatik Kapılar, Otomatik Çözümler!",
    "Güvenli ve Rahat Geçiş İçin Otomatik Kapılar!",
    "Tek Bir Dokunuşla Açılan Kapılar!",
    "Otomatik Kapılar, Akıllı Yaşam Tarzı!",
  ]
  const image = content?.image || "/foto3.png"

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
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
              <img src={getAssetPath(image)} alt="Otomatik kapı sistemi" className="w-full h-full object-cover" />
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
              Bizimle Daha <span className="text-[#ED1C24]">Güvenli</span> Olursunuz
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
