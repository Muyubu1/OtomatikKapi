"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getAssetPath } from "@/lib/utils"
import { motion } from "framer-motion"

interface FAQSectionProps {
  faqs?: { question: string; answer: string }[]
}

export default function FAQSection({ faqs: propFaqs }: FAQSectionProps) {
  const faqs = propFaqs || [
    { question: "Otomatik Kapı Sistemlerinin Avantajları Nedir?", answer: "Otomatik kapı sistemleri, güvenlik, enerji tasarrufu, hijyen ve kullanım kolaylığı gibi birçok avantaj sağlar." },
    { question: "Otomatik Kapı Sistemlerinin Bakımı Nasıl Yapılır?", answer: "Otomatik kapı sistemlerinin düzenli bakımı önemlidir. Profesyonel servis desteği önerilir." },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
              <img
                src={getAssetPath("/foto6.png")}
                alt="Endüstriyel otomatik kapı sistemleri"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-[#414042] mb-6"
            >
              Endüstriyel Otomatik Kapı Sistemleri Nedir?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 mb-6"
            >
              Endüstriyel otomatik kapı sistemleri, genellikle fabrikalar, depolar ve diğer endüstriyel tesislerde
              kullanılan, genellikle uzaktan kumanda veya hareket sensörleri ile kontrol edilen kapılardır.
            </motion.p>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-[#414042] hover:text-[#ED1C24]">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
