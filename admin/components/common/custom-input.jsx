"use client"

import { motion } from "framer-motion"

export function CustomInput({ value, onChange, placeholder, className = "", ...props }) {
  return (
    <motion.input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xs font-medium text-[#1E1F4A] placeholder-gray-500 hover:border-[#1E1F4A]/30 focus:border-[#1E1F4A] focus:outline-none transition-all duration-200 ${className}`}
      whileFocus={{ scale: 1.01 }}
      {...props}
    />
  )
}
