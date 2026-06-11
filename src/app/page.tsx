"use client"

import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { Button } from "@/components/ui/flow-hover-button"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0000]">
      <SpiralAnimation />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pointer-events-none">
        <div className="scale-[0.9]">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wide text-white font-[family-name:var(--font-playfair)]">
            ADRIANA
          </h1>
        </div>

        <div className="mt-12 pointer-events-auto">
          <Button>ENTER</Button>
        </div>
      </div>
    </div>
  )
}
