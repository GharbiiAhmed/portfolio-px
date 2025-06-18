"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronRight, MapPin } from "lucide-react"

const timelineData = [
  {
    year: "2025",
    title: "Senior Software Engineer",
    company: "Avaxia Group",
    location: "Germany",
    description: "Leading full-stack development projects with modern technologies",
    achievements: ["Led team of 5 developers", "Implemented CI/CD pipelines", "Reduced deployment time by 60%"],
    color: "from-purple-500 to-blue-500",
  },
  {
    year: "2024",
    title: "Game Development Intern",
    company: "CGI Studio",
    location: "Remote",
    description: "Developed multiplayer gaming experiences using Unity and Photon",
    achievements: [
      "Built real-time multiplayer system",
      "Optimized game performance",
      "Implemented networking protocols",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    year: "2023",
    title: "Software Development Intern",
    company: "MediaLabFactory",
    location: "Tunisia",
    description: "Created real-time dashboards and automation tools",
    achievements: ["Developed monitoring dashboard", "Automated IT processes", "Improved system efficiency by 40%"],
    color: "from-cyan-500 to-green-500",
  },
]

export function InteractiveTimeline() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>

      {timelineData.map((item, index) => (
        <motion.div
          key={index}
          className="relative mb-12 ml-20"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          {/* Timeline dot */}
          <motion.div
            className={`absolute -left-14 top-6 w-4 h-4 bg-gradient-to-r ${item.color} rounded-full border-4 border-gray-900`}
            whileHover={{ scale: 1.5 }}
          />

          {/* Content card */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 cursor-pointer"
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => setSelectedItem(selectedItem === index ? null : index)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 bg-gradient-to-r ${item.color} text-white text-sm font-bold rounded-full`}>
                  {item.year}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-purple-300">{item.company}</p>
                </div>
              </div>
              <motion.div animate={{ rotate: selectedItem === index ? 90 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronRight className="w-5 h-5 text-white/60" />
              </motion.div>
            </div>

            <div className="flex items-center space-x-4 mb-4 text-white/60">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{item.location}</span>
              </div>
            </div>

            <p className="text-white/80 mb-4">{item.description}</p>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: selectedItem === index ? "auto" : 0,
                opacity: selectedItem === index ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-white font-semibold mb-2">Key Achievements:</h4>
                <ul className="space-y-2">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="text-white/70 flex items-start">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
