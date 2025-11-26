import { NavLink } from 'react-router-dom'

import { primaryNav, secondaryNav } from '@/config/navigation'

const SidebarNav = () => {
  return (
    <aside className="hidden w-64 border-r border-white/5 bg-slate-950/80 px-4 py-8 md:flex md:flex-col">
      <div className="px-2">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-400/80">
          Invoice Generator
        </p>
        <p className="mt-2 text-lg font-semibold text-white">Pro Console</p>
      </div>
      <nav className="mt-10 flex flex-1 flex-col gap-10 text-sm text-slate-400">
        <div className="space-y-1">
          {primaryNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-xl px-3 py-2 font-medium transition',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white',
                ].join(' ')
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="space-y-1">
          {secondaryNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-xl px-3 py-2 font-medium transition',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white',
                ].join(' ')
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-xs text-slate-300">
        Real-time approvals, PDF exports, and automations will appear here as
        we connect the backend.
      </div>
    </aside>
  )
}

export default SidebarNav
