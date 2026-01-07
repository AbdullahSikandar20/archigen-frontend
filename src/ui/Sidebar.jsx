export default function Sidebar() {
  function handleImport(e) {
    alert("Import feature coming next phase!");
  }

  return (
    <div className="sidebar">
      <div className="section">
        <h3>Components</h3>

        <div className="component">🪟 Window</div>
        <div className="component">🚪 Door</div>

        <p className="note">
          Drag & drop onto walls<br />
          (Placement coming soon)
        </p>
      </div>

      <div className="section">
        <h3>Import</h3>
        <input type="file" onChange={handleImport} />
      </div>
    </div>
  )
}
