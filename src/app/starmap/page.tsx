"use client"

import { useRef, useEffect, useState } from "react"

function seededRandom(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) & 0x7fffffff
    return seed / 0x7fffffff
  }
}

function generateStars(dateStr: string, width: number, height: number) {
  const seed = dateStr.split("").reduce((s, c) => s + c.charCodeAt(0), 0)
  const rng = seededRandom(seed)
  const stars: { x: number; y: number; r: number; a: number }[] = []
  const count = Math.floor((width * height) / 12000)
  for (let i = 0; i < count; i++) {
    stars.push({
      x: rng() * width,
      y: rng() * height,
      r: 0.5 + rng() * 1.8,
      a: 0.3 + rng() * 0.7,
    })
  }
  return stars
}

function drawConstellations(ctx: CanvasRenderingContext2D, stars: typeof generateStars extends (...args: any[]) => infer R ? R : never) {
  ctx.strokeStyle = "rgba(251, 191, 36, 0.08)"
  ctx.lineWidth = 0.5
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x
      const dy = stars[i].y - stars[j].y
      if (dx * dx + dy * dy < 5000) {
        ctx.beginPath()
        ctx.moveTo(stars[i].x, stars[i].y)
        ctx.lineTo(stars[j].x, stars[j].y)
        ctx.stroke()
      }
    }
  }
}

export default function StarmapPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [twinkle, setTwinkle] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.clientWidth * 2
      canvas.height = canvas.clientHeight * 2
      ctx.scale(2, 2)
      draw()
    }

    const draw = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      const stars = generateStars("2021-04-06", w, h)
      drawConstellations(ctx, stars)

      const t = Date.now() / 2000
      stars.forEach((star, i) => {
        const flicker = 0.6 + 0.4 * Math.sin(t + i * 1.7)
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.a * flicker})`
        ctx.fill()
      })

      setTwinkle((p) => p + 1)
      requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#050510] flex flex-col items-center justify-center px-6 py-12">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050510]/80 to-[#050510]" />
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center space-y-6">
        <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-lg">
          the night we began
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#e8e0d0]">
          our star map
        </h1>
        <p className="font-[family-name:var(--font-dancing)] text-amber-200/40 text-base">
          this is what the sky looked like on april 6, 2021 — the day our story started.
        </p>

        <div className="bg-[#0a0a1a]/60 border border-amber-900/20 rounded-xl p-6 backdrop-blur-sm">
          <p className="font-[family-name:var(--font-dancing)] text-amber-300/50 text-lg">
            &ldquo;even the stars aligned for us.&rdquo;
          </p>
          <div className="mt-3 text-amber-400/30 text-sm font-[family-name:var(--font-dancing)]">
            april 6, 2021
          </div>
        </div>

        <a
          href="/second"
          className="inline-block text-amber-400/40 font-[family-name:var(--font-dancing)] text-base hover:text-amber-300 transition-colors"
        >
          ← back
        </a>
      </div>
    </div>
  )
}
