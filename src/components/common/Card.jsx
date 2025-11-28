import { motion } from 'framer-motion'

export const Card = ({ 
  children, 
  className = '', 
  hover = false,
  onClick,
  padding = 'p-6'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
      onClick={onClick}
      className={`
        bg-white rounded-2xl shadow-lg
        ${padding}
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

export default Card
