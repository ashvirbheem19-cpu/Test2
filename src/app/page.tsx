"use client"

import { motion } from "framer-motion"
import { SpiralAnimation } from "@/components/ui/spiral-animation"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0000]">
      <SpiralAnimation />

      <div className="relative z-10 flex items-center justify-center min-h-screen pointer-events-none">
        <h1 className="flex items-center gap-4 scale-[0.9] text-6xl md:text-8xl lg:text-9xl font-bold tracking-wide text-white font-[family-name:var(--font-playfair)]">
          ADRIANA
          <span className="relative inline-block w-[1em] h-[1em]">
            <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full" fill="none" stroke="#8b0000" strokeWidth="1.5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full" fill="#8b0000">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          </span>
        </h1>
      </div>
    </div>
  )
}
