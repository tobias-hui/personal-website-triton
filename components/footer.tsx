"use client"

import { Github, Twitter, Book } from "lucide-react"
import { useEffect, useState } from "react"

export default function Footer() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <footer className="border-t border-zinc-800 bg-black py-6">
        <div className="container flex justify-center items-center">
          <div className="flex space-x-4">
            <div className="h-5 w-5"></div>
            <div className="h-5 w-5"></div>
            <div className="h-5 w-5"></div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-zinc-800 bg-black py-6">
      <div className="container flex justify-center items-center">
        <div className="flex space-x-8">
          <a
            href="https://github.com/tobias-hui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://x.com/huikai18"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="https://www.xiaohongshu.com/user/profile/619754e00000000010004309?xsec_token=YB2Vt-_DytsN9aVe6DZJ7DbjF4mvD65uAiIr-1FPygfF0%3D&xsec_source=app_share&xhsshare=CopyLink&appuid=619754e00000000010004309&apptime=1745077997&share_id=f3d813b484ed486b91c3e0fc8329cade&share_channel=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Book className="h-5 w-5" />
            <span className="sr-only">小红书</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
