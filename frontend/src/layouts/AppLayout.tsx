import { Outlet } from 'react-router-dom'

import SidebarNav from '@/components/navigation/SidebarNav'
import TopBar from '@/components/navigation/TopBar'

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-transparent text-inherit">
      <SidebarNav />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AppLayout
