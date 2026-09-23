import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net', // ← ДОБАВЬ ЭТУ СТРОКУ (основной CDN Contentful)
      },
      {
        protocol: 'https',
        hostname: 'images.eu.ctfassets.net', // ← НА ВСЯКИЙ СЛУЧАЙ (европейские серверы)
      },
    ],
  },
};

export default nextConfig;