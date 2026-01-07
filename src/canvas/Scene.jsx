import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import Camera from './Camera'
import Lights from './Lights'
import Grid from './Grid'
import HouseGenerator from '../models/HouseGenerator'
import { exportToGLTF } from '../utils/exportGLTF'

export default function Scene({ onExportReady }) {
  const houseRef = useRef()

  function handleExport() {
    if (!houseRef.current) {
      alert("Generate a house first!");
      return;
    }
    exportToGLTF(houseRef.current);
  }

  // expose export function to parent
  onExportReady?.(handleExport);

  return (
    <Canvas shadows>
      <Camera />
      <Lights />
      <Grid />
      <HouseGenerator ref={houseRef} />
    </Canvas>
  )
}
