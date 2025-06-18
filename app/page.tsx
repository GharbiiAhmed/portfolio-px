"use client"

import { motion } from "framer-motion"
import { useState, useEffect, createContext, useContext } from "react"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code,
  Server,
  Cloud,
  Database,
  Award,
  GraduationCap,
  ChevronDown,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Add theme context
const ThemeContext = createContext<{
  theme: "dark" | "light"
  toggleTheme: () => void
}>({
  theme: "dark",
  toggleTheme: () => {},
})

const useTheme = () => useContext(ThemeContext)

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const skills = {
  languages: ["Java", "Python", "JavaScript", "TypeScript", "C++", "SQL"],
  devops: ["Kubernetes", "Docker", "GCP", "Firebase", "Jenkins"],
  frameworks: ["Spring Boot", "React", "Node.js", "Flutter", "Angular"],
  tools: ["Git", "Prometheus", "Grafana", "WebSockets", "Kafka", "Linux"],
  other: ["Unity", "Unreal", "Photon", "PostgreSQL", "MySQL"],
}

const projects = [
  {
    title: "LMS Platform",
    description: "Dockerized full-stack app with PostgreSQL, WebSockets, CI/CD",
    tech: ["React", "Node.js", "Docker", "PostgreSQL"],
    highlights: ["Real-time collaboration", "Role-based progress tracking", "CI/CD pipelines"],
    fullDescription:
      "A comprehensive Learning Management System built with modern technologies. Features real-time collaboration, advanced user management, and seamless deployment pipelines.",
    duration: "6 months",
    teamSize: 5,
    myRole: "Full-Stack Lead Developer",
    images: ["/project-lms-dashboard.png"],
    githubUrl: "https://github.com/GharbiiAhmed",
    liveUrl: "https://demo.com",
  },
  {
    title: "Flight Booking App",
    description: "Firebase backend with seat selection and PDF export",
    tech: ["Flutter", "Firebase", "Cloud Functions"],
    highlights: ["Seat selection system", "PDF generation", "Cloud integration"],
    fullDescription:
      "A mobile-first flight booking application with intuitive seat selection, real-time pricing, and automated ticket generation.",
    duration: "4 months",
    teamSize: 3,
    myRole: "Mobile Developer",
    images: ["/project-flight-mobile.png"],
    githubUrl: "https://github.com/GharbiiAhmed",
    liveUrl: "https://demo.com",
  },
  {
    title: "Kubernetes Microservices",
    description: "Spring Boot services with health checks and Helm deployment",
    tech: ["Spring Boot", "MongoDB", "GCP", "Kubernetes"],
    highlights: ["Microservices architecture", "Health monitoring", "Helm charts"],
    fullDescription:
      "Enterprise-grade microservices architecture with automated scaling, comprehensive monitoring, and zero-downtime deployments.",
    duration: "8 months",
    teamSize: 8,
    myRole: "DevOps Engineer & Backend Developer",
    images: ["/project-kubernetes-cluster.png"],
    githubUrl: "https://github.com/GharbiiAhmed",
  },
  {
    title: "Monitoring Stack",
    description: "Alert-driven monitoring with Slack integration",
    tech: ["Prometheus", "Grafana", "Alertmanager"],
    highlights: ["Real-time alerts", "Slack integration", "Custom dashboards"],
    fullDescription:
      "Complete monitoring solution with custom metrics, intelligent alerting, and beautiful dashboards for infrastructure oversight.",
    duration: "3 months",
    teamSize: 2,
    myRole: "DevOps Specialist",
    images: ["/project-monitoring-dashboard.png"],
    githubUrl: "https://github.com/GharbiiAhmed",
    liveUrl: "https://demo.com",
  },
]

const certifications = [
  {
    title: "CKA – Certified Kubernetes Administrator",
    date: "Jun 2025",
    id: "UC-bcc828e6-c13a-4cf5-95a2-1f5da80c1546",
    icon: <Server className="w-6 h-6" />,
    url: "https://www.udemy.com/certificate/UC-bcc828e6-c13a-4cf5-95a2-1f5da80c1546/",
  },
  {
    title: "CKAD – Kubernetes Application Developer",
    date: "Jun 2025",
    id: "UC-2392dcf9-70e7-4ff4-b156-333edebe7e98",
    icon: <Code className="w-6 h-6" />,
    url: "https://www.udemy.com/certificate/UC-2392dcf9-70e7-4ff4-b156-333edebe7e98/",
  },
  {
    title: "Google Cloud: Professional Data Engineer",
    date: "Jun 2025",
    id: "UC-d3230f46-fd95-46a2-ad56-85b5ec94984e",
    icon: <Cloud className="w-6 h-6" />,
    url: "https://www.udemy.com/certificate/UC-d3230f46-fd95-46a2-ad56-85b5ec94984e/",
  },
]

