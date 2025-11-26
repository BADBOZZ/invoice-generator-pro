import { create } from 'zustand'

type Theme = 'dark' | 'light'

type UIState = {
  theme: Theme
  isSidebarOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
  setTheme: (theme: Theme) => void
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'dark',
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  setTheme: (theme) => set({ theme }),
}))
