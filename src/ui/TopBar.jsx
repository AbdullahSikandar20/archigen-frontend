import { useEffect } from "react";
import { useUIStore } from "../state/useUIStore";
import { generateHouse } from "../services/houseAI";

export default function TopBar({ onExport }) {
  const {
    floorCount,
    setFloorCount,
    setLoading,
    setHouseData
  } = useUIStore();

  async function handleGenerate() {
    setLoading(true);
    try {
      const data = await generateHouse(floorCount);
      setHouseData(data);
    } catch (e) {
      alert("House generation failed.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGenerate();
  }, [floorCount]);

  return (
    <div className="topbar">
      <div className="left">
        <h1>ArchiGen</h1>
      </div>

      <div className="center">
        <button className="btn-metal generate" onClick={handleGenerate}>
          Generate House
        </button>

        <button className="btn-metal" onClick={onExport}>
          Export glTF
        </button>
      </div>

      <div className="right">
        <button
          className={`btn-metal ${floorCount === 1 ? "active" : ""}`}
          onClick={() => setFloorCount(1)}
        >
          1 Floor
        </button>

        <button
          className={`btn-metal ${floorCount === 2 ? "active" : ""}`}
          onClick={() => setFloorCount(2)}
        >
          2 Floors
        </button>
      </div>
    </div>
  );
}
