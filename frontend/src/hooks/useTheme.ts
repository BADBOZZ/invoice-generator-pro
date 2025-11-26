import { useEffect } from 'react'

import { useUIStore } from '@/store/uiStore'

export const useTheme = () => {
  const theme = useUIStore((state) => state.theme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return theme
}
