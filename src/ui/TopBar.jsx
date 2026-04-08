import { useUIStore } from '../state/useUIStore'

export default function TopBar() {
  const isGenerating = useUIStore(s => s.isGenerating)
  const generateHouse = useUIStore(s => s.generateHouse)
  const houseKey = useUIStore(s => s.houseKey)
  const floorCount = useUIStore(s => s.floorCount)
  const setFloorCount = useUIStore(s => s.setFloorCount)
  const saveDesign = useUIStore(s => s.saveDesign)
  const loadDesign = useUIStore(s => s.loadDesign)

  const handleGenerate = async () => {
    generateHouse()
  }

  return (
    <div className="topbar">

      <div className="floors">
        <button
          className={floorCount === 1 ? "active" : ""}
          onClick={() => setFloorCount(1)}
        >
          1 Floor
        </button>

        <button
          className={floorCount === 2 ? "active" : ""}
          onClick={() => setFloorCount(2)}
        >
          2 Floor
        </button>
      </div>

      <div className="actions">
        <button onClick={() => saveDesign({ houseKey, floorCount })}>
          💾 Save
        </button>
        <button onClick={() => {
          const data = loadDesign();
          if (data) {
            setFloorCount(data.floorCount);
            // Optionally handle houseKey or full restoration logic
          }
        }}>
          📂 Load
        </button>
      </div>

      <button 
        className={`generate ${isGenerating ? "loading" : ""}`} 
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? "📐 Designing..." : "Generate House"}
      </button>

    </div>
  )
}