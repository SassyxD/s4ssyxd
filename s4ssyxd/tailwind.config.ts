import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#4F46E5', // Indigo
                    DEFAULT: '#4338CA',
                    dark: '#3730A3',
                },
                accent: {
                    light: '#FCD34D', // Warm yellow
                    DEFAULT: '#F59E0B',
                    dark: '#EA580C', // Red-orange for dark mode
                },
                background: {
                    light: '#FAFAF9', // Warm beige
                    dark: '#000000', // True black
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'scale': 'scale 6s ease-in-out infinite',
                'rotate': 'rotate 8s linear infinite',
                'fade-in': 'fadeIn 0.5s ease-in',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                scale: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                },
                rotate: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            fontFamily: {
                sans: ['var(--font-poppins)'],
            },
        },
    },
    plugins: [],
}

export default config 