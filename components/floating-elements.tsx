"use client"

import { motion } from "framer-motion"
import { Code, Server, Cloud, Database, Zap, Cpu } from "lucide-react"
import { useEffect, useState } from "react"

const floatingIcons = [
  { Icon: Code, delay: 0 },
  { Icon: Server, delay: 0.5 },
  { Icon: Cloud, delay: 1 },
  { Icon: Database, delay: 1.5 },
  { Icon: Zap, delay: 2 },
  { Icon: Cpu, delay: 2.5 },
]

export function FloatingElements() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Don't render on server
  if (typeof window === "undefined" || windowSize.width === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingIcons.map(({ Icon, delay }, index) => (
        <motion.div
          key={index}
          className="absolute text-purple-400/20"
          initial={{
            x: Math.random() * windowSize.width,
            y: windowSize.height + 100,
            rotate: 0,
            scale: 0.5,
          }}
          animate={{
            y: -100,
            rotate: 360,
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 20,
            delay: delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon size={40} />
        </motion.div>
      ))}
    </div>
  )
}
