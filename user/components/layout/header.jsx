"use client"

import { motion } from "framer-motion"
import {
  Menu,
  X,
  Smartphone,
  ArrowLeft,
  Search,
  Calculator,
  MapPin,
  Calendar,
  Users,
  BookOpen,
  ChevronDown,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isHomePage = pathname === "/"

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#1E1F4A] to-blue-600 rounded-xs flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1E1F4A]">COMSATS PLUS</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {!isHomePage && (
              <Link
                href="/"
                className="text-gray-700 hover:text-[#1E1F4A] transition-colors font-medium flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Home</span>
              </Link>
            )}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-[#1E1F4A] transition-colors font-medium"
              >
                <span>Features</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xs shadow-lg z-50">
                  <div className="py-2">
                    <Link
                      href="/room-finder"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#1E1F4A] transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Search className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Room Finder</div>
                        <div className="text-xs text-gray-500">Find available rooms</div>
                      </div>
                    </Link>
                    <Link
                      href="/memory-map"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#1E1F4A] transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <MapPin className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Memory Map</div>
                        <div className="text-xs text-gray-500">Create and share memory maps</div>
                      </div>
                    </Link>
                    <div className="flex items-center space-x-3 px-4 py-3 text-gray-400 cursor-not-allowed">
                      <Calculator className="w-4 h-4" />
                      <div>
                        <div className="font-medium">GPA Calculator</div>
                        <div className="text-xs text-gray-400">Coming Soon</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 px-4 py-3 text-gray-400 cursor-not-allowed">
                      <Calendar className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Class Schedule</div>
                        <div className="text-xs text-gray-400">Coming Soon</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 px-4 py-3 text-gray-400 cursor-not-allowed">
                      <Users className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Study Groups</div>
                        <div className="text-xs text-gray-400">Coming Soon</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 px-4 py-3 text-gray-400 cursor-not-allowed">
                      <BookOpen className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Resource Library</div>
                        <div className="text-xs text-gray-400">Coming Soon</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/about"
              className={`transition-colors font-medium ${
                pathname === "/about" ? "text-[#1E1F4A] font-semibold" : "text-gray-700 hover:text-[#1E1F4A]"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`transition-colors font-medium ${
                pathname === "/contact" ? "text-[#1E1F4A] font-semibold" : "text-gray-700 hover:text-[#1E1F4A]"
              }`}
            >
              Contact
            </Link>
          </div>

          <button className="md:hidden text-[#1E1F4A]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 py-4 space-y-4">
            {!isHomePage && (
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-700 hover:text-[#1E1F4A] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Home</span>
              </Link>
            )}
            <Link
              href="/#features"
              className="block text-gray-700 hover:text-[#1E1F4A] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/room-finder"
              className="block text-gray-700 hover:text-[#1E1F4A] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Room Finder
            </Link>
            
            <div className="block text-gray-400 font-medium cursor-not-allowed">GPA Calculator (Coming Soon)</div>
            <div className="block text-gray-400 font-medium cursor-not-allowed">Memory Map (Coming Soon)</div>
            <div className="block text-gray-400 font-medium cursor-not-allowed">Class Schedule (Coming Soon)</div>
            <div className="block text-gray-400 font-medium cursor-not-allowed">Study Groups (Coming Soon)</div>
            <div className="block text-gray-400 font-medium cursor-not-allowed">Resource Library (Coming Soon)</div>
            <Link
              href="/about"
              className="block text-gray-700 hover:text-[#1E1F4A] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-[#1E1F4A] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
