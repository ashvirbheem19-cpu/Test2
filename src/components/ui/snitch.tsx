"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

const Sparkle = ({ x, y }: { x: number; y: number }) => (
  <motion.div
    className="fixed pointer-events-none z-[999]"
    initial={{ x, y, opacity: 1, scale: 0 }}
    animate={{
      opacity: 0,
      scale: [0, 1.5, 0],
      x: x + (Math.random() - 0.5) * 120,
      y: y + (Math.random() - 0.5) * 120,
    }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <span className="text-lg" style={{ filter: "drop-shadow(0 0 4px #fbbf24)" }}>
      ✦
    </span>
  </motion.div>
)

export function Snitch() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 15 })
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set(e.clientX - 20)
      mouseY.set(e.clientY - 20)
    }
    window.addEventListener("mousemove", handle)
    return () => window.removeEventListener("mousemove", handle)
  }, [mouseX, mouseY])

  const handleClick = (e: React.MouseEvent) => {
    const id = idRef.current++
    setSparkles((prev) => [...prev, { id, x: e.clientX - 8, y: e.clientY - 8 }])
    setTimeout(() => setSparkles((prev) => prev.filter((s) => s.id !== id)), 900)
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-50 cursor-pointer select-none"
        style={{ x: springX, y: springY }}
        onClick={handleClick}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="22" r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
          <path d="M14 18 Q10 12 14 8 Q18 12 14 18Z" fill="#fcd34d" opacity="0.8" />
          <path d="M26 18 Q30 12 26 8 Q22 12 26 18Z" fill="#fcd34d" opacity="0.8" />
          <circle cx="18" cy="20" r="1.5" fill="#1a0500" />
          <circle cx="22" cy="20" r="1.5" fill="#1a0500" />
          <ellipse cx="23" cy="23" rx="3" ry="2.5" fill="#1a0500" opacity="0.3" />
          <circle cx="20" cy="22" r="6" fill="url(#snitchGlow)" opacity="0.5" />
          <defs>
            <radialGradient id="snitchGlow">
              <stop stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>
      {sparkles.map((s) => (
        <Sparkle key={s.id} x={s.x} y={s.y} />
      ))}
    </>
  )
}
