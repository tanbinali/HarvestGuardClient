import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Wheat, AlertTriangle, Zap, TrendingUp, Loader2 } from 'lucide-react'
import { cropsAPI, achievementsAPI } from '../services/api'
import useAuthStore from '../stores/authStore'
import useOfflineStore from '../stores/offlineStore'
import useTranslation from '../hooks/useTranslation'
import StatsCard from '../components/dashboard/StatsCard'
import QuickActions from '../components/dashboard/QuickActions'
import CropBatchCard from '../components/crops/CropBatchCard'
import AchievementCard from '../components/achievements/AchievementCard'

export const DashboardPage = () => {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const { cachedData, setCachedData } = useOfflineStore()
  
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [recentBatches, setRecentBatches] = useState([])
  const [achievements, setAchievements] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardRes, batchesRes, achievementsRes] = await Promise.all([
          cropsAPI.getDashboard(),
          cropsAPI.getActive(),
          achievementsAPI.getAll()
        ])
        
        setStats(dashboardRes.data)
        setRecentBatches(batchesRes.data.slice(0, 3))
        setAchievements(achievementsRes.data)
        
        setCachedData('dashboard', dashboardRes.data)
        setCachedData('batches', batchesRes.data)
        setCachedData('achievements', achievementsRes.data)
      } catch (error) {
        if (cachedData.dashboard) setStats(cachedData.dashboard)
        if (cachedData.batches) setRecentBatches(cachedData.batches.slice(0, 3))
        if (cachedData.achievements) setAchievements(cachedData.achievements)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {t('dashboard.welcome')}, {user?.first_name || 'Farmer'}! 👋
        </h1>
        <p className="text-gray-600">Here's how your harvest is doing today</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title={t('dashboard.totalBatches')}
          value={stats?.total_batches || 0}
          icon={Wheat}
          color="emerald"
        />
        <StatsCard
          title={t('dashboard.lossEvents')}
          value={stats?.total_loss_events || 0}
          icon={AlertTriangle}
          color="amber"
        />
        <StatsCard
          title={t('dashboard.interventions')}
          value={stats?.total_interventions || 0}
          icon={Zap}
          color="purple"
        />
        <StatsCard
          title={t('dashboard.successRate')}
          value={`${stats?.intervention_success_rate || 0}%`}
          icon={TrendingUp}
          color="blue"
        />
      </div>

      <div className="mb-8">
        <QuickActions />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {t('dashboard.activeBatches')}
            </h2>
          </div>
          {recentBatches.length > 0 ? (
            <div className="space-y-4">
              {recentBatches.map((batch) => (
                <CropBatchCard key={batch.id} batch={batch} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <Wheat className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{t('crops.noBatches')}</p>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {t('achievements.title')}
            </h2>
          </div>
          {achievements.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {achievements.slice(0, 4).map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <p className="text-gray-500">{t('achievements.noAchievements')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
