import { motion } from 'framer-motion'
import { Home, Wheat, Plus, Award, User } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import useTranslation from '../../hooks/useTranslation'

const navItems = [
  { key: 'dashboard', icon: Home, path: '/dashboard' },
  { key: 'crops', icon: Wheat, path: '/crops' },
  { key: 'add', icon: Plus, path: '/crops/new', isAction: true },
  { key: 'achievements', icon: Award, path: '/achievements' },
  { key: 'profile', icon: User, path: '/profile' }
]

export const BottomNav = () => {
  const { t } = useTranslation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-lg md:hidden safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          item.isAction ? (
            <NavLink
              key={item.key}
              to={item.path}
              className="relative -mt-6"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <item.icon className="w-7 h-7 text-white" />
              </motion.div>
            </NavLink>
          ) : (
            <NavLink
              key={item.key}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all
                ${isActive ? 'text-emerald-600' : 'text-gray-400'}
              `}
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className="w-6 h-6" />
                  </motion.div>
                  <span className="text-xs font-medium">{t(`nav.${item.key}`)}</span>
                </>
              )}
            </NavLink>
          )
        ))}
      </div>
    </nav>
  )
}

export default BottomNav
