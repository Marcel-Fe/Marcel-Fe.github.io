export type TaskMetric = 'races' | 'wins' | 'coins'

export interface DailyTaskDef {
  id: string
  beschreibung: string
  emoji: string
  metric: TaskMetric
  goal: number
  reward: number // Münzen
}

// Aufgaben sind aus dem Rennergebnis (RaceResult) messbar. Belohnung moderat.
export const DAILY_TASKS: DailyTaskDef[] = [
  {
    id: 'race3',
    beschreibung: 'Beende 3 Rennen',
    emoji: '🏁',
    metric: 'races',
    goal: 3,
    reward: 80,
  },
  {
    id: 'win1',
    beschreibung: 'Gewinne 1 Rennen',
    emoji: '🥇',
    metric: 'wins',
    goal: 1,
    reward: 120,
  },
  {
    id: 'coins150',
    beschreibung: 'Verdiene 150 Münzen',
    emoji: '🪙',
    metric: 'coins',
    goal: 150,
    reward: 100,
  },
  {
    id: 'race5',
    beschreibung: 'Beende 5 Rennen',
    emoji: '🔥',
    metric: 'races',
    goal: 5,
    reward: 150,
  },
]

export function getDailyTask(id: string): DailyTaskDef | undefined {
  return DAILY_TASKS.find((t) => t.id === id)
}
