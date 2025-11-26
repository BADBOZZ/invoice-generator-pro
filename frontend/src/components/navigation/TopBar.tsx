import { Menu, Search } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

const TopBar = () => {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)

  return (
    <header className="flex flex-col gap-4 border-b border-white/5 bg-slate-950/70 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white/80 transition hover:border-white/30 md:hidden"
        >
          <Menu className="h-4 w-4" />
          Menu
        </button>
        <nav className="flex flex-1 flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
          <NavLink to="/app" className="hover:text-white">
            Home
          </NavLink>
          {segments.map((segment, index) => (
            <span key={segment}>
              /
              <span className="ml-2 capitalize text-white/70">
                {segments.slice(0, index + 1).join(' / ')}
              </span>
            </span>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              placeholder="Quick search"
              className="w-56 rounded-full bg-white/5 py-2 pl-9 pr-3 text-sm text-white outline-none transition focus:bg-white/10"
            />
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-r from-brand-400 to-brand-600 text-center text-sm font-semibold leading-9 text-white">
            IG
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopBar
