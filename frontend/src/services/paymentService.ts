import { apiClient } from './apiClient'
import { paymentsMock } from './mockData'

import type { Payment } from '@/types/models'

export const paymentService = {
  async list(): Promise<Payment[]> {
    try {
      const { data } = await apiClient.get<Payment[]>('/payments')
      return data
    } catch (error) {
      console.warn('Payments API unavailable, using mock data.', error)
      return paymentsMock
    }
  },
}
