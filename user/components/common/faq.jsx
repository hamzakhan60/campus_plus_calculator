"use client";

import { motion } from "framer-motion";

export default function FAQ({ title = "Frequently Asked Questions", description = "Quick answers to common questions about COMSATS PLUS and its features.", className = "" }) {
    const faqs = [
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
    ];

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E1F4A]">
            {title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            {description}
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xs border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="font-bold text-[#1E1F4A] mb-3 text-lg">
                {faq.question}
              </h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
