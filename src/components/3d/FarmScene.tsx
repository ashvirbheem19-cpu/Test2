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

const GROUND_COLOR = "#5a9e4a"
const HILL_COLOR = "#4a8c3f"

const HILLS = [
  { pos: [-5, 0, -3] as [number, number, number], scale: 2.5 },
  { pos: [4, 0, 1] as [number, number, number], scale: 2.0 },
  { pos: [-1, 0, 4] as [number, number, number], scale: 3.0 },
  { pos: [6, 0, -4] as [number, number, number], scale: 1.8 },
]

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
      {/* Lighting */}
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[8, 12, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 6, -3]} intensity={0.25} />

      {/* Fog */}
      <fog attach="fog" args={["#B0E0F6", 12, 22]} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[24, 18]} />
        <meshStandardMaterial color={GROUND_COLOR} roughness={0.9} />
      </mesh>

      {/* Hills */}
      {HILLS.map((h, i) => (
        <mesh
          key={`hill-${i}`}
          position={h.pos}
          receiveShadow
        >
          <sphereGeometry
            args={[h.scale, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]}
          />
          <meshStandardMaterial color={HILL_COLOR} roughness={0.9} />
        </mesh>
      ))}

      {/* Animals */}
      {animalPositions.map((a) =>
        a.type === "cow" ? (
          <HighlandCow key={a.id} pos={a.pos} facing={a.facing} />
        ) : (
          <Goat key={a.id} pos={a.pos} facing={a.facing} />
        ),
      )}
    </>
  )
}
