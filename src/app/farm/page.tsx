"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { Canvas } from "@react-three/fiber"

const FarmScene = dynamic(() => import("@/components/3d/FarmScene"), { ssr: false })

interface Animal {
  id: number
  type: "cow" | "goat"
  name: string
  emoji: string
  x: number
  y: number
  facing: 1 | -1
}

function initAnimals(): Animal[] {
  return [
    { id: 1, type: "cow", name: "Stout", emoji: "🐮", x: 15, y: 50, facing: 1 },
    { id: 2, type: "cow", name: "Henry", emoji: "🐮", x: 75, y: 60, facing: -1 },
    { id: 3, type: "goat", name: "Vincent van Goat", emoji: "🐐", x: 40, y: 45, facing: 1 },
    { id: 4, type: "goat", name: "George", emoji: "🐐", x: 60, y: 70, facing: -1 },
  ]
}

const FOOD_EMOJIS = ["🌿", "🍎", "🥕", "🌾"]

const FEED_MESSAGES: string[] = [
  "moo! this is delicious! 🐮",
  "baa! thank you! 🐐",
  "so yummy! more please! 🥕",
  "the animals are so happy! ♡",
  "this is the best snack ever!",
  "they love the fresh grass! 🌿",
  "everyone is gathering to eat!",
  "what a lovely farm feast!",
]

function randomMessage(): string {
  return FEED_MESSAGES[Math.floor(Math.random() * FEED_MESSAGES.length)]
}

export default function FarmPage() {
  const [animals, setAnimals] = useState<Animal[]>(initAnimals)
  const [feeding, setFeeding] = useState(false)
  const [foodParticles, setFoodParticles] = useState<{ id: number; x: number; y: number; emoji: string }[]>([])
  const [messages, setMessages] = useState<{ id: number; text: string; x: number; y: number }[]>([])
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([])

  useEffect(() => {
    if (feeding) return
    const id = setInterval(() => {
      setAnimals((prev) =>
        prev.map((a) => ({
          ...a,
          x: Math.max(2, Math.min(98, a.x + (Math.random() - 0.5) * 20)),
          y: Math.max(38, Math.min(92, a.y + (Math.random() - 0.5) * 14)),
          facing: a.x + (Math.random() - 0.5) * 20 > a.x ? 1 : -1,
        }))
      )
    }, 700)
    return () => clearInterval(id)
  }, [feeding])

  useEffect(() => {
    if (messages.length === 0 && hearts.length === 0) return
    const id = setTimeout(() => {
      setMessages([])
      setHearts([])
    }, 3000)
    return () => clearTimeout(id)
  }, [messages.length, hearts.length])

  const handleFeed = useCallback(() => {
    if (feeding) return
    setFeeding(true)

    const randomIn = (n: number) => Math.random() * n
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 35 + randomIn(30),
      y: 45 + randomIn(25),
      emoji: FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)],
    }))
    setFoodParticles(particles)

    setTimeout(() => {
      setAnimals((prev) =>
        prev.map((a, i) => ({
          ...a,
          x: 38 + i * 8 + randomIn(4),
          y: 50 + randomIn(12),
          facing: 1,
        }))
      )

      const msgs = Array.from({ length: 2 }, (_, i) => ({
        id: i,
        text: randomMessage(),
        x: 30 + randomIn(40),
        y: 35 + randomIn(20),
      }))
      setMessages(msgs)

      const hts = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: 30 + randomIn(40),
        y: 35 + randomIn(30),
      }))
      setHearts(hts)

      setFoodParticles([])
    }, 500)

    setTimeout(() => setFeeding(false), 2500)
  }, [feeding])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#87CEEB] via-[#B0E0F6] to-[#D4F0F0]">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
      `}</style>

      {/* 3D Scene */}
      <div className="absolute inset-0 bottom-[10%] z-0">
        <Suspense fallback={null}>
          <Canvas
            shadows
            camera={{ position: [0, 9, 10], fov: 45, near: 0.1, far: 30 }}
            style={{ width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <FarmScene animals={animals} />
          </Canvas>
        </Suspense>
      </div>

      {/* Clouds */}
      <div className="absolute top-8 left-[10%] text-4xl opacity-60 pointer-events-none z-10" style={{ animation: "float 4s ease-in-out infinite" }}>☁️</div>
      <div className="absolute top-12 left-[40%] text-3xl opacity-40 pointer-events-none z-10" style={{ animation: "float 5s ease-in-out infinite 1s" }}>☁️</div>
      <div className="absolute top-6 left-[70%] text-5xl opacity-50 pointer-events-none z-10" style={{ animation: "float 6s ease-in-out infinite 0.5s" }}>☁️</div>
      <div className="absolute top-6 right-12 text-5xl pointer-events-none z-10" style={{ animation: "sparkle 3s ease-in-out infinite" }}>☀️</div>

      {/* Animal name labels */}
      <div className="absolute bottom-0 left-0 right-0 h-[70%] pointer-events-none z-20">
        <div className="relative w-full h-full">
          {animals.map((animal) => (
            <motion.div
              key={animal.id}
              className="absolute flex flex-col items-center"
              animate={{ left: `${animal.x}%`, top: `${animal.y - 6}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <span className="font-[family-name:var(--font-dancing)] text-[#3d2a1a]/70 text-xs md:text-sm bg-white/60 px-2 py-0.5 rounded-full backdrop-blur-sm whitespace-nowrap">
                {animal.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Food particles */}
      {foodParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-2xl pointer-events-none z-30"
          initial={{ opacity: 1, y: 0, x: `${p.x}%` }}
          animate={{ opacity: 0, y: -120, x: `${p.x + (Math.random() - 0.5) * 10}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ top: `${p.y}%`, left: `${p.x}%` }}
        >
          {p.emoji}
        </motion.div>
      ))}

      {/* Messages */}
      <AnimatePresence>
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -40 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute z-40 font-[family-name:var(--font-dancing)] text-[#3d2a1a] bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl text-sm md:text-base shadow-lg border border-amber-200/50"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            {m.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute z-30 text-xl pointer-events-none"
          initial={{ opacity: 1, scale: 0, y: 0 }}
          animate={{ opacity: 0, scale: 1.5, y: -60 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
        >
          <span style={{ animation: `sparkle 1s ease-in-out ${h.id * 0.2}s infinite` }}>❤️</span>
        </motion.div>
      ))}

      {/* Feed button */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
        <motion.button
          onClick={handleFeed}
          disabled={feeding}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-[#3d2a1a] font-[family-name:var(--font-dancing)] text-lg font-bold shadow-lg hover:shadow-xl hover:from-amber-400 hover:to-amber-300 transition-all disabled:opacity-50"
        >
          {feeding ? "feeding..." : "🌿 feed the animals"}
        </motion.button>
      </div>

      {/* Header */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 text-center">
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-white/90 drop-shadow-lg">
          our farm ♡
        </h1>
        <p className="font-[family-name:var(--font-dancing)] text-white/60 text-sm">
          {feeding ? "the animals are eating!" : "tap the button to feed them"}
        </p>
      </div>

      {/* Back */}
      <a
        href="/second"
        className="absolute top-4 left-4 z-50 text-white/50 font-[family-name:var(--font-dancing)] text-base hover:text-white/80 transition-colors"
      >
        ← back
      </a>
    </div>
  )
}
