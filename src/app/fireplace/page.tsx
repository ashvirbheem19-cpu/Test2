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
      <div className="max-w-lg w-full text-center space-y-8">
        <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-lg">
          cozy corner
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#f5e6d0]">
          our fireplace
        </h1>

        <div className="relative h-64 md:h-80 rounded-2xl bg-[#1a0f08] border border-amber-900/30 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xs h-24">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-7xl select-none">
              🪵🪵
            </div>
          </div>

          {lit && (
            <>
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-24 h-32">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-28 rounded-t-full bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 animate-pulse" style={{ animationDuration: "0.8s" }} />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-20 rounded-t-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 animate-pulse" style={{ animationDuration: "1.1s" }} />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-14 rounded-t-full bg-gradient-to-t from-yellow-400 to-white animate-pulse" style={{ animationDuration: "0.6s" }} />
              </div>

              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_80px_rgba(251,146,60,0.15)] pointer-events-none" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-gradient-to-t from-orange-500/20 to-transparent rounded-full blur-xl" />
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
