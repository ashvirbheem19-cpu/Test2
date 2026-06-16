"use client"

import { useEffect, useState } from "react"

interface Petal {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  rotation: number
  color: string
  sway: number
}

const COLORS = [
  "255, 183, 197", // pink
  "255, 154, 162", // light pink
  "255, 200, 150", // peach
  "245, 200, 220", // blush
  "255, 220, 180", // warm cream
]

export function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const items: Petal[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 8 + Math.random() * 12,
      size: 10 + Math.random() * 16,
      rotation: Math.random() * 360,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      sway: Math.random() * 60 - 30,
    }))
    setPetals(items)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute -top-8"
          style={{
            left: `${p.left}%`,
            animation: `petalFall ${p.duration}s ease-in ${p.delay}s infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: p.size,
              height: p.size * 1.3,
              background: `rgba(${p.color}, 0.5)`,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              transform: `rotate(${p.rotation}deg)`,
              animation: `petalSpin ${p.duration * 0.7}s linear ${p.delay}s infinite, petalSway ${p.duration * 0.5}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes petalFall {
          0% { transform: translateY(-20px) translateX(0); opacity: 0; }
          5% { opacity: 0.7; }
          90% { opacity: 0.5; }
          100% { transform: translateY(100vh) translateX(30px); opacity: 0; }
        }
        @keyframes petalSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes petalSway {
          0%, 100% { margin-left: 0; }
          50% { margin-left: 15px; }
        }
      `}</style>
    </div>
  )
}
