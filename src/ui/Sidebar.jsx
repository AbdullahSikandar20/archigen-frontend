import { useUIStore } from '../state/useUIStore'

export default function Sidebar() {
  const setPlacementMode = useUIStore(s => s.setPlacementMode)
  const toggleDeleteMode = useUIStore(s => s.toggleDeleteMode)

  const mode = useUIStore(s => s.placementMode)
  const deleteMode = useUIStore(s => s.deleteMode)

  const toggleGhost = useUIStore(s => s.toggleGhost)
  const ghostMode = useUIStore(s => s.ghostMode)
  const requestCameraChange = useUIStore(s => s.requestCameraChange)
  const zoomIn = useUIStore(s => s.zoomIn)
  const zoomOut = useUIStore(s => s.zoomOut)

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

      <hr />

      <div className="controls-group">
        <h3>Controls</h3>
        <button
          className={ghostMode ? "active-ghost" : ""}
          onClick={toggleGhost}
        >
          👻 Ghost Mode
        </button>
      </div>

      <hr />

      <div className="views-group">
        <h3>Views</h3>
        <button onClick={() => requestCameraChange([0, 2, 10])}>Front</button>
        <button onClick={() => requestCameraChange([10, 2, 0])}>Side</button>
        <button onClick={() => requestCameraChange([8, 8, 8])}>Iso</button>
      </div>

      <hr />

      <div className="controls-group">
        <h3>Zoom</h3>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={zoomIn} style={{ flex: 1, fontSize: '18px' }}>🔍+</button>
          <button onClick={zoomOut} style={{ flex: 1, fontSize: '18px' }}>🔍−</button>
        </div>
      </div>
    </div>
  )
}