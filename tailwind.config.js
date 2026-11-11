/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF7F4',
          100: '#FFEBE4',
          200: '#FFD4C5',
          300: '#FFAF94',
          400: '#FF8059',
          500: '#F9541E', // Vibrant Primary Orange
          600: '#EA4A15', // Primary Orange Hover/Dark
          700: '#C8390A',
          800: '#A42E08',
          900: '#83270B',
          DEFAULT: '#F9541E',
          dark: '#EA4A15',
          light: '#FFEBE4',
        },
        surface: '#FFFFFF',
        background: '#F8F9FA',
        textPrimary: '#1E293B',
        textSecondary: '#64748B',
        borderCol: '#E2E8F0',
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 12px 28px -6px rgba(0, 0, 0, 0.08), 0 8px 12px -4px rgba(0, 0, 0, 0.04)',
        'dropdown': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
