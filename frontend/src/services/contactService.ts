import { apiClient } from './apiClient'
import { contactsMock } from './mockData'

import type { Contact } from '@/types/models'

export const contactService = {
  async list(): Promise<Contact[]> {
    try {
      const { data } = await apiClient.get<Contact[]>('/contacts')
      return data
    } catch (error) {
      console.warn('Contacts API unavailable, using mock data.', error)
      return contactsMock
    }
  },
}
