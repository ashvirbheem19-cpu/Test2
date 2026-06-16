"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const INGREDIENTS = [
  { id: "rose", emoji: "🌹", label: "rose petal" },
  { id: "moon", emoji: "🌙", label: "moonlight" },
  { id: "star", emoji: "✨", label: "star dust" },
  { id: "flame", emoji: "🔥", label: "dragon's breath" },
  { id: "honey", emoji: "🍯", label: "sweet honey" },
  { id: "book", emoji: "📖", label: "ancient page" },
]

const MESSAGES: Record<string, string[]> = {
  rose: ["you make my heart bloom", "as lovely as a garden in spring"],
  moon: ["you are my moonlight", "even in the dark, you shine"],
  star: ["you are made of stardust", "magical, through and through"],
  flame: ["you set my soul on fire", "warm as the embers of home"],
  honey: ["sweeter than honey", "you are the sweetness in my days"],
  book: ["you are my favourite story", "a tale i never want to end"],
}

function getMessage(id: string, count: number): string {
  const msgs = MESSAGES[id] || ["you are pure magic"]
  return msgs[count % msgs.length]
}

export default function PotionPage() {
  const [dropped, setDropped] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [bubbling, setBubbling] = useState(false)
  const countRef = useRef<Record<string, number>>({})

  const addIngredient = (id: string) => {
    countRef.current[id] = (countRef.current[id] || 0) + 1
    setDropped((prev) => [...prev, id])
    setBubbling(true)
    setTimeout(() => setBubbling(false), 600)

    setMessage(getMessage(id, countRef.current[id] - 1))
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 3000)
  }

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("ingredient", id)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const id = e.dataTransfer.getData("ingredient")
    if (!id) return
    addIngredient(id)
  }

  const handleDragOver = (e: React.DragEvent) => e.preventDefault()

  return (
    <div className="relative min-h-screen bg-[#1a0500] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <div className="text-center mb-8 space-y-2">
        <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-lg">
          a potion of love
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#f5e6d0]">
          brew something magical
        </h1>
        <p className="font-[family-name:var(--font-dancing)] text-amber-200/40 text-base max-w-md">
          drag or tap ingredients into the cauldron to see what love potion you create
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {INGREDIENTS.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onClick={() => addIngredient(item.id)}
            className="flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing px-3 py-2 rounded-lg border border-amber-800/30 bg-[#2a0a00]/40 hover:border-amber-600/50 hover:bg-[#2a0a00]/70 active:bg-amber-900/40 transition-colors select-none"
          >
            <span className="text-3xl">{item.emoji}</span>
            <span className="font-[family-name:var(--font-dancing)] text-amber-300/50 text-xs">{item.label}</span>
          </div>
        ))}
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative w-48 h-48 cursor-pointer"
      >
        <div className={`absolute inset-0 rounded-full border-2 border-amber-800/40 bg-[#2a0a00]/60 transition-all duration-300 ${
          bubbling ? "shadow-[0_0_40px_rgba(251,191,36,0.25)] scale-105" : "shadow-[0_0_20px_rgba(251,191,36,0.1)]"
        }`} />
        <div className="absolute inset-4 rounded-full border border-amber-700/20 bg-[#3a1500]/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl">🫗</span>
        </div>
        {bubbling && (
          <>
            <motion.span
              className="absolute top-2 left-8 text-lg"
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              ✨
            </motion.span>
            <motion.span
              className="absolute top-4 right-8 text-lg"
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              💫
            </motion.span>
            <motion.span
              className="absolute bottom-6 left-12 text-sm"
              initial={{ y: 0, opacity: 1, scale: 0.5 }}
              animate={{ y: -50, opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            >
              ♡
            </motion.span>
          </>
        )}
      </div>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 px-6 py-4 rounded-xl bg-[#2a0a00]/60 border border-amber-800/30 backdrop-blur-sm text-center"
          >
            <p className="font-[family-name:var(--font-dancing)] text-amber-200/80 text-xl">
              &ldquo;{message}&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {dropped.length > 0 && (
        <div className="mt-6 text-center">
          <p className="font-[family-name:var(--font-dancing)] text-amber-300/30 text-sm">
            brewed with: {dropped.map((id) => INGREDIENTS.find((i) => i.id === id)?.emoji).join(" ")}
          </p>
        </div>
      )}

      <a
        href="/second"
        className="mt-8 text-amber-400/40 font-[family-name:var(--font-dancing)] text-base hover:text-amber-300 transition-colors"
      >
        ← back
      </a>
    </div>
  )
}
