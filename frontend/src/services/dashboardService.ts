import { apiClient } from './apiClient'
import { dashboardMock } from './mockData'

import type { DashboardData } from '@/types/dashboard'

export const dashboardService = {
  async getSnapshot(): Promise<DashboardData> {
    try {
      const { data } = await apiClient.get<DashboardData>('/dashboard')
      return data
    } catch (error) {
      console.warn('Dashboard API unavailable, using mock data.', error)
      return dashboardMock
    }
  },
}
