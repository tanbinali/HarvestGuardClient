import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-500/30',
  secondary: 'bg-white text-emerald-700 border-2 border-emerald-500 hover:bg-emerald-50',
  danger: 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700',
  ghost: 'bg-transparent text-emerald-700 hover:bg-emerald-50',
  outline: 'bg-transparent border-2 border-white text-white hover:bg-white/10'
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl'
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  loading = false,
  icon: Icon,
  onClick,
  type = 'button',
  className = ''
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        rounded-xl font-semibold
        flex items-center justify-center gap-2
        transition-all duration-200
        focus:outline-none focus:ring-4 focus:ring-emerald-500/30
        ${className}
      `}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
        />
      ) : Icon ? (
        <Icon className="w-5 h-5" />
      ) : null}
      {children}
    </motion.button>
  )
}

export default Button
