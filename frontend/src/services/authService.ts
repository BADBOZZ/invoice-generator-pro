import { apiClient, setAuthToken } from './apiClient'
import { mockUser } from './mockData'

export type LoginPayload = {
  email: string
  password: string
}

type AuthResponse = {
  user: typeof mockUser
  token: string
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    try {
      const { data } = await apiClient.post<AuthResponse>('/auth/login', payload)
      setAuthToken(data.token)
      return data
    } catch (error) {
      console.warn('Auth API unavailable, using mock user.', error)
      const token = 'mock-token'
      setAuthToken(token)
      return {
        user: mockUser,
        token,
      }
    }
  },
  async logout() {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.warn('Logout fallback applied.', error)
    } finally {
      setAuthToken(null)
    }
  },
}
