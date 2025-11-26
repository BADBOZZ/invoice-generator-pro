import { apiClient } from './apiClient'
import { quotesMock } from './mockData'

import type { Quote } from '@/types/models'

export const quoteService = {
  async list(): Promise<Quote[]> {
    try {
      const { data } = await apiClient.get<Quote[]>('/quotes')
      return data
    } catch (error) {
      console.warn('Quotes API unavailable, using mock data.', error)
      return quotesMock
    }
  },
}
