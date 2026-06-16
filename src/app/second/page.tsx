"use client"

import { DottedSurface } from "@/components/ui/dotted-surface"
import { Snitch } from "@/components/ui/snitch"

export default function SecondPage() {
  return (
    <div className="relative min-h-screen bg-[#1a0500]">
      <DottedSurface />
      <Snitch />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-xl text-center space-y-8">
          <p className="font-[family-name:var(--font-dancing)] text-amber-300/40 text-lg">
            a little note for you
          </p>

          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-bold text-[#f5e6d0] leading-tight">
            you are my
            <br />
            <span className="text-amber-300">happily ever after</span>
          </h1>

          <div className="w-16 h-0.5 bg-amber-500/30 mx-auto" />

          <div className="space-y-4 text-[#d4c5a9]/70 font-[family-name:var(--font-dancing)] text-xl md:text-2xl leading-relaxed">
            <p>
              from the pages of my favourite books to the
              <br className="hidden md:block" /> upside down and back again —
            </p>
            <p>
              every story leads me to you.
            </p>
            <p className="text-amber-300/60 text-lg md:text-xl pt-4">
              i love you, always and forever. ♡
            </p>
          </div>

          <div className="w-16 h-0.5 bg-amber-500/30 mx-auto" />

          <div className="space-y-3">
            <p className="font-[family-name:var(--font-dancing)] text-amber-200/30 text-base">
              explore more
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="/memory-match"
                className="px-4 py-2 rounded-md border border-amber-700/40 text-amber-300/60 font-[family-name:var(--font-dancing)] text-base hover:bg-amber-900/30 hover:text-amber-200 transition-all"
              >
                🃏 memory match
              </a>
              <a
                href="/love-letter"
                className="px-4 py-2 rounded-md border border-amber-700/40 text-amber-300/60 font-[family-name:var(--font-dancing)] text-base hover:bg-amber-900/30 hover:text-amber-200 transition-all"
              >
                🔒 love letter
              </a>
              <a
                href="/potion"
                className="px-4 py-2 rounded-md border border-amber-700/40 text-amber-300/60 font-[family-name:var(--font-dancing)] text-base hover:bg-amber-900/30 hover:text-amber-200 transition-all"
              >
                🫗 potion of love
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
