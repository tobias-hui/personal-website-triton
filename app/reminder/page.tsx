"use client"

import { useLanguage } from "@/components/language-provider"
import PageTransition from "@/components/page-transition"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function ReminderPage() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-black">
        <div className="container px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="h-12 w-3/4 bg-zinc-900 rounded mx-auto mb-6"></div>
            <div className="h-6 w-1/2 bg-zinc-900 rounded mx-auto mb-12"></div>
            <div className="space-y-4">
              <div className="h-4 bg-zinc-900 rounded w-full"></div>
              <div className="h-4 bg-zinc-900 rounded w-full"></div>
              <div className="h-4 bg-zinc-900 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-black">
        <div className="container px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-invert max-w-none"
            >
              <div className="text-center mb-8">
                <p className="text-3xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                  吾魂兮无求乎永生，竭尽人事之所能
                </p>
              </div>

              <p className="text-zinc-300">
                人生本质上是荒诞的：我们渴望意义、秩序和爱，但世界本身却冷漠、无意义、无序。我无法掌握时间的流逝，也不能在无尽的宇宙中找到我存在的意义。然而，正是在这片荒诞的海洋中，我依然可以选择如何面对。
              </p>

              <p className="text-zinc-300">
                在这无常的世界里，美好的人和事物总是短暂，痛苦和孤独却如此漫长。我既不逃避（如自杀或堕落），也不绝望。相反，我选择坦然接受生命的有限和荒诞。正是这有限，赋予了我们独特的意义和价值——刹那间的一生，催促我去尽快完成自己的使命。
              </p>

              <p className="text-zinc-300 text-gray">
                正如西西弗斯推石上山的无望劳作，虽注定失败，但我对命运不屈不挠、不断反抗的斗争让我获得了尊严和内心的平静。
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
