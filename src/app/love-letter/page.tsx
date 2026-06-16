"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FallingPetals } from "@/components/ui/falling-petals"

export default function LoveLetterPage() {
  const [password, setPassword] = useState("")
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "100") {
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (unlocked) {
    return (
      <div className="relative min-h-screen bg-[#1a0500] flex items-center justify-center px-6">
        <FallingPetals />
        <div className="max-w-xl text-center space-y-6 animate-in fade-in duration-1000">
          <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-lg">
            unlocked just for you
          </p>
          <div className="w-16 h-0.5 bg-amber-500/30 mx-auto" />
          <div className="relative bg-[#2a0a00]/60 border border-amber-800/30 rounded-xl p-8 md:p-12 backdrop-blur-sm">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl">📜</div>
            <div className="space-y-4 text-[#d4c5a9]/80 font-[family-name:var(--font-dancing)] text-xl md:text-2xl leading-relaxed pt-4">
              <p className="text-amber-300/80 font-[family-name:var(--font-playfair)] text-2xl md:text-3xl">
                my dearest,
              </p>
              <p>
                from the moment i met you, the world felt a little brighter,
                a little warmer, a little more like home.
              </p>
              <p>
                you are the chapter i never want to end, the spell i never want to break,
                the adventure i want to keep living every single day.
              </p>
              <p>
                in every universe, in every timeline, in every story —
                i would choose you. always.
              </p>
              <p className="text-amber-300/60 text-lg pt-4">
                yours, forever and always. ♡
              </p>
            </div>
          </div>
          <a
            href="/second"
            className="inline-block mt-4 text-amber-400/60 font-[family-name:var(--font-dancing)] text-lg hover:text-amber-300 transition-colors"
          >
            ← back
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#1a0500] flex items-center justify-center px-6">
      <FallingPetals />
      <div className="max-w-md w-full text-center space-y-6">
        <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-lg">
          a locked letter for you
        </p>
        <div className="text-5xl mb-4">🔒</div>
        <p className="text-[#d4c5a9]/60 font-[family-name:var(--font-dancing)] text-lg">
          enter the secret code to unlock
        </p>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          key={error ? "shake" : "still"}
          animate={error ? { x: [0, -6, 6, -6, 6, 0] } : { x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false) }}
            placeholder="••••"
            className={`w-32 mx-auto block text-center bg-transparent border-b-2 text-2xl font-[family-name:var(--font-playfair)] text-[#f5e6d0] outline-none transition-colors ${
              error ? "border-red-400" : "border-amber-700/50 focus:border-amber-400"
            }`}
            autoFocus
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400/70 font-[family-name:var(--font-dancing)] text-sm"
            >
              not quite. try again, love.
            </motion.p>
          )}
          <button
            type="submit"
            className="px-6 py-2 rounded-md border border-amber-700/50 text-amber-300/80 font-[family-name:var(--font-dancing)] text-lg hover:bg-amber-900/30 transition-colors"
          >
            unlock
          </button>
        </motion.form>
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
