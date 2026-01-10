import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getAssetPath } from "@/lib/utils"

const faqs = [
  {
    question: "Otomatik Kapı Sistemlerinin Avantajları Nedir?",
    answer:
      "Otomatik kapı sistemleri, güvenlik, enerji tasarrufu, hijyen ve kullanım kolaylığı gibi birçok avantaj sağlar. Ayrıca engelli erişimi için de ideal çözümler sunar.",
  },
  {
    question: "Otomatik Kapı Sistemlerinin Bakımı Nasıl Yapılır?",
    answer:
      "Otomatik kapı sistemlerinin düzenli bakımı önemlidir. Periyodik kontroller, yağlama işlemleri ve sensör temizliği yapılmalıdır. Profesyonel servis desteği önerilir.",
  },
  {
    question: "Otomatik Kapı Sistemlerinin Maliyeti Nedir?",
    answer:
      "Maliyet, kapı tipine, boyutuna ve özelliklerine göre değişir. Detaylı bilgi için bizimle iletişime geçebilirsiniz.",
  },
  {
    question: "Otomatik Kapı Sistemlerinin Garanti Süresi Nedir?",
    answer: "Ürünlerimiz 2 yıl garanti kapsamındadır. Garanti süresince tüm arızalar ücretsiz olarak giderilir.",
  },
  {
    question: "Otomatik Kapı Sistemlerinin Kurulum Süresi Ne Kadardır?",
    answer:
      "Kurulum süresi kapı tipine ve projenin büyüklüğüne göre değişir. Genellikle 1-3 gün içinde kurulum tamamlanır.",
  },
  {
    question: "Otomatik Kapı Sistemlerinin Enerji Tüketimi Ne Kadardır?",
    answer: "Modern otomatik kapı sistemleri düşük enerji tüketimi ile çalışır. Bekleme modunda minimal güç harcar.",
  },
  {
    question: "Otomatik Kapı Sistemlerinin Güvenliği Nasıldır?",
    answer: "Güvenlik sensörleri, acil durdurma sistemleri ve anti-pinch teknolojisi ile maksimum güvenlik sağlanır.",
  },
  {
    question: "Otomatik Kapı Sistemlerinin Dayanıklılığı Nasıldır?",
    answer:
      "Yüksek kaliteli malzemeler ve sağlam yapı ile uzun ömürlü kullanım sağlanır. Endüstriyel modeller özellikle dayanıklıdır.",
  },
  {
    question: "Otomatik Kapı Sistemlerinin Kullanımı Zor Mu?",
    answer:
      "Hayır, otomatik kapılar son derece kullanıcı dostudur. Sensörler veya uzaktan kumanda ile kolayca çalıştırılabilir.",
  },
]

export default function FAQSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
              <img
                src={getAssetPath("/foto6.png")}
                alt="Endüstriyel otomatik kapı sistemleri"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* FAQ Accordion */}
          <div>
            <h2 className="text-xl font-bold text-[#1e3a5f] mb-6">Endüstriyel Otomatik Kapı Sistemleri Nedir?</h2>
            <p className="text-gray-600 mb-6">
              Endüstriyel otomatik kapı sistemleri, genellikle fabrikalar, depolar ve diğer endüstriyel tesislerde
              kullanılan, genellikle uzaktan kumanda veya hareket sensörleri ile kontrol edilen kapılardır.
            </p>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-[#1e3a5f] hover:text-orange-500">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
