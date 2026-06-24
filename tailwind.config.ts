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
          bg: '#05070f',
          bg2: '#080d1a',
          surface: '#0d1428',
          surface2: '#111a35',
          cyan: '#22e0ff',
          violet: '#8b5cff',
          green: '#2bff9a',
          pink: '#ff5db1',
          text: '#e8eeff',
          muted: '#aab6d6',
          dim: '#8a97b5',
          faint: '#6b78a0',
        },
      },
      fontFamily: {
        display: ['var(--font-space)', 'Space Grotesk', 'sans-serif'],
        body: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
