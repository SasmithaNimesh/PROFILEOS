/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#09090B',
        charcoal: '#121215',
        raised: '#18181B',
        surface: {
          DEFAULT: '#121215',
          raised: '#18181B',
          card: '#141417',
          hover: '#222226',
        },
        border: {
          DEFAULT: '#27272A',
          subtle: '#1E1E22',
          bright: '#3F3F46'
        },
        accent: {
          DEFAULT: '#FAFAFA',
          contrast: '#09090B',
          muted: '#A1A1AA',
          subtle: '#27272A',
          blue: '#FAFAFA', // Replaced loud blue with high-contrast minimalist white/silver
          'blue-hover': '#E4E4E7',
          'blue-light': '#D4D4D8',
          violet: '#E4E4E7',
          'violet-hover': '#D4D4D8',
        },
        primary: {
          DEFAULT: '#FAFAFA',
          muted: '#A1A1AA',
          dim: '#71717A'
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#E4E4E7'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'minimal': '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        'elevated': '0 12px 32px -8px rgba(0, 0, 0, 0.6)',
        'modal': '0 24px 48px -12px rgba(0, 0, 0, 0.8)',
      }
    },
  },
  plugins: [],
}
