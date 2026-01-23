"use client"

import { Award, CircleDollarSign, Cpu, Wrench, Shield, LucideIcon } from "lucide-react"
import { getAssetPath } from "@/lib/utils"
import { motion } from "framer-motion"

const iconMap: Record<string, LucideIcon> = {
  "DENEYİM": Award,
  "FİYAT": CircleDollarSign,
  "TEKNOLOJİ": Cpu,
  "ÖZEL ÇÖZÜMLER": Wrench,
  "GÜVENİLİR VE SAYGIN": Shield,
}

interface WhyUsSectionProps {
  content?: {
    title: string
    items: { title: string; description: string }[]
  }
}

export default function WhyUsSection({ content }: WhyUsSectionProps) {
  const title = content?.title || "NEDEN BİZ"
  const items = content?.items || [
    { title: "DENEYİM", description: "Deneyimli ve Profesyonel Bir Ekibimiz Var" },
    { title: "FİYAT", description: "Uygun Fiyatlarla Üstün Hizmet Sunuyoruz" },
    { title: "TEKNOLOJİ", description: "Sektördeki En Son Teknolojileri Kullanıyoruz" },
    { title: "ÖZEL ÇÖZÜMLER", description: "Projeye Özel Çözümler Sunuyoruz" },
    { title: "GÜVENİLİR VE SAYGIN", description: "Güvenilir ve Saygın Bir Firma Olmanın Gururunu Yaşıyoruz" },
  ]

  return (
    <section className="py-20 bg-[#ED1C24]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative order-2 md:order-1"
          >
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
              <img src={getAssetPath("/foto5.png")} alt="Neden biz" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left mb-8"
            >
              <span className="text-6xl font-bold text-white/30">?</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
            </motion.div>

            <div className="space-y-6">
              {items.map((reason, index) => {
                const Icon = iconMap[reason.title] || Award
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Icon className="h-6 w-6 text-[#ED1C24]" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-white">{reason.title}</h3>
                      <p className="text-white/90 text-sm">{reason.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
