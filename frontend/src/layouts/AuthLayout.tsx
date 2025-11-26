import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-white/5 bg-slate-900/70 p-8 shadow-soft">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-brand-300/80">
          Welcome back
        </p>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
