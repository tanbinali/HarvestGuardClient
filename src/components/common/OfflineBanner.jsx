import { motion, AnimatePresence } from 'framer-motion'
import { WifiOff, RefreshCw } from 'lucide-react'
import useOnlineStatus from '../../hooks/useOnlineStatus'
import useSync from '../../hooks/useSync'
import useTranslation from '../../hooks/useTranslation'

export const OfflineBanner = () => {
  const { isOnline, pendingActions } = useOnlineStatus()
  const { isSyncing, syncPendingActions, pendingCount } = useSync()
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {(!isOnline || pendingCount > 0) && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className={`
            fixed top-0 left-0 right-0 z-50
            px-4 py-3
            ${isOnline ? 'bg-amber-500' : 'bg-gray-800'}
            text-white text-center
            flex items-center justify-center gap-3
          `}
        >
          {!isOnline ? (
            <>
              <WifiOff className="w-5 h-5" />
              <span className="text-sm font-medium">{t('common.offline')}</span>
            </>
          ) : (
            <>
              <motion.div
                animate={{ rotate: isSyncing ? 360 : 0 }}
                transition={{ duration: 1, repeat: isSyncing ? Infinity : 0, ease: 'linear' }}
              >
                <RefreshCw className="w-5 h-5" />
              </motion.div>
              <span className="text-sm font-medium">
                {isSyncing ? t('common.syncing') : `${pendingCount} changes pending sync`}
              </span>
              {!isSyncing && (
                <button
                  onClick={syncPendingActions}
                  className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold hover:bg-white/30"
                >
                  Sync Now
                </button>
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default OfflineBanner
