"use client"

import { motion } from "framer-motion"
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
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const features = [
    {
      icon: Search,
      title: "Empty Room Finder",
      description:
        "Find available rooms in real-time with advanced filters. Perfect for study sessions or makeup classes.",
      status: "Available",
      highlights: ["Real-time updates", "Advanced filters", "Room booking"],
    },
    {
      icon: Calculator,
      title: "GPA/CGPA Calculator",
      description:
        "Calculate your semester and cumulative GPA with COMSATS criteria. Track your academic progress effortlessly.",
      status: "Available",
      highlights: ["COMSATS criteria", "Progress tracking", "Grade analysis"],
    },
    {
      icon: MapPin,
      title: "Memory Mapping",
      description:
        "Pin memories on the university map. Mark special locations and add personal notes to create your campus story.",
      status: "Available",
      highlights: ["Interactive map", "Personal notes", "Memory sharing"],
    },
    {
      icon: Calendar,
      title: "Class Schedule",
      description: "Manage your class timetable with smart notifications and conflict detection.",
      status: "Coming Soon",
      highlights: ["Smart notifications", "Conflict detection", "Schedule sync"],
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Connect with classmates and form study groups based on subjects and schedules.",
      status: "Coming Soon",
      highlights: ["Peer matching", "Group chat", "Study sessions"],
    },
    {
      icon: BookOpen,
      title: "Resource Library",
      description: "Access shared notes, past papers, and study materials from your peers.",
      status: "Coming Soon",
      highlights: ["Shared resources", "Past papers", "Study materials"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#1E1F4A]/10 to-blue-600/10 px-4 py-2 rounded-xs border border-[#1E1F4A]/20"
                >
                  <Zap className="w-4 h-4 text-[#1E1F4A]" />
                  <span className="text-sm font-semibold text-[#1E1F4A]">All-in-One University Solution</span>
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[#1E1F4A]">
                  COMSATS PLUS
                  <br />
                  <span className="text-2xl md:text-3xl text-gray-600 font-semibold">Your Campus Companion</span>
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  The ultimate solution for COMSATS University Lahore students. Find empty rooms, calculate your GPA,
                  and create lasting memories - all in one powerful app.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.getElementById("features")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }}
                  className="bg-gradient-to-r from-[#1E1F4A] to-blue-600 text-white px-8 py-4 rounded-xs font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Explore Features</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#1E1F4A] text-[#1E1F4A] px-8 py-4 rounded-xs font-semibold hover:bg-[#1E1F4A] hover:text-white transition-all duration-300"
                >
                  Watch Demo
                </motion.button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1E1F4A]">500+</div>
                  <div className="text-sm text-gray-500 font-medium">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1E1F4A]">3</div>
                  <div className="text-sm text-gray-500 font-medium">Core Features</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1E1F4A]">24/7</div>
                  <div className="text-sm text-gray-500 font-medium">Available</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
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
                      <p className="text-sm text-gray-500 font-medium">Real-time availability</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xs border border-gray-100">
                      <span className="text-sm font-medium text-gray-700">Room A-101</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-xs font-semibold">
                        Available
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xs border border-gray-100">
                      <span className="text-sm font-medium text-gray-700">Room B-205</span>
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-xs font-semibold">
                        Occupied
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xs border border-gray-100">
                      <span className="text-sm font-medium text-gray-700">Room C-301</span>
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
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E1F4A]">Powerful Features</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
              Everything you need to enhance your university experience, all in one place.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`group bg-white p-6 rounded-xs border border-gray-200 hover:border-[#1E1F4A]/30 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 ${
                  feature.status === "Available" ? "cursor-pointer" : "cursor-default"
                }`}
                onClick={() => {
                  if (feature.status === "Available" && feature.title === "Empty Room Finder") {
                    window.location.href = "/room-finder"
                  }
                  // Add other feature navigation when they become available
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#1E1F4A] to-blue-600 rounded-xs flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-xs font-semibold ${
                      feature.status === "Available" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {feature.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 text-[#1E1F4A] group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 font-medium">{feature.description}</p>

                <div className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E1F4A]">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
              Quick answers to common questions about COMSATS PLUS and its features.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How accurate is the room finder feature?",
                answer:
                  "Our room finder uses real-time data from the university timetable system and is updated every 30 minutes during university hours. We maintain 99%+ accuracy by cross-referencing multiple data sources.",
              },
              {
                question: "Is the GPA calculator based on COMSATS criteria?",
                answer:
                  "Yes! Our GPA calculator follows the exact grading criteria used by COMSATS University Lahore, including the 4.0 scale and grade point calculations specific to the university's academic policies.",
              },
              {
                question: "Can I use COMSATS PLUS on my mobile phone?",
                answer:
                  "COMSATS PLUS is designed to work perfectly on all devices - smartphones, tablets, and computers. We're also working on native mobile apps for iOS and Android.",
              },
              {
                question: "Is COMSATS PLUS free to use?",
                answer:
                  "Yes, COMSATS PLUS is completely free for all COMSATS University Lahore students. Our goal is to help students succeed, not profit from them.",
              },
              {
                question: "How do I report a bug or suggest a new feature?",
                answer:
                  "We love hearing from students! You can use our contact form, join our community chat, or reach out to us directly. We actively incorporate student feedback into our development roadmap.",
              },
              {
                question: "What are the upcoming features?",
                answer:
                  "We're working on class schedule management, study group formation, and a resource library. Follow our updates to be the first to know when these features launch!",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xs border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="font-bold text-[#1E1F4A] mb-3 text-lg">{faq.question}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E1F4A]">What Students Say</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
              Hear from COMSATS students who are already using COMSATS PLUS.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmed Hassan",
                program: "Computer Science",
                text: "COMSATS PLUS has made finding empty rooms so much easier. No more wandering around campus!",
                rating: 5,
              },
              {
                name: "Fatima Khan",
                program: "Software Engineering",
                text: "The GPA calculator is incredibly accurate and follows COMSATS criteria perfectly.",
                rating: 5,
              },
              {
                name: "Ali Raza",
                program: "Information Technology",
                text: "Love the memory mapping feature! I've marked all my favorite study spots.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xs border border-gray-200 shadow-sm"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 font-medium">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-[#1E1F4A]">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 font-medium">{testimonial.program}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1F4A]">
              Ready to Transform Your University Experience?
            </h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
              Join hundreds of COMSATS students who are already using COMSATS PLUS to make their campus life easier and more
              organized.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/room-finder">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#1E1F4A] to-blue-600 text-white px-8 py-4 rounded-xs font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#1E1F4A] text-[#1E1F4A] px-8 py-4 rounded-xs font-semibold hover:bg-[#1E1F4A] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Heart className="w-5 h-5" />
                  <span>Learn More</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
