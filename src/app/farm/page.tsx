"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Animal {
  id: number
  type: "cow" | "goat"
  name: string
  emoji: string
  x: number
  y: number
  facing: 1 | -1
}

const ANIMALS: Omit<Animal, "x" | "y" | "facing">[] = [
  { id: 1, type: "cow", name: "mochi", emoji: "🐮" },
  { id: 2, type: "cow", name: "toffee", emoji: "🐮" },
  { id: 3, type: "cow", name: "biscuit", emoji: "🐮" },
  { id: 4, type: "goat", name: "pickle", emoji: "🐐" },
  { id: 5, type: "goat", name: "noodle", emoji: "🐐" },
  { id: 6, type: "goat", name: "miso", emoji: "🐐" },
]

const FOOD_EMOJIS = ["🌿", "🍎", "🥕", "🌾"]

const FEED_MESSAGES: Record<string, string[]> = {
  cow: [
    "moo! this is delicious! 🐮",
    "mochi loves the fresh grass!",
    "toffee wags her tail happily!",
    "biscuit gives you a gentle nuzzle!",
    "yummy! more please! 🥕",
    "the cows are so happy! 🐮",
  ],
  goat: [
    "baa! thank you! 🐐",
    "pickle does a little hop!",
    "noodle nibbles happily!",
    "miso bleats with joy!",
    "this is the best snack ever!",
    "the goats are dancing! 🎉",
  ],
}

function randomIn(max: number) {
  return Math.random() * max
}

function randomMessage(type: "cow" | "goat"): string {
  const msgs = FEED_MESSAGES[type]
  return msgs[Math.floor(Math.random() * msgs.length)]
}

