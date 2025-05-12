import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import 'highlight.js/styles/atom-one-dark.css'
import '@/styles/blog-prose.css'
import dedent from 'dedent'

const blogContent = dedent(`
Cursor AI is a powerful coding assistant designed to boost developer productivity through advanced AI features. One of its standout capabilities is the Multi-Context Protocol (MCP), which lets developers extend Cursor's functionality with custom tools and integrations.

However, many users—especially on Windows—run into a frustrating issue when setting up MCP servers: the cryptic "Client Closed" error. This guide walks you through the causes and proven solutions for this problem so you can fully harness Cursor's MCP functionality.

## What Causes the "Client Closed" Error in Cursor AI?

![Image description](https://canva0.oss-cn-hongkong.aliyuncs.com/uploads/1747060366164-0534164ed0c72e2f.jpg)

When connecting to an MCP server, users may see the following error in the Cursor UI:

\`\`\`js
Client closed
\`\`\`

This vague message makes it difficult to identify what's going wrong. Based on community insights, the issue occurs most often on Windows, and the root causes fall into several categories.

## Common Causes of the "Client Closed" Error

### 1. Command Execution on Windows

On Windows, tools like \`npx\` are batch scripts (\`npx.cmd\`) that require a command interpreter (\`cmd.exe\`). Cursor sometimes tries to run these scripts directly without specifying an interpreter, which leads to the connection failing.

### 2. WSL and Host Environment Conflicts

Many developers use WSL (Windows Subsystem for Linux), but install Node.js and related tools inside WSL only. Since Cursor runs as a native Windows app, it needs access to these tools in the Windows environment—not just inside WSL.

### 3. Multi-File MCP Server Complexity

Custom MCP servers built using multiple files or TypeScript can be problematic, especially if they rely on module systems like ESM. Cursor may not handle these setups gracefully without extra preparation.

### 4. Environment Variable Misconfigurations

If your PATH variable doesn't include the right directories for Node.js or npm, Cursor won't be able to locate the required tools to run your MCP server.

## How to Fix It: Step-by-Step Solutions

### ✅ Solution 1: Prefix Your Command with \`cmd /c\` (Windows)

To resolve command interpreter issues on Windows, wrap your \`npx\` command like this:

\`\`\`bash
cmd /c npx @agentdeskai/browser-tools-mcp
\`\`\`

Or to minimize the command window:

\`\`\`bash
cmd /c start /min npx @agentdeskai/browser-tools-mcp
\`\`\`

### ✅ Solution 2: Run Node.js Directly

You can also bypass \`npx\` and run the MCP script directly using \`node\`:

\`\`\`bash
node C:\\\\Users\\\\<your_user>\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\@agentdeskai\\\\browser-tools-mcp\\\\dist\\\\mcp-server.js
\`\`\`

### ✅ Solution 3: Ensure Node.js Is Installed on Windows

If you're working inside WSL, double-check that Node.js is also installed on Windows:

1. Download Node.js from the official site: https://nodejs.org/
2. Ensure the installation path is added to your Windows \`PATH\`
3. Verify installation:

\`\`\`bash
node --version
npm --version
\`\`\`

![image](https://canva0.oss-cn-hongkong.aliyuncs.com/uploads/1747060892449-b5a1cee13a9de451.png)

### ✅ Solution 4: Bundle Multi-File MCP Servers

If you're building a custom MCP server with multiple files, bundle it into a single file using a tool like \`esbuild\`:

\`\`\`bash
esbuild index.ts --bundle --platform=node --outfile=dist/bundled.js --external:express --external:axios
\`\`\`

Then, launch it in Cursor with:

\`\`\`bash
cmd /c node ./dist/bundled.js
\`\`\`

### ✅ Solution 5: Restart Cursor and Your System

Sometimes, a complete restart solves the issue:

- Close all Cursor windows
- Restart your system
- Open Cursor again and re-add your MCP server

## Understanding Different MCP Server Types

Identifying what kind of MCP server you're using helps you troubleshoot more effectively:

### 1. NPM-Based MCP Servers

Examples:

- \`@agentdeskai/browser-tools-mcp\`
- \`@cursor/image-assistant-mcp\`

Best solution: \`cmd /c npx ...\`

### 2. Custom/Local MCP Servers

Best practices:

- Bundle your code into a single file
- Use \`node <path>\` directly
- Handle errors properly in your script

### 3. Remote (Hosted) MCP Servers

If you're connecting to a remote MCP server (e.g., hosted via Supabase):

- Confirm network access and DNS resolution
- Verify the URL is correct
- Ensure authentication (if needed) is properly set up

## Final Thoughts

The "Client Closed" error in Cursor AI's MCP integration can be a major blocker—but it's usually caused by how command-line scripts are run, especially on Windows. With a few simple fixes—such as invoking \`cmd\`, bundling your code, or ensuring a proper Node.js setup—you can get your MCP server running smoothly.

As Cursor continues to develop, these issues may become less common. In the meantime, these workarounds will keep you productive and help you get the most out of Cursor's powerful AI development tooling.
`);


const blogPosts = [
  {
    id: 1,
    title: "Resolving the Cursor AI 'Client Closed' Error: A Complete Guide to MCP Server Connectivity Issues",
    excerpt: "This guide will help you understand and resolve common issues with Cursor's MCP capabilities. Learn essential troubleshooting steps and best practices for a smooth development experience.",
    date: "2024-05-12",
    readTime: "2 min read",
    author: "Kai Hui",
    category: "AI Tools",
    tags: ["Cursor AI", "MCP", "Troubleshooting", "Guide"],
    slug: "resolving-cursor-ai-client-closed-error-mcp-guide",
    image: "/blogs/blog-00.png",
    content: blogContent,
  },
]

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-muted-foreground mb-2">{post.date} · {post.readTime} · {post.author}</p>
      <div className="mb-2 flex flex-wrap gap-2">
        <span className="px-2 py-1 bg-zinc-800 rounded text-xs">{post.category}</span>
        {post.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-zinc-900 rounded text-xs">{tag}</span>
        ))}
      </div>
      <div className="mb-6">
        <img src={post.image} alt={post.title} className="rounded-lg aspect-[16/9] object-cover w-full" />
      </div>
      <p className="mb-8 text-lg text-zinc-300">{post.excerpt}</p>
      <div className="prose prose-zinc prose-lg prose-invert max-w-none blog-prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{post.content || ''}</ReactMarkdown>
      </div>
    </div>
  )
} 