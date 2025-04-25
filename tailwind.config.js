/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F8F0E7',
          100: '#F2E2D0',
          200: '#E5C5A1',
          300: '#D8A872',
          400: '#CB8B43',
          500: '#8B4513', // primary brown
          600: '#7A3D10',
          700: '#69350D',
          800: '#582C0A',
          900: '#472407',
        },
        accent: {
          50: '#FFFDF5',
          100: '#FFFAEB',
          200: '#FFF5D6',
          300: '#FFF0C2',
          400: '#FFEAAD',
          500: '#D4AF37', // accent gold
          600: '#BF9E32',
          700: '#AA8D2D',
          800: '#957C28',
          900: '#806A23',
        },
        cream: '#FFF8E1',
        crust: '#E0C097',
        chocolate: '#3A1F00',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'subtle': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};