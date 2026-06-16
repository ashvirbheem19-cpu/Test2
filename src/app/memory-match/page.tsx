"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const ALL_ICONS = ["🦉", "⚡", "🔮", "🌲", "📚", "✨", "🏰", "🎮"] as const

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildCards() {
  const pairs = shuffle(ALL_ICONS).slice(0, 8)
  return shuffle([...pairs, ...pairs]).map((icon, i) => ({ id: i, icon, flipped: false, matched: false }))
}

const FIREWORKS = ["✦", "❤️", "✨", "★", "♡"]

export default function MemoryMatchPage() {
  const [cards, setCards] = useState(buildCards)
  const [flipped, setFlipped] = useState<number[]>([])
  const [locked, setLocked] = useState(false)
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number; icon: string }[]>([])
  const idRef = useRef(0)

  const matched = cards.filter((c) => c.matched).length

  useEffect(() => {
    if (matched === cards.length && cards.length > 0) {
      setWon(true)
      const interval = setInterval(() => {
        const id = idRef.current++
        setFireworks((prev) => [
          ...prev,
          { id, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, icon: FIREWORKS[Math.floor(Math.random() * FIREWORKS.length)] },
        ])
        setTimeout(() => setFireworks((prev) => prev.filter((f) => f.id !== id)), 1500)
      }, 200)
      return () => clearInterval(interval)
    }
  }, [matched, cards.length])

  const handleFlip = (id: number) => {
    if (locked || won) return
    const card = cards.find((c) => c.id === id)
    if (!card || card.flipped || card.matched) return

    const next = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c))
    setCards(next)
    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1)
      setLocked(true)
      const [a, b] = newFlipped.map((fid) => next.find((c) => c.id === fid)!)
      if (a.icon === b.icon) {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.icon === a.icon ? { ...c, matched: true } : c)))
          setFlipped([])
          setLocked(false)
        }, 500)
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (newFlipped.includes(c.id) ? { ...c, flipped: false } : c)))
          setFlipped([])
          setLocked(false)
        }, 800)
      }
    }
  }

  const reset = () => {
    setCards(buildCards())
    setFlipped([])
    setLocked(false)
    setMoves(0)
    setWon(false)
    setFireworks([])
  }

  return (
    <div className="relative min-h-screen bg-[#1a0500] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-8 space-y-2">
        <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-lg">
          match your favourites
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#f5e6d0]">
          memory match ♡
        </h1>
        <p className="font-[family-name:var(--font-dancing)] text-amber-200/40 text-base">
          moves: {moves}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-sm w-full">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
              card.matched
                ? "bg-amber-900/30 border border-amber-600/30 opacity-70 shadow-[0_0_12px_rgba(251,191,36,0.15)]"
                : card.flipped
                  ? "bg-[#2a0a00] border border-amber-700/50 shadow-[0_0_10px_rgba(251,191,36,0.1)]"
                  : "bg-[#2a0a00]/60 border border-amber-900/30 hover:border-amber-700/50 hover:bg-[#2a0a00]/80"
            }`}
          >
            {card.flipped || card.matched ? card.icon : "?"}
          </button>
        ))}
      </div>

      {won && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 text-center space-y-4"
        >
          <p className="font-[family-name:var(--font-playfair)] text-2xl text-amber-300">
            you did it! ♡
          </p>
          <p className="font-[family-name:var(--font-dancing)] text-amber-200/50 text-lg">
            {moves <= 10 ? "unbelievably perfect. just like you." : moves <= 14 ? "clever and wonderful, as always." : "you got there in the end, love."}
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={reset} className="px-5 py-2 rounded-md border border-amber-700/50 text-amber-300/70 font-[family-name:var(--font-dancing)] text-lg hover:bg-amber-900/30 transition-colors cursor-pointer">
              play again
            </button>
            <a href="/second" className="px-5 py-2 rounded-md border border-amber-700/50 text-amber-300/70 font-[family-name:var(--font-dancing)] text-lg hover:bg-amber-900/30 transition-colors">
              back ♡
            </a>
          </div>
        </motion.div>
      )}

      {fireworks.map((f) => (
        <motion.div
          key={f.id}
          className="fixed pointer-events-none z-50 text-2xl"
          initial={{ x: f.x, y: f.y, opacity: 1, scale: 0.3 }}
          animate={{ opacity: 0, scale: 1.5, y: f.y - 100 - Math.random() * 100 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {f.icon}
        </motion.div>
      ))}

    </div>
  )
}
