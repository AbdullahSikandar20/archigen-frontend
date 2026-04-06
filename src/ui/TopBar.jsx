import { useUIStore } from '../state/useUIStore'

export default function TopBar() {
  const generateHouse = useUIStore(s => s.generateHouse)
  const floorCount = useUIStore(s => s.floorCount)
  const setFloorCount = useUIStore(s => s.setFloorCount)

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

      <button className="generate" onClick={generateHouse}>
        Generate House
      </button>

    </div>
  )
}