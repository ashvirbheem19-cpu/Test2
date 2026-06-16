"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function BottlePage() {
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)
  const [floating, setFloating] = useState(false)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setFloating(true)
    setTimeout(() => {
      setSent(true)
      setFloating(false)
    }, 2500)
  }

  const reset = () => {
    setMessage("")
    setSent(false)
    setFloating(false)
  }

  return (
    <div className="relative min-h-screen bg-[#0a1628] flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d2a4a]/40 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent" />
      </div>

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        <p className="font-[family-name:var(--font-dancing)] text-cyan-300/40 text-lg">
          message in a bottle
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#e8f4f8]">
          send a wish into the sea
        </h1>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div key="form" exit={{ opacity: 0 }} className="space-y-6">
              <form onSubmit={handleSend} className="space-y-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="write a message..."
                  rows={4}
                  className="w-full bg-[#0d1f33]/60 border border-cyan-800/30 rounded-xl p-4 text-[#c8dce8] font-[family-name:var(--font-dancing)] text-lg outline-none focus:border-cyan-600/50 resize-none placeholder-cyan-700/40"
                />
                <button
                  type="submit"
                  className="px-8 py-3 rounded-md border border-cyan-700/50 text-cyan-300/80 font-[family-name:var(--font-dancing)] text-lg hover:bg-cyan-900/30 transition-colors"
                >
                  send it out to sea
                </button>
              </form>

              <motion.div
                animate={floating ? { y: -200, opacity: 0, rotate: [0, 10, -10, 5, 0] } : {}}
                transition={{ duration: 2.5, ease: "easeIn" }}
                className="text-7xl select-none"
              >
                🧴
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-6xl">🌊</div>
              <p className="font-[family-name:var(--font-dancing)] text-cyan-300/60 text-xl">
                your message is drifting across the ocean...
              </p>
              <p className="font-[family-name:var(--font-dancing)] text-cyan-300/30 text-base max-w-sm mx-auto">
                maybe one day it will wash up on a shore far away,
                carrying your words with it.
              </p>
              <button
                onClick={reset}
                className="px-6 py-2 rounded-md border border-cyan-700/40 text-cyan-300/60 font-[family-name:var(--font-dancing)] text-base hover:bg-cyan-900/20 transition-colors"
              >
                send another
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href="/second"
          className="inline-block mt-4 text-cyan-400/30 font-[family-name:var(--font-dancing)] text-base hover:text-cyan-300 transition-colors"
        >
          ← back
        </a>
      </div>
    </div>
  )
}
