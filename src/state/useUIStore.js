import { create } from 'zustand'

export const useUIStore = create(set => ({
  zenMode: false,
  houseKey: 0,
  floorCount: 1,

  placementMode: null,
  deleteMode: false,

  // ✅ Zen
  toggleZen: () => set(state => ({ zenMode: !state.zenMode })),

  // ✅ Floor
  setFloorCount: (count) => set({ floorCount: count }),

  // ✅ Generate (this is IMPORTANT)
  generateHouse: () =>
    set(state => ({
      houseKey: state.houseKey + 1
    })),

  // ✅ Placement
  setPlacementMode: (mode) =>
    set({ placementMode: mode, deleteMode: false }),

  toggleDeleteMode: () =>
    set(state => ({
      deleteMode: !state.deleteMode,
      placementMode: null
    }))
}))