"use client"

import { useLanguage } from "@/components/language-provider"
import PageTransition from "@/components/page-transition"
import { motion } from "framer-motion"
import { Briefcase, Award, Copy, Check, Code } from "lucide-react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Home() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const experience = [
    {
      position: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      year: "2020 - Present",
      description:
        "Lead frontend development for enterprise applications using React, Next.js, and TypeScript. Implemented design systems and improved performance metrics by 40%.",
    },
    {
      position: "Web Developer",
      company: "Digital Solutions Ltd.",
      year: "2018 - 2020",
      description:
        "Developed responsive web applications and e-commerce platforms using modern JavaScript frameworks and CSS preprocessors.",
    },
    {
      position: "Technical Art",
      company: "Builtopia",
      year: "2022 - 2023",
      description:
        "Created 3D models and shaders for online virtual spaces; Optimized existing workflows using text-to-image AI technology to enhance production efficiency.",
    },
  ]

  const skills = [
    { name: "FastAPI", level: 90 },
    { name: "Reflex", level: 80 },
    { name: "Git & GitHub", level: 90 },
    { name: "Docker", level: 80 },
    { name: "AWS", level: 70 },
    { name: "Figma", level: 70 },
    { name: "UI/UX Design", level: 70 },
    { name: "Blender", level: 90 },
    { name: "Houdini", level: 80 },
    { name: "Game Engine", level: 70 },
  ]

  const languages = [
    { name: "Python", level: 90 },
    { name: "JavaScript/TypeScript", level: 70 },
    { name: "HTML & CSS", level: 65 },
    { name: "React & Next.js", level: 75 },
    { name: "Node.js", level: 60 },
    { name: "C++", level: 60 },
  ]

  const bioText = `Kai Hui is a Chinese creator and programmer based in Shenzhen. In his second year of university, he began interning at the seed-funded startup Builtopia, gaining firsthand experience in the challenges of entrepreneurship. After participating in award-winning AI hackathons and building a profitable API service with former colleagues, he founded Tritonix in 2024, supported by former CEO Cheng Fu, to provide automated operation solutions for e-commerce brands. He adheres to the principles of Minimalist Entrepreneurship in his business approach.`

  const copyBio = () => {
    navigator.clipboard.writeText(bioText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!mounted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-black">
        <div className="container px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-12 w-3/4 bg-zinc-900 rounded mx-auto mb-6"></div>
            <div className="h-6 w-1/2 bg-zinc-900 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      {/* Profile Section with Hero Content */}
      <div className="bg-black py-8 md:py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-12 mb-12"
            >
              <h1 className="text-xl font-bold tracking-tight sm:text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Create, Fail, Repeat until Success
              </h1>
              <p className="mt-4 text-xl text-zinc-400 mb-12">
                Minimalist Entrepreneur, Full-Stack Developer, 3D Artist
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Profile Image */}
              <div className="w-full md:w-1/3">
                <div className="relative overflow-hidden rounded-lg aspect-square">
                  <Image src="/profile-photo.jpeg" alt="Kai Hui" fill className="object-cover object-top" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="w-full md:w-2/3 space-y-4">
                <p className="text-base text-zinc-400 leading-relaxed">
                  Hey, I'm Kai Hui, I started as a developer back in 2020, working with 3D Game Developing using blender
                  and Unreal Engine.
                </p>

                <p className="text-base text-zinc-400 leading-relaxed">
                  I'm the <span className="text-white font-medium text-lg">Founder & CEO</span> at Tritonix. Before
                  that, I interned at Builtopia. Although the company ultimately failed, I developed a strong friendship
                  with our CEO,{" "}
                  <span className="text-white font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                    {" "}
                    Cheng Fu{" "}
                  </span>
                  , who continues to mentor me today. I'm originally from China and now living in{" "}
                  <span className="text-white font-medium text-lg">Shenzhen, Guangdong.</span>
                </p>

                <p className="text-base text-zinc-400 leading-relaxed">
                  The goal of a startup isn't just money. I want to{" "}
                  <span className="text-white font-medium text-lg">fulfill my mission</span>, and if I can support my
                  family's happiness along the way, that's even better.
                </p>
              </div>
            </motion.div>

            {/* Bio Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-bold mb-2">Bio</h2>
              <p className="text-zinc-400 text-sm mb-3">
                This is made for journalists, podcast hosts, and event organizers to copy-and-paste.
              </p>

              <div className="border-l-4 border-zinc-700 pl-4 py-2 bg-zinc-900/50 rounded-r">
                <p className="text-zinc-300 italic">{bioText}</p>
              </div>

              <div className="mt-4 flex items-center">
                <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={copyBio}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy Bio"}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Experience and Skills Section */}
      <div id="about" className="bg-black py-6">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="experience" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span className="hidden sm:inline">Skills & Tools</span>
                </TabsTrigger>
                <TabsTrigger value="languages" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <span className="hidden sm:inline">Languages</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="experience">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {experience.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle>{job.position}</CardTitle>
                            <span className="text-sm text-muted-foreground">{job.year}</span>
                          </div>
                          <p className="text-sm text-primary">{job.company}</p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{job.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="skills">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Skills & Tools</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {skills.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="space-y-1"
                        >
                          <div className="flex justify-between">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              <TabsContent value="languages">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Programming Languages</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {languages.map((language, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="space-y-1"
                        >
                          <div className="flex justify-between">
                            <span>{language.name}</span>
                            <span>{language.level}%</span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: 0 }}
                              animate={{ width: `${language.level}%` }}
                              transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
