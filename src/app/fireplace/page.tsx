"use client"

import { useState, useRef, useEffect } from "react"

function useCrackle() {
  const ctxRef = useRef<AudioContext | null>(null)
  const playingRef = useRef(false)

  const start = () => {
    if (playingRef.current) return
    const ctx = new AudioContext()
    ctxRef.current = ctx
    playingRef.current = true

    const crackle = () => {
      if (!playingRef.current) return
      const bufferSize = ctx.sampleRate * 0.05
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15))
      }
      const source = ctx.createBufferSource()
      source.buffer = buffer
      const gain = ctx.createGain()
      gain.gain.value = 0.06
      source.connect(gain).connect(ctx.destination)
      source.start()
      setTimeout(crackle, 100 + Math.random() * 400)
    }
    crackle()
  }

  const stop = () => {
    playingRef.current = false
    ctxRef.current?.close()
    ctxRef.current = null
  }

  return { start, stop }
}

export default function FireplacePage() {
  const [lit, setLit] = useState(false)
  const { start, stop } = useCrackle()

  useEffect(() => {
    return () => stop()
  }, [stop])

  const toggle = () => {
    if (lit) { stop(); setLit(false) }
    else { start(); setLit(true) }
  }

  return (
    <div className="relative min-h-screen bg-[#0d0a06] flex flex-col items-center justify-center px-6 py-12">
      <style jsx>{`
        @keyframes flame1 {
          0%, 100% { transform: scaleY(1) scaleX(1) translateX(0); opacity: 0.9; }
          25% { transform: scaleY(1.12) scaleX(0.92) translateX(3px); opacity: 1; }
          50% { transform: scaleY(0.95) scaleX(1.08) translateX(-2px); opacity: 0.85; }
          75% { transform: scaleY(1.08) scaleX(0.95) translateX(4px); opacity: 0.95; }
        }
        @keyframes flame2 {
          0%, 100% { transform: scaleY(1) scaleX(1) translateX(0); opacity: 0.85; }
          30% { transform: scaleY(0.9) scaleX(1.1) translateX(-3px); opacity: 0.95; }
          60% { transform: scaleY(1.15) scaleX(0.9) translateX(2px); opacity: 0.8; }
          80% { transform: scaleY(1.05) scaleX(1.05) translateX(-1px); opacity: 0.9; }
        }
        @keyframes flame3 {
          0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.7; }
          20% { transform: scaleY(1.2) scaleX(0.85); opacity: 0.9; }
          55% { transform: scaleY(0.85) scaleX(1.15); opacity: 0.6; }
          75% { transform: scaleY(1.1) scaleX(0.9); opacity: 0.8; }
        }
        @keyframes ember {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 1; }
          100% { transform: translateY(-120px) translateX(var(--drift)) scale(0); opacity: 0; }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.3; }
        }
      `}</style>

      <div className="max-w-lg w-full text-center space-y-8">
        <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-lg">
          cozy corner
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#f5e6d0]">
          our fireplace
        </h1>

        <div className={`relative h-64 md:h-80 rounded-2xl overflow-hidden transition-all duration-700 ${lit ? "shadow-[0_0_100px_rgba(251,146,60,0.15)]" : ""}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f08] via-[#1a0f08] to-[#0d0a06]" />

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xs">
            <div className="flex justify-center gap-4 text-5xl select-none">
              <span className="relative">
                🪵
                {lit && <span className="absolute -inset-2 bg-orange-500/20 rounded-full blur-md animate-pulse" style={{ animationDuration: "2s" }} />}
              </span>
              <span className="relative">
                🪵
                {lit && <span className="absolute -inset-2 bg-orange-500/20 rounded-full blur-md animate-pulse" style={{ animationDuration: "1.5s" }} />}
              </span>
            </div>
          </div>

          {lit && (
            <>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-40">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-36 rounded-t-full bg-gradient-to-t from-red-700 via-orange-500 to-amber-300 origin-bottom" style={{ animation: "flame1 0.8s ease-in-out infinite", filter: "blur(1px)" }} />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-28 rounded-t-full bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 origin-bottom" style={{ animation: "flame2 1.1s ease-in-out infinite" }} />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-20 rounded-t-full bg-gradient-to-t from-amber-400 via-yellow-300 to-white origin-bottom" style={{ animation: "flame3 0.6s ease-in-out infinite", filter: "blur(2px)" }} />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-6 h-12 rounded-t-full bg-gradient-to-t from-yellow-200 to-white origin-bottom" style={{ animation: "flame1 0.5s ease-in-out infinite", filter: "blur(3px)" }} />
              </div>

              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-12 bg-gradient-to-t from-orange-500/20 to-transparent rounded-full blur-2xl" style={{ animation: "glow 1.5s ease-in-out infinite" }} />

              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-orange-300"
                  style={{
                    bottom: 80 + Math.random() * 20,
                    left: `${44 + Math.random() * 12}%`,
                    animation: `ember ${1.5 + Math.random() * 2}s ease-out ${Math.random() * 2}s infinite`,
                    "--drift": `${-20 + Math.random() * 40}px`,
                    opacity: 0.3 + Math.random() * 0.5,
                  } as React.CSSProperties}
                />
              ))}
            </>
          )}

          {!lit && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-[family-name:var(--font-dancing)] text-amber-700/40 text-lg">the fire is out</p>
            </div>
          )}
        </div>

        <button
          onClick={toggle}
          className="px-8 py-3 rounded-md border border-amber-700/50 text-amber-300/80 font-[family-name:var(--font-dancing)] text-lg hover:bg-amber-900/30 transition-colors"
        >
          {lit ? "put out the fire" : "light the fire"}
        </button>

        {lit && (
          <p className="font-[family-name:var(--font-dancing)] text-amber-200/40 text-sm">
            listen close — hear it crackle? 🎧
          </p>
        )}

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
