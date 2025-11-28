import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader2 } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../../services/api'
import useAuthStore from '../../stores/authStore'
import useTranslation from '../../hooks/useTranslation'
import Input from '../common/Input'
import Button from '../common/Button'

export const LoginForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login } = useAuthStore()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const loginResponse = await authAPI.login(formData)
      const { access, refresh } = loginResponse.data
      
      const profileResponse = await authAPI.getProfile()
      const user = profileResponse.data
      
      login(user, access, refresh)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
        >
          {error}
        </motion.div>
      )}

      <Input
        label={t('auth.email')}
        type="email"
        name="email"
        placeholder="farmer@example.com"
        value={formData.email}
        onChange={handleChange}
        icon={Mail}
        required
      />

      <Input
        label={t('auth.password')}
        type="password"
        name="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        icon={Lock}
        required
      />

      <div className="flex items-center justify-between">
        <Link 
          to="/forgot-password"
          className="text-sm text-emerald-600 hover:text-emerald-700"
        >
          {t('auth.forgotPassword')}
        </Link>
      </div>

      <Button 
        type="submit" 
        fullWidth 
        size="lg"
        loading={loading}
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('auth.login')}
      </Button>

      <p className="text-center text-gray-600">
        {t('auth.noAccount')}{' '}
        <Link to="/register" className="text-emerald-600 font-semibold hover:text-emerald-700">
          {t('auth.register')}
        </Link>
      </p>
    </motion.form>
  )
}

export default LoginForm
