import { useEffect, useState } from 'react'
import useOfflineStore from '../stores/offlineStore'
import { cropsAPI, lossEventsAPI, interventionsAPI } from '../services/api'

export const useSync = () => {
  const [isSyncing, setIsSyncing] = useState(false)
  const { isOnline, pendingActions, removePendingAction, clearPendingActions } = useOfflineStore()

  const syncPendingActions = async () => {
    if (!isOnline || pendingActions.length === 0) return

    setIsSyncing(true)
    
    for (const action of pendingActions) {
      try {
        switch (action.type) {
          case 'CREATE_BATCH':
            await cropsAPI.create(action.data)
            break
          case 'UPDATE_BATCH':
            await cropsAPI.update(action.id, action.data)
            break
          case 'DELETE_BATCH':
            await cropsAPI.delete(action.id)
            break
          case 'CREATE_LOSS_EVENT':
            await lossEventsAPI.create(action.data)
            break
          case 'CREATE_INTERVENTION':
            await interventionsAPI.create(action.data)
            break
          default:
            break
        }
        removePendingAction(action.id)
      } catch (error) {
        console.error('Sync error:', error)
      }
    }
    
    setIsSyncing(false)
  }

  useEffect(() => {
    if (isOnline && pendingActions.length > 0) {
      syncPendingActions()
    }
  }, [isOnline])

  return { isSyncing, syncPendingActions, pendingCount: pendingActions.length }
}

export default useSync
