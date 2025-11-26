import { apiClient, setAuthToken } from './apiClient'
import { mockUser } from './mockData'

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = LoginPayload & {
  name: string
  company?: string
}

type AuthResponse = {
  user: typeof mockUser
  token: string
}

const fallbackResponse = (overrides?: Partial<typeof mockUser>): AuthResponse => {
  const token = 'mock-token'
  const user = { ...mockUser, ...overrides }
  setAuthToken(token)
  return { user, token }
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    try {
      const { data } = await apiClient.post<AuthResponse>('/auth/login', payload)
      setAuthToken(data.token)
      return data
    } catch (error) {
      console.warn('Auth API unavailable, using mock user.', error)
      return fallbackResponse({ email: payload.email })
    }
  },
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    try {
      const { data } = await apiClient.post<AuthResponse>('/auth/register', payload)
      setAuthToken(data.token)
      return data
    } catch (error) {
      console.warn('Register API unavailable, using mock user.', error)
      return fallbackResponse({ name: payload.name, email: payload.email })
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
