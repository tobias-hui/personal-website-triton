"use client"

import { useLanguage } from "@/components/language-provider"
import PageTransition from "@/components/page-transition"
import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ExternalLink } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function BooksPage() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("all")

  const books = [
    {
      id: 1,
      title: "Eloquent JavaScript",
      author: "Marijn Haverbeke",
      description: "A modern introduction to programming with JavaScript.",
      image: "/placeholder.svg?height=400&width=300&query=javascript book cover with dark theme",
      category: "programming",
      rating: 4.5,
      link: "https://eloquentjavascript.net/",
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      description: "A handbook of agile software craftsmanship.",
      image: "/placeholder.svg?height=400&width=300&query=clean code book cover with dark theme",
      category: "programming",
      rating: 4.7,
      link: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882",
    },
    {
      id: 3,
      title: "Design Patterns",
      author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
      description: "Elements of Reusable Object-Oriented Software.",
      image: "/placeholder.svg?height=400&width=300&query=design patterns book cover with dark theme",
      category: "programming",
      rating: 4.6,
      link: "https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612",
    },
    {
      id: 4,
      title: "Don't Make Me Think",
      author: "Steve Krug",
      description: "A common sense approach to web usability.",
      image: "/placeholder.svg?height=400&width=300&query=dont make me think book cover with dark theme",
      category: "design",
      rating: 4.8,
      link: "https://www.amazon.com/Dont-Make-Think-Revisited-Usability/dp/0321965515",
    },
    {
      id: 5,
      title: "Refactoring UI",
      author: "Adam Wathan & Steve Schoger",
      description: "Learn how to design beautiful user interfaces.",
      image: "/placeholder.svg?height=400&width=300&query=refactoring ui book cover with dark theme",
      category: "design",
      rating: 4.9,
      link: "https://www.refactoringui.com/book",
    },
    {
      id: 6,
      title: "The Design of Everyday Things",
      author: "Don Norman",
      description: "A powerful primer on how and why some products satisfy customers while others frustrate them.",
      image: "/placeholder.svg?height=400&width=300&query=design of everyday things book cover with dark theme",
      category: "design",
      rating: 4.7,
      link: "https://www.amazon.com/Design-Everyday-Things-Revised-Expanded/dp/0465050654",
    },
    {
      id: 7,
      title: "The Lean Startup",
      author: "Eric Ries",
      description: "How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses.",
      image: "/placeholder.svg?height=400&width=300&query=lean startup book cover with dark theme",
      category: "business",
      rating: 4.5,
      link: "https://www.amazon.com/Lean-Startup-Entrepreneurs-Continuous-Innovation/dp/0307887898",
    },
    {
      id: 8,
      title: "Zero to One",
      author: "Peter Thiel",
      description: "Notes on Startups, or How to Build the Future.",
      image: "/placeholder.svg?height=400&width=300&query=zero to one book cover with dark theme",
      category: "business",
      rating: 4.6,
      link: "https://www.amazon.com/Zero-One-Notes-Startups-Future/dp/0804139296",
    },
    {
      id: 9,
      title: "Hooked",
      author: "Nir Eyal",
      description: "How to Build Habit-Forming Products.",
      image: "/placeholder.svg?height=400&width=300&query=hooked book cover with dark theme",
      category: "business",
      rating: 4.4,
      link: "https://www.amazon.com/Hooked-How-Build-Habit-Forming-Products/dp/1591847788",
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
            <TabsTrigger value="programming">Programming</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
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
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Learn More
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
