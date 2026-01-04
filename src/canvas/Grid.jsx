import { GridHelper } from 'three'

export default function Grid() {
  return (
    <primitive
      object={new GridHelper(20, 20)}
      position={[0, 0, 0]}
    />
  )
}
