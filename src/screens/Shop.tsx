import { useGameStore } from '../store/gameStore'
import { SHOP, priceLabel } from '../data/shop'

export function Shop() {
  const coins = useGameStore((s) => s.coins)
  const diamonds = useGameStore((s) => s.diamonds)
  const setScreen = useGameStore((s) => s.setScreen)

  return (
    <div className="screen garage">
      <div className="garage-head">
        <button className="back-btn" onClick={() => setScreen('menu')}>
          ‹ Zurück
        </button>
        <div className="shop-currencies">
          <div className="currency">
            <span className="coin">🪙</span> {coins}
          </div>
          <div className="currency">
            <span className="coin">💎</span> {diamonds}
          </div>
        </div>
      </div>

      <h2 className="section-title">🛒 Shop</h2>
      <p className="hint" style={{ width: '100%', maxWidth: 460 }}>
        Fair Play: Echte Käufe sind rein optisch. Münzen verdienst du durch Rennen & Aufgaben.
      </p>

      {SHOP.map((section) => (
        <div key={section.title} className="shop-section">
          <div className="section-head">
            <h2>{section.title}</h2>
          </div>
          {section.note && <p className="hint shop-note">{section.note}</p>}
          <div className="shop-grid">
            {section.items.map((item) => (
              <div key={item.id} className="shop-card" style={{ borderColor: `${item.color}66` }}>
                <span className="shop-emoji" style={{ background: `${item.color}22` }}>
                  {item.emoji}
                </span>
                <div className="shop-name">{item.name}</div>
                <div className="shop-desc">{item.desc}</div>
                <button className="buy-btn shop-buy" style={{ background: item.color }} disabled>
                  {priceLabel(item)}
                </button>
                <span className="shop-soon">bald verfügbar</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
