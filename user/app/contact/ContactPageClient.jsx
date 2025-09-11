"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Send, MessageCircle, Clock, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import FAQ from "../../components/common/faq"

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    rating: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "", rating: 0 })
      }
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const subject = urlParams.get("subject")
    if (subject) {
      setFormData((prev) => ({ ...prev, subject }))
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#1E1F4A]">Get in Touch</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Have questions, suggestions, or feedback? We'd love to hear from you. Our team is here to help make
              COMSATS PLUS even better.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-[#1E1F4A] mb-4">Send us a Message</h2>
                <p className="text-gray-600 font-medium">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xs p-6 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700 font-medium">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-[#1E1F4A] mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xs focus:ring-2 focus:ring-[#1E1F4A] focus:border-transparent transition-all duration-300 font-medium"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#1E1F4A] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xs focus:ring-2 focus:ring-[#1E1F4A] focus:border-transparent transition-all duration-300 font-medium"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-[#1E1F4A] mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xs focus:ring-2 focus:ring-[#1E1F4A] focus:border-transparent transition-all duration-300 font-medium"
                    >
                      <option value="">Select a subject</option>
                      <option value="feature-request">Feature Request</option>
                      <option value="bug-report">Bug Report</option>
                      <option value="general-inquiry">General Inquiry</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="help-support">Help & Support</option>
                      <option value="room-finder-issue">Room Finder Issue</option>
                      <option value="gpa-calculator-issue">GPA Calculator Issue</option>
                      <option value="contribution-inquiry">Contribution Inquiry</option>
                    </select>
                  </div>

                  {formData.subject === "feedback" && (
                    <div>
                      <label className="block text-sm font-semibold text-[#1E1F4A] mb-2">Rate Your Experience</label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-2xl transition-colors duration-200"
                          >
                            <svg
                              className={`w-6 h-6 ${
                                (formData.rating || 0) >= star ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                              fill={formData.rating >= star ? "currentColor" : "none"}
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          </motion.button>
                        ))}
                        <span className="ml-3 text-sm text-gray-600 font-medium">
                          {formData.rating ? `${formData.rating} out of 5 stars` : "Click to rate"}
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#1E1F4A] mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xs focus:ring-2 focus:ring-[#1E1F4A] focus:border-transparent transition-all duration-300 font-medium resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className="w-full bg-gradient-to-r from-[#1E1F4A] to-blue-600 text-white px-8 py-4 rounded-xs font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-[#1E1F4A] mb-4">Contact Information</h2>
                <p className="text-gray-600 font-medium">
                  Reach out to us through any of these channels. We're always happy to help!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#1E1F4A] to-blue-600 rounded-xs flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E1F4A] mb-1">Email</h3>
                    <p className="text-gray-600 font-medium">comsatsplus@gmail.com</p>
                    <p className="text-sm text-gray-500 font-medium">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#1E1F4A] to-blue-600 rounded-xs flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E1F4A] mb-1">Location</h3>
                    <p className="text-gray-600 font-medium">COMSATS University Lahore</p>
                    <p className="text-sm text-gray-500 font-medium">Defense Road, Off Raiwind Road</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#1E1F4A] to-blue-600 rounded-xs flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E1F4A] mb-1">Response Time</h3>
                    <p className="text-gray-600 font-medium">Within 24 hours</p>
                    <p className="text-sm text-gray-500 font-medium">Usually much faster!</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#1E1F4A] to-blue-600 p-6 rounded-xs text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <MessageCircle className="w-6 h-6" />
                  <h3 className="font-bold">Quick Support</h3>
                </div>
                <p className="text-blue-100 mb-4 font-medium">
                  Need immediate help? Join our student community chat for instant support from fellow COMSATS students.
                </p>
                <button className="bg-white text-[#1E1F4A] px-4 py-2 rounded-xs font-semibold hover:bg-gray-100 transition-colors">
                  Join Community
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ 
        title="Frequently Asked Questions"
        description="Quick answers to common questions about COMSATS PLUS."
        className="py-16"
      />
    </div>
  )
}
