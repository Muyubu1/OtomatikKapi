"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getAssetPath } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Product {
  slug: string
  name: string
  mainImage: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error)
  }, [])

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#414042] mb-4">Ürünlerimiz</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Endüstriyel ve ticari ihtiyaçlarınız için geniş ürün yelpazemizi keşfedin.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.slug} variants={itemVariants}>
              <Link href={`/urunler/${product.slug}`}>
                <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={getAssetPath(product.mainImage) || getAssetPath("/placeholder.svg")}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-medium text-[#414042] group-hover:text-[#ED1C24] transition-colors">
                        {product.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