import { ParticleBackground } from "@/components/particle-background"
import { SoundManager } from "@/components/sound-manager"
import { AdvancedCursor } from "@/components/advanced-cursor"
import { FloatingElements } from "@/components/floating-elements"
import { TypingAnimation } from "@/components/typing-animation"
import { ScrollProgress } from "@/components/scroll-progress"
import { AchievementBadges } from "@/components/achievement-badges"
import { InteractiveTimeline } from "@/components/interactive-timeline"
import { ThreeScene } from "@/components/three-scene"
import { SkillRadar } from "@/components/skill-radar"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { ProjectModal } from "@/components/project-modal"
import { ContactForm } from "@/components/contact-form"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { MobileGestures } from "@/components/mobile-gestures"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Load theme from localStorage
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null
      if (savedTheme) {
        setTheme(savedTheme)
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        setTheme("light")
      }
    }

    const handleScroll = () => {
      if (typeof window === "undefined") return

      const sections = ["hero", "about", "skills", "projects", "experience", "certifications", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        if (typeof document !== "undefined") {
          const element = document.getElementById(section)
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isMounted])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme)
    }
  }

  const scrollToSection = (sectionId: string) => {
    if (typeof document !== "undefined") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Download CV function
  const downloadCV = () => {
    if (typeof document !== "undefined") {
      const link = document.createElement("a")
      link.href = "/Ahmed_Gharbi_Resume.pdf"
      link.download = "Ahmed_Gharbi_Resume.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      if (typeof window !== "undefined") {
        ;(window as any).playSuccessSound?.()
      }
    }
  }

  // Theme-aware styles
  const themeStyles = {
    dark: {
      bg: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
      navBg: "bg-black/20",
      cardBg: "bg-white/5",
      text: "text-white",
      textSecondary: "text-white/80",
      textMuted: "text-white/60",
      border: "border-white/10",
      accent: "text-purple-400",
      gradient: "from-purple-600/20 to-blue-600/20",
    },
    light: {
      bg: "bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50",
      navBg: "bg-white/80",
      cardBg: "bg-white/80",
      text: "text-gray-900",
      textSecondary: "text-gray-700",
      textMuted: "text-gray-600",
      border: "border-gray-200",
      accent: "text-purple-600",
      gradient: "from-purple-200/40 to-blue-200/40",
    },
  }

  const currentTheme = themeStyles[theme]

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen transition-all duration-500 ${currentTheme.bg}`}>
        <ScrollProgress />
        <ParticleBackground theme={theme} />
        <ThreeScene />
        <FloatingElements />
        <SoundManager enabled={soundEnabled} />
        <PerformanceMonitor />
        <KeyboardShortcuts theme={theme} />
        <MobileGestures />
        {showCursor && <AdvancedCursor />}

        {/* Navigation */}
        <motion.nav
          className={`fixed top-0 left-0 right-0 z-50 ${currentTheme.navBg} backdrop-blur-md border-b ${currentTheme.border} transition-all duration-500`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <motion.div
                className={`text-2xl font-bold ${currentTheme.text} transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
              >
                Ahmed Gharbi
              </motion.div>
              <div className="flex items-center space-x-8">
                <div className="hidden md:flex space-x-8">
                  {["About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          ;(window as any).playNavSound?.()
                        }
                        scrollToSection(item.toLowerCase())
                      }}
                      onMouseEnter={() => {
                        if (typeof window !== "undefined") {
                          ;(window as any).playHoverSound?.()
                        }
                      }}
                      className={`${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors ${
                        activeSection === item.toLowerCase() ? currentTheme.accent : ""
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setSoundEnabled(!soundEnabled)
                    if (typeof window !== "undefined") {
                      ;(window as any).playThemeSound?.()
                    }
                  }}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                    theme === "dark"
                      ? "text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20"
                      : "text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-300"
                  }`}
                  onMouseEnter={() => {
                    if (typeof window !== "undefined") {
                      ;(window as any).playHoverSound?.()
                    }
                  }}
                >
                  {soundEnabled ? "🔊" : "🔇"}
                </button>
                <button
                  onClick={() => {
                    toggleTheme()
                    if (typeof window !== "undefined") {
                      ;(window as any).playThemeSound?.()
                    }
                  }}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 font-medium ${
                    theme === "dark"
                      ? "text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20"
                      : "text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-300"
                  }`}
                  onMouseEnter={() => {
                    if (typeof window !== "undefined") {
                      ;(window as any).playHoverSound?.()
                    }
                  }}
                >
                  {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                </button>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.gradient} transition-all duration-500`} />
          <motion.div
            className="container mx-auto px-6 text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                <img src="/ahmed-profile-hero.jpg" alt="Ahmed Gharbi" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.h1
              className={`text-5xl md:text-7xl font-bold ${currentTheme.text} mb-6 transition-colors duration-300`}
              {...fadeInUp}
              transition={{ delay: 0.4 }}
            >
              Ahmed Gharbi
            </motion.h1>

            <motion.div
              className={`text-xl md:text-2xl ${
                theme === "dark" ? "text-purple-200" : "text-purple-600"
              } mb-8 transition-colors duration-300`}
              {...fadeInUp}
              transition={{ delay: 0.6 }}
            >
              <TypingAnimation
                texts={[
                  "Certified Software Engineer & Cloud Architect",
                  "Kubernetes Expert & DevOps Specialist",
                  "Full-Stack Developer & System Designer",
                  "Innovation Leader & Problem Solver",
                ]}
              />
            </motion.div>

            <motion.p
              className={`text-lg ${currentTheme.textSecondary} mb-12 max-w-3xl mx-auto transition-colors duration-300`}
              {...fadeInUp}
              transition={{ delay: 0.8 }}
            >
              3+ years of experience in backend, cloud, DevOps, and IT support. Passionate about scalable systems,
              reliable infrastructure, and agile teamwork.
            </motion.p>

            <motion.div className="flex flex-wrap justify-center gap-4 mb-12" {...fadeInUp} transition={{ delay: 1 }}>
              <Button
                size="lg"
                className={`${
                  theme === "dark" ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-600 hover:bg-purple-700"
                } text-white transition-all duration-300`}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    ;(window as any).playClickSound?.()
                  }
                  scrollToSection("projects")
                }}
                onMouseEnter={() => {
                  if (typeof window !== "undefined") {
                    ;(window as any).playHoverSound?.()
                  }
                }}
              >
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`${
                  theme === "dark"
                    ? "border-white/50 text-white hover:bg-white hover:text-black bg-white/10 backdrop-blur-sm"
                    : "border-gray-900/50 text-gray-900 hover:bg-gray-900 hover:text-white bg-white/80 backdrop-blur-sm"
                } transition-all duration-300 font-semibold`}
                onMouseEnter={() => {
                  if (typeof window !== "undefined") {
                    ;(window as any).playHoverSound?.()
                  }
                }}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    ;(window as any).playClickSound?.()
                  }
                  downloadCV()
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </motion.div>

            <motion.div className="flex justify-center space-x-6" {...fadeInUp} transition={{ delay: 1.2 }}>
              <motion.a
                href="mailto:aghx01@gmail.com"
                className={`${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors duration-300`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => {
                  if (typeof window !== "undefined") {
                    ;(window as any).playHoverSound?.()
                  }
                }}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    ;(window as any).playClickSound?.()
                  }
                }}
              >
                <Mail className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://github.com/GharbiiAhmed"
                target="_blank"
                rel="noopener noreferrer"
                className={`${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors duration-300`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => {
                  if (typeof window !== "undefined") {
                    ;(window as any).playHoverSound?.()
                  }
                }}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    ;(window as any).playClickSound?.()
                  }
                }}
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/ahmed-harley/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors duration-300`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => {
                  if (typeof window !== "undefined") {
                    ;(window as any).playHoverSound?.()
                  }
                }}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    ;(window as any).playClickSound?.()
                  }
                }}
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <ChevronDown className={`w-8 h-8 ${currentTheme.textMuted} transition-colors duration-300`} />
          </motion.div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className={`py-20 ${theme === "dark" ? "bg-black/20" : "bg-white/40"} transition-all duration-500`}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.text} mb-6 transition-colors duration-300`}>
                About Me
              </h2>
              <div
                className={`w-24 h-1 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500"
                    : "bg-gradient-to-r from-purple-600 to-blue-600"
                } mx-auto mb-8 transition-all duration-500`}
              ></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className={`text-2xl font-bold ${currentTheme.text} mb-6 transition-colors duration-300`}>
                  Professional Summary
                </h3>
                <p
                  className={`${currentTheme.textSecondary} text-lg leading-relaxed mb-6 transition-colors duration-300`}
                >
                  I'm a certified software engineer with over 3 years of hands-on experience in backend development,
                  cloud architecture, and DevOps practices. My expertise spans across modern technologies including
                  Kubernetes, Docker, Spring Boot, and various cloud platforms.
                </p>
                <p className={`${currentTheme.textSecondary} text-lg leading-relaxed transition-colors duration-300`}>
                  I'm passionate about building scalable systems and reliable infrastructure that can handle
                  enterprise-level challenges. My strong communication skills and agile mindset make me an effective
                  team player and technical leader.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div
                  className={`flex items-center space-x-4 ${currentTheme.textSecondary} transition-colors duration-300`}
                >
                  <MapPin className={`w-5 h-5 ${currentTheme.accent} transition-colors duration-300`} />
                  <span>Offenbach am Main, Germany</span>
                </div>
                <div
                  className={`flex items-center space-x-4 ${currentTheme.textSecondary} transition-colors duration-300`}
                >
                  <Mail className={`w-5 h-5 ${currentTheme.accent} transition-colors duration-300`} />
                  <a
                    href="mailto:aghx01@gmail.com"
                    className="hover:text-purple-400 transition-colors"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        ;(window as any).playClickSound?.()
                      }
                    }}
                  >
                    aghx01@gmail.com
                  </a>
                </div>
                <div
                  className={`flex items-center space-x-4 ${currentTheme.textSecondary} transition-colors duration-300`}
                >
                  <Phone className={`w-5 h-5 ${currentTheme.accent} transition-colors duration-300`} />
                  <a
                    href="tel:+4915510553324"
                    className="hover:text-purple-400 transition-colors"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        ;(window as any).playClickSound?.()
                      }
                    }}
                  >
                    +49 15510 553324
                  </a>
                </div>
                <div
                  className={`flex items-center space-x-4 ${currentTheme.textSecondary} transition-colors duration-300`}
                >
                  <GraduationCap className={`w-5 h-5 ${currentTheme.accent} transition-colors duration-300`} />
                  <span>Philipps-Universität Marburg</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.text} mb-6 transition-colors duration-300`}>
                Technical Skills
              </h2>
              <div
                className={`w-24 h-1 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500"
                    : "bg-gradient-to-r from-purple-600 to-blue-600"
                } mx-auto mb-8 transition-all duration-500`}
              ></div>
            </motion.div>

            {/* Skill Radar Chart */}
            <div className="mb-16">
              <SkillRadar theme={theme} />
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {Object.entries(skills).map(([category, skillList], index) => (
                <motion.div
                  key={category}
                  variants={fadeInUp}
                  className={`${currentTheme.cardBg} backdrop-blur-sm rounded-xl p-6 border ${currentTheme.border} ${
                    theme === "dark" ? "hover:border-purple-500/50" : "hover:border-purple-400/50"
                  } transition-all duration-300 shadow-lg`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onMouseEnter={() => {
                    if (typeof window !== "undefined") {
                      ;(window as any).playCardHover?.()
                    }
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-purple-500 to-blue-500"
                          : "bg-gradient-to-r from-purple-600 to-blue-600"
                      } rounded-lg flex items-center justify-center mr-4 transition-all duration-500`}
                    >
                      {category === "languages" && <Code className="w-6 h-6 text-white" />}
                      {category === "devops" && <Server className="w-6 h-6 text-white" />}
                      {category === "frameworks" && <Database className="w-6 h-6 text-white" />}
                      {category === "tools" && <Award className="w-6 h-6 text-white" />}
                      {category === "other" && <Cloud className="w-6 h-6 text-white" />}
                    </div>
                    <h3 className={`text-xl font-bold ${currentTheme.text} capitalize transition-colors duration-300`}>
                      {category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Badge
                          variant="secondary"
                          className={`${
                            theme === "dark"
                              ? "bg-purple-500/20 text-purple-200 hover:bg-purple-500/30"
                              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                          } transition-all duration-300`}
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className={`py-20 ${theme === "dark" ? "bg-black/20" : "bg-white/40"} transition-all duration-500`}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.text} mb-6 transition-colors duration-300`}>
                Featured Projects
              </h2>
              <div
                className={`w-24 h-1 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500"
                    : "bg-gradient-to-r from-purple-600 to-blue-600"
                } mx-auto mb-8 transition-all duration-500`}
              ></div>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -10 }}
                  className="group cursor-pointer"
                  onMouseEnter={() => {
                    if (typeof window !== "undefined") {
                      ;(window as any).playCardHover?.()
                    }
                  }}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      ;(window as any).playClickSound?.()
                    }
                    setSelectedProject(project)
                  }}
                >
                  <Card
                    className={`${currentTheme.cardBg} backdrop-blur-sm border ${currentTheme.border} ${
                      theme === "dark" ? "hover:border-purple-500/50" : "hover:border-purple-400/50"
                    } transition-all duration-300 h-full shadow-lg`}
                  >
                    <CardContent className="p-6">
                      {/* Add project image */}
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src={project.images?.[0] || "/placeholder.svg?height=200&width=400"}
                          alt={project.title}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <h3
                          className={`text-xl font-bold ${currentTheme.text} ${
                            theme === "dark" ? "group-hover:text-purple-400" : "group-hover:text-purple-600"
                          } transition-colors duration-300`}
                        >
                          {project.title}
                        </h3>
                        <ExternalLink
                          className={`w-5 h-5 ${currentTheme.textMuted} ${
                            theme === "dark" ? "group-hover:text-purple-400" : "group-hover:text-purple-600"
                          } transition-colors duration-300`}
                        />
                      </div>
                      <p className={`${currentTheme.textSecondary} mb-4 transition-colors duration-300`}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className={`${
                              theme === "dark"
                                ? "border-purple-500/50 text-purple-300"
                                : "border-purple-400/50 text-purple-600"
                            } transition-all duration-300`}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className={`${currentTheme.textMuted} text-sm flex items-start transition-colors duration-300`}
                          >
                            <div
                              className={`w-1.5 h-1.5 ${currentTheme.accent} rounded-full mt-2 mr-3 flex-shrink-0 transition-colors duration-300`}
                            ></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.text} mb-6 transition-colors duration-300`}>
                Experience
              </h2>
              <div
                className={`w-24 h-1 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500"
                    : "bg-gradient-to-r from-purple-600 to-blue-600"
                } mx-auto mb-8 transition-all duration-500`}
              ></div>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <InteractiveTimeline />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={`py-20 ${theme === "dark" ? "bg-black/20" : "bg-white/40"} transition-all duration-500`}>
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.text} mb-6 transition-colors duration-300`}>
                What People Say
              </h2>
              <div
                className={`w-24 h-1 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500"
                    : "bg-gradient-to-r from-purple-600 to-blue-600"
                } mx-auto mb-8 transition-all duration-500`}
              ></div>
            </motion.div>
            <TestimonialsCarousel />
          </div>
        </section>

        {/* Achievement Badges Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.text} mb-6 transition-colors duration-300`}>
                Achievements & Recognition
              </h2>
              <div
                className={`w-24 h-1 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500"
                    : "bg-gradient-to-r from-purple-600 to-blue-600"
                } mx-auto mb-8 transition-all duration-500`}
              ></div>
            </motion.div>
            <AchievementBadges />
          </div>
        </section>

        {/* Certifications Section */}
        <section
          id="certifications"
          className={`py-20 ${theme === "dark" ? "bg-black/20" : "bg-white/40"} transition-all duration-500`}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.text} mb-6 transition-colors duration-300`}>
                Certifications
              </h2>
              <div
                className={`w-24 h-1 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500"
                    : "bg-gradient-to-r from-purple-600 to-blue-600"
                } mx-auto mb-8 transition-all duration-500`}
              ></div>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className={`${currentTheme.cardBg} backdrop-blur-sm rounded-xl p-6 border ${currentTheme.border} ${
                    theme === "dark" ? "hover:border-purple-500/50" : "hover:border-purple-400/50"
                  } transition-all duration-300 text-center shadow-lg cursor-pointer`}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open(cert.url, "_blank")
                      ;(window as any).playClickSound?.()
                    }
                  }}
                  onMouseEnter={() => {
                    if (typeof window !== "undefined") {
                      ;(window as any).playCardHover?.()
                    }
                  }}
                >
                  <div
                    className={`w-16 h-16 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-purple-500 to-blue-500"
                        : "bg-gradient-to-r from-purple-600 to-blue-600"
                    } rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500`}
                  >
                    {cert.icon}
                  </div>
                  <h3 className={`text-lg font-bold ${currentTheme.text} mb-2 transition-colors duration-300`}>
                    {cert.title}
                  </h3>
                  <p
                    className={`${
                      theme === "dark" ? "text-purple-300" : "text-purple-600"
                    } mb-2 transition-colors duration-300`}
                  >
                    {cert.date}
                  </p>
                  <p className={`${currentTheme.textMuted} text-sm font-mono transition-colors duration-300`}>
                    {cert.id}
                  </p>
                  <div className="mt-3 flex items-center justify-center text-purple-400">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    <span className="text-xs">View Certificate</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.text} mb-6 transition-colors duration-300`}>
                Let's Connect
              </h2>
              <div
                className={`w-24 h-1 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500"
                    : "bg-gradient-to-r from-purple-600 to-blue-600"
                } mx-auto mb-8 transition-all duration-500`}
              ></div>
              <p className={`${currentTheme.textSecondary} text-lg max-w-2xl mx-auto transition-colors duration-300`}>
                Ready to discuss your next project or explore opportunities? I'd love to hear from you and see how we
                can work together.
              </p>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <motion.div className="flex items-center space-x-4" whileHover={{ x: 10 }}>
                  <div
                    className={`w-12 h-12 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-purple-500 to-blue-500"
                        : "bg-gradient-to-r from-purple-600 to-blue-600"
                    } rounded-lg flex items-center justify-center transition-all duration-500`}
                  >
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`${currentTheme.text} font-semibold transition-colors duration-300`}>Email</h3>
                    <a
                      href="mailto:aghx01@gmail.com"
                      className={`${currentTheme.textSecondary} hover:text-purple-400 transition-colors duration-300`}
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          ;(window as any).playClickSound?.()
                        }
                      }}
                    >
                      aghx01@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div className="flex items-center space-x-4" whileHover={{ x: 10 }}>
                  <div
                    className={`w-12 h-12 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-purple-500 to-blue-500"
                        : "bg-gradient-to-r from-purple-600 to-blue-600"
                    } rounded-lg flex items-center justify-center transition-all duration-500`}
                  >
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`${currentTheme.text} font-semibold transition-colors duration-300`}>Phone</h3>
                    <a
                      href="tel:+4915510553324"
                      className={`${currentTheme.textSecondary} hover:text-purple-400 transition-colors duration-300`}
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          ;(window as any).playClickSound?.()
                        }
                      }}
                    >
                      +49 15510 553324
                    </a>
                  </div>
                </motion.div>

                <motion.div className="flex items-center space-x-4" whileHover={{ x: 10 }}>
                  <div
                    className={`w-12 h-12 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-purple-500 to-blue-500"
                        : "bg-gradient-to-r from-purple-600 to-blue-600"
                    } rounded-lg flex items-center justify-center transition-all duration-500`}
                  >
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`${currentTheme.text} font-semibold transition-colors duration-300`}>Location</h3>
                    <p className={`${currentTheme.textSecondary} transition-colors duration-300`}>
                      Offenbach am Main, Germany
                    </p>
                  </div>
                </motion.div>

                <div className="flex justify-center space-x-6 pt-4">
                  <motion.a
                    href="https://github.com/GharbiiAhmed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors duration-300`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => {
                      if (typeof window !== "undefined") {
                        ;(window as any).playHoverSound?.()
                      }
                    }}
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        ;(window as any).playClickSound?.()
                      }
                    }}
                  >
                    <Github className="w-8 h-8" />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/ahmed-harley/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors duration-300`}
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => {
                      if (typeof window !== "undefined") {
                        ;(window as any).playHoverSound?.()
                      }
                    }}
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        ;(window as any).playClickSound?.()
                      }
                    }}
                  >
                    <Linkedin className="w-8 h-8" />
                  </motion.a>
                </div>
              </div>

              <div>
                <ContactForm theme={theme} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`py-8 ${theme === "dark" ? "bg-black/40" : "bg-gray-100/80"} border-t ${currentTheme.border} transition-all duration-500`}
        >
          <div className="container mx-auto px-6 text-center">
            <p className={`${currentTheme.textMuted} transition-colors duration-300`}>
              © 2025 Ahmed Gharbi. Built with passion and modern web technologies.
            </p>
          </div>
        </footer>

        {/* Project Modal */}
        <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </ThemeContext.Provider>
  )
}
