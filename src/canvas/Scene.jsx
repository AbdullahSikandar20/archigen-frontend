import { Canvas } from '@react-three/fiber'
import Camera from './Camera'
import Lights from './Lights'
import Grid from './Grid'
import HousePlaceholder from '../models/HousePlaceholder'

export default function Scene({ houseKey, floorCount }) {
  return (
    <Canvas shadows camera={{ position: [7, 7, 7], fov: 45 }}>
      <Camera />
      <Lights />
      <Grid />

      <HousePlaceholder floorCount={floorCount} />
    </Canvas>
  )
}