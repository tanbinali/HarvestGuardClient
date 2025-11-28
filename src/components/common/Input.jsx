import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full ${className}`}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-3.5 rounded-xl
            ${Icon ? 'pl-12' : ''}
            ${isPassword ? 'pr-12' : ''}
            border-2 border-gray-200
            bg-white text-gray-900
            placeholder:text-gray-400
            focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-all duration-200
            text-base
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}

export default Input
