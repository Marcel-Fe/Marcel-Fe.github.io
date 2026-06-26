import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { RaceScene } from '../game/RaceScene'
import { Hud } from '../ui/Hud'
import { TouchControls } from '../ui/TouchControls'
import { attachKeyboard, resetControls } from '../game/controls'
import { useGameStore } from '../store/gameStore'
import { useHudStore } from '../store/hudStore'
import { PETS, getPet } from '../data/pets'
import { getTrack } from '../data/tracks'
import { levelFromXp } from '../data/progression'
import { effectFor } from '../data/upgrades'

export function RaceScreen() {
  const selectedPetId = useGameStore((s) => s.selectedPetId)
  const selectedTrackId = useGameStore((s) => s.selectedTrackId)
  const petXp = useGameStore((s) => s.petXp)
  const upgrades = useGameStore((s) => s.upgrades)
  const finishRace = useGameStore((s) => s.finishRace)

  const playerPet = getPet(selectedPetId)
  const playerLevel = levelFromXp(petXp[selectedPetId] ?? 0).level
  const playerUpgrades = {
    speed: effectFor('motor', upgrades.motor ?? 0),
    control: effectFor('reifen', upgrades.reifen ?? 0),
    accel: effectFor('booster', upgrades.booster ?? 0),
    armor: effectFor('panzer', upgrades.panzer ?? 0),
  }
  const opponents = PETS.filter((p) => p.id !== selectedPetId).slice(0, 3)
  const track = getTrack(selectedTrackId)

  useEffect(() => {
    resetControls()
    useHudStore.getState().set({ countdown: -1, lap: 1, totalLaps: track.laps })
    const detach = attachKeyboard()
    return () => {
      detach()
      resetControls()
    }
  }, [track.laps])

  return (
    <div className="race-screen">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 62, near: 0.1, far: 1600, position: [0, 7, -12] }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.15
        }}
      >
        <RaceScene
          track={track}
          playerPet={playerPet}
          playerLevel={playerLevel}
          playerUpgrades={playerUpgrades}
          opponents={opponents}
          onFinish={finishRace}
        />
      </Canvas>
      <Hud />
      <TouchControls />
    </div>
  )
}
