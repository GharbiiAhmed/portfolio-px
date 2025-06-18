"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactFormProps {
  theme?: "dark" | "light"
}

export function ContactForm({ theme = "dark" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  // Theme-aware styles
  const themeStyles = {
    dark: {
      label: "text-white",
      input: "bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-purple-500",
      text: "text-white",
      textSecondary: "text-white/80",
      textMuted: "text-white/60",
      border: "border-white/10",
      link: "text-purple-400 hover:text-purple-300",
    },
    light: {
      label: "text-gray-900",
      input: "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500",
      text: "text-gray-900",
      textSecondary: "text-gray-700",
      textMuted: "text-gray-600",
      border: "border-gray-200",
      link: "text-purple-600 hover:text-purple-700",
    },
  }

  const currentTheme = themeStyles[theme]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    ;(window as any).playClickSound?.()

    try {
      const response = await fetch("https://formspree.io/f/xeokzrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setStatus("success")
        ;(window as any).playSuccessSound?.()
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className={`block ${currentTheme.label} font-medium mb-2 transition-colors duration-300`}
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 ${currentTheme.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300`}
            placeholder="Your full name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className={`block ${currentTheme.label} font-medium mb-2 transition-colors duration-300`}
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 ${currentTheme.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300`}
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className={`block ${currentTheme.label} font-medium mb-2 transition-colors duration-300`}
        >
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 ${currentTheme.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300`}
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className={`block ${currentTheme.label} font-medium mb-2 transition-colors duration-300`}
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className={`w-full px-4 py-3 ${currentTheme.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 resize-none`}
          placeholder="Tell me about your project or opportunity..."
        />
      </div>

      <Button
        type="submit"
        disabled={status === "sending"}
        className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        onMouseEnter={() => (window as any).playHoverSound?.()}
      >
        {status === "sending" ? (
          <motion.div
            className="flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
            Sending...
          </motion.div>
        ) : status === "success" ? (
          <div className="flex items-center justify-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Message Sent!
          </div>
        ) : status === "error" ? (
          <div className="flex items-center justify-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Try Again
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </div>
        )}
      </Button>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-500 text-center font-medium"
        >
          Thank you! Your message has been sent successfully. I'll get back to you soon! 📧
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-center font-medium"
        >
          Failed to send message. Please try again or email me directly at aghx01@gmail.com
        </motion.div>
      )}

      {/* Alternative contact methods */}
      <div className={`text-center pt-4 border-t ${currentTheme.border} transition-colors duration-300`}>
        <p className={`${currentTheme.textMuted} text-sm mb-2 transition-colors duration-300`}>
          Or contact me directly:
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="mailto:aghx01@gmail.com"
            className={`${currentTheme.link} transition-colors duration-300`}
            onMouseEnter={() => (window as any).playHoverSound?.()}
            onClick={() => (window as any).playClickSound?.()}
          >
            aghx01@gmail.com
          </a>
          <span className={`${currentTheme.textMuted} transition-colors duration-300`}>|</span>
          <a
            href="tel:+4915510553324"
            className={`${currentTheme.link} transition-colors duration-300`}
            onMouseEnter={() => (window as any).playHoverSound?.()}
            onClick={() => (window as any).playClickSound?.()}
          >
            +49 15510 553324
          </a>
        </div>
      </div>

      {/* Formspree powered indicator */}
      <div className="text-center">
        <p className={`${currentTheme.textMuted} text-xs transition-colors duration-300`}>
          Powered by <span className={`${currentTheme.link}`}>Formspree</span>
        </p>
      </div>
    </motion.form>
  )
}
