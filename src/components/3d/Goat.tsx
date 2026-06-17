"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import type * as THREE from "three"

const BODY_COLOR = "#F5F0E8"
const HORN_COLOR = "#8B8B8B"
const LEG_COLOR = "#4A4A4A"
const EYE_COLOR = "#1a1a1a"

export default function Goat({
  pos,
  facing,
  name,
}: {
  pos: [number, number, number]
  facing: 1 | -1
  name: string
}) {
  const group = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (!group.current) return
    group.current.position.x += (pos[0] - group.current.position.x) * 0.055
    group.current.position.z += (pos[2] - group.current.position.z) * 0.055
  })

  return (
    <group
      ref={group}
      position={[pos[0], 0.15, pos[2]]}
      scale={[facing, 1, 1]}
    >
      {/* Body */}
      <group scale={[0.85, 0.55, 0.55]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <sphereGeometry args={[0.5, 20, 16]} />
          <meshStandardMaterial color={BODY_COLOR} roughness={0.85} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0.55, 0.45, 0]} castShadow>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshStandardMaterial color={BODY_COLOR} roughness={0.85} />
      </mesh>

      {/* Head */}
      <group scale={[0.38, 0.35, 0.35]}>
        <mesh position={[1.7, 1.4, 0]} castShadow>
          <sphereGeometry args={[0.5, 16, 12]} />
          <meshStandardMaterial color={BODY_COLOR} roughness={0.85} />
        </mesh>
      </group>

      {/* Eyes */}
      <mesh position={[0.68, 0.5, -0.14]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color={EYE_COLOR} />
      </mesh>
      <mesh position={[0.68, 0.5, 0.14]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color={EYE_COLOR} />
      </mesh>

      {/* Legs */}
      {[
        [-0.3, -0.15, -0.2],
        [-0.3, -0.15, 0.2],
        [0.3, -0.15, -0.2],
        [0.3, -0.15, 0.2],
      ].map((p, i) => (
        <mesh key={`leg-${i}`} position={p as [number, number, number]} castShadow>
          <capsuleGeometry args={[0.05, 0.3, 6, 10]} />
          <meshStandardMaterial color={LEG_COLOR} roughness={0.9} />
        </mesh>
      ))}

      {/* Horns */}
      <mesh position={[0.65, 0.65, -0.16]} rotation={[0.5, 0, -0.3]}>
        <coneGeometry args={[0.05, 0.22]} />
        <meshStandardMaterial color={HORN_COLOR} roughness={0.7} />
      </mesh>
      <mesh position={[0.65, 0.65, 0.16]} rotation={[-0.5, 0, -0.3]}>
        <coneGeometry args={[0.05, 0.22]} />
        <meshStandardMaterial color={HORN_COLOR} roughness={0.7} />
      </mesh>

      {/* Beard */}
      <mesh position={[0.7, 0.08, 0]} rotation={[0.5, 0, 0]}>
        <coneGeometry args={[0.04, 0.12]} />
        <meshStandardMaterial color="#EDE8DC" roughness={0.9} />
      </mesh>

      {/* Ears */}
      <mesh position={[0.5, 0.5, -0.22]} rotation={[0.2, 0.5, 0]} castShadow>
        <boxGeometry args={[0.12, 0.02, 0.16]} />
        <meshStandardMaterial color="#EDE8DC" roughness={0.8} />
      </mesh>
      <mesh position={[0.5, 0.5, 0.22]} rotation={[-0.2, -0.5, 0]} castShadow>
        <boxGeometry args={[0.12, 0.02, 0.16]} />
        <meshStandardMaterial color="#EDE8DC" roughness={0.8} />
      </mesh>

      {/* Tail */}
      <mesh position={[-0.5, 0.12, 0]} rotation={[0.6, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 0.15]} />
        <meshStandardMaterial color="#F0E8DC" roughness={0.8} />
      </mesh>

      {/* Name label */}
      <Html position={[0, 0.8, 0]} center distanceFactor={8}>
        <span
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "14px",
            color: "#3d2a1a",
            background: "rgba(255,255,255,0.6)",
            padding: "2px 8px",
            borderRadius: "999px",
            backdropFilter: "blur(4px)",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </span>
      </Html>
    </group>
  )
}
