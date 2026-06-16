"use client"

import { useState, useEffect } from "react"

const START = new Date("2021-04-06T00:00:00")

function calc() {
  const now = new Date()
  const diff = now.getTime() - START.getTime()
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { days, hours, minutes, seconds }
}

export function TogetherSince() {
  const [t, setT] = useState(calc)

  useEffect(() => {
    const id = setInterval(() => setT(calc), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="text-center space-y-2">
      <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-sm md:text-base">
        together since april 6, 2021
      </p>
      <p className="font-[family-name:var(--font-playfair)] text-amber-200/60 text-xl md:text-2xl tracking-wide">
        <span className="text-amber-300/90">{t.days}</span> days{" "}
        <span className="text-amber-300/90">{t.hours}</span>h{" "}
        <span className="text-amber-300/90">{t.minutes}</span>m{" "}
        <span className="text-amber-300/90">{t.seconds}</span>s
      </p>
    </div>
  )
}
