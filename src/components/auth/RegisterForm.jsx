import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Phone, User, Loader2 } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../../services/api'
import useAuthStore from '../../stores/authStore'
import useTranslation from '../../hooks/useTranslation'
import Input from '../common/Input'
import Button from '../common/Button'
import Select from '../common/Select'

export const RegisterForm = () => {
  const { t, language } = useTranslation()
  const navigate = useNavigate()
  const { login } = useAuthStore()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    first_name: '',
    last_name: '',
    preferred_language: language,
    username: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setError('')
    
    if (name === 'email') {
      setFormData(prev => ({ ...prev, username: value.split('@')[0] }))
    }
  }

  const validateStep1 = () => {
    if (!formData.first_name || !formData.last_name) {
      setError('Please enter your name')
      return false
    }
    if (!formData.phone_number) {
      setError('Please enter your phone number')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!formData.email) {
      setError('Please enter your email')
      return false
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep2()) return

    setLoading(true)
    setError('')

    try {
      const registerData = {
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone_number,
        first_name: formData.first_name,
        last_name: formData.last_name,
        preferred_language: formData.preferred_language,
        username: formData.username || formData.email.split('@')[0]
      }
      
      await authAPI.register(registerData)
      
      const loginResponse = await authAPI.login({
        email: formData.email,
        password: formData.password
      })
      const { access, refresh } = loginResponse.data
      
      const profileResponse = await authAPI.getProfile()
      const user = profileResponse.data
      
      login(user, access, refresh)
      navigate('/dashboard')
    } catch (err) {
      const errorData = err.response?.data
      if (errorData) {
        const errorMessage = Object.values(errorData).flat().join('. ')
        setError(errorMessage || 'Registration failed. Please try again.')
      } else {
        setError('Registration failed. Please try again.')
      }
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
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={`w-16 h-2 rounded-full transition-all ${
              s <= step ? 'bg-emerald-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
        >
          {error}
        </motion.div>
      )}

      {step === 1 ? (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('auth.firstName')}
              type="text"
              name="first_name"
              placeholder="First name"
              value={formData.first_name}
              onChange={handleChange}
              icon={User}
              required
            />
            <Input
              label={t('auth.lastName')}
              type="text"
              name="last_name"
              placeholder="Last name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label={t('auth.phone')}
            type="tel"
            name="phone_number"
            placeholder="+880 1XXX XXXXXX"
            value={formData.phone_number}
            onChange={handleChange}
            icon={Phone}
            required
          />

          <Select
            label={t('profile.language')}
            name="preferred_language"
            value={formData.preferred_language}
            onChange={handleChange}
            options={[
              { value: 'EN', label: 'English' },
              { value: 'BN', label: 'বাংলা (Bangla)' }
            ]}
          />

          <Button type="button" fullWidth size="lg" onClick={handleNext}>
            {t('common.next')}
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
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

          <Input
            label={t('auth.confirmPassword')}
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            icon={Lock}
            required
          />

          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="secondary" 
              fullWidth 
              size="lg"
              onClick={() => setStep(1)}
            >
              {t('common.back')}
            </Button>
            <Button 
              type="submit" 
              fullWidth 
              size="lg"
              loading={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('auth.register')}
            </Button>
          </div>
        </motion.div>
      )}

      <p className="text-center text-gray-600">
        {t('auth.hasAccount')}{' '}
        <Link to="/login" className="text-emerald-600 font-semibold hover:text-emerald-700">
          {t('auth.login')}
        </Link>
      </p>
    </motion.form>
  )
}

export default RegisterForm
