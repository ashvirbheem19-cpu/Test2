"use client"

import { PixelTrail } from "@/components/ui/pixel-trail"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1a0000] via-[#3b0000] to-[#5c0000]">
      <div className="absolute inset-0 z-0">
        <PixelTrail
          pixelSize={20}
          fadeDuration={400}
          delay={800}
          pixelClassName="rounded-full bg-gradient-to-br from-[#8b0000] to-[#ff1a1a]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="mb-8 inline-block px-6 py-2 rounded-full border border-red-700 bg-red-950/40 text-red-200 text-sm font-medium">
          Now available — try our new platform
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6">
          Build the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
            Future
          </span>
        </h1>

        <p className="text-lg md:text-xl text-red-200/70 max-w-2xl mb-12">
          A modern platform designed for teams who want to ship faster, scale smarter, and build better.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" variant="primary">
            Get Started
          </Button>
          <Button size="lg" variant="secondary">
            Documentation
          </Button>
          <Button size="lg" variant="outline">
            View on GitHub
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#1a0000] to-transparent pointer-events-none" />
    </div>
  )
}
