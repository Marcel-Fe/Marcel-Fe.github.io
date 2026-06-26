import { useHudStore } from '../store/hudStore'

export function Hud() {
  const position = useHudStore((s) => s.position)
  const totalRacers = useHudStore((s) => s.totalRacers)
  const lap = useHudStore((s) => s.lap)
  const totalLaps = useHudStore((s) => s.totalLaps)
  const boostCharge = useHudStore((s) => s.boostCharge)
  const countdown = useHudStore((s) => s.countdown)
  const speedKmh = useHudStore((s) => s.speedKmh)
  const coins = useHudStore((s) => s.coins)

  return (
    <div className="hud">
      <div className="hud-coins">🪙 {coins}</div>
      <div className="hud-top">
        <div className="hud-chip">
          <span className="hud-label">PLATZ</span>
          <span className="hud-value">
            {position}<small>/{totalRacers}</small>
          </span>
        </div>
        <div className="hud-chip">
          <span className="hud-label">RUNDE</span>
          <span className="hud-value">
            {lap}<small>/{totalLaps}</small>
          </span>
        </div>
        <div className="hud-chip">
          <span className="hud-label">KM/H</span>
          <span className="hud-value">{speedKmh}</span>
        </div>
      </div>

      <div className="hud-boost">
        <div className="hud-boost-label">BOOST</div>
        <div className="hud-boost-bar">
          <div
            className={'hud-boost-fill' + (boostCharge >= 0.25 ? ' ready' : '')}
            style={{ width: `${Math.round(boostCharge * 100)}%` }}
          />
        </div>
      </div>

      {countdown > 0 && (
        <div className="countdown">{countdown}</div>
      )}
      {countdown === 0 && <CountdownGo />}
    </div>
  )
}

// „GO!" kurz einblenden, sobald der Countdown 0 erreicht.
function CountdownGo() {
  return <div className="countdown go">GO!</div>
}
