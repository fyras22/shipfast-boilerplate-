/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#f0f9ff',
          '100': '#e0f2fe',
          '200': '#bae6fd',
          '300': '#7dd3fc',
          '400': '#38bdf8',
          '500': '#0ea5e9',
          '600': '#0284c7',
          '700': '#0369a1',
          '800': '#075985',
          '900': '#0c4a6e',
          '950': '#082f49',
        },
        secondary: {
          '50': '#f5f3ff',
          '100': '#ede9fe',
          '200': '#ddd6fe',
          '300': '#c4b5fd',
          '400': '#a78bfa',
          '500': '#8b5cf6',
          '600': '#7c3aed',
          '700': '#6d28d9',
          '800': '#5b21b6',
          '900': '#4c1d95',
          '950': '#2e1065',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
          },
        },
      },
      fontSize: {
        'fluid-1': 'clamp(1rem, 0.95rem + 0.25vw, 1.25rem)',
        'fluid-2': 'clamp(1.25rem, 1.15rem + 0.5vw, 1.75rem)',
        'fluid-3': 'clamp(1.5rem, 1.35rem + 0.75vw, 2.25rem)',
        'fluid-4': 'clamp(1.75rem, 1.55rem + 1vw, 2.75rem)',
        'fluid-5': 'clamp(2rem, 1.75rem + 1.25vw, 3.25rem)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#0ea5e9',
          secondary: '#8b5cf6',
          accent: '#f97316',
          neutral: '#3d4451',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#f3f4f6',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#0ea5e9',
          secondary: '#8b5cf6',
          accent: '#f97316',
          neutral: '#1f2937',
          'base-100': '#0f172a',
          'base-200': '#1e293b',
          'base-300': '#334155',
        },
      },
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
}; 