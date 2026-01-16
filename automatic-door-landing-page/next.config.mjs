/** @type {import('next').NextConfig} */

// GitHub Actions'da build edilirken true olur
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  // Sadece GitHub Pages için static export yap
  // Local development'ta normal çalışsın
  ...(isGitHubPages && {
    output: 'export',
    basePath: '/OtomatikKapi',
    assetPrefix: '/OtomatikKapi/',
    trailingSlash: true,
  }),

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
