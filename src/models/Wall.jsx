import { useRef } from 'react'

export default function Wall({ position, rotation, length = 3, height = 1, wallId }) {
  const ref = useRef()

  return (
    <mesh
      ref={ref}
      position={position}
      rotation={rotation}
      userData={{ wallId, length }}
    >
      <boxGeometry args={[length, height, 0.1]} />
      <meshStandardMaterial color="#b0bec5" />
    </mesh>
  )
}