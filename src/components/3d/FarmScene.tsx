"use client"

import { useMemo } from "react"
import HighlandCow from "./HighlandCow"
import Goat from "./Goat"

interface AnimalData {
  id: number
  type: "cow" | "goat"
  name: string
  x: number
  y: number
  facing: 1 | -1
}

export default function FarmScene({ animals }: { animals: AnimalData[] }) {
  const animalPositions = useMemo(
    () =>
      animals.map((a) => ({
        ...a,
        pos: [(a.x / 100) * 14 - 7, 0, (a.y / 100) * 10 - 5] as [
          number,
          number,
          number,
        ],
      })),
    [animals],
  )

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[8, 12, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 6, -3]} intensity={0.25} />

      <fog attach="fog" args={["#B0E0F6", 12, 24]} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[28, 20]} />
        <meshStandardMaterial color="#5a9e4a" roughness={0.9} />
      </mesh>

      {/* Animals */}
      {animalPositions.map((a) =>
        a.type === "cow" ? (
          <HighlandCow key={a.id} pos={a.pos} facing={a.facing} name={a.name} />
        ) : (
          <Goat key={a.id} pos={a.pos} facing={a.facing} name={a.name} />
        ),
      )}
    </>
  )
}
