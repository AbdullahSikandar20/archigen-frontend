import { useUIStore } from '../state/useUIStore'

export default function ZenButton() {
  const { zenMode, toggleZenMode } = useUIStore()

  return (
   <button
  className={`btn-metal zen-btn ${zenMode ? 'active' : ''}`}
  onClick={toggleZenMode}
>
  {zenMode ? 'Exit Zen' : 'Zen Mode'}
</button>

  )
}
