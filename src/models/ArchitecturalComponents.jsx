import React from 'react'

export function ModernWall({ length, height, ghostMode, hovered, color, onClick, onPointerOver, onPointerOut }) {
  return (
    <group>
      <mesh onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
        <boxGeometry args={[length, height, 0.12]} />
        <meshStandardMaterial
          color={hovered ? "#90caf9" : (color || "#f5f5f5")}
          transparent={true} opacity={ghostMode ? 0.3 : 1}
          roughness={0.8}
        />
      </mesh>
      {!ghostMode && (
        <mesh position={[0, height / 2, 0.065]}>
          <boxGeometry args={[length, 0.04, 0.04]} />
          <meshStandardMaterial color="#bdbdbd" />
        </mesh>
      )}
    </group>
  )
}

export function PremiumWindow({ width, height, ghostMode }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[width + 0.08, height + 0.08, 0.15]} />
        <meshStandardMaterial 
          color="#212121" 
          metalness={0.8} 
          roughness={0.2} 
          transparent={true}
          opacity={ghostMode ? 0.2 : 1}
        />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[width, height, 0.02]} />
        <meshStandardMaterial 
          color="#81d4fa" 
          transparent 
          opacity={ghostMode ? 0.1 : 0.4} 
          metalness={1} 
          roughness={0} 
        />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.02, height, 0.03]} />
        <meshStandardMaterial 
          color="#212121" 
          transparent={true}
          opacity={ghostMode ? 0.2 : 1}
        />
      </mesh>
    </group>
  )
}

export function ArchitecturalSlab({ width, depth, height = 0.18, color, ghostMode }) {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial 
          color={color || "#ffffff"} 
          roughness={0.6} 
          transparent={true}
          opacity={ghostMode ? 0.2 : 1}
        />
      </mesh>
      {!ghostMode && (
        <mesh position={[0, -height / 2 - 0.01, 0]}>
          <boxGeometry args={[width + 0.04, 0.02, depth + 0.04]} />
          <meshStandardMaterial color="#eeeeee" />
        </mesh>
      )}
    </group>
  )
}
