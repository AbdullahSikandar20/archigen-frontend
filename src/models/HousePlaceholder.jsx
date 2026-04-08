import { useMemo, useState } from 'react'
import Openings from '../canvas/Openings'
import { useUIStore } from '../state/useUIStore'
import { ModernWall, ArchitecturalSlab } from './ArchitecturalComponents'

export default function HousePlaceholder({ floorCount }) {
  const houseData = useUIStore(s => s.houseData)
  const houseKey = useUIStore(s => s.houseKey)
  const openings = useUIStore(s => s.openings)
  const addOpening = useUIStore(s => s.addOpening)
  const removeOpening = useUIStore(s => s.removeOpening)
  const [hoveredWall, setHoveredWall] = useState(null)
  const ghostMode = useUIStore(s => s.ghostMode)
  const placementMode = useUIStore(s => s.placementMode)
  const deleteMode = useUIStore(s => s.deleteMode)

  const palette = houseData?.palette || { walls: '#f5f5f5', accent: '#5d4037', roof: '#212121', trim: '#9e9e9e' }
  const overhang = houseData?.overhang || 0.3

  const wings = useMemo(() => {
    const sections = (houseData?.sections?.length > 0)
      ? houseData.sections
      : [{ id: "main", width: 3, depth: 3, pos: [0, 0], floors: floorCount }]

    return sections.map(s => {
      const sf = s.floors || floorCount
      const px = s.pos?.[0] || 0
      const pz = s.pos?.[1] || 0
      const ww = []
      for (let f = 0; f < sf; f++) {
        const y = 0.5 + f * 1.2
        ww.push(
          { id: "north", sectionId: s.id, floor: f, position: [px, y, pz - s.depth/2], rotation: [0,0,0], length: s.width, normal: [0,0,-1] },
          { id: "south", sectionId: s.id, floor: f, position: [px, y, pz + s.depth/2], rotation: [0,0,0], length: s.width, normal: [0,0,1] },
          { id: "east",  sectionId: s.id, floor: f, position: [px + s.width/2, y, pz], rotation: [0,Math.PI/2,0], length: s.depth, normal: [1,0,0] },
          { id: "west",  sectionId: s.id, floor: f, position: [px - s.width/2, y, pz], rotation: [0,Math.PI/2,0], length: s.depth, normal: [-1,0,0] }
        )
      }
      return { ...s, walls: ww, sectionFloors: sf, px, pz }
    })
  }, [floorCount, houseData])

  const walls = useMemo(() => wings.flatMap(w => w.walls), [wings])

  function handleWallClick(e, wall) {
    e.stopPropagation()
    if (deleteMode || !placementMode) return
    const lx = e.point.x - wall.position[0]
    const lz = e.point.z - wall.position[2]
    const dx = Math.cos(wall.rotation[1])
    const dz = Math.sin(wall.rotation[1])
    const raw = (lx * dx + lz * dz) + wall.length / 2
    const offset = Math.round(raw / 0.25) * 0.25
    if (offset < 0.4 || offset > wall.length - 0.4) return
    addOpening({ type: placementMode, wallId: wall.id, offset, floor: wall.floor, sectionId: wall.sectionId })
  }

  return (
    <group key={houseKey}>
      {/* 🌳 Site Context */}
      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#2e7d32" roughness={1} />
      </mesh>

      {/* 🏙️ ARCHITECTURAL WINGS */}
      {wings.map((wing, i) => (
        <group key={`wing-${i}`}>
          {/* Foundation Slab */}
          <mesh position={[wing.px, 0, wing.pz]} castShadow receiveShadow>
             <boxGeometry args={[wing.width + 0.5, 0.12, wing.depth + 0.5]} />
             <meshStandardMaterial 
               color={palette.roof} 
               roughness={0.9} 
               transparent={true}
               opacity={ghostMode ? 0.2 : 1}
             />
          </mesh>

          {/* Wing Walls */}
          {wing.walls.map((w, idx) => (
            <group key={`${i}-${idx}`} position={w.position} rotation={w.rotation}>
               <ModernWall 
                 length={w.length} 
                 height={1} 
                 ghostMode={ghostMode} 
                 hovered={hoveredWall === `${i}-${idx}`} 
                 color={palette.walls}
                 onClick={(e) => handleWallClick(e, w)}
                 onPointerOver={() => setHoveredWall(`${i}-${idx}`)}
                 onPointerOut={() => setHoveredWall(null)}
               />
            </group>
          ))}

          {/* Floor Separators */}
          {wing.sectionFloors > 1 && Array.from({ length: wing.sectionFloors - 1 }).map((_, f) => (
             <mesh key={`fs-${f}`} position={[wing.px, 1.2 * (f + 1), wing.pz]}>
               <boxGeometry args={[wing.width + 0.08, 0.06, wing.depth + 0.08]} />
               <meshStandardMaterial 
                 color={palette.trim} 
                 transparent={true}
                 opacity={ghostMode ? 0.2 : 1}
               />
             </mesh>
          ))}

          {/* Roof Slab */}
          <group position={[wing.px, 1.2 * wing.sectionFloors, wing.pz]}>
            <ArchitecturalSlab 
              width={wing.width + overhang * 2} 
              depth={wing.depth + overhang * 2} 
              color={palette.roof} 
              ghostMode={ghostMode}
            />
          </group>
        </group>
      ))}

      {/* 🪟 OPENINGS */}
      <Openings 
        openings={openings} 
        walls={walls} 
        onRemove={removeOpening} 
        deleteMode={deleteMode} 
      />
    </group>
  )
}