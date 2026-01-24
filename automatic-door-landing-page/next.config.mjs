/** @type {import('next').NextConfig} */

// GitHub Actions'da build edilirken true olur
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = isGitHubPages ? '/OtomatikKapi' : '';

const nextConfig = {
  // Sadece GitHub Pages için static export yap
  // Local development'ta normal çalışsın
  ...(isGitHubPages && {
    output: 'export',
    basePath: '/OtomatikKapi',
    assetPrefix: '/OtomatikKapi/',
    trailingSlash: true,
  }),

  // Favicon ve diğer static asset'ler için basePath'i client'a aktar
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Enable image optimization for local and Supabase images
    unoptimized: isGitHubPages, // Only unoptimized for static export
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'roykuxvbtjqfqqjvhxmz.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig
