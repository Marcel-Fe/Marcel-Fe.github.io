// Numerischer Test der Lenk-/Fahrlogik (ohne 3D-Rendering).
import { TrackCurve } from './src/game/trackCurve'
import { updatePlayer, type KartState, type PlayerInput } from './src/game/raceSim'
import { TRACKS } from './src/data/tracks'
import { getPet } from './src/data/pets'

const curve = new TrackCurve(TRACKS[0])
const startT = 0.0
const p = curve.pointAt(startT)
const heading0 = curve.headingAt(startT)
const pet = getPet('fynnox')

function makeKart(): KartState {
  return {
    id: 'test', name: pet.name, emoji: pet.emoji, color: pet.color,
    isPlayer: true, pet,
    x: p.x, z: p.z, heading: heading0, speed: 16, visualTilt: 0,
    t: startT, prevT: startT, lap: 0, finished: false, finishOrder: 0, rank: 1,
    drifting: false, driftCharge: 0, boostTime: 0,
    aiTargetLateral: 0, aiWanderTimer: 0,
  }
}

// "Bildschirm-links" als Weltrichtung bei diesem Heading (aus der Kameramathematik)
const screenLeft = { x: Math.cos(heading0), z: -Math.sin(heading0) }

function run(input: PlayerInput, steps = 90) {
  const k = makeKart()
  for (let i = 0; i < steps; i++) updatePlayer(k, input, 0, 1 / 60)
  const disp = { x: k.x - p.x, z: k.z - p.z }
  const dotLeft = disp.x * screenLeft.x + disp.z * screenLeft.z
  return { headingDelta: k.heading - heading0, dotLeft, speed: k.speed, tilt: k.visualTilt }
}

const noInput: PlayerInput = { throttle: true, steerLeft: false, steerRight: false, drift: false, boost: false }
const left: PlayerInput = { ...noInput, steerLeft: true }
const right: PlayerInput = { ...noInput, steerRight: true }

const L = run(left)
const R = run(right)
const S = run(noInput)

console.log('Geradeaus:', S.dotLeft.toFixed(2), 'speed', S.speed.toFixed(1))
console.log('LINKS  -> headingDelta', L.headingDelta.toFixed(3), 'dotLeft', L.dotLeft.toFixed(2), 'tilt', L.tilt.toFixed(2))
console.log('RECHTS -> headingDelta', R.headingDelta.toFixed(3), 'dotLeft', R.dotLeft.toFixed(2), 'tilt', R.tilt.toFixed(2))

const leftOk = L.dotLeft > 1 && L.headingDelta > 0 && L.tilt > 0
const rightOk = R.dotLeft < -1 && R.headingDelta < 0 && R.tilt < 0
const moves = S.speed > 5

console.log('---')
console.log('Fährt vorwärts:', moves ? 'OK' : 'FEHLER')
console.log('LINKS fährt nach links:', leftOk ? 'OK' : 'FEHLER')
console.log('RECHTS fährt nach rechts:', rightOk ? 'OK' : 'FEHLER')
console.log(leftOk && rightOk && moves ? '==> ALLE TESTS BESTANDEN' : '==> TEST FEHLGESCHLAGEN')