export default function FarmPage() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [feeding, setFeeding] = useState(false)
  const [foodParticles, setFoodParticles] = useState<{ id: number; x: number; y: number; emoji: string }[]>([])
  const [messages, setMessages] = useState<{ id: number; text: string; x: number; y: number }[]>([])
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([])

  const pastureW = 100
  const pastureH = 100

  useEffect(() => {
    setAnimals(
      ANIMALS.map((a) => ({
        ...a,
        x: 10 + randomIn(80),
        y: 10 + randomIn(70),
        facing: Math.random() > 0.5 ? 1 : -1,
      }))
    )
  }, [])

  // Animals wander
  useEffect(() => {
    if (feeding) return
    const id = setInterval(() => {
      setAnimals((prev) =>
        prev.map((a) => ({
          ...a,
          x: Math.max(5, Math.min(95, a.x + (Math.random() - 0.5) * 16)),
          y: Math.max(5, Math.min(85, a.y + (Math.random() - 0.5) * 12)),
          facing: (Math.random() > 0.1 ? 1 : -1) as 1 | -1,
        }))
      )
    }, 1500)
    return () => clearInterval(id)
  }, [feeding])

  // Cleanup old messages and hearts
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

    // Scatter food particles
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 30 + randomIn(40),
      y: 10 + randomIn(30),
      emoji: FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)],
    }))
    setFoodParticles(particles)

    // Animals react after a moment
    setTimeout(() => {
      setAnimals((prev) =>
        prev.map((a) => ({
          ...a,
          x: 20 + randomIn(60),
          y: 20 + randomIn(50),
          facing: (Math.random() > 0.5 ? 1 : -1) as 1 | -1,
        }))
      )

      // Show random messages for a couple animals
      const animalTypes = ["cow", "goat"] as const
      const msgs = Array.from({ length: 2 }, (_, i) => ({
        id: i,
        text: randomMessage(animalTypes[i % 2]),
        x: 25 + randomIn(30),
        y: 25 + randomIn(20),
      }))
      setMessages(msgs)

      // Hearts everywhere
      const hts = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: 15 + randomIn(70),
        y: 15 + randomIn(60),
      }))
      setHearts(hts)

      setFoodParticles([])
    }, 500)

    setTimeout(() => setFeeding(false), 2500)
  }, [feeding])

  return (
    <div className="relative min-h-screen bg-[#87CEEB] overflow-hidden">
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

      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#B0E0F6] to-[#D4F0F0]" />

      {/* Clouds */}
      <div className="absolute top-8 left-[10%] text-4xl opacity-60" style={{ animation: "float 4s ease-in-out infinite" }}>☁️</div>
      <div className="absolute top-12 left-[40%] text-3xl opacity-40" style={{ animation: "float 5s ease-in-out infinite 1s" }}>☁️</div>
      <div className="absolute top-6 left-[70%] text-5xl opacity-50" style={{ animation: "float 6s ease-in-out infinite 0.5s" }}>☁️</div>

      {/* Sun */}
      <div className="absolute top-6 right-12 text-5xl" style={{ animation: "sparkle 3s ease-in-out infinite" }}>☀️</div>

      {/* Hills */}
      <div className="absolute bottom-0 left-0 right-0 h-[70%]">
        <div className="absolute bottom-0 left-[-10%] w-[60%] h-[80%] bg-gradient-to-t from-[#4a8c3f] via-[#5da04f] to-[#6db85c] rounded-t-full opacity-80" />
        <div className="absolute bottom-0 right-[-10%] w-[55%] h-[70%] bg-gradient-to-t from-[#3d7a34] via-[#4f9443] to-[#5da84f] rounded-t-full opacity-70" />
        <div className="absolute bottom-0 left-[20%] w-[65%] h-[60%] bg-gradient-to-t from-[#5a9e4a] via-[#6db85c] to-[#7ecc6a] rounded-t-full opacity-60" />

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#3d7a34] via-[#5a9e4a] to-[#7ecc6a]" />
      </div>

      {/* Fence */}
      <div className="absolute bottom-[40%] left-0 right-0 h-8 flex items-end">
        <div className="w-full flex justify-around">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-1.5 h-6 bg-[#8B6914] rounded-t-full" />
              <div className="w-4 h-1 bg-[#A0782C] rounded" />
              <div className="w-1.5 h-6 bg-[#8B6914]" />
            </div>
          ))}
        </div>
      </div>

      {/* Pasture area */}
      <div className="absolute bottom-[8%] left-[10%] right-[10%] h-[45%]">
        {/* Animals */}
        <div className="relative w-full h-full">
          {animals.map((animal) => (
            <motion.div
              key={animal.id}
              className="absolute flex flex-col items-center gap-1"
              animate={{ x: `${animal.x}%`, y: `${animal.y}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 12, mass: 0.5 }}
              style={{ x: `${animal.x}%`, y: `${animal.y}%` }}
            >
              {/* Highland cow mane for cows */}
              {animal.type === "cow" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#C4843E] opacity-60"
                      style={{ marginLeft: i % 2 === 0 ? "-2px" : "0", marginTop: i % 2 === 0 ? "0" : "2px" }}
                    />
                  ))}
                </div>
              )}
              <motion.span
                className="text-5xl md:text-6xl select-none"
                animate={{ scaleX: animal.facing }}
                transition={{ duration: 0.3 }}
              >
                {animal.emoji}
              </motion.span>
              <span className="font-[family-name:var(--font-dancing)] text-[#3d2a1a]/60 text-xs md:text-sm bg-white/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
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
          className="absolute text-2xl pointer-events-none z-20"
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
            className="absolute z-30 font-[family-name:var(--font-dancing)] text-[#3d2a1a] bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl text-sm md:text-base shadow-lg border border-amber-200/50"
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
          className="absolute z-20 text-xl pointer-events-none"
          initial={{ opacity: 1, scale: 0, y: 0 }}
          animate={{ opacity: 0, scale: 1.5, y: -60 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
        >
          <span style={{ animation: `sparkle 1s ease-in-out ${h.id * 0.2}s infinite` }}>❤️</span>
        </motion.div>
      ))}

      {/* Feed button */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
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
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 text-center">
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
        className="absolute top-4 left-4 z-40 text-white/50 font-[family-name:var(--font-dancing)] text-base hover:text-white/80 transition-colors"
      >
        ← back
      </a>
    </div>
  )
}
