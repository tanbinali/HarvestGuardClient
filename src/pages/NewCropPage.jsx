import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CropBatchForm from '../components/crops/CropBatchForm'
import useTranslation from '../hooks/useTranslation'

export const NewCropPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -5 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{t('common.back')}</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {t('crops.addBatch')}
        </h1>
        <CropBatchForm />
      </motion.div>
    </div>
  )
}

export default NewCropPage
