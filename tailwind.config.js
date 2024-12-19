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
      boxShadow: {
        md: "6px 6px 16px 0 rgba(0, 0, 0, 0.25),-4px -4px 12px 0 rgba(255, 255, 255, 0.3);",
      },
    },
    plugins: [],
  }
}