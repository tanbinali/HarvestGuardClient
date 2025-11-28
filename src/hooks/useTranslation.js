import { translations } from '../i18n/translations'
import useAuthStore from '../stores/authStore'

export const useTranslation = () => {
  const language = useAuthStore((state) => state.language)
  
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key
      }
    }
    
    return value || key
  }
  
  return { t, language }
}

export default useTranslation
