import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      language: 'EN',

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setTokens: (accessToken, refreshToken) => set({ 
        accessToken, 
        refreshToken,
        isAuthenticated: !!accessToken 
      }),
      
      setLanguage: (language) => set({ language }),
      
      login: (user, accessToken, refreshToken) => set({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        language: user?.preferred_language || 'EN'
      }),
      
      logout: () => set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false
      }),
      
      updateUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      }))
    }),
    {
      name: 'harvestguard-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        language: state.language
      })
    }
  )
)

export default useAuthStore
