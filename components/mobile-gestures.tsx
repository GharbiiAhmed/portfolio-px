"use client"

import { useEffect, useState } from "react"

export function MobileGestures() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (typeof document === "undefined" || !isMounted) return

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

      // Only handle horizontal swipes for theme toggle
      // Remove the vertical swipe navigation to allow free scrolling
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 100) {
        // Swipe left/right for theme toggle
        if (typeof window !== "undefined") {
          ;(window as any).playThemeSound?.()
        }

        // Add haptic feedback for theme toggle
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate(50)
        }
      }
    }

    // Add haptic feedback
    const addHapticFeedback = () => {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(50)
      }
    }

    // Remove this entire function - no longer needed
    // const handleTouchMove = (e: TouchEvent) => {
    //   // Add subtle haptic feedback during swipe
    //   if (Math.abs(startY - e.touches[0].clientY) > 30) {
    //     addHapticFeedback()
    //   }
    // }

    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchend", handleTouchEnd, { passive: true })
    // Remove touchmove listener since we're not using it anymore

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchend", handleTouchEnd)
      // Remove touchmove cleanup
    }
  }, [isMounted])

  return null
}
