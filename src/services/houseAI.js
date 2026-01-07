export async function generateHouse(floorCount) {
  // Simulate AI generation delay
  await new Promise(r => setTimeout(r, 1800))

  // This is where later you’ll call your real AI backend
  return {
    floors: floorCount,
    width: 2 + Math.random(),
    depth: 2 + Math.random(),
    wallColor: `hsl(${Math.random() * 40},20%,70%)`,
    roofColor: `hsl(${Math.random() * 40},30%,45%)`,
  }
}
