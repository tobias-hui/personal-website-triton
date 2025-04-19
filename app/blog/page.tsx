"use client"

import { useLanguage } from "@/components/language-provider"
import PageTransition from "@/components/page-transition"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  const { t } = useLanguage()

  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js App Router",
      excerpt: "Learn how to use the new App Router in Next.js 13+ for better routing and layouts.",
      date: "2023-12-15",
      readTime: "8 min read",
      author: "John Doe",
      category: "Development",
      tags: ["Next.js", "React", "Web Development"],
      slug: "getting-started-with-nextjs-app-router",
      image: "/placeholder.svg?height=400&width=800&query=coding on laptop with dark theme",
    },
    {
      id: 2,
      title: "Building Responsive UIs with Tailwind CSS",
      excerpt: "Discover how to create beautiful, responsive user interfaces using Tailwind CSS.",
      date: "2023-11-28",
      readTime: "6 min read",
      author: "Jane Smith",
      category: "Design",
      tags: ["CSS", "Tailwind", "Responsive Design"],
      slug: "building-responsive-uis-with-tailwind-css",
      image: "/placeholder.svg?height=400&width=800&query=web design with dark theme",
    },
    {
      id: 3,
      title: "Animation Techniques with Framer Motion",
      excerpt: "Explore advanced animation techniques using Framer Motion in React applications.",
      date: "2023-11-10",
      readTime: "10 min read",
      author: "Alex Johnson",
      category: "Animation",
      tags: ["React", "Framer Motion", "Animation"],
      slug: "animation-techniques-with-framer-motion",
      image: "/placeholder.svg?height=400&width=800&query=animation design with dark theme",
    },
    {
      id: 4,
      title: "State Management in Modern React",
      excerpt: "Compare different state management approaches in modern React applications.",
      date: "2023-10-22",
      readTime: "12 min read",
      author: "Sarah Williams",
      category: "Development",
      tags: ["React", "State Management", "Redux", "Context API"],
      slug: "state-management-in-modern-react",
      image: "/placeholder.svg?height=400&width=800&query=react code on screen with dark theme",
    },
    {
      id: 5,
      title: "Building a Multilingual Website",
      excerpt: "Learn how to implement internationalization in your Next.js application.",
      date: "2023-10-05",
      readTime: "9 min read",
      author: "Michael Chen",
      category: "Internationalization",
      tags: ["i18n", "Next.js", "Localization"],
      slug: "building-a-multilingual-website",
      image: "/placeholder.svg?height=400&width=800&query=world map with languages and dark theme",
    },
    {
      id: 6,
      title: "Optimizing Performance in Web Applications",
      excerpt: "Techniques and best practices for optimizing the performance of your web applications.",
      date: "2023-09-18",
      readTime: "11 min read",
      author: "David Brown",
      category: "Performance",
      tags: ["Web Performance", "Optimization", "Core Web Vitals"],
      slug: "optimizing-performance-in-web-applications",
      image: "/placeholder.svg?height=400&width=800&query=performance metrics dashboard with dark theme",
    },
  ]

  return (
    <PageTransition>
      <div className="container py-12 md:py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold">{t("blog.title")}</h1>
          <p className="mt-4 text-xl text-muted-foreground">Thoughts, tutorials, and insights on web development</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <Card className="h-full flex flex-col overflow-hidden group">
                  <div className="relative overflow-hidden aspect-[16/9]">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge>{post.category}</Badge>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
