import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/ferramentas/ferias-13',
        destination: '/ferramentas/calculadora-ferias-13',
        permanent: true,
      },
      {
        source: '/ferramentas/prompt-ia',
        destination: '/ferramentas/gerador-de-prompts',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'briefy-site.vercel.app' },
    ],
  },
};

export default nextConfig;
