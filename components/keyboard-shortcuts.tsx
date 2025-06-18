"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Keyboard } from "lucide-react"

const shortcuts = [
  { key: "H", action: "Go to Hero" },
  { key: "A", action: "Go to About" },
  { key: "S", action: "Go to Skills" },
  { key: "P", action: "Go to Projects" },
  { key: "E", action: "Go to Experience" },
  { key: "C", action: "Go to Contact" },
  { key: "T", action: "Toggle Theme" },
  { key: "M", action: "Toggle Sound" },
  { key: "?", action: "Show Shortcuts" },
]

interface KeyboardShortcutsProps {
  theme?: "dark" | "light"
}

export function KeyboardShortcuts({ theme = "dark" }: KeyboardShortcutsProps) {
  const [showShortcuts, setShowShortcuts] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || !e.key) return

      switch (e.key.toLowerCase()) {
        case "h":
          document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })
          ;(window as any).playNavSound?.()
          break
        case "a":
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          ;(window as any).playNavSound?.()
          break
        case "s":
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
          ;(window as any).playNavSound?.()
          break
        case "p":
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
          ;(window as any).playNavSound?.()
          break
        case "e":
          document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
          ;(window as any).playNavSound?.()
          break
        case "c":
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          ;(window as any).playNavSound?.()
          break
        case "t":
          // Toggle theme (would need to be connected to theme context)
          ;(window as any).playThemeSound?.()
          break
        case "m":
          // Toggle sound (would need to be connected to sound state)
          ;(window as any).playThemeSound?.()
          break
        case "?":
          setShowShortcuts((prev) => !prev)
          ;(window as any).playClickSound?.()
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  return (
    <>
      <motion.button
        className={`fixed bottom-4 left-4 p-3 rounded-full shadow-lg z-40 transition-all duration-300 ${
          theme === "dark"
            ? "bg-purple-600 hover:bg-purple-700 text-white border border-purple-500"
            : "bg-purple-600 hover:bg-purple-700 text-white border border-purple-500"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowShortcuts(true)}
        onMouseEnter={() => (window as any).playHoverSound?.()}
      >
        <Keyboard className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowShortcuts(false)}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-md w-full border border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Keyboard Shortcuts</h3>
              <div className="space-y-2">
                {shortcuts.map((shortcut) => (
                  <div key={shortcut.key} className="flex justify-between items-center text-white/80">
                    <span>{shortcut.action}</span>
                    <kbd className="px-2 py-1 bg-white/20 rounded text-sm font-mono">{shortcut.key}</kbd>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowShortcuts(false)}
                className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
