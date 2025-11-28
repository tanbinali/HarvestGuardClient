import { motion } from 'framer-motion'
import { WifiOff, Smartphone, Gift, Award } from 'lucide-react'
import useTranslation from '../../hooks/useTranslation'

const features = [
  { key: 'offline', icon: WifiOff, gradient: 'from-blue-500 to-indigo-500' },
  { key: 'simple', icon: Smartphone, gradient: 'from-emerald-500 to-teal-500' },
  { key: 'free', icon: Gift, gradient: 'from-pink-500 to-rose-500' },
  { key: 'badges', icon: Award, gradient: 'from-amber-500 to-orange-500' }
]

export const FeaturesSection = () => {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 0.1, x: 0 }}
        viewport={{ once: true }}
        className="absolute left-0 top-1/2 -translate-y-1/2 text-[300px] font-black text-emerald-500 leading-none pointer-events-none"
      >
        WHY
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('landing.features.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-gray-100 relative overflow-hidden">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.15, type: 'spring' }}
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t(`landing.features.${feature.key}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`landing.features.${feature.key}.desc`)}
                </p>

                <motion.div
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
