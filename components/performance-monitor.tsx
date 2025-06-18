"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Activity, Zap, Clock } from "lucide-react"

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fps: 60,
    loadTime: 0,
    memoryUsage: 0,
  })

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    const startTime = performance.now()

    const updateMetrics = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 1000) {
        setMetrics((prev) => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime)),
          loadTime: Math.round(currentTime - startTime),
          memoryUsage: (performance as any).memory
            ? Math.round(((performance as any).memory.usedJSHeapSize / 1024 / 1024) * 100) / 100
            : 0,
        }))
        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(updateMetrics)
    }

    updateMetrics()
  }, [])

  return (
    <motion.div
      className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white text-sm z-40"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Activity className="w-4 h-4 mr-1 text-green-400" />
          <span>{metrics.fps} FPS</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1 text-blue-400" />
          <span>{metrics.loadTime}ms</span>
        </div>
        {metrics.memoryUsage > 0 && (
          <div className="flex items-center">
            <Zap className="w-4 h-4 mr-1 text-yellow-400" />
            <span>{metrics.memoryUsage}MB</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
