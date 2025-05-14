"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import PageTransition from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Download, Check, Upload, Sparkles, Copy, FileDown, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import JSZip from "jszip"
import html2canvas from "html2canvas"

// Theme options for the card
const themes = [
  {
    id: "frosted-silver",
    name: "Frosted Silver",
    bgColor:
      "bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-md border border-gray-700/50",
    textColor: "text-gray-300",
    accentColor: "text-white",
    secondaryTextColor: "text-gray-400",
    headingClass: "text-white font-bold",
    strongClass: "text-gray-100 font-semibold",
    borderClass: "border-gray-700",
  },
  {
    id: "cosmic-purple",
    name: "Cosmic Purple",
    bgColor:
      "bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900 border border-purple-700/30 relative overflow-hidden",
    textColor: "text-indigo-100",
    accentColor: "text-white",
    secondaryTextColor: "text-indigo-300",
    headingClass: "text-white font-bold",
    strongClass: "text-purple-200 font-semibold",
    borderClass: "border-purple-700/50",
    extraClasses:
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_20%,rgba(120,80,255,0.15)_0%,transparent_60%)] before:z-0 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_70%_60%,rgba(60,60,255,0.1)_0%,transparent_50%)] after:z-0",
    contentClass: "relative z-10",
  },
  {
    id: "glass-dark",
    name: "Glass Dark",
    bgColor: "bg-gray-950/90 backdrop-blur-md border border-gray-800/50 shadow-xl",
    textColor: "text-gray-200",
    accentColor: "text-blue-400",
    secondaryTextColor: "text-gray-400",
    headingClass: "text-blue-300 font-bold",
    strongClass: "text-white font-semibold",
    borderClass: "border-gray-800",
  },
  {
    id: "twitter-dark",
    name: "Twitter Dark",
    bgColor: "bg-black border border-gray-800 shadow-md",
    textColor: "text-gray-200",
    accentColor: "text-white",
    secondaryTextColor: "text-gray-500",
    headingClass: "text-white font-bold",
    strongClass: "text-blue-400 font-semibold",
    borderClass: "border-gray-800",
  },
]

// Sample markdown content
const sampleMarkdown = `# Main Title: Emphasize Key Points

This is regular text content, which can include **bold text** to highlight important concepts.

## Subtitle: Hierarchical Display

- List item 1
- List item 2
- **Important list item**

> Blockquotes can be used to highlight special viewpoints or quotes.

Continue elaborating in a normal paragraph...`

