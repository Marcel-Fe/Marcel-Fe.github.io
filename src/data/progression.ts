export type Stage = 'Baby' | 'Junior' | 'Champion' | 'Legendär'

export interface LevelInfo {
  level: number
  intoLevel: number // XP innerhalb des aktuellen Levels
  need: number // XP für das aktuelle Level -> nächstes
  stage: Stage
}

// XP, um von `level` auf `level+1` zu kommen (wächst leicht).
export function xpNeededForLevel(level: number): number {
  return 100 + (level - 1) * 60
}

export function stageForLevel(level: number): Stage {
  if (level >= 36) return 'Legendär'
  if (level >= 21) return 'Champion'
  if (level >= 11) return 'Junior'
  return 'Baby'
}

export const STAGE_EMOJI: Record<Stage, string> = {
  Baby: '🍼',
  Junior: '⭐',
  Champion: '🏆',
  Legendär: '👑',
}

// Rechnet Gesamt-XP in Level + Fortschritt um.
export function levelFromXp(totalXp: number): LevelInfo {
  let level = 1
  let rem = Math.max(0, totalXp)
  while (rem >= xpNeededForLevel(level)) {
    rem -= xpNeededForLevel(level)
    level++
  }
  return {
    level,
    intoLevel: rem,
    need: xpNeededForLevel(level),
    stage: stageForLevel(level),
  }
}

// XP-Gewinn aus einem Rennergebnis (Punkte -> XP).
export function xpFromPoints(points: number): number {
  return Math.round(points / 8)
}

// --- Spieler-Meta-Level (getrennt vom Pet-Level) ---------------------------
// Beruht auf totalPoints (≈150–1000+ pro Rennen). Wächst langsamer als Pet-XP,
// damit Strecken/Eier ein spürbares Langzeitziel bleiben.

export interface PlayerLevelInfo {
  level: number
  intoLevel: number // Punkte innerhalb des aktuellen Levels
  need: number // Punkte für das aktuelle Level -> nächstes
}

// Punkte, um von `level` auf `level+1` zu kommen.
export function playerPointsForLevel(level: number): number {
  return 1000 + (level - 1) * 800
}

export function playerLevelFromPoints(totalPoints: number): PlayerLevelInfo {
  let level = 1
  let rem = Math.max(0, totalPoints)
  while (rem >= playerPointsForLevel(level)) {
    rem -= playerPointsForLevel(level)
    level++
  }
  return { level, intoLevel: rem, need: playerPointsForLevel(level) }
}
