import { create } from 'zustand'

import { authService, type LoginPayload, type RegisterPayload } from '@/services/authService'

type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

type AuthState = {
  user: User | null
  token: string | null
  isAuthenticating: boolean
  error?: string
  login: (payload: { user: User; token: string }) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
  authenticate: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'demo-user',
    name: 'Ariana Steele',
    email: 'ariana@invoicepro.app',
  },
  token: null,
  isAuthenticating: false,
  login: ({ user, token }) => set({ user, token, error: undefined }),
  logout: () => {
    set({ user: null, token: null })
    authService.logout()
  },
  updateUser: (partialUser) =>
    set((state) => (state.user ? { user: { ...state.user, ...partialUser } } : state)),
  authenticate: async (credentials) => {
    set({ isAuthenticating: true, error: undefined })
    try {
      const response = await authService.login(credentials)
      set({ user: response.user, token: response.token, isAuthenticating: false })
    } catch (error) {
      set({
        isAuthenticating: false,
        error: error instanceof Error ? error.message : 'Unable to login',
      })
    }
  },
  register: async (details) => {
    set({ isAuthenticating: true, error: undefined })
    try {
      const response = await authService.register(details)
      set({ user: response.user, token: response.token, isAuthenticating: false })
    } catch (error) {
      set({
        isAuthenticating: false,
        error: error instanceof Error ? error.message : 'Unable to register',
      })
    }
  },
}))
