"use client"

import { useLanguage } from "@/components/language-provider"
import PageTransition from "@/components/page-transition"
import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

export default function ProjectsPage() {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: "Modern E-commerce Platform",
      description: "A full-featured e-commerce platform with cart, checkout, and payment integration.",
      image: "/dark-minimalist-shop.png",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      details:
        "This project is a comprehensive e-commerce solution built with Next.js and TypeScript. It features a responsive design, product filtering, user authentication, shopping cart functionality, and Stripe payment integration. The admin dashboard allows for product management, order tracking, and analytics.",
    },
    {
      id: 2,
      title: "AI Content Generator",
      description: "An AI-powered application that generates various types of content based on user prompts.",
      image: "/ai-content-dashboard-dark.png",
      tags: ["React", "Node.js", "OpenAI", "MongoDB"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      details:
        "This application leverages OpenAI's GPT models to generate blog posts, social media content, and marketing copy. Users can input prompts, adjust parameters, and receive AI-generated content in seconds. The project includes user authentication, content history, and the ability to edit and export generated content in various formats.",
    },
    {
      id: 3,
      title: "Personal Finance Dashboard",
      description: "A dashboard for tracking personal finances, expenses, and investments.",
      image: "/dark-finance-dashboard.png",
      tags: ["Vue.js", "Express", "Chart.js", "PostgreSQL"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      details:
        "This personal finance tracker helps users manage their finances with intuitive visualizations and budgeting tools. Features include expense categorization, income tracking, investment portfolio monitoring, and goal setting. The dashboard provides insights through interactive charts and generates monthly reports to help users optimize their financial decisions.",
    },
    {
      id: 4,
      title: "Real-time Collaboration Tool",
      description: "A platform for teams to collaborate on documents and projects in real-time.",
      image: "/dark-theme-collaboration.png",
      tags: ["React", "Socket.io", "Firebase", "Quill.js"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      details:
        "This real-time collaboration tool enables teams to work together on documents, code, and project management. It features a rich text editor with real-time updates, chat functionality, task assignment, and version history. The application uses WebSockets for instant communication and Firebase for data persistence.",
    },
    {
      id: 5,
      title: "Fitness Tracking Mobile App",
      description: "A cross-platform mobile app for tracking workouts, nutrition, and fitness goals.",
      image: "/placeholder.svg?height=600&width=800&query=fitness tracking app screens with dark theme",
      tags: ["React Native", "Redux", "Firebase", "HealthKit"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      details:
        "This fitness tracking application helps users monitor their workouts, nutrition, and progress toward fitness goals. It includes workout plans, exercise demonstrations, calorie tracking, and integration with health devices. The app provides personalized recommendations and analytics to help users optimize their fitness routines.",
    },
    {
      id: 6,
      title: "Smart Home Control System",
      description: "An IoT solution for controlling and automating smart home devices.",
      image: "/placeholder.svg?height=600&width=800&query=smart home control dashboard with dark theme",
      tags: ["React", "Node.js", "MQTT", "Raspberry Pi"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      details:
        "This smart home system allows users to control and automate their connected devices through a centralized dashboard. It supports various IoT protocols and integrates with popular smart home ecosystems. Features include device scheduling, scene creation, energy monitoring, and voice control integration.",
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
          <h1 className="text-4xl font-bold">{t("projects.title")}</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            A showcase of my recent development projects and experiments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden group">
                <div className="relative overflow-hidden aspect-video">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setSelectedProject(project)}>
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>{project.title}</DialogTitle>
                        <DialogDescription>{project.description}</DialogDescription>
                      </DialogHeader>
                      <div className="relative aspect-video mt-4 mb-6 overflow-hidden rounded-lg">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <p>{project.details}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-6">
                        <Button variant="outline" asChild>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Github className="h-4 w-4" />
                            GitHub
                          </a>
                        </Button>
                        <Button asChild>
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Live Demo</span>
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
