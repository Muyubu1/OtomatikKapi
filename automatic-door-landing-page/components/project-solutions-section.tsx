"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MousePointer } from "lucide-react"
import { getAssetPath } from "@/lib/utils"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n"

interface ProjectSolutionsSectionProps {
  content?: {
    title: string
    title_en?: string
    image?: string
    paragraphs: string[]
    paragraphs_en?: string[]
  }
}

export default function ProjectSolutionsSection({ content }: ProjectSolutionsSectionProps) {
  const { t, language } = useLanguage()

  const title = language === 'en' && content?.title_en
    ? content.title_en
    : (content?.title || t("projectSolutions.title"))
  const image = content?.image || "/foto1.png"
  const paragraphs = language === 'en' && content?.paragraphs_en && content.paragraphs_en.length > 0
    ? content.paragraphs_en
    : (content?.paragraphs || [
      language === 'en'
        ? "Automatic doors are an indispensable part of the modern world. Whether it's a shopping center, office building, or residential complex, automatic doors provide both safety and convenience."
        : "Otomatik kapılar, modern dünyanın vazgeçilmez bir parçasıdır. İster bir alışveriş merkezi, ister bir ofis binası, isterse bir konut kompleksi olsun, otomatik kapılar hem güvenlik hem de kolaylık sağlar.",
      language === 'en'
        ? "Here, \"FY Automatic Door and Loading Systems\", the leader in automatic door companies, provides project-specific solutions by producing solutions suitable for our customers' needs."
        : "İşte burada otomatik kapı firmalarının lideri olan \"FY Otomatik Kapı ve Yükleme Sistemleri\" projeye uygun çözümler sunarak müşterilerimizin ihtiyaçlarına uygun çözümler üreterek uygulamaktadır."
    ])

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, rotate: -20 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="flex justify-center md:justify-start mb-4"
            >
              <MousePointer className="h-8 w-8 text-[#ED1C24]" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#414042] mb-6">{title}</h2>
            <div className="space-y-4 text-gray-600">
              {paragraphs.map((para, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/gallery">
                <Button className="mt-6 bg-[#ED1C24] hover:bg-[#c91920] text-white">{t("projectSolutions.button")}</Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
              <img src={getAssetPath(image)} alt="3D proje çözümü" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
