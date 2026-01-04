import { create } from 'zustand'

export const useUIStore = create(set => ({
  floorCount: 1,
  zenMode: false,
  loading: false,

  setFloorCount: (n) => set({ floorCount: n }),
  toggleZenMode: () => set(s => ({ zenMode: !s.zenMode })),
  setLoading: (v) => set({ loading: v }),
}))
