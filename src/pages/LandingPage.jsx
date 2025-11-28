import { motion } from 'framer-motion'
import HeroSection from '../components/landing/HeroSection'
import ProblemSection from '../components/landing/ProblemSection'
import SolutionSection from '../components/landing/SolutionSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import CTASection from '../components/landing/CTASection'
import { LanguageToggle } from '../components/common/LanguageToggle'
import { Wheat } from 'lucide-react'
import useTranslation from '../hooks/useTranslation'

export const LandingPage = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Wheat className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">{t('app.name')}</span>
            </div>
            <LanguageToggle />
          </motion.div>
        </div>
      </header>

      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <CTASection />

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Wheat className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">{t('app.name')}</span>
          </div>
          <p className="text-gray-400 text-sm">
            {t('app.tagline')}
          </p>
          <p className="text-gray-500 text-xs mt-4">
            © {new Date().getFullYear()} HarvestGuard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
