import { motion } from 'framer-motion'
import { Database, AlertTriangle, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import useTranslation from '../../hooks/useTranslation'

const steps = [
  { key: 'data', icon: Database, color: 'from-blue-500 to-cyan-500' },
  { key: 'warning', icon: AlertTriangle, color: 'from-amber-500 to-orange-500' },
  { key: 'action', icon: Zap, color: 'from-purple-500 to-pink-500' },
  { key: 'saved', icon: CheckCircle, color: 'from-emerald-500 to-green-500' }
]

const AnimatedLine = ({ delay }) => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="hidden md:block absolute top-1/2 left-full w-full h-1 bg-gradient-to-r from-gray-200 to-transparent origin-left -translate-y-1/2"
    style={{ width: 'calc(100% - 4rem)' }}
  />
)

export const SolutionSection = () => {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-100 to-green-100 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('landing.solution.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center relative z-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.2, type: 'spring' }}
                  className="absolute -top-4 -left-4 w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                >
                  {index + 1}
                </motion.div>

                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t(`landing.solution.steps.${step.key}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`landing.solution.steps.${step.key}.desc`)}
                </p>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20"
                >
                  <ArrowRight className="w-8 h-8 text-emerald-500" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 relative"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-1">
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    See the Difference in Action
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Watch how HarvestGuard transforms the journey from vulnerable harvest to protected prosperity.
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-full md:w-auto flex justify-center"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ 
                        boxShadow: ['0 0 0 0 rgba(16, 185, 129, 0.4)', '0 0 0 20px rgba(16, 185, 129, 0)']
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-40 h-40 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-20 h-20 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SolutionSection
