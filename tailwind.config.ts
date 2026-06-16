import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './views/**/*.{ts,tsx}',
    './constants.tsx',
  ],
  theme: {
    extend: {
      colors: {
        si: {
          bg: '#050810',
          bg2: '#080d1a',
          surface: '#0d1428',
          surface2: '#111a35',
          cyan: '#00d4ff',
          violet: '#7c3aed',
          green: '#00ff88',
          pink: '#ff6b9d',
          text: '#e8eeff',
          muted: '#6b7fa3',
          dim: '#3a4a6b',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
