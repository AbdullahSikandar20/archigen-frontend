import Scene from '../canvas/Scene'
import TopBar from '../ui/TopBar'
import Sidebar from '../ui/Sidebar'
import LoadingOverlay from '../ui/LoadingOverlay'
import { useUIStore } from '../state/useUIStore'
import ZenButton from '../ui/ZenButton'

export default function App() {
  const zenMode = useUIStore(s => s.zenMode)

  return (
    <div className="app">
      {!zenMode && <TopBar />}
      <div className="main">
        {!zenMode && <Sidebar />}
        <Scene />
      </div>
      <ZenButton />
      <LoadingOverlay />
    </div>
  )
}
