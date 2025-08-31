"use client"

import { motion } from "framer-motion"
import { Users, Target, Lightbulb, Heart, Code, ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function AboutPageClient() {
  const developers = [
    {
      name: "Muhammad Ahmed",
      role: "Full Stack Developer",
      bio: "Computer Science student passionate about creating solutions that make student life easier.",
      skills: ["React", "Node.js", "MongoDB", "Next.js"],
      github: "#",
      linkedin: "#",
      email: "ahmed@cuiplus.com",
    },
    {
      name: "Fatima Hassan",
      role: "UI/UX Designer & Frontend Developer",
      bio: "Software Engineering student with a keen eye for design and user experience.",
      skills: ["Figma", "React", "Tailwind CSS", "Framer Motion"],
      github: "#",
      linkedin: "#",
      email: "fatima@cuiplus.com",
    },
    {
      name: "Ali Raza",
      role: "Backend Developer",
      bio: "Information Technology student specializing in server-side development and APIs.",
      skills: ["Python", "Django", "PostgreSQL", "AWS"],
      github: "#",
      linkedin: "#",
      email: "ali@cuiplus.com",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#1E1F4A]">About COMSATS PLUS</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Born from the everyday struggles of COMSATS University Lahore students, COMSATS PLUS is more than just an app
              - it's a solution crafted by students, for students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#1E1F4A] mb-4">Our Story</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed font-medium">
                It all started during a particularly stressful exam week at COMSATS University Lahore. We found
                ourselves wandering through endless corridors, searching for empty rooms to study in, manually
                calculating our GPAs with uncertainty, and wishing we could remember exactly where we had those
                important moments on campus.
              </p>

              <p className="text-gray-600 leading-relaxed font-medium">
                As computer science students, we realized we had the skills to solve these problems not just for
                ourselves, but for every student facing the same challenges. That's when COMSATS PLUS was born - a
                comprehensive solution designed to address the real, everyday problems that COMSATS students face.
              </p>

              <p className="text-gray-600 leading-relaxed font-medium">
                Our mission is simple: to make university life easier, more organized, and more enjoyable for every
                student at COMSATS University Lahore. We believe that technology should serve students, not complicate
                their lives.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#1E1F4A] mb-4">Our Goals</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
              What drives us to build COMSATS PLUS and make it better every day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Solve Real Problems",
                description:
                  "Address genuine challenges that COMSATS students face daily, from finding study spaces to tracking academic progress.",
              },
              {
                icon: Users,
                title: "Build Community",
                description:
                  "Create a platform that connects students and fosters collaboration within the COMSATS community.",
              },
              {
                icon: Lightbulb,
                title: "Innovate Continuously",
                description: "Keep evolving and adding features based on student feedback and emerging needs.",
              },
            ].map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xs border border-gray-200 shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#1E1F4A] to-blue-600 rounded-xs flex items-center justify-center mx-auto mb-4">
                  <goal.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E1F4A] mb-2">{goal.title}</h3>
                <p className="text-gray-600 font-medium">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#1E1F4A] mb-4">Meet the Team</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
              The passionate students behind COMSATS PLUS who are dedicated to making your university experience better.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {developers.map((dev, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xs border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#1E1F4A] to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E1F4A]">{dev.name}</h3>
                  <p className="text-blue-600 font-semibold">{dev.role}</p>
                </div>

                <p className="text-gray-600 text-center mb-4 font-medium">{dev.bio}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-[#1E1F4A] mb-2">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {dev.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-xs text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <a href={dev.github} className="text-gray-600 hover:text-[#1E1F4A] transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={dev.linkedin} className="text-gray-600 hover:text-[#1E1F4A] transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={`mailto:${dev.email}`} className="text-gray-600 hover:text-[#1E1F4A] transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1E1F4A] to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-white">Our Values</h2>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Heart className="w-6 h-6 text-blue-200" />
                  <h3 className="text-xl font-bold text-white">Student-First</h3>
                </div>
                <p className="text-blue-100 font-medium">
                  Every decision we make is centered around what's best for students. We listen, we learn, and we build
                  accordingly.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Code className="w-6 h-6 text-blue-200" />
                  <h3 className="text-xl font-bold text-white">Quality Code</h3>
                </div>
                <p className="text-blue-100 font-medium">
                  We believe in writing clean, maintainable code that stands the test of time and provides reliable
                  service.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-blue-200" />
                  <h3 className="text-xl font-bold text-white">Community Driven</h3>
                </div>
                <p className="text-blue-100 font-medium">
                  COMSATS PLUS grows with the community. Student feedback shapes our roadmap and drives our development.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Lightbulb className="w-6 h-6 text-blue-200" />
                  <h3 className="text-xl font-bold text-white">Innovation</h3>
                </div>
                <p className="text-blue-100 font-medium">
                  We're always exploring new ways to solve problems and improve the student experience through
                  technology.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-[#1E1F4A]">Join Our Journey</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
              Be part of the COMSATS PLUS community and help us build the ultimate campus companion for COMSATS students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#1E1F4A] to-blue-600 text-white px-8 py-4 rounded-xs font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#1E1F4A] text-[#1E1F4A] px-8 py-4 rounded-xs font-semibold hover:bg-[#1E1F4A] hover:text-white transition-all duration-300"
                >
                  Try COMSATS PLUS
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
