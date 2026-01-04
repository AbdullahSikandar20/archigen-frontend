import { Canvas } from '@react-three/fiber'
import Camera from './Camera'
import Lights from './Lights'
import Grid from './Grid'
import HousePlaceholder from '../models/HousePlaceholder'

export default function Scene() {
  return (
    <Canvas shadows>
      <Camera />
      <Lights />
      <Grid />

      
    <HousePlaceholder />

    </Canvas>
  )
}
