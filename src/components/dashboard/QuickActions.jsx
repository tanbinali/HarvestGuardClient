import { motion } from 'framer-motion'
import { Plus, FileText, AlertTriangle, Award } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useTranslation from '../../hooks/useTranslation'

const actions = [
  { key: 'addBatch', icon: Plus, path: '/crops/new', color: 'bg-emerald-500' },
  { key: 'viewCrops', icon: FileText, path: '/crops', color: 'bg-blue-500' },
  { key: 'reportLoss', icon: AlertTriangle, path: '/loss-events/new', color: 'bg-amber-500' },
  { key: 'achievements', icon: Award, path: '/achievements', color: 'bg-purple-500' }
]

export const QuickActions = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const labels = {
    addBatch: t('dashboard.addBatch'),
    viewCrops: t('crops.title'),
    reportLoss: t('lossEvents.addEvent'),
    achievements: t('achievements.title')
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{t('dashboard.quickActions')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center shadow-lg`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">
              {labels[action.key]}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions
