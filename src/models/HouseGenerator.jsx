import { forwardRef } from "react";
import { useUIStore } from "../state/useUIStore";

const HouseGenerator = forwardRef(function HouseGenerator(_, ref) {
  const houseData = useUIStore(s => s.houseData);

  if (!houseData) return null;

  const {
    floors,
    width,
    depth,
    wallColor,
    roofColor
  } = houseData;

  const floorHeight = 0.9;

  return (
    <group ref={ref}>
      {Array.from({ length: floors }).map((_, i) => (
        <mesh
          key={i}
          position={[0, floorHeight / 2 + i * floorHeight, 0]}
        >
          <boxGeometry args={[width, floorHeight, depth]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
      ))}

      <mesh position={[0, floors * floorHeight + 0.25, 0]}>
        <boxGeometry
          args={[width + 0.2, 0.4, depth + 0.2]}
        />
        <meshStandardMaterial color={roofColor} />
      </mesh>
    </group>
  );
});

export default HouseGenerator;
