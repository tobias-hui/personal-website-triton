"use client"

import { useLanguage } from "@/components/language-provider"
import PageTransition from "@/components/page-transition"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, GraduationCap, Award } from "lucide-react"

export default function AboutPage() {
  const { t } = useLanguage()

  const education = [
    {
      degree: "Master of Computer Science",
      institution: "University of Technology",
      year: "2018 - 2020",
      description:
        "Specialized in artificial intelligence and machine learning with a focus on computer vision applications.",
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "State University",
      year: "2014 - 2018",
      description: "Graduated with honors. Focused on software development methodologies and web technologies.",
    },
  ]

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
    { name: "JavaScript/TypeScript", level: 90 },
    { name: "React & Next.js", level: 85 },
    { name: "HTML & CSS", level: 90 },
    { name: "Node.js", level: 75 },
    { name: "UI/UX Design", level: 70 },
    { name: "GraphQL", level: 65 },
    { name: "Python", level: 60 },
    { name: "DevOps", level: 50 },
  ]

  return (
    <PageTransition>
      <div className="container py-12 md:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold">{t("about.title")}</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Frontend developer specializing in creating modern, responsive web applications
            </p>
          </motion.div>

          <Tabs defaultValue="experience" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="experience" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Experience</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Education</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Skills</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="experience">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {experience.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
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

            <TabsContent value="education">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{edu.degree}</CardTitle>
                          <span className="text-sm text-muted-foreground">{edu.year}</span>
                        </div>
                        <p className="text-sm text-primary">{edu.institution}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{edu.description}</p>
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
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="space-y-2"
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
          </Tabs>
        </div>
      </div>
    </PageTransition>
  )
}
