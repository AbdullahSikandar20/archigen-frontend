import { useUIStore } from '../state/useUIStore'

export default function Sidebar() {
  const setPlacementMode = useUIStore(s => s.setPlacementMode)
  const toggleDeleteMode = useUIStore(s => s.toggleDeleteMode)

  const mode = useUIStore(s => s.placementMode)
  const deleteMode = useUIStore(s => s.deleteMode)

  return (
    <div className="sidebar">
      <h3>Components</h3>

      <button
        className={mode === "WINDOW" ? "active" : ""}
        onClick={() => setPlacementMode("WINDOW")}
      >
        🪟 Window
      </button>

      <button
        className={mode === "DOOR" ? "active" : ""}
        onClick={() => setPlacementMode("DOOR")}
      >
        🚪 Door
      </button>

      <hr />

      <button
        className={deleteMode ? "active-delete" : ""}
        onClick={toggleDeleteMode}
      >
        ❌ Remove
      </button>
    </div>
  )
}