/**
 * @file next.config.ts
 * @description Next.js configuration.
 *  - remotePatterns: allows the Google Stitch/AI-generated image CDN domains
 *    used throughout the site.
 */

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/aida-public/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/aida/**',
      },
      // Unsplash CDN — used for principal portrait and testimonial avatars
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
