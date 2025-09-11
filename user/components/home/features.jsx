"use client";

import { motion } from "framer-motion";
import { BookOpen, Calculator, Calendar, CheckCircle, MapPin, Search, Users, Sparkles } from "lucide-react";

export default function Features() {
    const features = [
    {
      icon: Search,
      href: "/room-finder",
      title: "Empty Room Finder",
      description:
        "Find available rooms in real-time with advanced filters. Perfect for study sessions or makeup classes.",
      status: "Available",
      highlights: ["Real-time updates", "Advanced filters", "Room booking"],
    },
    {
      icon: Calculator,
      href: "/gpa-calculator",
      title: "GPA/CGPA Calculator",
      description:
        "Calculate your semester and cumulative GPA with COMSATS criteria. Track your academic progress effortlessly.",
      status: "Available",
      highlights: ["COMSATS criteria", "Progress tracking", "Grade analysis"],
    },
    {
      icon: MapPin,
      href: "/memory-map",
      title: "Memory Mapping",
      description:
        "Pin memories on the university map. Mark special locations and add personal notes to create your campus story.",
      status: "Available",
      highlights: ["Interactive map", "Personal notes", "Memory sharing"],
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.2 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E1F4A]">
            Powerful Features
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            Everything you need to enhance your university experience, all in
            one place.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group bg-white p-6 rounded-xs border border-gray-200 hover:border-[#1E1F4A]/30 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.01] cursor-pointer"
              onClick={() => {
                window.location.href = feature.href;
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#1E1F4A] to-blue-600 rounded-xs flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs px-2 py-1 rounded-xs font-semibold bg-green-100 text-green-700">
                  {feature.status}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 text-[#1E1F4A] group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4 font-medium">
                {feature.description}
              </p>

              <div className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600 font-medium">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Coming Soon Card */}
          <motion.div
            variants={fadeInUp}
            className="group bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xs border-2 border-dashed border-gray-300 hover:border-[#1E1F4A]/30 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.01] cursor-default"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-xs flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs px-2 py-1 rounded-xs font-semibold bg-yellow-100 text-yellow-700">
                Coming Soon
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2 text-gray-700 group-hover:text-[#1E1F4A] transition-colors">
              More Features
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4 font-medium">
              We're working on exciting new features to enhance your university experience even further!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
