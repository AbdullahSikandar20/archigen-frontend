// import { useRef } from 'react'
// import { useFrame } from '@react-three/fiber'
// import { useEffect, useMemo } from 'react'
// //not in use rn 
// export default function HousePlaceholder({ floorCount = 1 }) {
//   const ref = useRef()

//   // Randomize house properties on mount
//   const { wallHeight, wallColor, roofColor, width, depth } = useMemo(() => {
//     const wallHeight = 0.8 + Math.random() * 0.4  // 0.8 → 1.2
//     const wallColor = `hsl(${Math.floor(Math.random() * 50)}, 20%, 70%)`
//     const roofColor = `hsl(${Math.floor(Math.random() * 50)}, 30%, 50%)`
//     const width = 1.8 + Math.random() * 0.6  // 1.8 → 2.4
//     const depth = 1.8 + Math.random() * 0.6
//     return { wallHeight, wallColor, roofColor, width, depth }
//   }, [])

//   // Keyboard movement
//   useEffect(() => {
//     function move(e) {
//       if (!ref.current) return
//       if (e.key === 'ArrowUp') ref.current.position.z -= 0.1
//       if (e.key === 'ArrowDown') ref.current.position.z += 0.1
//       if (e.key === 'ArrowLeft') ref.current.position.x -= 0.1
//       if (e.key === 'ArrowRight') ref.current.position.x += 0.1
//     }
//     window.addEventListener('keydown', move)
//     return () => window.removeEventListener('keydown', move)
//   }, [])

//   // Subtle rotation
//   useFrame(() => {
//     if (ref.current) ref.current.rotation.y += 0.001
//   })

//   return (
//     <group ref={ref} position={[0, 0, 0]}>
//       {/* Walls */}
//       <mesh position={[0, wallHeight / 2, 0]}>
//         <boxGeometry args={[width, wallHeight, depth]} />
//         <meshStandardMaterial color={wallColor} />
//       </mesh>

//       {/* Roof */}
//       <mesh position={[0, wallHeight + 0.2, 0]}>
//         <boxGeometry args={[width + 0.2, 0.4, depth + 0.2]} />
//         <meshStandardMaterial color={roofColor} />
//       </mesh>
//     </group>
//   )
// }
