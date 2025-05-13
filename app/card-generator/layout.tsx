import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Social Media Card Generator | Kai Hui",
  description: "Create beautiful social media sharing cards, especially suitable for platforms like Xiaohongshu.",
}

export default function CardGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
