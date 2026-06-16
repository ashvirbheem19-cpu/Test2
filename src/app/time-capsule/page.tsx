"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const STORAGE_KEY = "time-capsule-date"

const MESSAGES = [
  `hey you.

if you're reading this, the date has come —
which means i loved you all the way until now,
and i still do. more than ever.

every moment with you has been a page
i never want to close. you are my favourite
chapter, my best decision, my always.

no matter how much time passes,
my answer stays the same:
you. always you.

i love you. ♡`,

  `to the girl who turned my world magical —

some things are bigger than magic,
and you are one of them.

you are my patronus on the dark days,
my felix felicis, my constant joy.

time may pass, seasons may change,
but my love for you is eternal.
unchanged. unwavering.

always. ♡`,

  `hey, you.

in a world of upside downs and unknown things,
you are my one constant.

you are the voice that pulls me back,
the light in every dark room,
the reason i keep fighting.

no matter what dimension i'm in,
i'll always find my way to you.

i love you. ♡`,

  `my love,

every love story is beautiful,
but ours is my favourite.

you are my once upon a time,
my happily ever after,
and every beautiful chapter in between.

the clock may tick, the days may turn,
but my heart belongs to you.
today, tomorrow, always.

forever yours. ♡`,

  `to the girl who has my whole heart —

some things don't need big words.
just this: you are everything.

every day with you feels like coming home.
every laugh, every hug, every quiet moment —
i treasure it all.

thank you for being you.
thank you for choosing me.

i love you. always will. ♡`,

  `my universe,

you are made of stars, and so is the love i have for you.
it stretches beyond what words can hold,
beyond time, beyond space.

no matter how far apart we may be,
my heart orbits around you.
always.

you are my home.
you are my forever.

i love you. ♡`,
]

function pickMessage(dateStr: string): string {
  let hash = 0
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i)
    hash |= 0
  }
  return MESSAGES[Math.abs(hash) % MESSAGES.length]
}

function getTomorrow(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split("T")[0]
}

function isUnlockable(dateStr: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dateStr).getTime() <= today.getTime()
}

export default function TimeCapsulePage() {
  const [targetDate, setTargetDate] = useState("")
  const [unlocked, setUnlocked] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setTargetDate(stored)
      setSaved(true)
      if (isUnlockable(stored)) setUnlocked(true)
    }
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!targetDate) return
    localStorage.setItem(STORAGE_KEY, targetDate)
    setSaved(true)
    if (isUnlockable(targetDate)) setUnlocked(true)
  }

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY)
    setTargetDate("")
    setSaved(false)
    setUnlocked(false)
  }

  const daysLeft = saved && !unlocked
    ? Math.ceil((new Date(targetDate).getTime() - Date.now()) / 86400000)
    : 0

  return (
    <div className="relative min-h-screen bg-[#1a0500] flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full text-center space-y-6">
        <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-lg">
          a message for the future
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#f5e6d0]">
          time capsule
        </h1>
        <div className="text-5xl mb-4">⏳</div>

        {!saved ? (
          <form onSubmit={handleSave} className="space-y-4">
            <p className="font-[family-name:var(--font-dancing)] text-[#d4c5a9]/60 text-lg">
              pick a future date to unlock a love letter
            </p>
            <div className="flex justify-center">
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="bg-transparent border border-amber-800/40 text-[#f5e6d0] font-[family-name:var(--font-playfair)] px-4 py-2 rounded-md outline-none focus:border-amber-500/60"
                min={getTomorrow()}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 rounded-md border border-amber-700/50 text-amber-300/80 font-[family-name:var(--font-dancing)] text-lg hover:bg-amber-900/30 transition-colors"
            >
              seal the capsule
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            {unlocked ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-lg">
                  unlocked ✦
                </p>
                <div className="relative bg-[#2a0a00]/60 border border-amber-800/30 rounded-xl p-8 md:p-12 backdrop-blur-sm">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl">💌</div>
                  <div className="space-y-4 text-[#d4c5a9]/80 font-[family-name:var(--font-dancing)] text-xl md:text-2xl leading-relaxed pt-4 whitespace-pre-line">
                    {pickMessage(targetDate)}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <p className="font-[family-name:var(--font-dancing)] text-amber-200/60 text-lg">
                  {daysLeft} day{daysLeft !== 1 ? "s" : ""} left until your letter arrives
                </p>
                <div className="relative bg-[#2a0a00]/40 border border-amber-800/20 rounded-xl p-8 md:p-12 backdrop-blur-sm">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl">🔒</div>
                  <div className="space-y-3 pt-4">
                    <p className="font-[family-name:var(--font-dancing)] text-[#d4c5a9]/30 text-lg blur-sm select-none">
                      patience, my love. good things come to those who wait.
                    </p>
                    <p className="font-[family-name:var(--font-dancing)] text-[#d4c5a9]/20 text-base blur-sm select-none">
                      come back on {new Date(targetDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} to read your letter.
                    </p>
                  </div>
                </div>
                <p className="font-[family-name:var(--font-dancing)] text-amber-300/30 text-sm">
                  until then, every day is a step closer ♡
                </p>
              </div>
            )}
            <button
              onClick={handleReset}
              className="text-amber-400/30 font-[family-name:var(--font-dancing)] text-sm hover:text-amber-300/60 transition-colors underline underline-offset-2"
            >
              set a new date
            </button>
          </div>
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
