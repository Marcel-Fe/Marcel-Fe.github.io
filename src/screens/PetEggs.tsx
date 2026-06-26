import { useGameStore, EGG_COST } from '../store/gameStore'
import { PETS, getPet } from '../data/pets'
import { PetAvatar } from '../ui/PetAvatar'

export function PetEggs() {
  const coins = useGameStore((s) => s.coins)
  const ownedPets = useGameStore((s) => s.ownedPets)
  const hatchEgg = useGameStore((s) => s.hatchEgg)
  const lastHatched = useGameStore((s) => s.lastHatched)
  const setScreen = useGameStore((s) => s.setScreen)

  const owned = ownedPets ?? []
  const locked = PETS.filter((p) => !owned.includes(p.id))
  const allOwned = locked.length === 0
  const canHatch = !allOwned && coins >= EGG_COST
  const hatched = lastHatched ? getPet(lastHatched) : null

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

      <h2 className="section-title">🥚 Pet-Eier</h2>

      <div className="profile-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 72, lineHeight: 1.1 }}>🥚</div>
        <p className="hint">
          {allOwned
            ? 'Du besitzt bereits alle Pets!'
            : `Öffne ein Ei und schalte ein zufälliges neues Pet frei (${locked.length} noch verfügbar).`}
        </p>
        <button
          className="buy-btn"
          disabled={!canHatch}
          onClick={hatchEgg}
          style={canHatch ? { background: '#b56bff', marginTop: 8 } : { marginTop: 8 }}
        >
          {allOwned ? 'Alle freigeschaltet' : `🥚 Ei öffnen – 🪙 ${EGG_COST}`}
        </button>
        {hatched && owned.includes(hatched.id) && (
          <div className="levelup" style={{ marginTop: 14 }}>
            {hatched.emoji} {hatched.name} freigeschaltet!
          </div>
        )}
      </div>

      <h2 className="section-title">Deine Pets</h2>
      <div className="pet-strip">
        {PETS.map((pet) => {
          const has = owned.includes(pet.id)
          return (
            <div
              key={pet.id}
              className={'pet-chip' + (has ? '' : ' locked')}
              style={{ borderColor: has ? pet.color : 'transparent' }}
            >
              {has ? <PetAvatar pet={pet} variant="chip" /> : <span className="pet-emoji">🔒</span>}
              <span className="pet-chip-name">{has ? pet.name : '???'}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
