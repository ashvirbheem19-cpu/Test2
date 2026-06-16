"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoveMeterPage() {
  const [filled, setFilled] = useState(false)
  const [done, setDone] = useState(false)

  const handleClick = () => {
    if (filled) return
    setFilled(true)
    setTimeout(() => setDone(true), 2000)
  }

  return (
    <div className="relative min-h-screen bg-[#1a0500] flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center space-y-8">
        <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-lg">
          a love meter
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#f5e6d0]">
          how much do i love you?
        </h1>

        <div className="relative w-full h-8 rounded-full bg-[#2a0a00]/60 border border-amber-800/30 overflow-hidden cursor-pointer" onClick={handleClick}>
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-300"
            initial={{ width: "0%" }}
            animate={{ width: filled ? "100%" : "0%" }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-[family-name:var(--font-dancing)] text-sm mix-blend-overlay text-white/80">
              {filled ? "100%" : "tap to find out"}
            </span>
          </div>
        </div>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
                className="text-6xl"
              >
                ♡
              </motion.div>
              <p className="font-[family-name:var(--font-dancing)] text-amber-200/80 text-xl md:text-2xl">
                &ldquo;there is no measure for how much i love you.&rdquo;
              </p>
              <p className="font-[family-name:var(--font-dancing)] text-amber-300/50 text-lg">
                it just keeps going up.
              </p>
              <motion.div
                className="flex justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {"✦".repeat(10).split("").map((s, i) => (
                  <motion.span
                    key={i}
                    className="text-amber-400/60 text-xs"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
                  >
                    {s}
                  </motion.span>
                ))}
              </motion.div>
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
