import { create } from 'zustand'

function randomDesign(floorCount) {
  const types = ['L_SHAPE', 'L_SHAPE_BACK', 'U_SHAPE']
  const type = types[Math.floor(Math.random() * types.length)]
  const mW = +(3 + Math.random() * 2).toFixed(1)
  const mD = +(2.5 + Math.random() * 1.5).toFixed(1)
  const sections = [{ id: "Main", width: mW, depth: mD, pos: [0, 0], floors: floorCount }]

  if (type === 'L_SHAPE') {
    // Wing to LEFT or RIGHT, pushed BEHIND (negative Z)
    const w = +(1.5 + Math.random() * 1.5).toFixed(1)
    const d = +(2 + Math.random() * 1.5).toFixed(1)
    const s = Math.random() > 0.5 ? 1 : -1
    const behindOffset = +(Math.max(0, (d - mD) / 2)).toFixed(1)
    sections.push({ id: "Wing1", width: w, depth: d, pos: [+(s*(mW/2+w/2)).toFixed(1), -behindOffset], floors: Math.max(1, floorCount-(Math.random()>0.5?1:0)) })
  } else if (type === 'L_SHAPE_BACK') {
    // Wing BEHIND the main building (negative Z = away from front)
    const w = +(mW * 0.5 + Math.random()).toFixed(1)
    const d = +(1.5 + Math.random()).toFixed(1)
    const xOff = Math.random() > 0.5 ? +((mW - w) / 2).toFixed(1) : +(-(mW - w) / 2).toFixed(1)
    sections.push({ id: "WingB", width: w, depth: d, pos: [xOff, -(mD/2+d/2)], floors: 1 })
  } else {
    // U_SHAPE: wings to LEFT and RIGHT, slightly behind
    const w = +(1.2 + Math.random()).toFixed(1)
    const d = +(2 + Math.random()).toFixed(1)
    const zOff = +(-(Math.max(0, (d - mD) / 2))).toFixed(1)
    sections.push({ id: "WingL", width: w, depth: d, pos: [+(-(mW/2+w/2)).toFixed(1), zOff], floors: 1 })
    sections.push({ id: "WingR", width: w, depth: d, pos: [+((mW/2+w/2)).toFixed(1), zOff], floors: 1 })
  }

  const palettes = [
    { walls: '#f5f5f5', accent: '#5d4037', roof: '#212121', trim: '#9e9e9e' },
    { walls: '#eceff1', accent: '#37474f', roof: '#1a1a1a', trim: '#78909c' },
    { walls: '#efebe9', accent: '#4e342e', roof: '#263238', trim: '#8d6e63' },
  ]
  return {
    floorplan_type: type,
    sections,
    overhang: +(0.15 + Math.random() * 0.4).toFixed(2),
    palette: palettes[Math.floor(Math.random() * palettes.length)],
    hasDeck: Math.random() > 0.4,
    deckSide: Math.random() > 0.5 ? 'south' : 'east'
  }
}

export const useUIStore = create(set => ({
  zenMode: false, ghostMode: false, isGenerating: false,
  houseKey: 0, floorCount: 1, houseData: null, openings: [],
  placementMode: null, deleteMode: false, cameraPosition: null, zoomDirection: 0,

  requestCameraChange: (pos) => set({ cameraPosition: pos }),
  zoomIn: () => set({ zoomDirection: 1 }),
  zoomOut: () => set({ zoomDirection: -1 }),
  clearZoom: () => set({ zoomDirection: 0 }),
  toggleZen: () => set(s => ({ zenMode: !s.zenMode })),
  toggleGhost: () => set(s => ({ ghostMode: !s.ghostMode })),
  setGenerating: (val) => set({ isGenerating: val }),
  setFloorCount: (count) => set({ floorCount: count }),
  addOpening: (op) => set(s => ({ openings: [...s.openings, op] })),
  removeOpening: (idx) => set(s => ({ openings: s.openings.filter((_, i) => i !== idx) })),

  setPlacementMode: (mode) => set({ placementMode: mode, deleteMode: false }),
  toggleDeleteMode: () => set(s => ({ deleteMode: !s.deleteMode, placementMode: null })),

  generateHouse: async () => {
    set({ isGenerating: true })
    const { floorCount, openings } = useUIStore.getState()
    
    // Always use client-side randomizer for guaranteed variety
    const design = randomDesign(floorCount)

    const main = design.sections.find(s => s.id === "Main") || design.sections[0]
    const mapped = openings.map(o => ({
      ...o, sectionId: main.id,
      offset: Math.min(o.offset, ((o.wallId==='north'||o.wallId==='south') ? main.width : main.depth) - 0.3)
    }))

    set(s => ({ houseData: design, openings: mapped, houseKey: s.houseKey + 1, isGenerating: false }))
  },

  saveDesign: (d) => { localStorage.setItem('archigen_save', JSON.stringify(d)) },
  loadDesign: () => { const s = localStorage.getItem('archigen_save'); return s ? JSON.parse(s) : null },
}))