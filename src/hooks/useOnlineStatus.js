import { useEffect } from 'react'
import useOfflineStore from '../stores/offlineStore'

export const useOnlineStatus = () => {
  const { isOnline, setOnline, pendingActions } = useOfflineStore()

  useEffect(() => {
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    setOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [setOnline])

  return { isOnline, pendingActions }
}

export default useOnlineStatus
