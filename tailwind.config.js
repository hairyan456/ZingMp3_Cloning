/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // nếu custom smaller breakpoint thì dùng cách này (không thêm được vào extend)
    screens: {
      'xs': '480px',
      ...defaultTheme.screens, // chỉ ghi đè mỗi xs breakpoint
    },
    extend: {
      fontFamily: {
        sora: ["Sora", 'sans-serif'],
      },
      colors: {
        '0F': '#0F7070',
        '32': '#32323D',
      },
      backgroundColor: {
        'CE': '#CED9D9',
        'DD': '#DDE4E4',
        'E7': '#E7ECEC',
        'C0': '#C0D8D8'
      },
      boxShadow: {
        md: "6px 6px 16px 0 rgba(0, 0, 0, 0.25),-4px -4px 12px 0 rgba(255, 255, 255, 0.3);",
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 }, to: { opacity: 1 },
        },
        slideLeft: {
          '0%': {
            '-webkit-transform': 'translateX(500px)',
            transform: 'translateX(500px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
            transform: 'translateX(0)'
          }
        },
        slideRight: {
          '0%': {
            '-webkit-transform': 'translateX(-500px)',
            transform: 'translateX(-500px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
            transform: 'translateX(0)'
          }
        }
      },
      animation: {
        slideUp: 'slideUp 0.8s ease-in-out',
        slideRight: 'slideRight 0.8s ease-in-out',
        slideLeft: 'slideLeft 0.8s ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-in-out '
      },
    },
    plugins: [],
  }
}