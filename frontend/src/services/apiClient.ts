import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL ?? 'https://mock.invoicepro.app'

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

const getStoredToken = () => {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem('invoicepro_token')
}

export const setAuthToken = (token: string | null) => {
  if (typeof window !== 'undefined') {
    if (token) {
      window.localStorage.setItem('invoicepro_token', token)
    } else {
      window.localStorage.removeItem('invoicepro_token')
    }
  }

  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete apiClient.defaults.headers.common.Authorization
  }
}

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message ?? error.message ?? 'Request failed'
    return Promise.reject(new Error(message))
  },
)
