"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO at TechCorp",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Ahmed's expertise in Kubernetes and cloud architecture is exceptional. He delivered our microservices migration ahead of schedule.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Lead Developer at StartupXYZ",
    image: "/placeholder.svg?height=80&width=80",
    content: "Working with Ahmed was a game-changer. His full-stack skills and attention to detail are remarkable.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Project Manager at DevCo",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Ahmed's communication skills and technical expertise make him an invaluable team member. Highly recommended!",
    rating: 5,
  },
]

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    ;(window as any).playClickSound?.()
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    ;(window as any).playClickSound?.()
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
        >
          <div className="flex items-center mb-6">
            <img
              src={testimonials[currentIndex].image || "/placeholder.svg"}
              alt={testimonials[currentIndex].name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h4 className="text-white font-semibold">{testimonials[currentIndex].name}</h4>
              <p className="text-white/60">{testimonials[currentIndex].role}</p>
            </div>
            <div className="ml-auto flex">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          <p className="text-white/80 text-lg italic">"{testimonials[currentIndex].content}"</p>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevTestimonial}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextTestimonial}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-purple-500" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
