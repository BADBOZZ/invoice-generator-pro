import { Suspense } from 'react'

import { AppRoutes } from '@/routes'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/uiStore'

function App() {
  const theme = useTheme()
  const isDark = theme === 'dark'
  const sidebarOpen = useUIStore((state) => state.isSidebarOpen)

  return (
    <div
      className={cn(
        'min-h-screen antialiased transition-colors',
        isDark ? 'bg-slate-950 text-slate-50' : 'bg-slate-100 text-slate-900',
        sidebarOpen && 'overflow-hidden md:overflow-visible',
      )}
    >
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center text-sm text-slate-400">
            Loading experience…
          </div>
        }
      >
        <AppRoutes />
      </Suspense>
    </div>
  )
}

export default App
