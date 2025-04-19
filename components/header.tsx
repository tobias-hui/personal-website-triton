"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navItems = [
  { href: "/", label: "nav.home" },
  { href: "/about", label: "nav.about" },
  { href: "/projects", label: "nav.projects" },
  { href: "/blog", label: "nav.blog" },
  { href: "/books", label: "nav.books" },
  { href: "/tech-stack", label: "nav.tech" },
  { href: "/reminder", label: "nav.reminder" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Logo based on language
  const logoText = language === "zh" ? "凯" : "K"

  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-black">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">K</span>
          </Link>
          <div className="flex-1 flex justify-center">
            <nav className="hidden md:flex gap-6">
              {navItems.map((item, i) => (
                <div key={i} className="text-sm font-medium text-zinc-400">
                  {item.label}
                </div>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9"></div>
            <div className="h-9 w-9 md:hidden"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-black">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <motion.span
            key={logoText}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="font-bold text-xl"
          >
            {logoText}
          </motion.span>
        </Link>
        <div className="flex-1 flex justify-center">
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  pathname === item.href ? "text-white" : "text-zinc-400"
                }`}
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("zh")}>中文</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden"
        >
          <div className="container py-4 grid grid-flow-row auto-rows-max text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 ${pathname === item.href ? "text-white" : "text-zinc-400"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.label)}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  )
}
