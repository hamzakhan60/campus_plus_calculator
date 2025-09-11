"use client"
import { motion } from "framer-motion"
import { RefreshCw } from "lucide-react"

export default function Button({
  children,
  onClick,
  disabled,
  loading = false,
  variant = "primary",
  icon: Icon,
}) {
  const baseClasses =
    "flex items-center justify-center space-x-2 px-6 py-3 font-semibold rounded-xs transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary:
      "bg-gradient-to-r from-[#1E1F4A] to-blue-600 text-white hover:from-blue-700 hover:to-blue-800",
    secondary:
      "border-2 border-[#1E1F4A] text-[#1E1F4A] hover:bg-[#1E1F4A] hover:text-white",
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="w-4 h-4" />
        </motion.div>
      )}
      {Icon && !loading && <Icon className="w-4 h-4" />}
      <span>{children}</span>
    </motion.button>
  )
}
