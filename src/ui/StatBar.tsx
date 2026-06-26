interface Props {
  label: string
  value: number // 1..10
  color?: string
}

export function StatBar({ label, value, color = '#3fc1ff' }: Props) {
  return (
    <div className="statbar">
      <span className="statbar-label">{label}</span>
      <div className="statbar-track">
        <div
          className="statbar-fill"
          style={{ width: `${value * 10}%`, background: color }}
        />
      </div>
    </div>
  )
}
