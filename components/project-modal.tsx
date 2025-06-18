"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Github, ExternalLink, Calendar, Users, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectModalProps {
  project: {
    title: string
    description: string
    tech: string[]
    highlights: string[]
    fullDescription?: string
    images?: string[]
    githubUrl?: string
    liveUrl?: string
    duration?: string
    teamSize?: number
    myRole?: string
  } | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Early return if no project
  if (!project) {
    return null
  }

  const projectImages = project.images || [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-white">{project.title}</h2>
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors"
                  onMouseEnter={() => (window as any).playHoverSound?.()}
                  onClickCapture={() => (window as any).playClickSound?.()}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Image Gallery */}
              <div className="mb-6">
                <div className="relative">
                  <img
                    src={projectImages[currentImageIndex] || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  {projectImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {projectImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentImageIndex(index)
                            ;(window as any).playClickSound?.()
                          }}
                          onMouseEnter={() => (window as any).playHoverSound?.()}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentImageIndex ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Project Details</h3>
                  <div className="space-y-3">
                    {project.duration && (
                      <div className="flex items-center text-white/80">
                        <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                        <span>Duration: {project.duration}</span>
                      </div>
                    )}
                    {project.teamSize && (
                      <div className="flex items-center text-white/80">
                        <Users className="w-5 h-5 mr-2 text-purple-400" />
                        <span>Team Size: {project.teamSize} members</span>
                      </div>
                    )}
                    {project.myRole && (
                      <div className="flex items-center text-white/80">
                        <Code className="w-5 h-5 mr-2 text-purple-400" />
                        <span>My Role: {project.myRole}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">About This Project</h3>
                <p className="text-white/80 leading-relaxed">
                  {project.fullDescription ||
                    `${project.description} This project showcases advanced development skills and modern best practices in software engineering.`}
                </p>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start text-white/80">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                {project.githubUrl && (
                  <Button
                    className="bg-gray-800 hover:bg-gray-700 text-white"
                    onMouseEnter={() => (window as any).playHoverSound?.()}
                    onClick={() => (window as any).playClickSound?.()}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onMouseEnter={() => (window as any).playHoverSound?.()}
                    onClick={() => (window as any).playClickSound?.()}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
