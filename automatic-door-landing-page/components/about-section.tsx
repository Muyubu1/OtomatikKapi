"use client"

import { Menu } from "lucide-react"
import { getAssetPath } from "@/lib/utils"
import { motion } from "framer-motion"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <Menu className="h-6 w-6 text-[#ED1C24]" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#414042] mb-6">OTOMATİK KAPILAR</h2>
            <div className="space-y-4 text-gray-600">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Otomatik kapılar, teknolojinin hayatımızın her alanına nasıl sızdığını gösteren mükemmel bir örnektir.
                Bu kapılar, hem güvenlik hem de kolaylık sağlarlar ve bu nedenle birçok farklı alanda kullanılırlar.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Otomatik kapılar, genellikle iş merkezleri, alışveriş merkezleri, havaalanları, hastaneler, fabrikalar,
                hangarlar ve oteller gibi yerlerde kullanılır. Ancak son yıllarda, daha fazla ev sahibi, otoparklarında
                ve evlerinde otomatik kapıları tercih etmeye başlamıştır.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Otomatik kapılar, genellikle hareket sensörleri veya uzaktan kumandalar aracılığıyla çalışır. Hareket
                sensörleri, bir kişi veya araç kapıya yaklaştığında kapının otomatik olarak açılmasını sağlar. Uzaktan
                kumandalar ise, kullanıcıların kapıyı açmak için bir düğmeye basmasını sağlar.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Sonuç olarak, otomatik kapılar, hem kullanım kolaylığı hem de enerji tasarrufu sağladığı için giderek
                daha popüler hale geliyor. Teknoloji ilerledikçe, otomatik kapıların daha da yaygınlaşacağını ve daha
                fazla özellik ve işlevsellik sunacağını bekleyebiliriz.
              </motion.p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <img src={getAssetPath("/foto4.png")} alt="Endüstriyel otomatik kapı" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
