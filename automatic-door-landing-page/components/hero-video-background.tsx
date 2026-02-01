"use client"

import { useEffect, useRef } from "react"
import { getAssetPath } from "@/lib/utils"

interface HeroVideoBackgroundProps {
  className?: string
  videoUrl?: string
}

export default function HeroVideoBackground({ className = "", videoUrl }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const effectiveVideoUrl = videoUrl || "/videos/hero-bg.webm"

  useEffect(() => {
    // Ensure video plays on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser, silent fail
      })
    }
  }, [effectiveVideoUrl])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-poster.jpg"
        key={effectiveVideoUrl}
      >
        <source src={getAssetPath(effectiveVideoUrl)} type="video/webm" />
        <source src={getAssetPath("/videos/hero-bg.mp4")} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        Tarayıcınız video etiketini desteklemiyor.
      </video>

      {/* Overlay - Koyu lacivert (#002147) %50 opaklık */}
      <div className="absolute inset-0 bg-[#002147]/50" />
    </div>
  )
}

