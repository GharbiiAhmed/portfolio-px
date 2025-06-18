"use client"

import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ThemeToggleProps {
  theme: "dark" | "light"
  toggleTheme: () => void
}

export function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={`relative overflow-hidden transition-all duration-300 ${
          theme === "dark"
            ? "text-white hover:bg-white/10 border border-white/20 bg-white/5"
            : "text-gray-900 hover:bg-gray-100 border border-gray-300 bg-white/80"
        }`}
        aria-label="Toggle theme"
        onMouseEnter={() => (window as any).playHoverSound?.()}
        onClick={() => {
          toggleTheme()
          ;(window as any).playThemeSound?.()
        }}
      >
        <motion.div
          className="relative w-5 h-5"
          animate={{ rotate: theme === "dark" ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: theme === "dark" ? 1 : 0,
              scale: theme === "dark" ? 1 : 0.5,
            }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5" />
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: theme === "light" ? 1 : 0,
              scale: theme === "light" ? 1 : 0.5,
            }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* Animated background */}
        <motion.div
          className={`absolute inset-0 rounded-md ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20"
              : "bg-gradient-to-r from-yellow-400/20 to-orange-400/20"
          }`}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </Button>
    </motion.div>
  )
}
