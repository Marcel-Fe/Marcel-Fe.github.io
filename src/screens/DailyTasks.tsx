import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { StatBar } from '../ui/StatBar'
import { DAILY_TASKS } from '../data/dailyTasks'

export function DailyTasks() {
  const coins = useGameStore((s) => s.coins)
  const dailyProgress = useGameStore((s) => s.dailyProgress)
  const claimedTasks = useGameStore((s) => s.claimedTasks)
  const claimTask = useGameStore((s) => s.claimTask)
  const refreshDaily = useGameStore((s) => s.refreshDaily)
  const setScreen = useGameStore((s) => s.setScreen)

  useEffect(() => {
    refreshDaily()
  }, [refreshDaily])

  return (
    <div className="screen garage">
      <div className="garage-head">
        <button className="back-btn" onClick={() => setScreen('menu')}>
          ‹ Zurück
        </button>
        <div className="currency">
          <span className="coin">🪙</span> {coins}
        </div>
      </div>

      <h2 className="section-title">📋 Tägliche Aufgaben</h2>

      {DAILY_TASKS.map((task) => {
        const progress = Math.min((dailyProgress ?? {})[task.metric] ?? 0, task.goal)
        const done = progress >= task.goal
        const claimed = (claimedTasks ?? []).includes(task.id)

        return (
          <div key={task.id} className="profile-card upgrade-card">
            <div className="upgrade-head">
              <span className="upgrade-emoji" style={{ background: '#b56bff33' }}>
                {task.emoji}
              </span>
              <div className="upgrade-title">
                <div className="upgrade-name">{task.beschreibung}</div>
                <div className="upgrade-desc">Belohnung: 🪙 {task.reward}</div>
              </div>
              <span className="upgrade-level">
                {progress}/{task.goal}
              </span>
            </div>

            <StatBar label="Fortschritt" value={(progress / task.goal) * 10} color="#b56bff" />

            <div className="upgrade-foot">
              <span className="upgrade-effect">
                {claimed ? '✅ Abgeholt' : done ? 'Bereit!' : 'Noch nicht erreicht'}
              </span>
              <button
                className="buy-btn"
                disabled={!done || claimed}
                onClick={() => claimTask(task.id)}
                style={done && !claimed ? { background: '#36e07a' } : undefined}
              >
                {claimed ? 'Erledigt' : `🪙 ${task.reward}`}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
