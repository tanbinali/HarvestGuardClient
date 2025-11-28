import { motion } from 'framer-motion'
import { ArrowRight, Leaf } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useTranslation from '../../hooks/useTranslation'
import Button from '../common/Button'

export const CTASection = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 relative overflow-hidden">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
          scale: { duration: 5, repeat: Infinity }
        }}
        className="absolute -top-20 -right-20 w-96 h-96 border border-white/10 rounded-full"
      />
      <motion.div
        animate={{ 
          rotate: -360
        }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] border border-white/10 rounded-full"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8"
          >
            <Leaf className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Protect Your Harvest?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10">
            Join thousands of farmers already saving their crops with HarvestGuard. 
            Start your journey today — it's completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl"
              onClick={() => navigate('/register')}
              className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl"
            >
              {t('landing.hero.cta')}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => navigate('/login')}
              className="border-white/30 text-white hover:bg-white/10"
            >
              {t('auth.login')}
            </Button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-white/60 text-sm"
          >
            No credit card required • Works on any device • Available offline
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
