"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function BottlePage() {
  const [message, setMessage] = useState("")
  const [stage, setStage] = useState<"form" | "thrown" | "floating" | "gone">("form")

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setStage("thrown")
    setTimeout(() => setStage("floating"), 800)
    setTimeout(() => setStage("gone"), 5000)
  }

  const reset = () => {
    setMessage("")
    setStage("form")
  }

  return (
    <div className="relative min-h-screen bg-[#0a1628] flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      <style jsx>{`
        @keyframes wave1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave2 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33%); }
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes floatAway {
          0% { transform: translateX(0) translateY(0) rotate(0deg); }
          30% { transform: translateX(30px) translateY(-10px) rotate(3deg); }
          60% { transform: translateX(60px) translateY(-20px) rotate(-2deg); }
          100% { transform: translateX(200px) translateY(-60px) rotate(5deg); opacity: 0; }
        }
        @keyframes splash {
          0% { opacity: 0; transform: scale(0); }
          30% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.5) translateY(-20px); }
        }
      `}</style>

      <div className="absolute inset-0">
        {/* Night sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1f33] to-[#0d2a4a]" />

        {/* Ocean */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2">
          <div className="absolute inset-0 bg-gradient-to-t from-[#061a2e] via-[#0a2647] to-transparent" />

          {/* Wave layers */}
          <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
            <div className="absolute inset-0" style={{ animation: "wave1 4s linear infinite" }}>
              <svg viewBox="0 0 1200 120" className="w-[200%] h-full" preserveAspectRatio="none">
                <path d="M0,0 C200,60 400,0 600,60 C800,0 1000,60 1200,0 C1400,60 1600,0 1800,60 C2000,0 2200,60 2400,0 L2400,120 L0,120 Z" fill="rgba(6, 26, 46, 0.6)" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-2 left-0 right-0 h-20 overflow-hidden">
            <div className="absolute inset-0" style={{ animation: "wave2 3s linear infinite" }}>
              <svg viewBox="0 0 1200 120" className="w-[150%] h-full" preserveAspectRatio="none">
                <path d="M0,40 C200,10 400,40 600,20 C800,40 1000,10 1200,40 C1400,10 1600,40 1800,20 L1800,120 L0,120 Z" fill="rgba(8, 36, 64, 0.5)" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 right-0 h-16 overflow-hidden">
            <div className="absolute inset-0" style={{ animation: "wave1 5s linear infinite" }}>
              <svg viewBox="0 0 1200 120" className="w-[200%] h-full" preserveAspectRatio="none">
                <path d="M0,60 C200,30 400,60 600,40 C800,60 1000,30 1200,60 C1400,30 1600,60 1800,40 C2000,60 2200,30 2400,60 L2400,120 L0,120 Z" fill="rgba(10, 46, 80, 0.4)" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        <p className="font-[family-name:var(--font-dancing)] text-cyan-300/40 text-lg">
          message in a bottle
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#e8f4f8]">
          send a wish into the sea
        </h1>

        <AnimatePresence mode="wait">
          {stage === "form" && (
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
                  throw it into the sea
                </button>
              </form>
            </motion.div>
          )}

          {(stage === "thrown" || stage === "floating" || stage === "gone") && (
            <motion.div
              key="bottle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Bottle animation */}
              <div className="relative h-48 flex items-center justify-center">
                {/* Splash */}
                {stage === "thrown" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1, 1.5] }}
                    transition={{ duration: 0.6 }}
                    className="absolute bottom-4 text-4xl"
                  >
                    💦
                  </motion.div>
                )}

                {/* Bottle */}
                <motion.div
                  className="relative select-none"
                  initial={{ y: -100, rotate: -20, opacity: 0 }}
                  animate={
                    stage === "thrown"
                      ? { y: [0], rotate: [0], opacity: 1 }
                      : stage === "floating"
                      ? { y: [0, -5, 0, -5, 0], opacity: 1 }
                      : { y: [-5, -80], x: [0, 120], rotate: [0, 8], opacity: [1, 0] }
                  }
                  transition={
                    stage === "thrown"
                      ? { duration: 0.5, ease: "easeOut" }
                      : stage === "floating"
                      ? { duration: 3, ease: "easeInOut", repeat: Infinity }
                      : { duration: 2, ease: "easeIn" }
                  }
                >
                  {/* Classic bottle */}
                  <svg width="80" height="160" viewBox="0 0 80 160" className="drop-shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                    {/* Bottle body */}
                    <defs>
                      <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(150, 200, 220, 0.3)" />
                        <stop offset="30%" stopColor="rgba(200, 230, 240, 0.5)" />
                        <stop offset="70%" stopColor="rgba(180, 215, 230, 0.4)" />
                        <stop offset="100%" stopColor="rgba(130, 180, 200, 0.25)" />
                      </linearGradient>
                    </defs>
                    {/* Neck */}
                    <rect x="28" y="20" width="24" height="40" rx="3" fill="url(#glass)" stroke="rgba(150, 200, 220, 0.4)" strokeWidth="1" />
                    {/* Shoulder */}
                    <path d="M28 60 L12 80 Q10 85 10 90 L10 145 Q10 152 15 155 L65 155 Q70 152 70 145 L70 90 Q70 85 68 80 L52 60" fill="url(#glass)" stroke="rgba(150, 200, 220, 0.4)" strokeWidth="1" />
                    {/* Cork */}
                    <rect x="32" y="8" width="16" height="14" rx="2" fill="#8B6B3D" />
                    <rect x="32" y="8" width="16" height="14" rx="2" fill="rgba(139, 107, 61, 0.5)" />
                    {/* Cork top texture */}
                    <line x1="35" y1="10" x2="35" y2="18" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
                    <line x1="40" y1="10" x2="40" y2="18" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
                    <line x1="45" y1="10" x2="45" y2="18" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
                    {/* Glass shine */}
                    <rect x="16" y="65" width="4" height="40" rx="2" fill="rgba(255,255,255,0.15)" />
                    <rect x="18" y="70" width="2" height="25" rx="1" fill="rgba(255,255,255,0.1)" />
                    {/* Rolled paper inside */}
                    <rect x="24" y="75" width="28" height="55" rx="2" fill="rgba(245, 230, 210, 0.4)" />
                    <line x1="30" y1="85" x2="46" y2="85" stroke="rgba(80, 60, 40, 0.3)" strokeWidth="1" />
                    <line x1="30" y1="95" x2="46" y2="95" stroke="rgba(80, 60, 40, 0.3)" strokeWidth="1" />
                    <line x1="30" y1="105" x2="44" y2="105" stroke="rgba(80, 60, 40, 0.3)" strokeWidth="1" />
                    {/* Rim */}
                    <rect x="27" y="18" width="26" height="4" rx="2" fill="rgba(150, 200, 220, 0.5)" />
                    {/* String around neck */}
                    <path d="M28 38 Q40 42 52 38" stroke="rgba(139, 107, 61, 0.6)" strokeWidth="1.5" fill="none" />
                  </svg>
                </motion.div>
              </div>

              {stage === "floating" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-[family-name:var(--font-dancing)] text-cyan-300/50 text-lg"
                >
                  it&apos;s drifting away on the waves...
                </motion.p>
              )}

              {stage === "gone" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <p className="font-[family-name:var(--font-dancing)] text-cyan-300/60 text-xl">
                    carried away by the tide.
                  </p>
                  <p className="font-[family-name:var(--font-dancing)] text-cyan-300/30 text-base">
                    out into the deep blue, never to be found again.
                  </p>
                  <button
                    onClick={reset}
                    className="px-6 py-2 rounded-md border border-cyan-700/40 text-cyan-300/60 font-[family-name:var(--font-dancing)] text-base hover:bg-cyan-900/20 transition-colors"
                  >
                    send another
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {stage === "form" && (
          <a
            href="/second"
            className="inline-block text-cyan-400/30 font-[family-name:var(--font-dancing)] text-base hover:text-cyan-300 transition-colors"
          >
            ← back
          </a>
        )}
      </div>
    </div>
  )
}
