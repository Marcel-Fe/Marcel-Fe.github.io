import { useGameStore } from '../store/gameStore'
import { StatBar } from '../ui/StatBar'
import { KartPreview } from '../ui/KartPreview'
import { getPet } from '../data/pets'
import { UPGRADES, effectFor, costFor } from '../data/upgrades'

function pctText(factor: number): string {
  return `+${Math.round((factor - 1) * 100)}%`
}

export function Garage() {
  const coins = useGameStore((s) => s.coins)
  const upgrades = useGameStore((s) => s.upgrades)
  const buyUpgrade = useGameStore((s) => s.buyUpgrade)
  const setScreen = useGameStore((s) => s.setScreen)
  const selectedPetId = useGameStore((s) => s.selectedPetId)

  const pet = getPet(selectedPetId)
  const upgradeLevels = {
    motor: upgrades.motor ?? 0,
    reifen: upgrades.reifen ?? 0,
    booster: upgrades.booster ?? 0,
    panzer: upgrades.panzer ?? 0,
  }

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

      <h2 className="section-title">🔧 Kart-Garage</h2>

      <KartPreview pet={pet} upgrades={upgradeLevels} />
      <p className="hint preview-hint">{pet.name}s Kart – gekaufte Upgrades sind sichtbar.</p>

      {UPGRADES.map((def) => {
        const level = upgrades[def.id] ?? 0
        const effect = effectFor(def.id, level)
        const nextEffect = effectFor(def.id, level + 1)
        const cost = costFor(def.id, level)
        const isMax = cost === null
        const canBuy = !isMax && coins >= cost

        return (
          <div key={def.id} className="profile-card upgrade-card">
            <div className="upgrade-head">
              <span className="upgrade-emoji" style={{ background: `${def.color}33` }}>
                {def.emoji}
              </span>
              <div className="upgrade-title">
                <div className="upgrade-name">{def.name}</div>
                <div className="upgrade-desc">{def.beschreibung}</div>
              </div>
              <span className="upgrade-level">
                {level}/{def.maxLevel}
              </span>
            </div>

            <StatBar label={def.statLabel} value={(level / def.maxLevel) * 10} color={def.color} />

            <div className="upgrade-foot">
              <span className="upgrade-effect">
                {isMax ? `Maximal ${pctText(effect)}` : `${pctText(effect)} → ${pctText(nextEffect)}`}
              </span>
              <button
                className="buy-btn"
                disabled={!canBuy}
                onClick={() => buyUpgrade(def.id)}
                style={canBuy ? { background: def.color } : undefined}
              >
                {isMax ? 'MAX' : `🪙 ${cost}`}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
