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
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        description: "A JavaScript library for building user interfaces",
        proficiency: 80,
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        description: "The React framework for production",
        proficiency: 75,
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        description: "Typed JavaScript at any scale",
        proficiency: 70,
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        description: "A utility-first CSS framework",
        proficiency: 75,
      },
    ],
    backend: [
      {
        name: "FastAPI",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
        description: "Modern, fast web framework for building APIs with Python",
        proficiency: 90,
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        description: "JavaScript runtime built on Chrome's V8 engine",
        proficiency: 80,
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        description: "Document-based, distributed database",
        proficiency: 70,
      },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        description: "Powerful, open source object-relational database",
        proficiency: 65,
      },
    ],
    tools: [
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        description: "Distributed version control system",
        proficiency: 90,
      },
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        description: "Platform for developing, shipping, and running applications",
        proficiency: 80,
      },
      {
        name: "VS Code",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/768px-Visual_Studio_Code_1.35_icon.svg.png",
        description: "Code editor redefined and optimized for building modern web applications",
        proficiency: 90,
      },
      {
        name: "Figma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        description: "Collaborative interface design tool",
        proficiency: 70,
      },
      {
        name: "Blender",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
        description: "3D creation suite for modeling, animation, and rendering",
        proficiency: 90,
      },
      {
        name: "Houdini",
        icon: "https://static-00.iconduck.com/assets.00/apps-houdini-icon-2042x2048-zoncd3rp.png",
        description: "3D animation and VFX software",
        proficiency: 80,
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
      </div>
    </PageTransition>
  )
}
