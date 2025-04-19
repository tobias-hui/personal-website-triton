"use client"

import { useLanguage } from "@/components/language-provider"
import PageTransition from "@/components/page-transition"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function TechStackPage() {
  const { t } = useLanguage()

  const technologies = {
    frontend: [
      {
        name: "React",
        icon: "/placeholder.svg?height=80&width=80&query=react logo",
        description: "A JavaScript library for building user interfaces",
        proficiency: 90,
      },
      {
        name: "Next.js",
        icon: "/placeholder.svg?height=80&width=80&query=nextjs logo",
        description: "The React framework for production",
        proficiency: 85,
      },
      {
        name: "TypeScript",
        icon: "/placeholder.svg?height=80&width=80&query=typescript logo",
        description: "Typed JavaScript at any scale",
        proficiency: 80,
      },
      {
        name: "Tailwind CSS",
        icon: "/placeholder.svg?height=80&width=80&query=tailwind css logo",
        description: "A utility-first CSS framework",
        proficiency: 90,
      },
      {
        name: "Framer Motion",
        icon: "/placeholder.svg?height=80&width=80&query=framer motion logo",
        description: "A production-ready motion library for React",
        proficiency: 75,
      },
    ],
    backend: [
      {
        name: "Node.js",
        icon: "/placeholder.svg?height=80&width=80&query=nodejs logo",
        description: "JavaScript runtime built on Chrome's V8 engine",
        proficiency: 80,
      },
      {
        name: "Express",
        icon: "/placeholder.svg?height=80&width=80&query=express js logo",
        description: "Fast, unopinionated, minimalist web framework for Node.js",
        proficiency: 75,
      },
      {
        name: "MongoDB",
        icon: "/placeholder.svg?height=80&width=80&query=mongodb logo",
        description: "Document-based, distributed database",
        proficiency: 70,
      },
      {
        name: "PostgreSQL",
        icon: "/placeholder.svg?height=80&width=80&query=postgresql logo",
        description: "Powerful, open source object-relational database",
        proficiency: 65,
      },
      {
        name: "GraphQL",
        icon: "/placeholder.svg?height=80&width=80&query=graphql logo",
        description: "A query language for your API",
        proficiency: 60,
      },
    ],
    tools: [
      {
        name: "Git",
        icon: "/placeholder.svg?height=80&width=80&query=git logo",
        description: "Distributed version control system",
        proficiency: 85,
      },
      {
        name: "Docker",
        icon: "/placeholder.svg?height=80&width=80&query=docker logo",
        description: "Platform for developing, shipping, and running applications",
        proficiency: 70,
      },
      {
        name: "VS Code",
        icon: "/placeholder.svg?height=80&width=80&query=vscode logo",
        description: "Code editor redefined and optimized for building modern web applications",
        proficiency: 90,
      },
      {
        name: "Figma",
        icon: "/placeholder.svg?height=80&width=80&query=figma logo",
        description: "Collaborative interface design tool",
        proficiency: 75,
      },
      {
        name: "GitHub Actions",
        icon: "/placeholder.svg?height=80&width=80&query=github actions logo",
        description: "Automate your workflow from idea to production",
        proficiency: 65,
      },
    ],
  }

  return (
    <PageTransition>
      <div className="container py-12 md:py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold">{t("tech.title")}</h1>
          <p className="mt-4 text-xl text-muted-foreground">Technologies and tools I use to bring ideas to life</p>
        </motion.div>

        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          {Object.entries(technologies).map(([category, techs]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {techs.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Card className="h-full overflow-hidden">
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="relative h-16 w-16 overflow-hidden">
                          <Image
                            src={tech.icon || "/placeholder.svg"}
                            alt={tech.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <CardTitle>{tech.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{tech.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Proficiency</span>
                            <span>{tech.proficiency}%</span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: 0 }}
                              animate={{ width: `${tech.proficiency}%` }}
                              transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Always Learning</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technology is constantly evolving, and I'm committed to staying up-to-date with the latest trends and best
            practices. I'm currently exploring WebAssembly, AI integration, and advanced animation techniques.
          </p>
        </motion.div>
      </div>
    </PageTransition>
  )
}
