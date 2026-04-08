import { useUIStore } from '../state/useUIStore'

export default function LoadingOverlay() {
  const isGenerating = useUIStore(s => s.isGenerating)

  if (!isGenerating) return null

  return (
    <div className="loading-overlay">
      <div className="bouncing-house">🏠</div>
      <p>AI Architect is designing...</p>
    </div>
  )
}
