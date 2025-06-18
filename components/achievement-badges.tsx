"use client"

import { motion } from "framer-motion"
import { Award, Star, Trophy, Target, Zap, Shield } from "lucide-react"

const achievements = [
  { icon: Award, title: "Certified Expert", description: "Multiple cloud certifications" },
  { icon: Star, title: "Top Performer", description: "Excellent project delivery" },
  { icon: Trophy, title: "Innovation Leader", description: "Cutting-edge solutions" },
  { icon: Target, title: "Goal Achiever", description: "100% project success rate" },
  { icon: Zap, title: "Fast Learner", description: "Quick technology adoption" },
  { icon: Shield, title: "Security Focused", description: "Secure coding practices" },
]

export function AchievementBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {achievements.map((achievement, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <achievement.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">{achievement.title}</h4>
              <p className="text-white/60 text-xs">{achievement.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
