import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import BottomNav from './BottomNav'
import OfflineBanner from './OfflineBanner'
import useOnlineStatus from '../../hooks/useOnlineStatus'

export const Layout = () => {
  useOnlineStatus()

  return (
    <div className="min-h-screen bg-gray-50">
      <OfflineBanner />
      <Navbar />
      <main className="pt-20 pb-24 md:pb-8">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

export default Layout
