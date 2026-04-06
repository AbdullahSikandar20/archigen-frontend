import { useUIStore } from '../state/useUIStore'

export default function ZenButton() {
  const toggleZen = useUIStore(s => s.toggleZen)
  const zenMode = useUIStore(s => s.zenMode)

  return (
    <button className="zen-btn" onClick={toggleZen}>
      {zenMode ? "Exit Zen" : "Zen Mode"}
    </button>
  )
}