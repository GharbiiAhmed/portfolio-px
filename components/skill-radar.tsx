"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const skills = [
  { name: "JavaScript", level: 95 },
  { name: "React", level: 90 },
  { name: "Node.js", level: 88 },
  { name: "Kubernetes", level: 92 },
  { name: "Docker", level: 89 },
  { name: "Python", level: 85 },
  { name: "Java", level: 87 },
  { name: "Cloud", level: 91 },
]

interface SkillRadarProps {
  theme?: "dark" | "light"
}

export function SkillRadar({ theme = "dark" }: SkillRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxRadius = Math.min(centerX, centerY) - 40

    const drawRadar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid circles with theme-aware colors
      const gridColor = theme === "dark" ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.4)"
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, (maxRadius * i) / 5, 0, Math.PI * 2)
        ctx.strokeStyle = gridColor
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw grid lines
      const angleStep = (Math.PI * 2) / skills.length
      skills.forEach((_, index) => {
        const angle = index * angleStep - Math.PI / 2
        const x = centerX + Math.cos(angle) * maxRadius
        const y = centerY + Math.sin(angle) * maxRadius

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = gridColor
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Draw skill polygon
      ctx.beginPath()
      skills.forEach((skill, index) => {
        const angle = index * angleStep - Math.PI / 2
        const radius = (maxRadius * skill.level) / 100
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.closePath()

      // Theme-aware polygon colors
      const fillColor = theme === "dark" ? "rgba(139, 92, 246, 0.4)" : "rgba(139, 92, 246, 0.3)"
      const strokeColor = theme === "dark" ? "rgba(139, 92, 246, 0.9)" : "rgba(139, 92, 246, 0.8)"

      ctx.fillStyle = fillColor
      ctx.fill()
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw skill points and labels
      skills.forEach((skill, index) => {
        const angle = index * angleStep - Math.PI / 2
        const radius = (maxRadius * skill.level) / 100
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        // Draw point
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fillStyle = theme === "dark" ? "#8B5CF6" : "#7C3AED"
        ctx.fill()

        // Add white border for better visibility
        ctx.strokeStyle = theme === "dark" ? "#FFFFFF" : "#000000"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw label with better contrast
        const labelX = centerX + Math.cos(angle) * (maxRadius + 25)
        const labelY = centerY + Math.sin(angle) * (maxRadius + 25)

        // Add background for text
        ctx.fillStyle = theme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.9)"
        ctx.fillRect(labelX - 25, labelY - 20, 50, 35)

        // Draw text
        ctx.fillStyle = theme === "dark" ? "#FFFFFF" : "#000000"
        ctx.font = "bold 12px Inter"
        ctx.textAlign = "center"
        ctx.fillText(skill.name, labelX, labelY - 5)

        // Draw percentage with high contrast
        ctx.fillStyle = theme === "dark" ? "#A855F7" : "#7C3AED"
        ctx.font = "bold 11px Inter"
        ctx.fillText(`${skill.level}%`, labelX, labelY + 10)
      })
    }

    drawRadar()
  }, [theme])

  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <canvas ref={canvasRef} width={400} height={400} className="max-w-full" />
    </motion.div>
  )
}
