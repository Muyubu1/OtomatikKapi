"use client"

import { Button } from "@/components/ui/button"
import { MousePointer } from "lucide-react"
import { getAssetPath } from "@/lib/utils"
import { motion } from "framer-motion"

export default function ProjectSolutionsSection() {
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#414042] mb-6">PROJEYE ÖZEL ÇÖZÜMLER</h2>
            <div className="space-y-4 text-gray-600">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Otomatik kapılar, modern dünyanın vazgeçilmez bir parçasıdır. İster bir alışveriş merkezi, ister bir
                ofis binası, isterse bir konut kompleksi olsun, otomatik kapılar hem güvenlik hem de kolaylık sağlar.
                Ancak her proje farklıdır ve her projenin kendine özgü ihtiyaçları vardır.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                İşte burada otomatik kapı firmalarının lideri olan "FY Otomatik Kapı ve Yükleme Sistemleri" projeye
                uygun çözümler sunarak müşterilerimizin ihtiyaçlarına uygun çözümler üreterek uygulamaktadır.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Projeye uygun çözümler sunan "FY Otomatik Kapı" her projenin kendine özgü ihtiyaçlarını ve zorluklarını
                anlar. Bu, projenin boyutunu, bütçesini, zaman çizelgesini ve hedeflerini dikkate almayı içerir.
                Ardından, bu ihtiyaçları karşılamak için en uygun otomatik kapı çözümünü tasarlar ve uygular.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Sonuç olarak, projeye uygun çözümler sunan otomatik kapı firmamız, her projenin başarısını sağlamak için
                gereken esnekliği ve uzmanlığı sağlar. Bu, projenin her aşamasında mükemmel hizmet sunmayı ve müşteri
                memnuniyetini en üst düzeye çıkarmayı garanti eder.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button className="mt-6 bg-[#ED1C24] hover:bg-[#c91920] text-white">Referanslarımız</Button>
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
              <img src={getAssetPath("/foto1.png")} alt="3D proje çözümü" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
