"use client"

import { Github, Twitter, Linkedin } from "lucide-react"
import { useEffect, useState } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <footer className="border-t border-zinc-800 bg-black py-6">
        <div className="container flex justify-between items-center">
          <p className="text-sm text-zinc-400">&copy; {currentYear}</p>
          <div className="flex space-x-4">
            <div className="h-5 w-5"></div>
            <div className="h-5 w-5"></div>
            <div className="h-5 w-5"></div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-zinc-800 bg-black py-6">
      <div className="container flex justify-between items-center">
        <p className="text-sm text-zinc-400">&copy; {currentYear} Kai Hui</p>
        <div className="flex space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
