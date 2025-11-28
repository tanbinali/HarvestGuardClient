import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useOfflineStore = create(
  persist(
    (set, get) => ({
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
      pendingActions: [],
      cachedData: {
        batches: [],
        achievements: [],
        lossEvents: [],
        interventions: [],
        dashboard: null
      },

      setOnline: (isOnline) => set({ isOnline }),

      addPendingAction: (action) => set((state) => ({
        pendingActions: [...state.pendingActions, {
          ...action,
          id: Date.now(),
          timestamp: new Date().toISOString()
        }]
      })),

      removePendingAction: (actionId) => set((state) => ({
        pendingActions: state.pendingActions.filter(a => a.id !== actionId)
      })),

      clearPendingActions: () => set({ pendingActions: [] }),

      setCachedData: (key, data) => set((state) => ({
        cachedData: { ...state.cachedData, [key]: data }
      })),

      getCachedData: (key) => get().cachedData[key],

      addToCache: (key, item) => set((state) => ({
        cachedData: {
          ...state.cachedData,
          [key]: [...(state.cachedData[key] || []), item]
        }
      })),

      updateInCache: (key, id, updates) => set((state) => ({
        cachedData: {
          ...state.cachedData,
          [key]: state.cachedData[key]?.map(item => 
            item.id === id ? { ...item, ...updates } : item
          ) || []
        }
      })),

      removeFromCache: (key, id) => set((state) => ({
        cachedData: {
          ...state.cachedData,
          [key]: state.cachedData[key]?.filter(item => item.id !== id) || []
        }
      }))
    }),
    {
      name: 'harvestguard-offline'
    }
  )
)

export default useOfflineStore
