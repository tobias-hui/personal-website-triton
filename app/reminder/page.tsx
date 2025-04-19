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
            >
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                {t("reminder.title")}
              </h1>
              <p className="mt-4 text-xl text-zinc-400">{t("reminder.subtitle")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-invert max-w-none"
            >
              <div className="text-center mb-8">
                <p className="text-xl font-serif italic text-white">吾魂兮无求乎永生，竭尽人事之所能</p>
              </div>

              <p className="text-zinc-300">
                人生本质上是荒诞的：我们渴望意义、永恒和秩序，但世界本身却冷漠、无意义、无序。我们无法掌控时间的流逝，也不能在无尽的宇宙中找到永恒的存在。然而，正是在这片荒诞的海洋中，我们依然可以选择如何面对。
              </p>

              <p className="text-zinc-300">
                在这无常的世界里，我们既不逃避（如自杀或幻想永生），也不绝望。相反，我们选择坦然接受生命的有限和荒诞。正是这有限，赋予了我们独特的意义和价值——有限的时间，催促我们活得更加充实、更加真实。
              </p>

              <p className="text-zinc-300">
                因此，我们应该在有限的生命中，投入全部的热情和努力，去生活，去创造意义，去实现自己的价值。即便世界本身无序，我们也能在其中找到属于自己的秩序和方向。竭尽人事之所能，用所有的力量去追求、去奋斗，让这一生，不论多短暂，都充满了热情与创造。
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
