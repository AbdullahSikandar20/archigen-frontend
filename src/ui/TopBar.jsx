import { useUIStore } from '../state/useUIStore'

export default function TopBar() {
  const { floorCount, setFloorCount, setLoading } = useUIStore()

  function fakeGenerate() {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="topbar">
      <div className="left">
        <h1>ArchiGen</h1>
      </div>

      <div className="center">
       <button className="btn-metal generate" onClick={fakeGenerate}>
  Generate House
</button>

      </div>

      <div className="right">
        <button
  className={`btn-metal ${floorCount === 1 ? 'active' : ''}`}
  onClick={() => setFloorCount(1)}
>
  1 Floor
</button>

        <button
  className={`btn-metal ${floorCount === 2 ? 'active' : ''}`}
  onClick={() => setFloorCount(2)}
>
  2 Floors
</button>

      </div>
    </div>
  )
}
