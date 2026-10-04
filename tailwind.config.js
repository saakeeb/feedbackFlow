/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: [
          'var(--font-display)',
          'Space Grotesk',
          '-apple-system',
          'sans-serif',
        ],
        sans: [
          'var(--font-sans)',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      colors: {
        background: '#0b0b0b',
        foreground: {
          DEFAULT: '#f5f3ee',
          muted: '#9a9a95',
          subtle: '#6f6f6a',
        },
        surface: {
          DEFAULT: '#141414',
          elevated: '#1b1b1b',
          muted: '#181818',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.14)',
          strong: 'rgba(255, 255, 255, 0.24)',
          subtle: 'rgba(255, 255, 255, 0.08)',
        },
        paper: {
          DEFAULT: '#e9e5dc',
          foreground: '#111111',
          muted: '#5a5852',
          border: 'rgba(0, 0, 0, 0.12)',
          'border-strong': 'rgba(0, 0, 0, 0.22)',
        },
        accent: {
          DEFAULT: '#d8ff3e',
          foreground: '#0b0b0b',
          hover: '#c8f22e',
          muted: 'rgba(216, 255, 62, 0.15)',
        },
        muted: '#9a9a95',
        success: {
          DEFAULT: '#22c55e',
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#16A34A',
          700: '#15803D',
        },
        warning: {
          DEFAULT: '#f59e0b',
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#D97706',
          700: '#B45309',
        },
        danger: {
          DEFAULT: '#ef4444',
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#DC2626',
          700: '#B91C1C',
        },
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        dropdown: '0 10px 25px -5px rgba(0, 0, 0, 0.6)',
      },
      maxWidth: {
        container: '1440px',
      },
    },
  },
  plugins: [],
};