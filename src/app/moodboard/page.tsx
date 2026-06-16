"use client"

import { motion } from "framer-motion"

const ITEMS = [
  { emoji: "📖", label: "reading", desc: "losing yourself in a good book" },
  { emoji: "☕", label: "coffee", desc: "warm cups on quiet mornings" },
  { emoji: "🌸", label: "flowers", desc: "daisies, hydrangeas & baby's breath" },
  { emoji: "🎵", label: "music", desc: "songs that speak to your soul" },
  { emoji: "🌙", label: "moon", desc: "stargazing on clear nights" },
  { emoji: "🧸", label: "cozy", desc: "soft blankets and warm hugs" },
  { emoji: "📝", label: "writing", desc: "words that come from the heart" },
  { emoji: "🎬", label: "movies", desc: "stories that make you feel" },
  { emoji: "🌸", label: "spring", desc: "blooming flowers and fresh air" },
  { emoji: "🕯️", label: "candles", desc: "flickering light and vanilla scent" },
  { emoji: "🎨", label: "art", desc: "beauty created by hand" },
  { emoji: "💭", label: "dreams", desc: "hopes as big as the sky" },
]

export default function MoodboardPage() {
  return (
    <div className="relative min-h-screen bg-[#1a0500] px-6 py-12">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-lg">
          things you love
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#f5e6d0]">
          mood board
        </h1>
        <p className="font-[family-name:var(--font-dancing)] text-amber-200/30 text-base max-w-md mx-auto">
          a little collection of all the things that make you, you
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group relative bg-[#2a0a00]/40 border border-amber-800/20 rounded-xl p-6 flex flex-col items-center gap-2 hover:bg-[#3a1500]/50 hover:border-amber-600/40 transition-all cursor-default"
            >
              <span className="text-4xl">{item.emoji}</span>
              <span className="font-[family-name:var(--font-dancing)] text-amber-300/60 text-sm">
                {item.label}
              </span>
              <div className="absolute inset-0 rounded-xl bg-[#1a0500]/95 border border-amber-700/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                <p className="font-[family-name:var(--font-dancing)] text-amber-200/80 text-base">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="font-[family-name:var(--font-dancing)] text-amber-300/20 text-sm">
          — and every one of these is even more beautiful because of you. ♡
        </p>

        <a
          href="/second"
          className="inline-block text-amber-400/40 font-[family-name:var(--font-dancing)] text-base hover:text-amber-300 transition-colors"
        >
          ← back
        </a>
      </div>
    </div>
  )
}
