import { useMemo, useState } from 'react'
import Openings from '../canvas/Openings'
import { useUIStore } from '../state/useUIStore'

export default function HousePlaceholder({ floorCount }) {
  const [openings, setOpenings] = useState([])
  const [hoveredWall, setHoveredWall] = useState(null)
  const [preview, setPreview] = useState(null)

  const placementMode = useUIStore(s => s.placementMode)
  const deleteMode = useUIStore(s => s.deleteMode)

  // 🧱 Generate walls + size (SINGLE SOURCE OF TRUTH)
  const { walls, size } = useMemo(() => {
    const size = 2.5 + Math.random() * 1
    const allWalls = []

    for (let floor = 0; floor < floorCount; floor++) {
      const y = 0.5 + floor * 1.2

      allWalls.push(
        {
          id: "north",
          floor,
          position: [0, y, -size / 2],
          rotation: [0, 0, 0],
          length: size,
          normal: [0, 0, -1]
        },
        {
          id: "south",
          floor,
          position: [0, y, size / 2],
          rotation: [0, 0, 0],
          length: size,
          normal: [0, 0, 1]
        },
        {
          id: "east",
          floor,
          position: [size / 2, y, 0],
          rotation: [0, Math.PI / 2, 0],
          length: size,
          normal: [1, 0, 0]
        },
        {
          id: "west",
          floor,
          position: [-size / 2, y, 0],
          rotation: [0, Math.PI / 2, 0],
          length: size,
          normal: [-1, 0, 0]
        }
      )
    }

    return { walls: allWalls, size }
  }, [floorCount])

  function snapOffset(offset) {
    const grid = 0.25
    return Math.round(offset / grid) * grid
  }

  function isValidPlacement(newItem, wallLength) {
    const margin = 0.4

    // ✅ now uses dynamic wall length
    if (newItem.offset < margin || newItem.offset > wallLength - margin) {
      return false
    }

    for (let item of openings) {
      if (item.wallId === newItem.wallId && item.floor === newItem.floor) {
        const minDist = item.type === "DOOR" ? 0.9 : 0.6
        const dist = Math.abs(item.offset - newItem.offset)
        if (dist < minDist) return false
      }
    }

    return true
  }

  function computePosition(point, wall, type) {
    const localX = point.x - wall.position[0]
    const localZ = point.z - wall.position[2]

    const dirX = Math.cos(wall.rotation[1])
    const dirZ = Math.sin(wall.rotation[1])

    const offset = (localX * dirX + localZ * dirZ) + wall.length / 2
    const snapped = snapOffset(offset)

    const offsetCentered = snapped - wall.length / 2

    const x =
      wall.position[0] +
      dirX * offsetCentered +
      wall.normal[0] * 0.12

    const z =
      wall.position[2] +
      dirZ * offsetCentered +
      wall.normal[2] * 0.12

    const y =
      type === "DOOR"
        ? wall.position[1]
        : wall.position[1] + 0.4

    return { x, y, z, offset: snapped }
  }

  function handlePointerMove(e, wall) {
    if (!placementMode || deleteMode) return

    const pos = computePosition(e.point, wall, placementMode)

    setPreview({
      ...pos,
      type: placementMode,
      wallId: wall.id,
      floor: wall.floor
    })
  }

  function handlePointerOut() {
    setHoveredWall(null)
    setPreview(null)
  }

  function handleWallClick(e, wall) {
    e.stopPropagation()

    if (deleteMode || !placementMode) return

    const pos = computePosition(e.point, wall, placementMode)

    const newItem = {
      type: placementMode,
      wallId: wall.id,
      offset: pos.offset,
      floor: wall.floor
    }

    if (!isValidPlacement(newItem, wall.length)) return

    setOpenings(prev => [...prev, newItem])
  }

  function removeOpening(index) {
    setOpenings(prev => prev.filter((_, i) => i !== index))
  }

  // 🏠 Roof sizing (with slight randomness for realism)
  const roofSize = size + 0.2 + Math.random() * 0.2

  return (
    <group>

      {/* 🧱 Walls */}
      {walls.map((w, i) => (
        <mesh
          key={i}
          position={w.position}
          rotation={w.rotation}
          onClick={(e) => handleWallClick(e, w)}
          onPointerOver={() => setHoveredWall(i)}
          onPointerMove={(e) => handlePointerMove(e, w)}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[w.length, 1, 0.1]} />
          <meshStandardMaterial
            color={hoveredWall === i ? "#90caf9" : "#b0bec5"}
          />
        </mesh>
      ))}

      {/* 🪟 Openings */}
      <Openings
        openings={openings}
        walls={walls}
        onRemove={removeOpening}
        deleteMode={deleteMode}
      />

      {/* 👻 Preview */}
      {preview && (
        <mesh position={[preview.x, preview.y, preview.z]}>
          <boxGeometry
            args={
              preview.type === "DOOR"
                ? [0.7, 1.1, 0.12]
                : [0.5, 0.5, 0.12]
            }
          />
          <meshStandardMaterial
            color="yellow"
            transparent
            opacity={0.5}
          />
        </mesh>
      )}

      {/* 🧱 Floor separator (DYNAMIC) */}
      {floorCount === 2 && (
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[size, 0.05, size]} />
          <meshStandardMaterial color="#757575" />
        </mesh>
      )}

      {/* 🏠 Roof (FULLY PARAMETRIC) */}
      <mesh position={[0, 1.2 * floorCount + 0.2, 0]}>
        <boxGeometry args={[roofSize, 0.4, roofSize]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>

    </group>
  )
}