import { Suspense } from 'react'

import { AppRoutes } from '@/routes'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 antialiased">
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
