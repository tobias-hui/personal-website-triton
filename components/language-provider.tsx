"use client"

import { createContext, useState, useContext, type ReactNode, useEffect } from "react"

type Language = "en" | "zh"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.article": "Article",
    "nav.books": "Books",
    "nav.tech": "Tech Stack",
    "nav.reminder": "Reminder",
    "home.title": "Create, Fail, Repeat until Success",
    "home.subtitle": "Minimalist Entrepreneur, Full-Stack Developer, 3D Artist",
    "projects.title": "My Projects",
    "blog.title": "Blog",
    "books.title": "Recommended Books",
    "tech.title": "My Tech Stack",
    "reminder.title": "Reminder",
    "reminder.subtitle": "Personal Life Motto",
    "footer.rights": "All rights reserved",
    // Add more translations as needed
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const t = (key: string): string => {
    // Return key during server rendering to avoid hydration mismatch
    if (!mounted) return key

    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
