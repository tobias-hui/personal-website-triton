"use client"

import { useLanguage } from "@/components/language-provider"
import PageTransition from "@/components/page-transition"
import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"
import Image from "next/image"

export default function BooksPage() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("all")

  const books = [
    {
      id: 1,
      title: "Eloquent JavaScript",
      author: "Marijn Haverbeke",
      description: "A modern introduction to programming with JavaScript.",
      image: "/javascript-book-cover-dark.png",
      category: "programming",
      rating: 4.5,
    },
    {
      id: 2,
      title: "3D Math Primer for Graphics and Game Development",
      author: "Fletcher Dunn & Ian Parberry",
      description:
        "A comprehensive guide to the mathematics needed for 3D graphics and game development, covering vectors, matrices, transformations, and more.",
      image: "/3d-math-primer-cover.jpg",
      category: "programming",
      rating: 5.0,
    },
    {
      id: 3,
      title: "Programming: Principles and Practice Using C++",
      author: "Bjarne Stroustrup",
      description:
        "A comprehensive introduction to programming using C++ by the creator of the language himself, focusing on fundamental concepts and best practices.",
      image: "/cpp-principles-cover.jpg",
      category: "programming",
      rating: 5.0,
    },
    {
      id: 4,
      title: "The Odyssey",
      author: "Homer",
      description:
        "One of the oldest works of literature, this epic poem follows Odysseus's journey home after the Trojan War, exploring themes of perseverance, identity, and homecoming.",
      image: "/odyssey-cover.jpg",
      category: "philosophy",
      rating: 5.0,
    },
    {
      id: 5,
      title: "Meditations",
      author: "Marcus Aurelius",
      description:
        "Personal writings of the Roman Emperor Marcus Aurelius, offering profound Stoic philosophical reflections on purpose, virtue, and resilience in the face of life's challenges.",
      image: "/meditations-cover.jpg",
      category: "philosophy",
      rating: 5.0,
    },
    {
      id: 6,
      title: "The Way of the Superior Man",
      author: "David Deida",
      description:
        "A spiritual guide for men navigating career, relationships, and finding purpose in an ever-changing world.",
      image: "/superior-man-cover.jpg",
      category: "philosophy",
      rating: 5.0,
    },
    {
      id: 7,
      title: "A Guide to the Good Life: The Ancient Art of Stoic Joy",
      author: "William B. Irvine",
      description:
        "A modern interpretation of Stoic philosophy, offering practical techniques for finding tranquility and meaning in today's world.",
      image: "/stoic-joy-cover.jpg",
      category: "philosophy",
      rating: 4.0,
    },
    {
      id: 8,
      title: "The Myth of Sisyphus",
      author: "Albert Camus",
      description:
        "A philosophical essay exploring the concept of the absurd and the search for meaning in an indifferent universe.",
      image: "/sisyphus-cover.jpg",
      category: "philosophy",
      rating: 5.0,
    },
    {
      id: 9,
      title: "Of Human Bondage",
      author: "W. Somerset Maugham",
      description:
        "A semi-autobiographical novel exploring the human condition, the search for meaning, and the struggle for personal freedom.",
      image: "/human-bondage-cover.jpg",
      category: "philosophy",
      rating: 5.0,
    },
    {
      id: 10,
      title: "The Lean Startup",
      author: "Eric Ries",
      description: "How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses.",
      image: "/placeholder.svg?key=gtu6q",
      category: "business",
      rating: 4.5,
    },
    {
      id: 11,
      title: "Zero to One",
      author: "Peter Thiel",
      description: "Notes on Startups, or How to Build the Future.",
      image: "/placeholder.svg?key=tjecs",
      category: "business",
      rating: 4.6,
    },
    {
      id: 12,
      title: "Hooked",
      author: "Nir Eyal",
      description: "How to Build Habit-Forming Products.",
      image: "/placeholder.svg?key=fdcaf",
      category: "business",
      rating: 4.4,
    },
  ]

  const filteredBooks = activeCategory === "all" ? books : books.filter((book) => book.category === activeCategory)

  return (
    <PageTransition>
      <div className="container py-12 md:py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold">{t("books.title")}</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            A curated collection of books that have shaped my knowledge and perspective
          </p>
        </motion.div>

        <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="philosophy">Philosophy</TabsTrigger>
            <TabsTrigger value="programming">Programming</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full flex flex-col overflow-hidden">
                <div className="relative p-6 flex justify-center">
                  <div className="relative h-[200px] w-[150px] overflow-hidden rounded-md shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <Image src={book.image || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge>{book.category}</Badge>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(book.rating)
                              ? "fill-primary text-primary"
                              : i < book.rating
                                ? "fill-primary text-primary opacity-50"
                                : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <CardTitle className="mt-2">{book.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{book.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
