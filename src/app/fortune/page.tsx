"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const FORTUNES = [
  "you are the most beautiful thing in this universe.",
  "someone is thinking of you right now — and smiling.",
  "your heart is made of gold, and it shows.",
  "today is a good day to be loved by you.",
  "you are someone's favourite person. always.",
  "the world is brighter because you are in it.",
  "you deserve all the love that comes your way.",
  "your smile could light up the darkest room.",
  "you are loved more than you will ever know.",
  "every day with you feels like a warm hug.",
  "you are the best thing that has ever happened to someone.",
  "keep being you — that is your superpower.",
  "you are a masterpiece, inside and out.",
  "the stars wrote a beautiful story, and you are in it.",
  "you are proof that magic exists.",
  "someone is counting their blessings, and you are number one.",
  "your presence is a gift to everyone who knows you.",
  "you are stronger, braver, and more loved than you think.",
  "today, tomorrow, always — you are enough.",
  "the universe conspired to make you exactly as you are.",
  "you are the favourite chapter in someone's story.",
  "there is no one else in the world quite like you.",
  "you are the answer to someone's prayer.",
  "happiness looks beautiful on you.",
  "you are a garden of grace, blooming in your own time.",
]

function getTodaysFortune(): string {
  const start = new Date("2021-04-06")
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dayDiff = Math.floor((today.getTime() - start.getTime()) / 86400000)
  return FORTUNES[Math.abs(dayDiff) % FORTUNES.length]
}

export default function FortunePage() {
  const [cracked, setCracked] = useState(false)
  const [fortune, setFortune] = useState("")

  useEffect(() => {
    setFortune(getTodaysFortune())
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1a0500] to-[#2a0a00] flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center space-y-8">
        <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-lg">
          daily fortune
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#f5e6d0]">
          crack open your fortune
        </h1>

        <AnimatePresence mode="wait">
          {!cracked ? (
            <motion.div
              key="cookie"
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div
                onClick={() => setCracked(true)}
                className="relative inline-block cursor-pointer select-none"
              >
                <div className="text-8xl">🥟</div>
                <p className="font-[family-name:var(--font-dancing)] text-amber-300/30 text-sm mt-4">
                  tap the cookie
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="fortune"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex justify-center items-center gap-2 h-24">
                <motion.div
                  initial={{ x: 0, rotate: 0 }}
                  animate={{ x: -40, rotate: -30, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-6xl"
                >
                  🥟
                </motion.div>
                <motion.div
                  initial={{ x: 0, rotate: 0, scale: 1 }}
                  animate={{ x: 40, rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-6xl"
                >
                  🥟
                </motion.div>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                className="text-5xl"
              >
                🥠
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-[#2a0a00]/60 border border-amber-800/30 rounded-xl p-8 backdrop-blur-sm"
              >
                <p className="font-[family-name:var(--font-dancing)] text-amber-200/80 text-xl md:text-2xl leading-relaxed">
                  &ldquo;{fortune}&rdquo;
                </p>
              </motion.div>

              <p className="font-[family-name:var(--font-dancing)] text-amber-300/30 text-sm">
                come back tomorrow for a new fortune ✦
              </p>
              <button
                onClick={() => setCracked(false)}
                className="px-6 py-2 rounded-md border border-amber-700/40 text-amber-300/60 font-[family-name:var(--font-dancing)] text-base hover:bg-amber-900/20 transition-colors"
              >
                crack another
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href="/second"
          className="inline-block mt-4 text-amber-400/40 font-[family-name:var(--font-dancing)] text-base hover:text-amber-300 transition-colors"
        >
          ← back
        </a>
      </div>
    </div>
  )
}
