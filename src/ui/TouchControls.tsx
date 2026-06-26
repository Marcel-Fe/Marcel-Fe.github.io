import { controls } from '../game/controls'

type Key = 'steerLeft' | 'steerRight' | 'throttle' | 'drift' | 'boost'

function hold(key: Key) {
  // pointer-events: gedrückt halten = true, loslassen = false
  return {
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault()
      controls[key] = true
    },
    onPointerUp: () => (controls[key] = false),
    onPointerLeave: () => (controls[key] = false),
    onPointerCancel: () => (controls[key] = false),
  }
}

export function TouchControls() {
  return (
    <div className="touch-layer">
      <div className="touch-left">
        <button className="tc-btn steer" {...hold('steerLeft')} aria-label="Links">
          ◄
        </button>
        <button className="tc-btn steer" {...hold('steerRight')} aria-label="Rechts">
          ►
        </button>
      </div>
      <div className="touch-right">
        <div className="tc-secondary">
          <button className="tc-btn drift" {...hold('drift')}>
            DRIFT
          </button>
          <button className="tc-btn boost" {...hold('boost')}>
            BOOST
          </button>
        </div>
        <button className="tc-btn gas" {...hold('throttle')}>
          GAS
        </button>
      </div>
    </div>
  )
}
