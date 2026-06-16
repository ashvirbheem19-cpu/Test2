"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const US_IMAGES = [
  { src: "/images/us/1.jpg", alt: "us" },
  { src: "/images/us/2.jpg", alt: "us" },
  { src: "/images/us/3.jpg", alt: "us" },
  { src: "/images/us/4.jpg", alt: "us" },
  { src: "/images/us/5.jpg", alt: "us" },
  { src: "/images/us/6.jpg", alt: "us" },
]

const FLOWER_IMAGES = [
  { src: "/images/flowers/1.jpg", alt: "flower" },
  { src: "/images/flowers/2.jpg", alt: "flower" },
  { src: "/images/flowers/3.jpg", alt: "flower" },
  { src: "/images/flowers/4.jpg", alt: "flower" },
  { src: "/images/flowers/5.jpg", alt: "flower" },
  { src: "/images/flowers/6.jpg", alt: "flower" },
]

function ImageCard({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div className="aspect-square rounded-xl bg-gradient-to-br from-amber-900/20 to-[#2a0a00] border border-amber-800/20 flex items-center justify-center text-amber-700/30 text-4xl" onClick={onClick}>
        {alt === "us" ? "♡" : "🌸"}
      </div>
    )
  }

  return (
    <div className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer bg-[#2a0a00]/60 border border-amber-800/20" onClick={onClick}>
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-[#2a0a00] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-85 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0500]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}

export default function GalleryPage() {
  const [tab, setTab] = useState<"us" | "flowers">("us")
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  const images = tab === "us" ? US_IMAGES : FLOWER_IMAGES

  const closeLightbox = useCallback(() => setLightbox(null), [])

  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox() }
    window.addEventListener("keydown", handle)
    return () => window.removeEventListener("keydown", handle)
  }, [closeLightbox])

  return (
    <div className="relative min-h-screen bg-[#1a0500] px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-lg">
            a collection of our memories
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#f5e6d0]">
            our gallery ♡
          </h1>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setTab("us")}
            className={`px-6 py-2 rounded-md font-[family-name:var(--font-dancing)] text-lg transition-all cursor-pointer ${
              tab === "us"
                ? "bg-amber-900/40 text-amber-200 border border-amber-600/50"
                : "text-amber-400/50 border border-amber-800/30 hover:text-amber-300 hover:border-amber-700/50"
            }`}
          >
            us ♡
          </button>
          <button
            onClick={() => setTab("flowers")}
            className={`px-6 py-2 rounded-md font-[family-name:var(--font-dancing)] text-lg transition-all cursor-pointer ${
              tab === "flowers"
                ? "bg-amber-900/40 text-amber-200 border border-amber-600/50"
                : "text-amber-400/50 border border-amber-800/30 hover:text-amber-300 hover:border-amber-700/50"
            }`}
          >
            flowers 🌸
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <ImageCard src={img.src} alt={img.alt} onClick={() => setLightbox(img)} />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/second"
            className="text-amber-400/40 font-[family-name:var(--font-dancing)] text-base hover:text-amber-300 transition-colors"
          >
            ← back
          </a>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1a0500]/95 flex items-center justify-center p-4 cursor-pointer"
            onClick={closeLightbox}
          >
            <motion.img
              key={lightbox.src}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-amber-300/60 hover:text-amber-200 text-3xl cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
