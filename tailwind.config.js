/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0D0D0E',
          charcoal: '#171719',
          dark: '#1F1F23',
          ivory: '#FAF8F5',
          cream: '#F4EFE6',
          beige: '#E8E1D5',
          champagne: '#C5A880',
          champagneLight: '#DFD0BA',
          gold: '#B89058',
          border: '#E8E4DC',
          darkBorder: '#2A2A2E',
          muted: '#8C8880',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        editorial: ['Cormorant Garamond', 'serif'],
      },
      letterSpacing: {
        'widest-luxury': '0.35em',
        'super-wide': '0.25em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(13, 13, 14, 0.08)',
        'luxury-hover': '0 25px 50px -12px rgba(13, 13, 14, 0.16)',
        'drawer': '-10px 0 30px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
