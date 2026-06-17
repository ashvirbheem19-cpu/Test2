"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

const BODY_COLOR = "#F5F0E8"
const HORN_COLOR = "#8B8B8B"
const LEG_COLOR = "#4A4A4A"
const EYE_COLOR = "#1a1a1a"

export default function Goat({
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
    <group ref={group} position={[pos[0], 0.25, pos[2]]}>
      {/* Body */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[0.9, 0.45, 0.55]} />
        <meshStandardMaterial color={BODY_COLOR} roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0.6, 0.35, 0]} castShadow>
        <boxGeometry args={[0.35, 0.3, 0.35]} />
        <meshStandardMaterial color={BODY_COLOR} roughness={0.8} />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.7, 0.42, -0.12]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color={EYE_COLOR} />
      </mesh>
      <mesh position={[0.7, 0.42, 0.12]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color={EYE_COLOR} />
      </mesh>

      {/* Legs */}
      {[
        [-0.3, -0.2, -0.2],
        [-0.3, -0.2, 0.2],
        [0.3, -0.2, -0.2],
        [0.3, -0.2, 0.2],
      ].map((p, i) => (
        <mesh key={`leg-${i}`} position={p as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.04, 0.06, 0.35]} />
          <meshStandardMaterial color={LEG_COLOR} roughness={0.9} />
        </mesh>
      ))}

      {/* Horns */}
      <mesh position={[0.65, 0.58, -0.14]} rotation={[0.4, 0, -0.3]}>
        <coneGeometry args={[0.05, 0.2]} />
        <meshStandardMaterial color={HORN_COLOR} roughness={0.7} />
      </mesh>
      <mesh position={[0.65, 0.58, 0.14]} rotation={[-0.4, 0, -0.3]}>
        <coneGeometry args={[0.05, 0.2]} />
        <meshStandardMaterial color={HORN_COLOR} roughness={0.7} />
      </mesh>

      {/* Beard */}
      <mesh position={[0.7, 0.12, 0]} rotation={[0.4, 0, 0]}>
        <coneGeometry args={[0.04, 0.12]} />
        <meshStandardMaterial color="#EDE8DC" roughness={0.9} />
      </mesh>

      {/* Ears */}
      <mesh position={[0.55, 0.4, -0.2]} rotation={[0.2, 0.4, 0]}>
        <boxGeometry args={[0.1, 0.02, 0.14]} />
        <meshStandardMaterial color="#EDE8DC" roughness={0.8} />
      </mesh>
      <mesh position={[0.55, 0.4, 0.2]} rotation={[-0.2, -0.4, 0]}>
        <boxGeometry args={[0.1, 0.02, 0.14]} />
        <meshStandardMaterial color="#EDE8DC" roughness={0.8} />
      </mesh>

      {/* Tail */}
      <mesh position={[-0.5, 0.15, 0]} rotation={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 0.15]} />
        <meshStandardMaterial color="#F0E8DC" roughness={0.8} />
      </mesh>
    </group>
  )
}
