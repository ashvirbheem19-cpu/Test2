"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { Button } from "@/components/ui/flow-hover-button"

const WORDS = ["short", "cute", "bookworm", "always cold", "troublesome"]

export default function Home() {
  const router = useRouter()
  const [animating, setAnimating] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)

  const handleEnter = useCallback(() => {
    setAnimating(true)
    let i = 0
    const interval = setInterval(() => {
      i++
      if (i < WORDS.length) {
        setWordIndex(i)
      } else {
        clearInterval(interval)
        router.push("/second")
      }
    }, 600)
  }, [router])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0000]">
      <SpiralAnimation />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pointer-events-none">
        <div className="scale-[0.9]">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wide text-white font-[family-name:var(--font-playfair)]">
            ADRIANA
          </h1>
        </div>

        <div className="mt-12 pointer-events-auto">
          {!animating && (
            <Button onClick={handleEnter}>ENTER</Button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {animating && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="text-4xl md:text-6xl font-bold tracking-wide text-white font-[family-name:var(--font-playfair)]"
            >
              {WORDS[wordIndex]}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
