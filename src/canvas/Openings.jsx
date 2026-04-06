export default function Openings({ openings, walls, onRemove, deleteMode }) {
  return openings.map((item, i) => {
    const wall = walls.find(w => w.id === item.wallId && w.floor === item.floor)
    if (!wall) return null

    const { position, rotation, length, normal } = wall

    const dirX = Math.cos(rotation[1])
    const dirZ = Math.sin(rotation[1])

    const offsetCentered = item.offset - length / 2

    const x = position[0] + dirX * offsetCentered + normal[0] * 0.12
    const z = position[2] + dirZ * offsetCentered + normal[2] * 0.12

    const isDoor = item.type === "DOOR"

    return (
      <mesh
        key={i}
        position={[x, isDoor ? position[1] : position[1] + 0.4, z]}
        rotation={rotation}
        onClick={(e) => {
          e.stopPropagation()
          if (deleteMode) onRemove(i)
        }}
      >
        <boxGeometry args={isDoor ? [0.7, 1.1, 0.12] : [0.5, 0.5, 0.12]} />
        <meshStandardMaterial
          color={deleteMode ? "red" : isDoor ? "#3e2723" : "#4fc3f7"}
        />
      </mesh>
    )
  })
}