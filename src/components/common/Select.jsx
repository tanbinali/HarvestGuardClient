import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  icon: Icon,
  disabled = false,
  required = false,
  className = ''
}) => {
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
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-3.5 rounded-xl
            ${Icon ? 'pl-12' : ''}
            pr-12
            border-2 border-gray-200
            bg-white text-gray-900
            focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-all duration-200
            text-base appearance-none
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}
            ${!value ? 'text-gray-400' : ''}
          `}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
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

export default Select
