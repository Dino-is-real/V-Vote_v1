/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3d47ff",    // Royal Blue (Healthy Together CTA)
                secondary: "#f472b6",  // Pink-400 (for gradients)
                accent: "#60a5fa",     // Blue-400 (for gradients)
                dark: "#0b0e14",       // Deep Dark Blue
                light: "#ffffff",
                glass: "rgba(255, 255, 255, 0.1)",
                glassDark: "rgba(11, 14, 20, 0.5)",
            },
            fontFamily: {
                sans: ['Inter', 'Satoshi', 'sans-serif'],
            },
            fontSize: {
                'huge': ['5rem', { lineHeight: '1.1', tracking: '-0.02em' }],
                'mega': ['6.5rem', { lineHeight: '1', tracking: '-0.03em' }],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'float': 'float 3s ease-in-out infinite',
                'gradient-x': 'gradient-x 15s ease infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    },
                }
            },
            borderRadius: {
                '4xl': '2rem', // ~32px
                '5xl': '2.5rem', // ~40px
            }
        },
    },
    plugins: [],
}
