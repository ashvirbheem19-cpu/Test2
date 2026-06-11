"use client"

import { DottedSurface } from "@/components/ui/dotted-surface"

export default function SecondPage() {
  return (
    <div className="relative min-h-screen">
      <DottedSurface />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="font-mono text-5xl md:text-7xl font-semibold tracking-tight text-foreground">
            Welcome
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            You made it through the words.
          </p>
        </div>
      </div>
    </div>
  )
}
