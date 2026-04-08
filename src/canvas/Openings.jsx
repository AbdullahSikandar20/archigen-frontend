import React from 'react'
import { PremiumWindow } from '../models/ArchitecturalComponents'
import { useUIStore } from '../state/useUIStore'

export default function Openings({ openings, walls, onRemove, deleteMode }) {
  const ghostMode = useUIStore(s => s.ghostMode)

  return openings.map((item, i) => {
    // 🔍 Find the specific wall on the specific wing and floor
    const wall = walls.find(w => 
      w.id === item.wallId && 
      w.floor === item.floor && 
      (!item.sectionId || w.sectionId === item.sectionId)
    )
    
    if (!wall) return null

    const { position, rotation, length, normal } = wall
    const offsetCentered = item.offset - length / 2
    
    const dirX = Math.cos(rotation[1])
    const dirZ = Math.sin(rotation[1])
    
    // 📍 Calculate precise 3D position
    const x = position[0] + dirX * offsetCentered + normal[0] * 0.12
    const z = position[2] + dirZ * offsetCentered + normal[2] * 0.12
    const y = item.type === "DOOR" ? position[1] : position[1] + 0.4

    return (
      <group 
        key={i} 
        position={[x, y, z]} 
        rotation={rotation} 
        onClick={() => deleteMode && onRemove(i)}
      >
         {/* 💎 Use Premium Architectural Assets */}
         {item.type === "WINDOW" || item.type === "LUXURY_GLASS" ? (
            <PremiumWindow 
              width={item.type === "LUXURY_GLASS" ? 1.2 : 0.6} 
              height={0.6} 
              ghostMode={ghostMode}
            />
         ) : (
            <mesh>
               <boxGeometry args={[0.7, 1.1, 0.12]} />
               <meshStandardMaterial 
                 color={deleteMode ? "#ff5252" : "#1a1a1a"} 
                 transparent={true}
                 opacity={ghostMode ? 0.3 : 1}
               />
            </mesh>
         )}
      </group>
    )
  })
}