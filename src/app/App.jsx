import { useRef } from "react"
import Scene from '../canvas/Scene'
import TopBar from '../ui/TopBar'
import Sidebar from '../ui/Sidebar'
import LoadingOverlay from '../ui/LoadingOverlay'
import { useUIStore } from '../state/useUIStore'
import ZenButton from '../ui/ZenButton'

export default function App() {
  const zenMode = useUIStore(s => s.zenMode)
  const exportFnRef = useRef(null)

  return (
    <div className="app">
      {!zenMode && <TopBar onExport={() => exportFnRef.current?.()} />}
      <div className="main">
        {!zenMode && <Sidebar />}
        <Scene onExportReady={(fn) => (exportFnRef.current = fn)} />
      </div>
      <ZenButton />
      <LoadingOverlay />
    </div>
  )
}
