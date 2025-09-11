"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
   const testimonials = [
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
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E1F4A]">
            What Students Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            Hear from COMSATS students who are already using COMSATS PLUS.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xs border border-gray-200 shadow-sm"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4 font-medium">
                "{testimonial.text}"
              </p>
              <div>
                <div className="font-bold text-[#1E1F4A]">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {testimonial.program}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
