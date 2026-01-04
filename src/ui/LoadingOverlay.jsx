import { useUIStore } from '../state/useUIStore'

export default function LoadingOverlay() {
  const loading = useUIStore(s => s.loading)

  if (!loading) return null

  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Generating house...</p>
    </div>
  )
}
