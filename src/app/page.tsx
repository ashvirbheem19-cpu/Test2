"use client"

import { SpiralAnimation } from "@/components/ui/spiral-animation"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0000]">
      <SpiralAnimation />

      <div className="relative z-10 flex items-center justify-center min-h-screen pointer-events-none">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white">
          ADRIANA
        </h1>
      </div>
    </div>
  )
}
