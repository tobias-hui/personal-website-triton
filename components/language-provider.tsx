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
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
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
  zh: {
    "nav.home": "首页",
    "nav.projects": "项目",
    "nav.blog": "博客",
    "nav.books": "书籍",
    "nav.tech": "技术栈",
    "nav.reminder": "箴言",
    "home.title": "创造，失败，重复直至成功",
    "home.subtitle": "极简主义企业家，全栈开发者，3D艺术家",
    "projects.title": "我的项目",
    "blog.title": "博客",
    "books.title": "推荐书籍",
    "tech.title": "我的技术栈",
    "reminder.title": "箴言",
    "reminder.subtitle": "个人人生信条",
    "footer.rights": "版权所有",
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
