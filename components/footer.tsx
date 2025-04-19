"use client"

import { Github, Twitter, Book } from "lucide-react"
import { useEffect, useState } from "react"

export default function Footer() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <footer className="border-t border-zinc-800 bg-black py-6">
        <div className="container flex justify-center items-center">
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
      <div className="container flex justify-center items-center">
        <div className="flex space-x-8">
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
            href="https://xiaohongshu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Book className="h-5 w-5" />
            <span className="sr-only">小红书</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
