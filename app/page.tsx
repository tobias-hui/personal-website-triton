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
      position: "Junior Developer",
      company: "StartUp Ventures",
      year: "2016 - 2018",
      description:
        "Worked on full-stack development projects using Node.js and React. Participated in agile development processes.",
    },
  ]

  const skills = [
    { name: "UI/UX Design", level: 90 },
    { name: "Responsive Design", level: 85 },
    { name: "Git & GitHub", level: 90 },
    { name: "Docker", level: 75 },
    { name: "AWS", level: 70 },
    { name: "Figma", level: 85 },
    { name: "VS Code", level: 95 },
    { name: "CI/CD", level: 80 },
  ]

  const languages = [
    { name: "JavaScript/TypeScript", level: 95 },
    { name: "HTML & CSS", level: 90 },
    { name: "React & Next.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 70 },
    { name: "GraphQL", level: 65 },
    { name: "SQL", level: 75 },
    { name: "PHP", level: 60 },
  ]

  const bioText = `Kai Hui is a Chinese creator and programmer. He currently lives in San Francisco, California, where he's the Founder & CEO at Horizon Tech. His lifelong appreciation for building software and sharing knowledge led him to speak in over 50 conferences worldwide. His passion for open source put him on the top 100 most active users on GitHub at age 25. Before moving to the US, Kai developed multiple applications, mentored startups, and worked at major companies in Asia, such as Tencent and Alibaba.`

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
      {/* Hero Section */}
      <div className="min-h-[30vh] flex flex-col items-center justify-center bg-black">
        <div className="container px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Create, Fail, Repeat until Success
              </h1>
              <p className="mt-4 text-xl text-zinc-400">Minimalist Entrepreneur, Full-Stack Developer, 3D Artist</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-black py-4">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Profile Image */}
              <div className="w-full md:w-1/3">
                <div className="relative overflow-hidden rounded-lg aspect-square">
                  <Image src="/profile-photo.jpeg" alt="Kai Hui" fill className="object-cover object-top" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="w-full md:w-2/3 space-y-3">
                <p className="text-lg text-zinc-200">
                  Hey, I'm Kai Hui, I started as a software engineer back in 2012, working with JavaScript.
                </p>

                <p className="text-zinc-300">
                  I'm the <span className="text-white font-medium">Founder & CEO</span> at Horizon Tech. Before that, I
                  was a VP of Developer Experience at CloudStack and CTO at Nexus Cloud. I'm originally from China and
                  now living in <span className="text-white font-medium">San Francisco, California</span> with my
                  amazing wife and beautiful son.
                </p>

                <p className="text-zinc-300">
                  <span className="text-white font-medium">I love dark mode</span>, open source, and side projects. When
                  I'm not working, I like running, watching movies, and{" "}
                  <span className="text-white font-medium">eating hotpot</span>.
                </p>
              </div>
            </motion.div>

            {/* Bio Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6"
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
