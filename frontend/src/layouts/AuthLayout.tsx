import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-soft backdrop-blur dark:border-white/5 dark:bg-slate-900/70">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-brand-500/80">
          Welcome back
        </p>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
