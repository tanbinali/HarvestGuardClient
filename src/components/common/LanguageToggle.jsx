import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import useAuthStore from '../../stores/authStore'

export const LanguageToggle = ({ className = '' }) => {
  const { language, setLanguage } = useAuthStore()

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'BN' : 'EN')
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full
        bg-white/10 backdrop-blur-sm border border-white/20
        text-white hover:bg-white/20 transition-all
        ${className}
      `}
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{language === 'EN' ? 'বাংলা' : 'English'}</span>
    </motion.button>
  )
}

export const LanguageToggleDark = ({ className = '' }) => {
  const { language, setLanguage } = useAuthStore()

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'BN' : 'EN')
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full
        bg-emerald-100 text-emerald-700
        hover:bg-emerald-200 transition-all
        ${className}
      `}
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{language === 'EN' ? 'বাংলা' : 'English'}</span>
    </motion.button>
  )
}

export default LanguageToggle
