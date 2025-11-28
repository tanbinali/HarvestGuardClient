import { motion } from 'framer-motion'
import { Wheat, Leaf, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/auth/RegisterForm'
import { LanguageToggle } from '../components/common/LanguageToggle'
import useTranslation from '../hooks/useTranslation'

const benefits = [
  { key: 'track', text: 'Track all your crop batches in one place' },
  { key: 'alert', text: 'Get early warnings about potential risks' },
  { key: 'achieve', text: 'Earn achievements as you protect crops' },
  { key: 'offline', text: 'Works offline - sync when connected' }
]

export const RegisterPage = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: [null, 800],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 15 + Math.random() * 10,
              delay: i * 1.5,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ left: `${10 + i * 12}%` }}
            className="absolute text-white/20"
          >
            <Leaf className="w-8 h-8" />
          </motion.div>
        ))}

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Wheat className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">{t('app.name')}</h1>
            <p className="text-xl text-white/80 max-w-md mb-8">
              {t('app.tagline')}
            </p>

            <div className="space-y-4 text-left">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-white/90">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col min-h-screen">
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Wheat className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">{t('app.name')}</span>
          </Link>
          <LanguageToggle className="!bg-emerald-100 !text-emerald-700 !border-emerald-200" />
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {t('auth.register')}
              </h2>
              <p className="text-gray-600">
                Start protecting your harvest today
              </p>
            </div>

            <RegisterForm />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
