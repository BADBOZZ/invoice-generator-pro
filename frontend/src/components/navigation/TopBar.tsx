import { Menu, Search } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

import Avatar from '@/components/ui/Avatar'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'

const TopBar = () => {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const user = useAuthStore((state) => state.user)

  return (
    <header className="flex flex-col gap-4 border-b border-slate-200/60 bg-white/70 px-4 py-4 text-slate-900 backdrop-blur transition dark:border-white/5 dark:bg-slate-950/70 dark:text-white md:px-8">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-slate-500 dark:border-white/10 dark:text-white/80 dark:hover:border-white/30 md:hidden"
        >
          <Menu className="h-4 w-4" />
          Menu
        </button>
        <nav className="flex flex-1 flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          <NavLink to="/app" className="hover:text-brand-500 dark:hover:text-white">
            Home
          </NavLink>
          {segments.map((segment, index) => (
            <span key={segment}>
              /
              <span className="ml-2 capitalize text-slate-700 dark:text-white/70">
                {segments.slice(0, index + 1).join(' / ')}
              </span>
            </span>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="search"
              placeholder="Quick search"
              className="w-56 rounded-full bg-white/80 py-2 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:bg-white dark:bg-white/5 dark:text-white dark:focus:bg-white/10"
            />
          </div>
          <ThemeToggle />
          {user ? <Avatar initials={user.name.slice(0, 2)} /> : null}
        </div>
      </div>
    </header>
  )
}

export default TopBar
