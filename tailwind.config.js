/* eslint-env node */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-blue': 'var(--color-primary-blue)',
        'primary-green': 'var(--color-primary-green)',
        error: 'var(--color-error)',
        danger: 'var(--color-danger)',
        gray: {
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          500: 'var(--color-gray-500)',
          700: 'var(--color-gray-700)',
          900: 'var(--color-gray-900)',
        },
        text: {
          title: 'var(--color-text-title)',
          subtitle: 'var(--color-text-subtitle)',
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        background: {
          card: 'var(--color-background-card)',
          secondary: 'var(--color-background-secondary)',
        },
        border: {
          primary: 'var(--color-border-primary)',
        },
      },
    },
  },
  plugins: [],
};
