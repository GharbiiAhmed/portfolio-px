"use client"

import { useEffect, useRef, useState } from "react"

interface SoundManagerProps {
  enabled: boolean
}

export function SoundManager({ enabled }: SoundManagerProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !isMounted) return

    // Initialize Web Audio API
    const initAudio = async () => {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        }

        // Resume context if suspended (required by browsers)
        if (audioContextRef.current.state === "suspended") {
          await audioContextRef.current.resume()
        }
      } catch (error) {
        console.warn("Audio context initialization failed:", error)
      }
    }

    initAudio()

    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close()
      }
    }
  }, [enabled, isMounted])

  const playSound = (frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.1) => {
    if (!enabled || !audioContextRef.current || audioContextRef.current.state === "closed" || !isMounted) return

    try {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
      oscillator.type = type

      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration)

      oscillator.start(audioContextRef.current.currentTime)
      oscillator.stop(audioContextRef.current.currentTime + duration)
    } catch (error) {
      console.warn("Sound playback failed:", error)
    }
  }

  // Expose sound functions globally
  useEffect(() => {
    if (enabled && typeof window !== "undefined" && isMounted) {
      // Hover sound
      ;(window as any).playHoverSound = () => {
        playSound(800, 0.1, "sine", 0.05)
      }

      // Click sound
      ;(window as any).playClickSound = () => {
        playSound(1000, 0.15, "square", 0.08)
      }

      // Theme switch sound
      ;(window as any).playThemeSound = () => {
        playSound(600, 0.2, "triangle", 0.06)
      }

      // Success sound (chord progression)
      ;(window as any).playSuccessSound = () => {
        playSound(523, 0.1, "sine", 0.04) // C
        setTimeout(() => playSound(659, 0.1, "sine", 0.04), 100) // E
        setTimeout(() => playSound(784, 0.2, "sine", 0.04), 200) // G
      }

      // Navigation sound
      ;(window as any).playNavSound = () => {
        playSound(440, 0.08, "sine", 0.03)
      }

      // Card hover sound
      ;(window as any).playCardHover = () => {
        playSound(660, 0.06, "sine", 0.02)
      }
    } else if (typeof window !== "undefined") {
      // Clear sound functions when disabled
      ;(window as any).playHoverSound = () => {}
      ;(window as any).playClickSound = () => {}
      ;(window as any).playThemeSound = () => {}
      ;(window as any).playSuccessSound = () => {}
      ;(window as any).playNavSound = () => {}
      ;(window as any).playCardHover = () => {}
    }
  }, [enabled, isMounted])

  return null
}
