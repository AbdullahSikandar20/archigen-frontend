import { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useUIStore } from '../state/useUIStore'

export default function Camera() {
  const controlsRef = useRef()
  const { camera } = useThree()
  const cameraPosition = useUIStore(s => s.cameraPosition)
  const requestCameraChange = useUIStore(s => s.requestCameraChange)

  const targetV = new THREE.Vector3()

  useFrame(() => {
    if (cameraPosition) {
      targetV.set(...cameraPosition)
      camera.position.lerp(targetV, 0.1)
      controlsRef.current.update()

      if (camera.position.distanceTo(targetV) < 0.1) {
        requestCameraChange(null)
      }
    }

    // Handle zoom commands from store
    const zoomDir = useUIStore.getState().zoomDirection
    if (zoomDir) {
      const dir = new THREE.Vector3()
      camera.getWorldDirection(dir)
      camera.position.addScaledVector(dir, zoomDir * 0.3)
      controlsRef.current.update()
      useUIStore.getState().clearZoom()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan
      enableZoom
      enableRotate
      makeDefault
    />
  )
}
