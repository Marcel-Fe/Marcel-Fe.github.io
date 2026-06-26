import { forwardRef } from 'react'
import * as THREE from 'three'
import { RoundedBox } from '@react-three/drei'

interface Props {
  color: string
}

// Moderneres Cartoon-Kart: runde Karosserie, Visier, Spoiler, Scheinwerfer.
// Die äußere Group wird vom Render-Loop bewegt.
export const KartMesh = forwardRef<THREE.Group, Props>(({ color }, ref) => {
  const body = new THREE.Color(color)
  const driver = body.clone().lerp(new THREE.Color('#ffffff'), 0.4)
  const accent = body.clone().lerp(new THREE.Color('#ffffff'), 0.15)

  return (
    <group ref={ref}>
      {/* Innere Gruppe: wird für die Drift-Neigung um die Längsachse gerollt */}
      <group>
      {/* Hauptkarosserie – glänzender Autolack (Clearcoat) */}
      <RoundedBox args={[1.6, 0.55, 2.7]} radius={0.22} smoothness={4} position={[0, 0.5, 0]} castShadow>
        <meshPhysicalMaterial
          color={color}
          metalness={0.5}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.2}
        />
      </RoundedBox>
      {/* Seitenschweller (Akzentfarbe) */}
      <RoundedBox args={[1.72, 0.22, 2.2]} radius={0.1} smoothness={3} position={[0, 0.34, 0]}>
        <meshPhysicalMaterial color={accent} metalness={0.4} roughness={0.3} clearcoat={0.8} envMapIntensity={1.1} />
      </RoundedBox>
      {/* Front-Nase */}
      <RoundedBox args={[1.3, 0.32, 0.7]} radius={0.14} smoothness={3} position={[0, 0.46, 1.45]}>
        <meshPhysicalMaterial
          color={color}
          metalness={0.5}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.2}
        />
      </RoundedBox>
      {/* Scheinwerfer */}
      {[-0.45, 0.45].map((x) => (
        <mesh key={x} position={[x, 0.5, 1.78]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#fffbe0" emissive="#fff3b0" emissiveIntensity={1.6} />
        </mesh>
      ))}

      {/* Fahrer-Körper */}
      <mesh position={[0, 1.0, -0.15]} castShadow>
        <sphereGeometry args={[0.52, 20, 20]} />
        <meshStandardMaterial color={driver} roughness={0.55} />
      </mesh>
      {/* Ohren */}
      {[-0.3, 0.3].map((x) => (
        <mesh key={x} position={[x, 1.52, -0.15]} rotation={[0, 0, x < 0 ? -0.25 : 0.25]} castShadow>
          <coneGeometry args={[0.17, 0.42, 14]} />
          <meshStandardMaterial color={driver} roughness={0.55} />
        </mesh>
      ))}
      {/* Visier / Helm-Glas */}
      <mesh position={[0, 1.05, 0.28]} rotation={[0.2, 0, 0]}>
        <sphereGeometry args={[0.42, 18, 18, 0, Math.PI]} />
        <meshStandardMaterial
          color="#0e1733"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Heckspoiler */}
      <mesh position={[0, 1.0, -1.35]} castShadow>
        <boxGeometry args={[1.5, 0.08, 0.4]} />
        <meshStandardMaterial color={accent} metalness={0.5} roughness={0.3} />
      </mesh>
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} position={[x, 0.78, -1.35]}>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#1a1a22" />
        </mesh>
      ))}

      {/* Räder mit hellem Felgenkern */}
      {(
        [
          [-0.85, 0.32, 0.95],
          [0.85, 0.32, 0.95],
          [-0.85, 0.32, -0.95],
          [0.85, 0.32, -0.95],
        ] as const
      ).map((p, i) => (
        <group key={i} position={p} rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.36, 18]} />
            <meshStandardMaterial color="#15151b" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.38, 12]} />
            <meshStandardMaterial color={accent} metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
      ))}
      </group>
    </group>
  )
})

KartMesh.displayName = 'KartMesh'
