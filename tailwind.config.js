/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact Brand Colors from Official Poster
        rouge: {
          DEFAULT: '#D71910', // Rouge officiel Betex Express
          dark: '#650000',    // Rouge foncé officiel
          light: '#F52216',
          hover: '#BA140D',
          glow: 'rgba(215, 25, 16, 0.35)',
          subtle: 'rgba(215, 25, 16, 0.08)',
        },
        noir: {
          DEFAULT: '#080808', // Noir officiel
          pure: '#000000',
          soft: '#141414',
          muted: '#2A2A2A',
          subtle: '#4A4A4A',
        },
        blanc: {
          DEFAULT: '#FFFFFF', // Blanc dominant
          pure: '#FFFFFF',
          soft: '#FAFAFA',
        },
        gris: {
          DEFAULT: '#F5F5F5', // Gris clair officiel
          light: '#F8F8F8',
          border: '#E8E8E8',
          text: '#666666',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'system-ui', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'full': '9999px',
      },
      boxShadow: {
        'rouge-glow': '0 10px 25px -5px rgba(215, 25, 16, 0.4)',
        'card-subtle': '0 4px 20px -2px rgba(8, 8, 8, 0.05), 0 0 1px 1px rgba(8, 8, 8, 0.03)',
        'card-hover': '0 15px 35px -5px rgba(215, 25, 16, 0.08), 0 0 1px 1px rgba(215, 25, 16, 0.15)',
      }
    },
  },
  plugins: [],
}
