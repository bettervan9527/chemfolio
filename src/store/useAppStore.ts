import { create } from 'zustand'

interface AppState {
  activeSection: string
  isMenuOpen: boolean
  setActiveSection: (section: string) => void
  toggleMenu: () => void
  closeMenu: () => void
}

export const useAppStore = create<AppState>((set) => ({
  activeSection: 'hero',
  isMenuOpen: false,
  setActiveSection: (section) => set({ activeSection: section }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
}))
