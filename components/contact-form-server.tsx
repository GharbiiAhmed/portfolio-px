"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitContactForm } from "@/app/actions/contact"

export function ContactFormServer() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (formData: FormData) => {
    setStatus("sending")
    ;(window as any).playClickSound?.()

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setStatus("success")
        setMessage(result.message)
        ;(window as any).playSuccessSound?.()

        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()

        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setMessage(result.message)
        setTimeout(() => setStatus("idle"), 3000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setStatus("error")
      setMessage("Failed to send message. Please try again.")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  return (
    <motion.form
      id="contact-form"
      action={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-white font-medium mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-white font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-white font-medium mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-white font-medium mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors resize-none"
          placeholder="Tell me about your project or opportunity..."
        />
      </div>

      <Button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold transition-all duration-300"
      >
        {status === "sending" ? (
          <motion.div className="flex items-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Sending...
          </motion.div>
        ) : status === "success" ? (
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Message Sent!
          </div>
        ) : status === "error" ? (
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Try Again
          </div>
        ) : (
          <div className="flex items-center">
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </div>
        )}
      </Button>

      {(status === "success" || status === "error") && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center ${status === "success" ? "text-green-400" : "text-red-400"}`}
        >
          {message}
        </motion.div>
      )}

      {/* Alternative contact methods */}
      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-white/60 text-sm mb-2">Or contact me directly:</p>
        <div className="flex justify-center space-x-4">
          <a href="mailto:aghx01@gmail.com" className="text-purple-400 hover:text-purple-300 transition-colors">
            aghx01@gmail.com
          </a>
          <span className="text-white/40">|</span>
          <a href="tel:+4915510553324" className="text-purple-400 hover:text-purple-300 transition-colors">
            +49 15510 553324
          </a>
        </div>
      </div>
    </motion.form>
  )
}