export default function CardGenerator() {
  // State for form inputs
  const [username, setUsername] = useState("惠凯")
  const [handle, setHandle] = useState("@huikai.tech")
  const [verified, setVerified] = useState(true)
  const [date, setDate] = useState<Date>(new Date())
  const [content, setContent] = useState(
    '心力匮乏。\n\n对大多数INTJ来说，**变强是一种近乎本能的执念**。\n\n我们热衷于成长，擅长思考，目标明确，常被标签为"天生的战略家"。可现实却充满讽刺：\n\n- 脑子计划完美，行动虎头蛇尾\n- 明明知道该做什么，却总是在关键时刻退缩\n- 拖延、摇摆不定成为常态\n'
  )
  const [footer, setFooter] = useState("实事求是，尊重客观规律。")
  const [selectedTheme, setSelectedTheme] = useState(themes[0])
  const [avatarSrc, setAvatarSrc] = useState("/profile-photo.jpeg")
  const [pages, setPages] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [activeTab, setActiveTab] = useState("edit")
  const [copied, setCopied] = useState(false)
  const [aspectRatio, setAspectRatio] = useState("3:4")
  const [exporting, setExporting] = useState(false)

  const aspectRatios = [
    { value: "1:1", label: "1:1 (Square)" },
    { value: "4:3", label: "4:3 (Standard)" },
    { value: "16:9", label: "16:9 (Widescreen)" },
    { value: "9:16", label: "9:16 (Portrait)" },
    { value: "3:4", label: "3:4 (Portrait Standard)" },
  ]

  const cardRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const contentAreaRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getCardDimensions = useCallback(() => {
    let cardClientWidth = 0;
    if (cardRef.current) {
      cardClientWidth = cardRef.current.clientWidth;
    } else {
      if (aspectRatio === "3:4" || aspectRatio === "9:16") {
        cardClientWidth = Math.min(typeof window !== 'undefined' ? window.innerWidth * 0.9 : 450, 450);
      } else {
        cardClientWidth = Math.min(typeof window !== 'undefined' ? window.innerWidth * 0.9 : 600, 600);
      }
    }
    const [ratioW, ratioH] = aspectRatio.split(':').map(Number);
    const cardClientHeight = (cardClientWidth / ratioW) * ratioH;
    return { cardClientWidth, cardClientHeight };
  }, [aspectRatio, cardRef]);

  const maxCharsPerPage = useMemo(() => {
    if (!headerRef.current || !footerRef.current || !contentAreaRef.current) {
      const isLikelyCJK = (content.match(/[\u4e00-\u9fff\u3040-\u30ff\uff00-\uffef]/g) || []).length / (content.length || 1) > 0.3;
      return isLikelyCJK ? 180 : 320;
    }

    const { cardClientHeight, cardClientWidth } = getCardDimensions();
    const headerHeight = headerRef.current.offsetHeight || 0;
    const footerHeight = footerRef.current.offsetHeight || 0;
    
    const cardActualPaddingVertical = (aspectRatio === '9:16' || aspectRatio === '3:4') ? (16 * 2) : (24 * 2);
    
    const contentAreaComputedStyle = window.getComputedStyle(contentAreaRef.current);
    const contentAreaPaddingTop = parseFloat(contentAreaComputedStyle.paddingTop) || 0;
    const contentAreaPaddingBottom = parseFloat(contentAreaComputedStyle.paddingBottom) || 0;

    let availableContentHeight = cardClientHeight - headerHeight - footerHeight - cardActualPaddingVertical - contentAreaPaddingTop - contentAreaPaddingBottom;
    availableContentHeight = Math.max(0, availableContentHeight);
    
    const estimatedLineHeight = 28;
    const numLines = Math.max(1, Math.floor(availableContentHeight / estimatedLineHeight));

    let charsPerLine;
    const cjkChars = (content.match(/[\u4e00-\u9fff\u3040-\u30ff\uff00-\uffef]/g) || []).length;
    const isLikelyCJK = cjkChars / (content.length || 1) > 0.3;

    if (isLikelyCJK) {
      charsPerLine = Math.floor(cardClientWidth / 22);
    } else {
      charsPerLine = Math.floor(cardClientWidth / 11);
    }
    
    let limit = numLines * charsPerLine;
    limit *= 0.9;

    if (content.includes("#")) limit *= 0.9;
    if (content.includes("- ") || content.includes("* ")) limit *= 0.95;
    if (content.includes(">")) limit *= 0.9;

    return Math.max(40, Math.floor(limit));

  }, [content, aspectRatio, selectedTheme, username, handle, verified, date, footer, getCardDimensions, headerRef, footerRef, contentAreaRef]);

  useEffect(() => {
    const paragraphs = content.split("\n\n");
    const newPages: string[] = [];
    let currentPageContent = "";
    let currentPageLength = 0;

    for (const paragraph of paragraphs) {
      const paragraphLength = paragraph.length;
      const isHeading = paragraph.trim().startsWith("#");
      const isList = paragraph.trim().startsWith("- ") || paragraph.trim().startsWith("* ");
      const isBlockquote = paragraph.trim().startsWith(">");

      if (isHeading) {
        if (paragraph.trim().startsWith("# ")) {
          if (currentPageContent.trim().length > 0) {
            newPages.push(currentPageContent.trim());
          }
          currentPageContent = paragraph;
          currentPageLength = paragraphLength;
          if (newPages.length > 0 || currentPageContent.trim() !== paragraph.trim()) {
             if (currentPageContent.trim() !== paragraph.trim() && currentPageContent.trim().length > 0) { 
                // This case might be redundant due to the outer if, but for safety.
             } 
          }
          if (currentPageContent.trim() !== paragraph.trim() && currentPageContent.length > paragraphLength) {
             newPages.push(currentPageContent.substring(0, currentPageContent.length - paragraphLength).trim());
          }
          currentPageContent = paragraph;
          currentPageLength = paragraphLength;
        } else if (currentPageLength + paragraphLength > maxCharsPerPage * 0.8) {
          if (currentPageContent.trim().length > 0) newPages.push(currentPageContent.trim());
          currentPageContent = paragraph;
          currentPageLength = paragraphLength;
          continue;
        }
      } else if (isList || isBlockquote) {
        if (currentPageLength + paragraphLength > maxCharsPerPage * 0.9) {
          if (currentPageContent.trim().length > 0) newPages.push(currentPageContent.trim());
          currentPageContent = paragraph;
          currentPageLength = paragraphLength;
          continue;
        }
      }

      if (currentPageLength + paragraphLength > maxCharsPerPage) {
        if (currentPageContent.trim().length > 0) {
          newPages.push(currentPageContent.trim());
        }
        currentPageContent = paragraph;
        currentPageLength = paragraphLength;
            } else {
        currentPageContent += (currentPageContent ? "\n\n" : "") + paragraph;
        currentPageLength += paragraphLength;
      }
    }

    if (currentPageContent.trim().length > 0) {
      newPages.push(currentPageContent.trim());
    }
    
    setPages(newPages);
    if (currentPage >= newPages.length && newPages.length > 0) {
        setCurrentPage(newPages.length - 1);
    } else if (newPages.length === 0 && currentPage !== 0) {
        setCurrentPage(0);
    } else if (currentPage < 0 && newPages.length > 0) {
        setCurrentPage(0);
    }

  }, [content, maxCharsPerPage]);

  // Handle avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarSrc(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Custom components for markdown rendering
  const MarkdownComponents = {
    h1: ({ node, ...props }: any) => <h1 className={selectedTheme.headingClass + " text-xl mb-2"} {...props} />,
    h2: ({ node, ...props }: any) => <h2 className={selectedTheme.headingClass + " text-lg mb-2"} {...props} />,
    h3: ({ node, ...props }: any) => <h3 className={selectedTheme.headingClass + " text-base mb-1"} {...props} />,
    strong: ({ node, ...props }: any) => <strong className={selectedTheme.strongClass} {...props} />,
    blockquote: ({ node, ...props }: any) => (
      <blockquote className={`border-l-2 ${selectedTheme.borderClass} pl-4 italic my-2`} {...props} />
    ),
    li: ({ node, ...props }: any) => <li className="ml-4" {...props} />,
    ol: ({ node, ordered, ...props }: any) => <ol className="list-decimal ml-6 my-2" {...props} />,
    ul: ({ node, ordered, ...props }: any) => <ul className="list-disc ml-6 my-2" {...props} />,
    p: ({ node, ...props }: any) => <p className="mb-2" {...props} />,
  }

  // Export single card as image
  const exportSingleCard = async () => {
    // Save current tab state
    const originalTab = activeTab

    try {
      setExporting(true)

      // Force switch to preview tab to ensure what we capture is the preview
      setActiveTab("preview")

      // Wait for sufficient time for the preview to render completely
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Send request to server-side rendering API
      const absoluteAvatarSrc = avatarSrc.startsWith('/') 
        ? `${window.location.origin}${avatarSrc}` 
        : (avatarSrc.startsWith('data:') ? avatarSrc : `${window.location.origin}${avatarSrc}`);

      console.log("Exporting with avatar:", absoluteAvatarSrc.substring(0, 50) + "...");

      const response = await fetch('/api/render-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          handle,
          verified,
          date,
          content: pages[currentPage] || '', // Send current page content
          footer,
          avatarSrc: absoluteAvatarSrc, // Send absolute URL
          theme: selectedTheme,
          aspectRatio,
          // currentPage is not sent as API renders one image based on content
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to render card on server')
      }

      // Get the image blob
      const blob = await response.blob()
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob)
      
      // Create a link to download the image
      const link = document.createElement('a')
      link.href = url
      link.download = `social-card-${format(date, 'yyyy-MM-dd')}.png`
      link.click()
      
      // Clean up
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting card:", error)
      alert("Failed to export card. Please try again.")
    } finally {
      // Restore original tab state
      setActiveTab(originalTab)
      setExporting(false)
    }
  }

  // Export all cards as a zip file
  const exportAllCards = async () => {
    if (!cardRef.current || pages.length <= 1) return

    // Save current tab and page state
    const originalTab = activeTab
    const currentPageBackup = currentPage

    try {
      setExporting(true)

      // Force switch to preview tab
      setActiveTab("preview")

      const zip = new JSZip()
      const imgFolder = zip.folder("social-cards")

      for (let i = 0; i < pages.length; i++) {
        setCurrentPage(i)

        // Wait for rendering
        await new Promise((resolve) => setTimeout(resolve, 300))

        // Server-side rendering API
        const absoluteAvatarSrcBatch = avatarSrc.startsWith('/') 
          ? `${window.location.origin}${avatarSrc}` 
          : (avatarSrc.startsWith('data:') ? avatarSrc : `${window.location.origin}${avatarSrc}`);

        console.log("Exporting batch card with avatar:", absoluteAvatarSrcBatch.substring(0, 50) + "...");

        const response = await fetch('/api/render-card', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            handle,
            verified,
            date,
            content: pages[i] || '',
            footer,
            avatarSrc: absoluteAvatarSrcBatch, // Send absolute URL
            theme: selectedTheme,
            aspectRatio,
            // currentPage for server-side is implicitly handled by sending specific page content
          }),
        })

        if (!response.ok) {
          throw new Error(`Failed to render card ${i+1} on server`)
        }

        // Convert response to array buffer and add to zip
        const imageArrayBuffer = await response.arrayBuffer()
        imgFolder?.file(`social-card-${format(date, "yyyy-MM-dd")}-${i + 1}.png`, imageArrayBuffer)
      }

      // Generate and download zip file
      const zipContent = await zip.generateAsync({ type: "blob" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(zipContent)
      link.download = `social-cards-${format(date, "yyyy-MM-dd")}.zip`
      link.click()
    } catch (error) {
      console.error("Error exporting cards:", error)
      alert("Failed to export cards. Please try again.")
    } finally {
      // Restore original state
      setCurrentPage(currentPageBackup)
      setActiveTab(originalTab)
      setExporting(false)
    }
  }

  // Export cards based on page count
  const exportCards = async () => {
    if (pages.length <= 1) {
      await exportSingleCard()
    } else {
      await exportAllCards()
    }
  }

  // Copy sample markdown
  const copySampleMarkdown = () => {
    navigator.clipboard.writeText(sampleMarkdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Helper function to calculate aspect ratio styles
  const getAspectRatioStyle = (ratio: string) => {
    const [width, height] = ratio.split(":").map(Number)
    return {
      aspectRatio: `${width} / ${height}`,
      width: "100%",
      maxWidth: ratio === "3:4" || ratio === "9:16" ? "450px" : "600px",
      minHeight: "400px",
    }
  }

  // Get card padding based on aspect ratio
  const getCardPadding = (ratio: string) => {
    // For portrait orientations, reduce padding
    if (ratio === "9:16" || ratio === "3:4") {
      return "p-4"
    }
    // For landscape, use more padding
    return "p-6"
  }

  // Get header size based on aspect ratio
  const getHeaderSize = (ratio: string) => {
    if (ratio === "9:16" || ratio === "3:4") {
      return "mb-3" // Smaller margin for portrait
    }
    return "mb-4" // Larger margin for landscape
  }

  // Get footer size based on aspect ratio
  const getFooterSize = (ratio: string) => {
    if (ratio === "9:16" || ratio === "3:4") {
      return "text-xs pt-3 mt-3" // Smaller for portrait
    }
    return "text-sm pt-4 mt-4" // Larger for landscape
  }

  // Get card border radius based on theme
  const getCardBorderRadius = (themeId: string) => {
    if (themeId === "cosmic-purple" || themeId === "glass-dark") {
      return "rounded-2xl" // More rounded for modern themes
    } else if (themeId === "clean-light") {
      return "rounded-xl" // Medium rounded for clean theme
    }
    return "rounded-lg" // Default
  }

  // Get card shadow based on theme
  const getCardShadow = (themeId: string) => {
    if (themeId === "cosmic-purple") {
      return "shadow-lg shadow-purple-900/30" // Purple glow
    } else if (themeId === "glass-dark") {
      return "shadow-xl shadow-blue-900/20" // Blue glow
    } else if (themeId === "clean-light") {
      return "shadow-md" // Subtle shadow
    }
    return "shadow-xl" // Default
  }

  return (
    <PageTransition>
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Social Media Card Generator
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Transform your text content into beautiful social media sharing cards.
          </p>
        </motion.div>

        <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit Card</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Input Controls */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Information</CardTitle>
                    <CardDescription>Set the user profile displayed on the card.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="handle">User Handle</Label>
                      <Input
                        id="handle"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        placeholder="Enter user handle (@username)"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="verified"
                        checked={verified}
                        onChange={(e) => setVerified(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="verified">Verified Account</Label>
                    </div>

                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "yyyy/MM/dd") : "Select Date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(d) => d && setDate(d)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="avatar">Avatar</Label>
                      <div className="flex items-center space-x-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                          <Image src={avatarSrc || "/placeholder.svg"} alt="Avatar" fill className="object-cover" />
                        </div>
                        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Avatar
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Settings</CardTitle>
                    <CardDescription>Edit the text content displayed on the card.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="content">Content</Label>
                        <Button variant="ghost" size="sm" onClick={copySampleMarkdown} className="h-8">
                          {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                          {copied ? "Copied" : "Copy Sample"}
                        </Button>
                      </div>
                      <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter card content (Markdown supported)"
                        className="min-h-[300px] font-mono text-sm"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          Supports Markdown format (# Heading, **Bold**, - List, etc.). Long text will be paginated automatically.
                        </span>
                        <span>
                          {content.length} Chars / Approx. {pages.length || 1} Page(s)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="footer">Footer Text</Label>
                      <Input
                        id="footer"
                        value={footer}
                        onChange={(e) => setFooter(e.target.value)}
                        placeholder="Enter footer text"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full" onClick={exportCards} disabled={exporting}>
                  {exporting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      {pages.length > 1 ? (
                        <>
                          <FileDown className="h-4 w-4 mr-2" />
                          Export All Cards ({pages.length})
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Export Card
                        </>
                      )}
                    </>
                  )}
                </Button>
              </div>

              {/* Right Column - Preview */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Preview</CardTitle>
                      {pages.length > 1 && (
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                              disabled={currentPage === 0}
                            >
                              Previous
                            </Button>
                            <span key={`page-${currentPage}-of-${pages.length}`}>
                              {currentPage + 1} / {pages.length}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
                              disabled={currentPage === pages.length - 1}
                            >
                              Next
                            </Button>
                        </div>
                      )}
                    </div>
                    <CardDescription>Live preview of the generated social media card.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <div
                        ref={cardRef}
                        id="card-for-export-edit-tab"
                        style={getAspectRatioStyle(aspectRatio)}
                        className={cn(
                          getCardBorderRadius(selectedTheme.id),
                          getCardShadow(selectedTheme.id),
                          getCardPadding(aspectRatio),
                          selectedTheme.bgColor,
                          "flex flex-col overflow-hidden",
                        )}
                      >
                        {/* Card Header */}
                        <div ref={headerRef} className={cn("flex justify-between items-center", getHeaderSize(aspectRatio))}>
                          <div className="flex items-center space-x-3">
                            <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                              <Image src={avatarSrc || "/placeholder.svg"} alt="Avatar" fill className="object-cover" />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h3 className={cn("font-bold", selectedTheme.accentColor)}>{username}</h3>
                                {verified && (
                                  <div className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
                                    <Check className="h-3 w-3 text-white" />
                                  </div>
                                )}
                              </div>
                              <p className={selectedTheme.secondaryTextColor}>{handle}</p>
                            </div>
                          </div>
                          <div className={selectedTheme.secondaryTextColor}>{format(date, "yyyy/MM/dd")}</div>
                        </div>

                        {/* Card Content */}
                        <div
                          ref={contentAreaRef}
                          className={cn(
                            "flex-grow flex items-center justify-center min-h-0",
                            selectedTheme.extraClasses || "",
                            "overflow-hidden"
                          )}
                        >
                          <div
                            className={cn(
                              "w-full",
                              selectedTheme.textColor,
                              selectedTheme.contentClass || "",
                              "card-content-render-area",
                            )}
                          >
                            <div className="prose prose-invert prose-sm max-w-none">
                              <ReactMarkdown components={MarkdownComponents}>{pages[currentPage] || ""}</ReactMarkdown>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div
                          ref={footerRef}
                          className={cn(
                            `border-t ${selectedTheme.borderClass} text-center`,
                            getFooterSize(aspectRatio),
                            selectedTheme.secondaryTextColor,
                          )}
                        >
                          {footer}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Style Settings</CardTitle>
                    <CardDescription>Choose the visual style of the card.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {themes.map((theme) => (
                          <div
                            key={theme.id}
                            className={cn(
                              "p-2 cursor-pointer rounded-lg transition-all",
                              selectedTheme.id === theme.id
                                ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-background"
                                : "hover:bg-accent",
                            )}
                            onClick={() => setSelectedTheme(theme)}
                          >
                            <div
                              className={cn(
                                "h-16 rounded-md flex items-center justify-center",
                                theme.bgColor,
                                getCardBorderRadius(theme.id),
                              )}
                            >
                              <span className={cn("text-sm font-medium", theme.accentColor)}>{theme.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aspectRatio">Card Aspect Ratio</Label>
                      <Select value={aspectRatio} onValueChange={setAspectRatio}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Ratio" />
                        </SelectTrigger>
                        <SelectContent>
                          {aspectRatios.map((ratio) => (
                            <SelectItem key={ratio.value} value={ratio.value}>
                              {ratio.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <div className="flex justify-center">
              <div
                ref={cardRef}
                style={getAspectRatioStyle(aspectRatio)}
                id="card-for-export-preview-tab"
                className={cn(
                  getCardBorderRadius(selectedTheme.id),
                  getCardShadow(selectedTheme.id),
                  getCardPadding(aspectRatio),
                  selectedTheme.bgColor,
                  "flex flex-col overflow-hidden",
                )}
              >
                {/* Card Header */}
                <div className={cn("flex justify-between items-center", getHeaderSize(aspectRatio))}>
                  <div className="flex items-center space-x-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                      <Image src={avatarSrc || "/placeholder.svg"} alt="Avatar" fill className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className={cn("font-bold", selectedTheme.accentColor)}>{username}</h3>
                        {verified && (
                          <div className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <p className={selectedTheme.secondaryTextColor}>{handle}</p>
                    </div>
                  </div>
                  <div className={selectedTheme.secondaryTextColor}>{format(date, "yyyy/MM/dd")}</div>
                </div>

                {/* Card Content */}
                <div className={cn(
                  "flex-grow flex items-center justify-center min-h-0", 
                  selectedTheme.extraClasses || "",
                  "overflow-hidden"
                  )}>
                  <div
                    className={cn(
                      "w-full",
                      selectedTheme.textColor,
                      selectedTheme.contentClass || "",
                      "card-content-render-area",
                    )}
                  >
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown components={MarkdownComponents}>{pages[currentPage] || ""}</ReactMarkdown>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div
                  className={cn(
                    `border-t ${selectedTheme.borderClass} text-center`,
                    getFooterSize(aspectRatio),
                    selectedTheme.secondaryTextColor,
                  )}
                >
                  {footer}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button onClick={exportCards} className="px-8" disabled={exporting}>
                {exporting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    {pages.length > 1 ? (
                      <>
                        <FileDown className="h-4 w-4 mr-2" />
                        Export All Cards ({pages.length})
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Export Card
                      </>
                    )}
                  </>
                )}
              </Button>
            </div>

            {pages.length > 1 && (
              <div className="flex justify-center mt-6">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </Button>
                  <span key={`page-${currentPage}-of-${pages.length}-previewtab`}>
                    {currentPage + 1} / {pages.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
                    disabled={currentPage === pages.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Card Generator Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                  Beautiful Social Media Cards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Say goodbye to plain text sharing. Use our tool to easily create stunning social media cards that make
                  your content stand out on platforms like Xiaohongshu and Weibo, increasing readership and engagement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
                  Markdown Format Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Supports Markdown syntax to make your text content layered and clear. Use headings, bolding, lists,
                  and other formats to highlight key content and enhance the reading experience, making your points more
                  persuasive.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-green-500" />
                  Multiple Theme Styles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Offers a variety of carefully designed theme styles, including classic dark series and modern frosted
                  textures. Whether it's serious knowledge sharing or casual daily records, you can find a matching
                  visual style.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-pink-500" />
                  One-Click Export & Share
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  After completing your creation, simply export a high-quality image with one click to share immediately
                  on major social platforms. Single-page content is exported as a single image, while multi-page content
                  is automatically packaged as a ZIP file for easy management and sharing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-2 text-center">How to Use the Social Media Card Generator</h2>
          <p className="text-center text-muted-foreground mb-8">
            Learn to use our free online tool to effortlessly create professional-grade social media cards. This guide
            walks you through every step, from content input to image export, helping you boost engagement on platforms
            like Instagram, X (Twitter), and Facebook.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Personalize Your User Profile & Avatar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Set a unique username, user handle, and upload your brand avatar. Choose to add a verification badge
                  to enhance the professionalism and credibility of your social media cards, boosting brand recognition.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Step 2: Write & Format Your Card Content (Markdown Supported)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Enter engaging text in the content editor. Our card generator fully supports Markdown syntax, allowing
                  you to easily use headings, **bold text**, lists, and other elements to optimize content structure and
                  highlight key points. Long content is automatically paginated for the best reading experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Step 3: Choose a Matching Card Theme & Design Style</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse our diverse range of pre-designed themes, including frosted glass, minimalist styles, and more,
                  to select the visual design that best reflects your content's tone. Customize colors and styles to
                  create unique shareable cards that effectively attract your target audience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Step 4: One-Click Export of HD Card Images (PNG/ZIP) & Share</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Once you're satisfied with your content creation and design, preview your social media card in
                  real-time. Then, with one click, export it as a high-definition PNG image (for single pages) or a
                  convenient ZIP archive (for multiple pages). Easily download and share on major social platforms like
                  Instagram, X (Twitter), Facebook, LinkedIn, and more to expand your content's reach.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-16 mb-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Creation Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Creation Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Use headings and bold text to highlight key points</li>
                  <li>• Keep paragraphs short to enhance readability</li>
                  <li>• Use lists to organize related information</li>
                  <li>• Add emojis appropriately to increase engagement</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visual Design Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Choose theme colors consistent with the content's emotion</li>
                  <li>• Use a clear, recognizable avatar</li>
                  <li>• Ensure sufficient contrast between text and background</li>
                  <li>• Use different theme styles for different types of content</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sharing Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Add a personal tagline or slogan in the footer</li>
                  <li>• Publish long articles as multiple cards for continuity</li>
                  <li>• Add a short introductory caption outside the card content</li>
                  <li>• Use a consistent style regularly to enhance personal brand recognition</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
