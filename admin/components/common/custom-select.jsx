"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Check } from "lucide-react"

export function CustomSelect({ value, onValueChange, options, placeholder, className = "" }) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className={`relative ${className}`}>
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xs text-left font-medium text-[#1E1F4A] hover:border-[#1E1F4A]/30 focus:border-[#1E1F4A] focus:outline-none transition-all duration-200 flex items-center justify-between"
        whileTap={{ scale: 0.98 }}
      >
        <span className={selectedOption ? "text-[#1E1F4A]" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xs shadow-xl z-20 max-h-60 overflow-y-auto"
            >
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onValueChange(option.value)
                    setIsOpen(false)
                  }}
                  className="w-full px-4 py-3 text-left font-medium text-[#1E1F4A] hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between"
                  whileHover={{ backgroundColor: "#f9fafb" }}
                >
                  <span>{option.label}</span>
                  {value === option.value && <Check className="w-4 h-4 text-[#1E1F4A]" />}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
