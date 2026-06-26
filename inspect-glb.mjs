import { readFileSync } from 'node:fs'

function dumpGlb(path) {
  const buf = readFileSync(path)
  // GLB: 12-byte header, dann Chunks (4 len + 4 type + data)
  const jsonLen = buf.readUInt32LE(12)
  const jsonStr = buf.toString('utf8', 20, 20 + jsonLen)
  const gltf = JSON.parse(jsonStr)
  console.log('=== ' + path + ' ===')
  console.log('nodes:', (gltf.nodes || []).map((n) => n.name).filter(Boolean))
  console.log('meshes:', (gltf.meshes || []).map((m) => m.name).filter(Boolean))
  console.log('materials:', (gltf.materials || []).map((m) => m.name).filter(Boolean))
}

dumpGlb('./public/models/kart-oobi.glb')
