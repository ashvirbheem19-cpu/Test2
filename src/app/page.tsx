"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { Button } from "@/components/ui/flow-hover-button"

const WORDS = ["short", "cute", "bookworm", "troublesome"]

export default function Home() {
  const router = useRouter()
  const [animating, setAnimating] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const wordIndexRef = useRef(0)
  const charIndexRef = useRef(0)

  useEffect(() => {
    if (!animating) return

    const typeSpeed = 120
    const pauseAfterWord = 500
    let timeout: ReturnType<typeof setTimeout>

    const typeNextChar = () => {
      const word = WORDS[wordIndexRef.current]
      if (charIndexRef.current < word.length) {
        setDisplayedText(word.slice(0, charIndexRef.current + 1))
        charIndexRef.current++
        timeout = setTimeout(typeNextChar, typeSpeed)
      } else {
        timeout = setTimeout(() => {
          wordIndexRef.current++
          if (wordIndexRef.current < WORDS.length) {
            charIndexRef.current = 0
            setDisplayedText("")
            timeout = setTimeout(typeNextChar, typeSpeed)
          } else {
            router.push("/second")
          }
        }, pauseAfterWord)
      }
    }

    timeout = setTimeout(typeNextChar, typeSpeed)

    return () => clearTimeout(timeout)
  }, [animating, router])

  const handleEnter = useCallback(() => {
    setAnimating(true)
  }, [])

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
            <span className="text-4xl md:text-6xl font-bold tracking-wide text-white font-[family-name:var(--font-playfair)]">
              {displayedText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
