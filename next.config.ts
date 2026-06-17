import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['@anthropic-ai/sdk'],
  webpack(config) {
    // Prevent Next.js from bundling Node.js onnxruntime instead of the browser version
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, unknown>),
      sharp$: false,
      'onnxruntime-node$': false,
    };
    return config;
  },
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
