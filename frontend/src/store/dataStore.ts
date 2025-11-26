import { create } from 'zustand'

import { dashboardService } from '@/services/dashboardService'
import { dashboardMock } from '@/services/mockData'
import type { DashboardData } from '@/types/dashboard'

type DataState = {
  dashboard: DashboardData
  isLoading: boolean
  error?: string
  hydrate: (payload: Partial<DashboardData>) => void
  setLoading: (loading: boolean) => void
  setError: (message?: string) => void
  fetchDashboard: () => Promise<void>
}

export const useDataStore = create<DataState>((set) => ({
  dashboard: dashboardMock,
  isLoading: false,
  hydrate: (payload) =>
    set((state) => ({
      dashboard: { ...state.dashboard, ...payload },
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  fetchDashboard: async () => {
    set({ isLoading: true, error: undefined })
    try {
      const snapshot = await dashboardService.getSnapshot()
      set({ dashboard: snapshot, isLoading: false })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unable to load dashboard',
        dashboard: dashboardMock,
      })
    }
  },
}))
