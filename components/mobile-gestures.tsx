"use client"

import { useEffect } from "react"

export function MobileGestures() {
  useEffect(() => {
    let startY = 0
    let startX = 0

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY
      startX = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY
      const endX = e.changedTouches[0].clientX
      const diffY = startY - endY
      const diffX = startX - endX

      // Swipe up/down for navigation
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
        if (diffY > 0) {
          // Swipe up - next section
          const sections = ["hero", "about", "skills", "projects", "experience", "contact"]
          const currentSection = sections.find((section) => {
            const element = document.getElementById(section)
            if (element) {
              const rect = element.getBoundingClientRect()
              return rect.top <= 100 && rect.bottom >= 100
            }
            return false
          })

          if (currentSection) {
            const currentIndex = sections.indexOf(currentSection)
            const nextIndex = Math.min(currentIndex + 1, sections.length - 1)
            document.getElementById(sections[nextIndex])?.scrollIntoView({ behavior: "smooth" })
          }
        } else {
          // Swipe down - previous section
          const sections = ["hero", "about", "skills", "projects", "experience", "contact"]
          const currentSection = sections.find((section) => {
            const element = document.getElementById(section)
            if (element) {
              const rect = element.getBoundingClientRect()
              return rect.top <= 100 && rect.bottom >= 100
            }
            return false
          })

          if (currentSection) {
            const currentIndex = sections.indexOf(currentSection)
            const prevIndex = Math.max(currentIndex - 1, 0)
            document.getElementById(sections[prevIndex])?.scrollIntoView({ behavior: "smooth" })
          }
        }
      }

      // Swipe left/right for theme toggle
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 100) {
        // Toggle theme
        ;(window as any).playThemeSound?.()
      }
    }

    // Add haptic feedback
    const addHapticFeedback = () => {
      if ("vibrate" in navigator) {
        navigator.vibrate(50)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Add subtle haptic feedback during swipe
      if (Math.abs(startY - e.touches[0].clientY) > 30) {
        addHapticFeedback()
      }
    }

    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchend", handleTouchEnd, { passive: true })
    document.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchend", handleTouchEnd)
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return null
}
