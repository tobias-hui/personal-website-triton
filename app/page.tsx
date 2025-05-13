"use client"

import { useLanguage } from "@/components/language-provider"
import PageTransition from "@/components/page-transition"
import { motion } from "framer-motion"
import { Copy, Check, LayoutPanelLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

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
      position: "齐聚马力Hackthon&2024Googel开发者大会",
      company: "segmentfault",
      year: "2023.09.07",
      description: "Awarded Second Prize for a project focused on animal rescue and welfare.",
    },
    {
      position: "Participant, Shanghai 1st AI Hack Engine",
      company: "即刻",
      year: "2023.04.27",
      description: "Selected as one of sixteen team members for the inaugural Hack Engine program. Collaborated on innovative AI projects and became part of the first cohort of Hack Engine alumni."
    },
    {
      position: "Full-Stack Developer",
      company: "Tritonix",
      year: "2024 - Present",
      description:
        "Lead frontend development for enterprise applications using React, Next.js, and TypeScript. Implemented design systems and improved performance metrics by 40%.",
    },
    {
      position: "Backend Developer",
      company: "PiAPI",
      companyUrl: "https://piapi.ai/",
      year: "2023 - 2024",
      description:
        "Developed and integrated backend APIs; Maintained comprehensive API documentation for developer clients.",
    },
    {
      position: "Technical Art",
      company: "Builtopia",
      companyUrl: "https://builtopia.io/",
      year: "2022 - 2023",
      description:
        "Created 3D models and shaders for online virtual spaces; Optimized existing workflows using text-to-image AI technology to enhance production efficiency.",
    },
  ]

  const bioText = `Kai Hui is a Chinese creator and programmer based in Shenzhen. In his second year of university, he began interning at the seed-funded startup Builtopia, gaining firsthand experience in the challenges of entrepreneurship. After participating in award-winning AI hackathons and building a profitable API service with former colleagues, he founded Tritonix in 2024, supported by former CEO Cheng Fu, to provide automated operation solutions for e-commerce brands. He adheres to the principles of Minimalist Entrepreneurship in his business approach.`

  const tools = [
    {
      icon: LayoutPanelLeft,
      title: "Social Media Card Generator",
      description: "Easily create and customize beautiful social media cards. Supports Markdown, multiple themes, and pagination for long content. One-click export and share on platforms like Xiaohongshu, Weibo, etc.",
      href: "/card-generator",
      cta: "Try it Out",
      imageUrl: "/card-generator.png",
    },
    // Add more tools here in the future
  ]

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
                Minimalist Entrepreneur, Full-Stack Developer, Stoic
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
                  that, I interned at Builtopia. Although the company went through a challenging period, I developed a strong friendship with our CEO,{" "}
                  <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                    Cheng Fu
                  </span>
                  , as we worked together to find solutions and navigate those difficulties. who continues to mentor me today. I'm originally from China and now living in{" "}
                  <span className="text-white font-medium text-lg">Shenzhen</span>, Guangdong.
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

      {/* Experience Section */}
      <div id="about" className="bg-black py-6">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold">Experience</h2>
            </motion.div>

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
                  className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{job.position}</h3>
                    <span className="text-sm text-zinc-400">{job.year}</span>
                  </div>
                  {job.companyUrl ? (
                    <Link
                      href={job.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mb-3 inline-block"
                    >
                      {job.company}
                    </Link>
                  ) : (
                    <span className="mb-3 inline-block">{job.company}</span>
                  )}
                  <p className="text-zinc-400">{job.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tools Showcase Section */}
      <div id="tools-showcase" className="bg-black py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-4">My Practical Tools</h2>
              <p className="text-xl text-zinc-400">Some small tools I've developed, hoping they can help you.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-zinc-900/50 rounded-lg p-6 md:p-8 border border-zinc-800 hover:border-purple-500/50 transition-colors duration-300 shadow-lg hover:shadow-purple-500/20 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                    {/* Left side: Text content & CTA */}
                    <div className="flex-grow md:w-1/2">
                      <div className="flex items-center mb-3">
                        <tool.icon className="h-8 w-8 text-purple-400 mr-3 flex-shrink-0" />
                        <h3 className="text-2xl font-bold text-white">{tool.title}</h3>
                      </div>
                      <p className="text-zinc-400 mb-6 text-sm leading-relaxed md:text-base">{tool.description}</p>
                      <Link href={tool.href} passHref>
                        <Button variant="outline" className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600 hover:border-purple-700 px-6 py-3 text-base">
                          {tool.cta}
                        </Button>
                      </Link>
                    </div>

                    {/* Right side: Image */}
                    {tool.imageUrl && (
                      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center md:justify-end">
                        <div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-2xl group">
                          <Image 
                            src={tool.imageUrl} 
                            alt={`${tool.title} preview`} 
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                          />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Tools Section */}
      <div className="bg-black py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">AI Tools Mastery</h2>
              <p className="text-zinc-400">
                As a modern developer, I leverage cutting-edge AI tools to enhance productivity and creativity. These
                tools have revolutionized the development workflow, enabling faster prototyping and more efficient
                problem-solving.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800"
              >
                <div className="flex flex-row items-center gap-4 mb-4">
                  <div className="relative h-8 w-8">
                    <Image src="https://cursor.sh/favicon.ico" alt="Cursor" fill className="object-contain" />
                  </div>
                  <h3 className="text-xl font-bold">Cursor</h3>
                </div>
                <p className="text-zinc-400">
                  AI-powered code editor designed to help developers write, understand, and improve code faster.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800"
              >
                <div className="flex flex-row items-center gap-4 mb-4">
                  <div className="relative h-8 w-8">
                    <Image
                      src="https://canva0.oss-cn-hongkong.aliyuncs.com/uploads/1745077732.png"
                      alt="v0.dev"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Vercel's V0</h3>
                </div>
                <p className="text-zinc-400">
                  AI-powered code editor designed to help developers write, understand, and improve code faster.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800"
              >
                <div className="flex flex-row items-center gap-4 mb-4">
                  <div className="relative h-8 w-8">
                    <Image src="https://lennysbundle.com/images/logos/bolt.jpg" alt="Bolt" fill className="object-contain" />
                  </div>
                  <h3 className="text-xl font-bold">Bolt</h3>
                </div>
                <p className="text-zinc-400">
                  AI-powered code editor designed to help developers write, understand, and improve code faster.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800"
              >
                <div className="flex flex-row items-center gap-4 mb-4">
                  <div className="relative h-8 w-8">
                    <Image
                      src="https://www.perplexity.ai/favicon.ico"
                      alt="Perplexity"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Perplexity</h3>
                </div>
                <p className="text-zinc-400">
                  AI-powered code editor designed to help developers write, understand, and improve code faster.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
