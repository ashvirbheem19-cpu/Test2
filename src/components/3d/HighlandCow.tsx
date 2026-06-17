"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

const BODY_COLOR = "#8B5E3C"
const HEAD_COLOR = "#C49A6C"
const HORN_COLOR = "#E8D5B7"
const LEG_COLOR = "#5C3A1E"
const MANE_COLOR = "#A0522D"
const EYE_COLOR = "#1a1a1a"

export default function HighlandCow({
  pos,
  facing,
}: {
  pos: [number, number, number]
  facing: 1 | -1
}) {
  const group = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (!group.current) return
    group.current.position.x += (pos[0] - group.current.position.x) * 0.04
    group.current.position.z += (pos[2] - group.current.position.z) * 0.04
    group.current.scale.x = facing
  })

  return (
    <group ref={group} position={[pos[0], 0.3, pos[2]]}>
      {/* Body */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.3, 0.65, 0.8]} />
        <meshStandardMaterial color={BODY_COLOR} roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0.75, 0.4, 0]} castShadow>
        <boxGeometry args={[0.45, 0.4, 0.45]} />
        <meshStandardMaterial color={HEAD_COLOR} roughness={0.8} />
      </mesh>

      {/* Muzzle */}
      <mesh position={[0.95, 0.3, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#D4A574" roughness={0.9} />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.85, 0.5, -0.15]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color={EYE_COLOR} />
      </mesh>
      <mesh position={[0.85, 0.5, 0.15]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color={EYE_COLOR} />
      </mesh>

      {/* Legs */}
      {[
        [-0.4, -0.3, -0.3],
        [-0.4, -0.3, 0.3],
        [0.4, -0.3, -0.3],
        [0.4, -0.3, 0.3],
      ].map((p, i) => (
        <mesh key={`leg-${i}`} position={p as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.07, 0.09, 0.4]} />
          <meshStandardMaterial color={LEG_COLOR} roughness={0.9} />
        </mesh>
      ))}

      {/* Horns */}
      <mesh position={[0.85, 0.7, -0.18]} rotation={[0.2, 0, -0.3]}>
        <coneGeometry args={[0.06, 0.18]} />
        <meshStandardMaterial color={HORN_COLOR} roughness={0.7} />
      </mesh>
      <mesh position={[0.85, 0.7, 0.18]} rotation={[-0.2, 0, -0.3]}>
        <coneGeometry args={[0.06, 0.18]} />
        <meshStandardMaterial color={HORN_COLOR} roughness={0.7} />
      </mesh>

      {/* Fluffy mane */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh
            key={`mane-${i}`}
            position={[
              0.5 + Math.cos(angle) * 0.06,
              0.5 + Math.sin(angle) * 0.1,
              Math.sin(angle) * 0.2,
            ]}
          >
            <sphereGeometry args={[0.1, 6, 6]} />
            <meshStandardMaterial color={MANE_COLOR} roughness={0.9} />
          </mesh>
        )
      })}

      {/* Tail */}
      <mesh position={[-0.7, 0.15, 0]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.3]} />
        <meshStandardMaterial color={BODY_COLOR} roughness={0.8} />
      </mesh>
      <mesh position={[-0.85, 0.05, 0]}>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshStandardMaterial color={MANE_COLOR} roughness={0.9} />
      </mesh>
    </group>
  )
}
