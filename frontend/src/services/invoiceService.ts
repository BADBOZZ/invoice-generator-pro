import { apiClient } from './apiClient'
import { invoicesMock } from './mockData'

import type { Invoice } from '@/types/models'

export const invoiceService = {
  async list(): Promise<Invoice[]> {
    try {
      const { data } = await apiClient.get<Invoice[]>('/invoices')
      return data
    } catch (error) {
      console.warn('Invoices API unavailable, using mock data.', error)
      return invoicesMock
    }
  },
}
