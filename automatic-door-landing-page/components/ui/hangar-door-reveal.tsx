"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { getAssetPath } from "@/lib/utils"

interface HangarDoorRevealProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    /** Kapının açılması için gereken scroll miktarı (viewport height olarak) */
    doorScrollHeight?: number
}

const HangarDoorReveal = React.forwardRef<HTMLDivElement, HangarDoorRevealProps>(
    ({ children, className, doorScrollHeight = 1, ...props }, ref) => {
        const containerRef = React.useRef<HTMLDivElement>(null)
        const contentRef = React.useRef<HTMLDivElement>(null)
        const [contentHeight, setContentHeight] = React.useState(0)

        // İçeriğin gerçek yüksekliğini ölç
        React.useEffect(() => {
            const measureContent = () => {
                if (contentRef.current) {
                    setContentHeight(contentRef.current.scrollHeight)
                }
            }

            measureContent()

            // ResizeObserver ile içerik değiştiğinde yeniden ölç
            const observer = new ResizeObserver(measureContent)
            if (contentRef.current) {
                observer.observe(contentRef.current)
            }

            return () => observer.disconnect()
        }, [children])

        const { scrollYProgress } = useScroll({
            target: containerRef,
            offset: ["start start", "end end"],
        })

        // Toplam scroll yüksekliği = kapı açılma alanı + içerik yüksekliği
        const doorAreaHeight = `${doorScrollHeight * 100}vh`

        // Kapı animasyonu: İlk scroll'da kapı açılır
        // Geri kalan scroll'da içerik kayar
        const [windowHeight, setWindowHeight] = React.useState(800) // Safe default

        React.useEffect(() => {
            setWindowHeight(window.innerHeight)
            const handleResize = () => setWindowHeight(window.innerHeight)
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }, [])

        const doorOpenProgress = React.useMemo(() => {
            const totalHeight = (doorScrollHeight * windowHeight) + contentHeight
            if (totalHeight <= 0) return 0.5
            return (doorScrollHeight * windowHeight) / totalHeight
        }, [doorScrollHeight, contentHeight, windowHeight])

        const doorY = useTransform(
            scrollYProgress,
            [0, doorOpenProgress],
            ["0%", "-100%"]
        )

        // İçerik scroll'u: Kapı açıldıktan sonra başlar
        const contentY = useTransform(
            scrollYProgress,
            [doorOpenProgress, 1],
            [0, -(contentHeight - windowHeight)]
        )

        // Endüstriyel metal panel sayısı
        const panelCount = 5

        return (
            <div
                ref={containerRef}
                className={cn("relative", className)}
                style={{
                    height: `calc(${doorAreaHeight} + ${contentHeight}px)`
                }}
                {...props}
            >
                {/* İÇERİK - Kapı açılınca görünür, scroll ile kayar */}
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <motion.div
                        ref={ref}
                        style={{ y: contentY }}
                        className="w-full"
                    >
                        <div ref={contentRef}>
                            {children}
                        </div>
                    </motion.div>
                </div>

                {/* HANGAR KAPISI - İçeriğin üstünde, yukarı kayar */}
                <motion.div
                    style={{ y: doorY }}
                    className="fixed inset-0 z-[100] pointer-events-none"
                >
                    {/* Üst Çerçeve / Ray */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-zinc-800 to-zinc-700 border-b-4 border-zinc-600 shadow-lg z-10">
                        <div className="absolute inset-0 flex items-center justify-between px-8">
                            {/* Sol ray deseni */}
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-zinc-600 border-2 border-zinc-500" />
                                <div className="w-20 h-1 bg-zinc-600" />
                                <div className="w-4 h-4 rounded-full bg-zinc-600 border-2 border-zinc-500" />
                            </div>
                            {/* Sağ ray deseni */}
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-zinc-600 border-2 border-zinc-500" />
                                <div className="w-20 h-1 bg-zinc-600" />
                                <div className="w-4 h-4 rounded-full bg-zinc-600 border-2 border-zinc-500" />
                            </div>
                        </div>
                    </div>

                    {/* Ana Kapı Panelleri */}
                    <div className="absolute inset-0 pt-8 bg-gradient-to-b from-zinc-700 via-zinc-600 to-zinc-700">
                        {/* Metal Doku Overlay */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0,0,0,0.05) 2px,
                    rgba(0,0,0,0.05) 4px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 100px,
                    rgba(255,255,255,0.02) 100px,
                    rgba(255,255,255,0.02) 102px
                  )
                `,
                            }}
                        />

                        {/* Panel Bölümleri */}
                        {Array.from({ length: panelCount }).map((_, index) => (
                            <div
                                key={index}
                                className="relative border-b-2 border-zinc-800/50"
                                style={{
                                    height: `${100 / panelCount}%`,
                                    backgroundColor: index % 2 === 0
                                        ? 'rgba(82, 82, 91, 0.95)'
                                        : 'rgba(63, 63, 70, 0.92)',
                                }}
                            >
                                {/* Panel çizgileri */}
                                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-zinc-500/30 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-t from-zinc-900/50 to-transparent" />

                                {/* Cıvatalar - her panelin köşelerinde */}
                                <div className="absolute top-3 left-6 w-3 h-3 rounded-full bg-zinc-500 shadow-inner border border-zinc-400">
                                    <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-600" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-zinc-700 rotate-45" />
                                </div>
                                <div className="absolute top-3 right-6 w-3 h-3 rounded-full bg-zinc-500 shadow-inner border border-zinc-400">
                                    <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-600" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-zinc-700 rotate-45" />
                                </div>
                                <div className="absolute bottom-3 left-6 w-3 h-3 rounded-full bg-zinc-500 shadow-inner border border-zinc-400">
                                    <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-600" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-zinc-700 rotate-45" />
                                </div>
                                <div className="absolute bottom-3 right-6 w-3 h-3 rounded-full bg-zinc-500 shadow-inner border border-zinc-400">
                                    <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-600" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-zinc-700 rotate-45" />
                                </div>

                                {/* Orta panel çizgisi */}
                                <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-zinc-700/50 -translate-y-1/2" />
                            </div>
                        ))}

                        {/* LOGO VE HOŞGELDINIZ YAZISI - Ortada */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                            {/* Logo Container */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="relative mb-6"
                            >
                                {/* Logo arka plan glow efekti */}
                                <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full scale-150" />

                                {/* Actual Logo */}
                                <div className="relative bg-white/95 backdrop-blur-sm rounded-lg px-8 py-4 shadow-2xl border border-white/20">
                                    <Image
                                        src={getAssetPath("/logoCKS_br.png")}
                                        alt="CKS Otomatik Kapı Logo"
                                        width={280}
                                        height={84}
                                        className="h-16 md:h-20 w-auto object-contain"
                                        priority
                                    />
                                </div>
                            </motion.div>

                            {/* Hoşgeldiniz Yazısı */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="text-center"
                            >
                                <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
                                    CKS Otomatik Kapı'ya
                                </h2>
                                <p className="text-3xl md:text-5xl font-bold text-orange-400 drop-shadow-lg">
                                    Hoşgeldiniz
                                </p>
                            </motion.div>

                            {/* Scroll İndikatörü */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.2 }}
                                className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                            >
                                <p className="text-sm text-zinc-300 tracking-wide uppercase">
                                    Kapıyı açmak için kaydırın
                                </p>
                                <motion.div
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <ChevronDown className="w-8 h-8 text-orange-400" />
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Sol Kenar Çerçeve */}
                        <div className="absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-r from-zinc-800 to-zinc-700 border-r border-zinc-600" />

                        {/* Sağ Kenar Çerçeve */}
                        <div className="absolute top-0 right-0 bottom-0 w-4 bg-gradient-to-l from-zinc-800 to-zinc-700 border-l border-zinc-600" />

                        {/* Alt Conta */}
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-zinc-900 to-zinc-800 border-t-2 border-zinc-600">
                            {/* Kauçuk conta dokusu */}
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,rgba(0,0,0,0.3)_8px,rgba(0,0,0,0.3)_10px)]" />
                        </div>
                    </div>

                    {/* Gölge Overlay - Derinlik için */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/30" />
                </motion.div>
            </div>
        )
    }
)

HangarDoorReveal.displayName = "HangarDoorReveal"

export { HangarDoorReveal }

