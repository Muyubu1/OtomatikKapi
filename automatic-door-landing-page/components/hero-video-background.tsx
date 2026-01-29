"use client"

import { useEffect, useRef, useState } from "react"
import { getAssetPath } from "@/lib/utils"

interface HeroVideoBackgroundProps {
  className?: string
}

interface Settings {
  heroVideoUrl?: string
}

export default function HeroVideoBackground({ className = "" }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoUrl, setVideoUrl] = useState("/videos/hero-bg.webm")

  useEffect(() => {
    // Fetch video URL from settings
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings')
        if (res.ok) {
          const data: Settings = await res.json()
          if (data.heroVideoUrl) {
            setVideoUrl(data.heroVideoUrl)
          }
        }
      } catch (error) {
        console.error('Error fetching settings:', error)
      }
    }
    fetchSettings()
  }, [])

  useEffect(() => {
    // Ensure video plays on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser, silent fail
      })
    }
  }, [videoUrl])

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
        preload="auto"
        key={videoUrl}
      >
        <source src={getAssetPath(videoUrl)} type="video/webm" />
        <source src={getAssetPath("/videos/hero-bg.mp4")} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        Tarayıcınız video etiketini desteklemiyor.
      </video>

      {/* Overlay - Koyu lacivert (#002147) %50 opaklık */}
      <div className="absolute inset-0 bg-[#002147]/50" />
    </div>
  )
}
