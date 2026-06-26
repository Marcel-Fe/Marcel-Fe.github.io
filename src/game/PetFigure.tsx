import * as THREE from 'three'
import type { EarType } from '../types'

interface Props {
  earType: EarType
  color: string
}

// Erkennbare Cartoon-Tierfigur (ersetzt die generische Kenney-Figur).
// Blickt nach +Z (Fahrtrichtung). Ohren oben sind auch von hinten sichtbar.
export function PetFigure({ earType, color }: Props) {
  const base = new THREE.Color(color)
  const light = base.clone().lerp(new THREE.Color('#ffffff'), 0.5)
  const dark = base.clone().lerp(new THREE.Color('#000000'), 0.5)

  return (
    <group>
      {/* Torso */}
      <mesh position={[0, -0.55, 0]} castShadow>
        <capsuleGeometry args={[0.34, 0.4, 6, 12]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* Kopf */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.45, 20, 20]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* Schnauze */}
      <mesh position={[0, -0.08, 0.4]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={light} roughness={0.6} />
      </mesh>
      {/* Nase */}
      <mesh position={[0, -0.05, 0.6]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Augen */}
      {[-0.18, 0.18].map((x) => (
        <mesh key={x} position={[x, 0.12, 0.36]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#1a1a22" />
        </mesh>
      ))}

      <Ears earType={earType} color={color} light={light} dark={dark} />
    </group>
  )
}

function Ears({
  earType,
  color,
  light,
  dark,
}: {
  earType: EarType
  color: string
  light: THREE.Color
  dark: THREE.Color
}) {
  if (earType === 'fox' || earType === 'cat') {
    const inner = earType === 'cat' ? new THREE.Color('#ff9ecb') : light
    const h = earType === 'fox' ? 0.42 : 0.32
    return (
      <>
        {[-0.26, 0.26].map((x) => (
          <group key={x} position={[x, 0.42, 0]} rotation={[0, 0, x < 0 ? 0.2 : -0.2]}>
            <mesh castShadow>
              <coneGeometry args={[0.16, h, 12]} />
              <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            <mesh position={[0, -0.02, 0.05]} scale={0.6}>
              <coneGeometry args={[0.16, h, 12]} />
              <meshStandardMaterial color={inner} roughness={0.6} />
            </mesh>
          </group>
        ))}
      </>
    )
  }

  if (earType === 'panda') {
    return (
      <>
        {[-0.3, 0.3].map((x) => (
          <mesh key={x} position={[x, 0.4, 0]} castShadow>
            <sphereGeometry args={[0.16, 14, 14]} />
            <meshStandardMaterial color="#1c1c22" roughness={0.6} />
          </mesh>
        ))}
        {/* Augenflecken */}
        {[-0.18, 0.18].map((x) => (
          <mesh key={x} position={[x, 0.12, 0.34]} scale={[1, 1.3, 0.4]}>
            <sphereGeometry args={[0.14, 12, 12]} />
            <meshStandardMaterial color="#1c1c22" />
          </mesh>
        ))}
      </>
    )
  }

  if (earType === 'rabbit') {
    return (
      <>
        {[-0.18, 0.18].map((x) => (
          <group key={x} position={[x, 0.55, 0]} rotation={[-0.15, 0, x < 0 ? 0.12 : -0.12]}>
            <mesh castShadow>
              <capsuleGeometry args={[0.1, 0.55, 6, 10]} />
              <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            <mesh position={[0, 0, 0.06]} scale={[0.55, 0.85, 0.55]}>
              <capsuleGeometry args={[0.1, 0.55, 6, 10]} />
              <meshStandardMaterial color="#ff9ecb" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </>
    )
  }

  // dragon: Hörner nach hinten + kleiner Kamm
  return (
    <>
      {[-0.22, 0.22].map((x) => (
        <mesh key={x} position={[x, 0.4, -0.1]} rotation={[0.5, 0, x < 0 ? 0.2 : -0.2]} castShadow>
          <coneGeometry args={[0.1, 0.42, 10]} />
          <meshStandardMaterial color={dark} roughness={0.5} />
        </mesh>
      ))}
      {[0.18, -0.05, -0.3].map((z, i) => (
        <mesh key={i} position={[0, 0.42 - i * 0.05, z]} rotation={[0.3, 0, 0]} castShadow>
          <coneGeometry args={[0.08, 0.2, 8]} />
          <meshStandardMaterial color={dark} />
        </mesh>
      ))}
    </>
  )
}
