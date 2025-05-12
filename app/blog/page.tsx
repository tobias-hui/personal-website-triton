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
      title: "Resolving the Cursor AI 'Client Closed' Error: A Complete Guide to MCP Server Connectivity Issues",
      excerpt: "This guide will help you understand and resolve common issues with Cursor's MCP capabilities. Learn essential troubleshooting steps and best practices for a smooth development experience.",
      date: "2024-05-12",
      readTime: "2 min read",
      author: "Kai Hui",
      category: "AI Tools",
      tags: ["Cursor AI", "MCP", "Troubleshooting", "Guide"],
      slug: "resolving-cursor-ai-client-closed-error-mcp-guide",
      image: "/blogs/blog-00.png",
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
