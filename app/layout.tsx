import type React from "react"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ErrorBoundary from "@/components/error-boundary"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kai Hui",
  description: "Personal website of Kai Hui",
  keywords: ["portfolio", "developer", "next.js", "react", "tailwind"],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white`}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
            <LanguageProvider>
              <div className="flex min-h-screen flex-col bg-black text-white">
                <Suspense fallback={<div className="h-16 border-b border-zinc-800"></div>}>
                  <Header />
                </Suspense>
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
