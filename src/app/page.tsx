"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { Button } from "@/components/ui/flow-hover-button"

const WORDS = ["enchanting", "endearing", "loony", "bookworm"]

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
    <div className="relative min-h-screen overflow-hidden bg-[#1a0500]">
      <SpiralAnimation />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pointer-events-none">
        <p className="font-[family-name:var(--font-dancing)] text-amber-300/60 text-lg md:text-xl mb-4">
          for the girl who makes everything magical
        </p>

        <div className="scale-[0.9]">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide text-[#f5e6d0] font-[family-name:var(--font-playfair)]">
            hi love
          </h1>
        </div>

        <p className="font-[family-name:var(--font-dancing)] text-amber-200/40 text-base md:text-lg mt-8 max-w-md text-center leading-relaxed">
          you are my favourite chapter, my golden snitch,
          <br />and the best thing to ever happen to me
        </p>

        <div className="mt-10 pointer-events-auto">
          {!animating && (
            <Button onClick={handleEnter}>ENTER</Button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {animating && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a0500]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="text-4xl md:text-6xl font-bold tracking-wide text-[#f5e6d0] font-[family-name:var(--font-playfair)]">
              {displayedText}
              <span className="animate-pulse text-amber-400">|</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
