/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['v0.blob.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Add this to help with hydration issues
  experimental: {
    // This will help with hydration issues
    optimizeFonts: true,
    // Reduce JavaScript size
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default nextConfig
