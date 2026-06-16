import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'briefy-site.vercel.app' },
    ],
  },
};

export default nextConfig;
