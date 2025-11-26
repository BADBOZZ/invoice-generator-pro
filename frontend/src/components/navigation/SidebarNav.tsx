import { NavLink } from 'react-router-dom'

import { primaryNav, secondaryNav } from '@/config/navigation'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/uiStore'

const SidebarNav = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const closeSidebar = useUIStore((state) => state.closeSidebar)

  const navClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-3 rounded-xl px-3 py-2 font-medium transition',
      isActive
        ? 'bg-brand-500/15 text-brand-700 dark:bg-white/10 dark:text-white'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white',
    )

  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200/60 bg-white/95 px-4 py-8 text-slate-900 transition-transform dark:border-white/5 dark:bg-slate-950/95 md:static md:flex md:translate-x-0 md:flex-col',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="px-2">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-500/80">Invoice Generator</p>
          <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">Pro Console</p>
        </div>
        <nav className="mt-10 flex flex-1 flex-col gap-10 text-sm text-slate-500 dark:text-slate-400">
          <div className="space-y-1">
            {primaryNav.map((item) => (
              <NavLink key={item.path} to={item.path} className={navClass} onClick={closeSidebar}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="space-y-1">
            {secondaryNav.map((item) => (
              <NavLink key={item.path} to={item.path} className={navClass} onClick={closeSidebar}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
        <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-xs text-slate-500 dark:border-white/5 dark:bg-white/5 dark:text-slate-300">
          Real-time approvals, PDF exports, and automations will appear here as we connect the
          backend.
        </div>
      </aside>

      {isSidebarOpen ? (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
        />
      ) : null}
    </>
  )
}

export default SidebarNav
