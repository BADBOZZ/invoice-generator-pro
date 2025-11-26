import { Moon, Sun } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/uiStore'

const ThemeToggle = () => {
  const theme = useUIStore((state) => state.theme)
  const setTheme = useUIStore((state) => state.setTheme)

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition',
        isDark
          ? 'border-white/10 text-white/80 hover:border-white/40'
          : 'border-slate-300 text-slate-600 hover:border-slate-500',
      )}
    >
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      {isDark ? 'Dark' : 'Light'}
    </button>
  )
}

export default ThemeToggle
