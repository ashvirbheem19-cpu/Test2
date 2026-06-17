"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
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
  name,
}: {
  pos: [number, number, number]
  facing: 1 | -1
  name: string
}) {
  const group = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (!group.current) return
    group.current.position.x += (pos[0] - group.current.position.x) * 0.04
    group.current.position.z += (pos[2] - group.current.position.z) * 0.04
  })

  return (
    <group
      ref={group}
      position={[pos[0], 0.2, pos[2]]}
      scale={[facing, 1, 1]}
    >
      {/* Body */}
      <group scale={[1.1, 0.7, 0.75]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <sphereGeometry args={[0.6, 20, 16]} />
          <meshStandardMaterial color={BODY_COLOR} roughness={0.85} />
        </mesh>
      </group>

      {/* Head */}
      <group scale={[0.5, 0.4, 0.4]}>
        <mesh position={[1.6, 1.1, 0]} castShadow>
          <sphereGeometry args={[0.5, 16, 12]} />
          <meshStandardMaterial color={HEAD_COLOR} roughness={0.85} />
        </mesh>
      </group>

      {/* Muzzle */}
      <mesh position={[0.95, 0.35, 0]}>
        <sphereGeometry args={[0.12, 10, 10]} />
        <meshStandardMaterial color="#D4A574" roughness={0.9} />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.85, 0.55, -0.16]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color={EYE_COLOR} />
      </mesh>
      <mesh position={[0.85, 0.55, 0.16]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color={EYE_COLOR} />
      </mesh>

      {/* Legs */}
      {[
        [-0.4, -0.2, -0.3],
        [-0.4, -0.2, 0.3],
        [0.4, -0.2, -0.3],
        [0.4, -0.2, 0.3],
      ].map((p, i) => (
        <mesh key={`leg-${i}`} position={p as [number, number, number]} castShadow>
          <capsuleGeometry args={[0.07, 0.32, 6, 10]} />
          <meshStandardMaterial color={LEG_COLOR} roughness={0.9} />
        </mesh>
      ))}

      {/* Horns */}
      <mesh position={[0.85, 0.78, -0.2]} rotation={[0.3, 0, -0.3]}>
        <coneGeometry args={[0.06, 0.2]} />
        <meshStandardMaterial color={HORN_COLOR} roughness={0.7} />
      </mesh>
      <mesh position={[0.85, 0.78, 0.2]} rotation={[-0.3, 0, -0.3]}>
        <coneGeometry args={[0.06, 0.2]} />
        <meshStandardMaterial color={HORN_COLOR} roughness={0.7} />
      </mesh>

      {/* Fluffy mane */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2
        return (
          <mesh
            key={`mane-${i}`}
            position={[
              0.5 + Math.cos(angle) * 0.07,
              0.55 + Math.sin(angle) * 0.12,
              Math.sin(angle) * 0.22,
            ]}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color={MANE_COLOR} roughness={0.9} />
          </mesh>
        )
      })}

      {/* Tail */}
      <mesh position={[-0.7, 0.1, 0]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.3]} />
        <meshStandardMaterial color={BODY_COLOR} roughness={0.8} />
      </mesh>
      <mesh position={[-0.85, 0, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color={MANE_COLOR} roughness={0.9} />
      </mesh>

      {/* Name label */}
      <Html position={[0, 0.95, 0]} center distanceFactor={8}>
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
