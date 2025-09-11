"use client";

import { delay, motion } from "framer-motion";
import {
  MapPin,
  Calculator,
  Search,
  BookOpen,
  Users,
  ArrowRight,
  Zap,
  Heart,
  Calendar,
  Star,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import Features from "../components/home/features";
import Testimonials from "../components/home/testimonials";
import FAQ from "../components/common/faq";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#1E1F4A]/10 to-blue-600/10 px-4 py-2 rounded-xs border border-[#1E1F4A]/20"
                >
                  <Zap className="w-4 h-4 text-[#1E1F4A]" />
                  <span className="text-sm font-semibold text-[#1E1F4A]">
                    All-in-One University Solution
                  </span>
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[#1E1F4A]">
                  COMSATS PLUS
                  <br />
                  <span className="text-2xl md:text-3xl text-gray-600 font-semibold">
                    Your Campus Companion
                  </span>
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  The ultimate solution for COMSATS University Lahore students.
                  Find empty rooms, calculate your GPA, and create lasting
                  memories - all in one powerful app.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.getElementById("features")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="bg-gradient-to-r from-[#1E1F4A] to-blue-600 text-white px-8 py-4 rounded-xs font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Explore Features</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#1E1F4A] text-[#1E1F4A] px-8 py-4 rounded-xs font-semibold hover:bg-[#1E1F4A] hover:text-white transition-all duration-300"
                >
                  Watch Demo
                </motion.button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1E1F4A]">500+</div>
                  <div className="text-sm text-gray-500 font-medium">
                    Active Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1E1F4A]">3</div>
                  <div className="text-sm text-gray-500 font-medium">
                    Core Features
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1E1F4A]">24/7</div>
                  <div className="text-sm text-gray-500 font-medium">
                    Available
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white p-8 rounded-xs border border-gray-200 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#1E1F4A] to-blue-600 rounded-xs flex items-center justify-center">
                      <Search className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1E1F4A]">Room Finder</h3>
                      <p className="text-sm text-gray-500 font-medium">
                        Real-time availability
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xs border border-gray-100">
                      <span className="text-sm font-medium text-gray-700">
                        Room A-101
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-xs font-semibold">
                        Available
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xs border border-gray-100">
                      <span className="text-sm font-medium text-gray-700">
                        Room B-205
                      </span>
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-xs font-semibold">
                        Occupied
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xs border border-gray-100">
                      <span className="text-sm font-medium text-gray-700">
                        Room C-301
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-xs font-semibold">
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-[#1E1F4A] to-blue-600 rounded-xs opacity-10"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xs opacity-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* FAQ Section */}
      <FAQ />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1F4A]">
              Want to contribute?
            </h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
              We're always looking for passionate students to help improve
              COMSATS PLUS. Whether it's coding, design, or spreading the word
              - every bit helps!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?subject=contribution-inquiry">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#1E1F4A] to-blue-600 text-white px-8 py-4 rounded-xs font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Contact Now</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
